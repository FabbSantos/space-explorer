import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SpaceParticles() {
    const particlesRef = useRef<THREE.Points>(null)

    // Criar partículas de poeira espacial
    const [positions, sizes] = useMemo(() => {
        const count = 1000
        const positions = new Float32Array(count * 3)
        const sizes = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            // Posição aleatória em esfera
            const radius = 150 + Math.random() * 150
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos((Math.random() * 2) - 1)

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = radius * Math.cos(phi)

            sizes[i] = Math.random() * 2
        }

        return [positions, sizes]
    }, [])

    // Animação suave
    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.0001
            particlesRef.current.rotation.x += 0.00005
        }
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={sizes.length}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.5}
                sizeAttenuation
                color="#FFFFFF"
                transparent
                opacity={0.6}
                fog={false}
            />
        </points>
    )
}