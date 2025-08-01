import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Sun() {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const coronaRef = useRef<THREE.Mesh>(null)

    // Shader material melhorado para o sol
    const sunMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                colorA: { value: new THREE.Color('#FDB813') },
                colorB: { value: new THREE.Color('#FF6347') },
                colorC: { value: new THREE.Color('#FFA500') }
            },
            vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 colorC;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        // Função de ruído mais complexa
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        void main() {
          // Múltiplas camadas de ruído para simular a superfície solar
          vec3 pos = vPosition * 0.1 + time * 0.02;
          float n1 = snoise(pos * 1.0);
          float n2 = snoise(pos * 2.0 - time * 0.03);
          float n3 = snoise(pos * 4.0 + time * 0.05);
          float n4 = snoise(pos * 8.0 - time * 0.07);
          
          // Combinar ruídos para criar padrões de convecção
          float plasma = n1 * 0.5 + n2 * 0.25 + n3 * 0.15 + n4 * 0.1;
          plasma = (plasma + 1.0) * 0.5;
          plasma = pow(plasma, 1.5);
          
          // Granulação solar
          float granulation = snoise(pos * 20.0 + time * 0.1);
          granulation = smoothstep(-0.2, 0.2, granulation);
          
          // Manchas solares
          float spots = snoise(vPosition * 0.5 + vec3(time * 0.005));
          spots = smoothstep(0.3, 0.5, spots);
          
          // Misturar cores baseado nos padrões
          vec3 color = mix(colorA, colorB, plasma);
          color = mix(color, colorC, granulation * 0.3);
          color = mix(color * 0.7, color, spots);
          
          // Brilho natural nas bordas (limb brightening)
          float fresnel = 1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
          fresnel = pow(fresnel, 2.0);
          color += vec3(0.4, 0.3, 0.1) * fresnel;
          
          // Adicionar brilho variável mais sutil
          float brightness = 0.95 + 0.05 * sin(time * 1.5 + plasma * 8.0);
          color *= brightness;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
        })
    }, [])

    // Material para corona mais sutil e natural
    const coronaMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          // Corona sutil com gradiente natural
          float corona = 1.0 - smoothstep(0.0, 0.8, dist);
          corona = pow(corona, 3.0);
          
          // Variação temporal suave
          float flicker = 0.8 + 0.2 * sin(time * 2.0);
          corona *= flicker;
          
          // Fresnel effect para tornar mais realista nas bordas
          float fresnel = 1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
          fresnel = pow(fresnel, 1.5);
          
          float intensity = corona * fresnel * 0.3;
          
          // Cores da corona (mais amarelada e natural)
          vec3 color = vec3(1.0, 0.95, 0.7);
          
          gl_FragColor = vec4(color, intensity);
        }
      `
        })
    }, [])

    // Animar os shaders
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = state.clock.elapsedTime
        }
        if (coronaRef.current && coronaRef.current.material) {
            (coronaRef.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.elapsedTime
            coronaRef.current.rotation.z += 0.0003
        }
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001
        }
    })

    return (
        <group>
            {/* Sol principal */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[10, 128, 128]} />
                <primitive ref={materialRef} object={sunMaterial} />
            </mesh>

            {/* Corona sutil e natural */}
            <mesh ref={coronaRef} scale={1.3}>
                <sphereGeometry args={[10, 64, 64]} />
                <primitive object={coronaMaterial} />
            </mesh>
        </group>
    )
}