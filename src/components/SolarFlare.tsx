import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SolarFlare() {
    const groupRef = useRef<THREE.Group>(null)
    const particlesRef = useRef<THREE.Points>(null)
    const positionBufferRef = useRef<THREE.BufferAttribute>(null)
    const opacityBufferRef = useRef<THREE.BufferAttribute>(null)
    const sizeBufferRef = useRef<THREE.BufferAttribute>(null)

    // Partículas para a ejeção de massa coronal
    const particleData = useMemo(() => {
        const particleCount = 200 // Reduzido para ejeções menores
        const positions = new Float32Array(particleCount * 3)
        const velocities = new Float32Array(particleCount * 3)
        const lifetimes = new Float32Array(particleCount)
        const initialSizes = new Float32Array(particleCount)
        const colors = new Float32Array(particleCount * 3)
        const opacities = new Float32Array(particleCount)
        const sizes = new Float32Array(particleCount)

        // Inicializar partículas "mortas" inicialmente
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = 1000
            positions[i * 3 + 1] = 1000
            positions[i * 3 + 2] = 1000
            
            velocities[i * 3] = 0
            velocities[i * 3 + 1] = 0
            velocities[i * 3 + 2] = 0

            lifetimes[i] = 0
            initialSizes[i] = Math.random() * 0.8 + 0.3 // Partículas menores
            sizes[i] = 0

            // Cores do plasma solar
            const temp = Math.random()
            if (temp < 0.4) {
                colors[i * 3] = 1.0
                colors[i * 3 + 1] = 0.4
                colors[i * 3 + 2] = 0.1
            } else if (temp < 0.7) {
                colors[i * 3] = 1.0
                colors[i * 3 + 1] = 0.7
                colors[i * 3 + 2] = 0.3
            } else {
                colors[i * 3] = 1.0
                colors[i * 3 + 1] = 0.9
                colors[i * 3 + 2] = 0.6
            }

            opacities[i] = 0
        }

        return {
            positions,
            velocities,
            lifetimes,
            maxLifetimes: new Float32Array(particleCount),
            initialSizes,
            colors,
            opacities,
            sizes,
            particleCount
        }
    }, [])

    // Criar textura circular para as partículas
    const particleTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32
        const ctx = canvas.getContext('2d')!

        // Gradiente radial para criar bola de plasma
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.2, 'rgba(255, 200, 100, 0.9)')
        gradient.addColorStop(0.6, 'rgba(255, 100, 50, 0.5)')
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 32, 32)

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
    }, [])

    // Ejeções periódicas controladas
    const flareTimer = useRef(0)
    const nextFlareTime = useRef(3 + Math.random() * 5) // Primeira ejeção em 3-8 segundos

    useFrame((state, delta) => {
        if (!particlesRef.current || !positionBufferRef.current || !opacityBufferRef.current || !sizeBufferRef.current) return

        flareTimer.current += delta

        // Iniciar nova ejeção aleatória
        if (flareTimer.current >= nextFlareTime.current) {
            // Próxima ejeção em 5-15 segundos
            nextFlareTime.current = flareTimer.current + 5 + Math.random() * 10
            
            // Ponto aleatório na superfície do sol para a ejeção
            const flareTheta = Math.random() * Math.PI * 2
            const flarePhi = Math.random() * Math.PI
            const flareCenter = new THREE.Vector3(
                Math.sin(flarePhi) * Math.cos(flareTheta),
                Math.sin(flarePhi) * Math.sin(flareTheta),
                Math.cos(flarePhi)
            )

            // Tamanho da área de ejeção (pequeno para ejeções localizadas)
            const flareRadius = 0.3 + Math.random() * 0.4 // Área pequena na superfície

            // Intensidade da ejeção (aleatória)
            const flareIntensity = 0.3 + Math.random() * 0.7

            // Quantidade de partículas para esta ejeção (aleatória)
            const particlesInFlare = Math.floor(50 + Math.random() * 100)

            // Ativar partículas para esta ejeção
            let activeParticles = 0
            for (let i = 0; i < particleData.particleCount && activeParticles < particlesInFlare; i++) {
                if (particleData.lifetimes[i] <= 0) { // Partícula disponível
                    // Posição na área da ejeção (formato de onda circular)
                    const localTheta = Math.random() * Math.PI * 2
                    const localRadius = Math.sqrt(Math.random()) * flareRadius // Distribuição uniforme no círculo
                    
                    const sunRadius = 10.1
                    
                    // Vetor perpendicular ao centro da ejeção para criar o círculo
                    const perpVec1 = new THREE.Vector3()
                    const perpVec2 = new THREE.Vector3()
                    
                    // Encontrar dois vetores perpendiculares ao centro da ejeção
                    if (Math.abs(flareCenter.x) < 0.9) {
                        perpVec1.set(1, 0, 0).cross(flareCenter).normalize()
                    } else {
                        perpVec1.set(0, 1, 0).cross(flareCenter).normalize()
                    }
                    perpVec2.copy(flareCenter).cross(perpVec1).normalize()

                    // Posição na superfície do sol dentro da área da ejeção
                    const localPos = new THREE.Vector3()
                        .addScaledVector(perpVec1, localRadius * Math.cos(localTheta))
                        .addScaledVector(perpVec2, localRadius * Math.sin(localTheta))
                        .add(flareCenter)
                        .normalize()
                        .multiplyScalar(sunRadius)

                    particleData.positions[i * 3] = localPos.x
                    particleData.positions[i * 3 + 1] = localPos.y
                    particleData.positions[i * 3 + 2] = localPos.z

                    // Velocidade em formato de onda (radial + componente tangencial)
                    const baseVelocity = localPos.clone().normalize()
                    
                    // Adicionar componente tangencial para criar movimento de onda
                    const tangentialVelocity = new THREE.Vector3()
                        .addScaledVector(perpVec1, Math.sin(localTheta * 3) * 0.3)
                        .addScaledVector(perpVec2, Math.cos(localTheta * 3) * 0.3)

                    const finalVelocity = baseVelocity
                        .multiplyScalar(0.15 + Math.random() * 0.25 * flareIntensity)
                        .add(tangentialVelocity.multiplyScalar(0.1))

                    particleData.velocities[i * 3] = finalVelocity.x
                    particleData.velocities[i * 3 + 1] = finalVelocity.y
                    particleData.velocities[i * 3 + 2] = finalVelocity.z

                    // Tempo de vida (menor para ejeções menores)
                    const lifetime = 2 + Math.random() * 4
                    particleData.lifetimes[i] = lifetime
                    particleData.maxLifetimes[i] = lifetime
                    
                    particleData.opacities[i] = 0.8
                    particleData.sizes[i] = particleData.initialSizes[i]

                    activeParticles++
                }
            }
        }

        // Atualizar partículas ativas
        const positions = positionBufferRef.current.array as Float32Array
        const opacities = opacityBufferRef.current.array as Float32Array
        const sizes = sizeBufferRef.current.array as Float32Array

        for (let i = 0; i < particleData.particleCount; i++) {
            if (particleData.lifetimes[i] > 0) {
                // Mover partícula
                particleData.positions[i * 3] += particleData.velocities[i * 3] * delta * 15
                particleData.positions[i * 3 + 1] += particleData.velocities[i * 3 + 1] * delta * 15
                particleData.positions[i * 3 + 2] += particleData.velocities[i * 3 + 2] * delta * 15

                // Diminuir tempo de vida
                particleData.lifetimes[i] -= delta

                // Calcular fade baseado no tempo de vida restante
                const lifeRatio = particleData.lifetimes[i] / particleData.maxLifetimes[i]
                
                // Fade mais suave para ejeções menores
                if (lifeRatio > 0.8) {
                    particleData.opacities[i] = (1 - lifeRatio) / 0.2
                } else if (lifeRatio > 0.2) {
                    particleData.opacities[i] = 0.8
                } else {
                    particleData.opacities[i] = lifeRatio / 0.2 * 0.8
                }

                // Tamanho cresce mais sutilmente
                particleData.sizes[i] = particleData.initialSizes[i] * (1 + (1 - lifeRatio) * 1.5)

                // Atualizar buffers
                positions[i * 3] = particleData.positions[i * 3]
                positions[i * 3 + 1] = particleData.positions[i * 3 + 1]
                positions[i * 3 + 2] = particleData.positions[i * 3 + 2]
                
                opacities[i] = Math.max(0, particleData.opacities[i])
                sizes[i] = particleData.sizes[i]
            } else {
                // Partícula inativa
                positions[i * 3] = 1000
                positions[i * 3 + 1] = 1000
                positions[i * 3 + 2] = 1000
                opacities[i] = 0
                sizes[i] = 0
            }
        }

        // Marcar buffers para atualização
        positionBufferRef.current.needsUpdate = true
        opacityBufferRef.current.needsUpdate = true
        sizeBufferRef.current.needsUpdate = true
    })

    return (
        <group ref={groupRef}>
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        ref={positionBufferRef}
                        attach="attributes-position"
                        count={particleData.positions.length / 3}
                        array={particleData.positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        ref={sizeBufferRef}
                        attach="attributes-size"
                        count={particleData.sizes.length}
                        array={particleData.sizes}
                        itemSize={1}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particleData.colors.length / 3}
                        array={particleData.colors}
                        itemSize={3}
                    />
                    <bufferAttribute
                        ref={opacityBufferRef}
                        attach="attributes-opacity"
                        count={particleData.opacities.length}
                        array={particleData.opacities}
                        itemSize={1}
                    />
                </bufferGeometry>
                <pointsMaterial
                    map={particleTexture}
                    size={1.5}
                    sizeAttenuation
                    vertexColors
                    transparent
                    blending={THREE.AdditiveBlending}
                    alphaTest={0.01}
                    depthWrite={false}
                />
            </points>
        </group>
    )
}
