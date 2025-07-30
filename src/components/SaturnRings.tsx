import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SaturnRingsProps {
    innerRadius: number
    outerRadius: number
}

export default function SaturnRings({ innerRadius, outerRadius }: SaturnRingsProps) {
    const ringsRef = useRef<THREE.Group>(null)

    const ringTextures = useMemo(() => {
        // Anel principal (A Ring)
        const createMainRing = () => {
            const canvas = document.createElement('canvas')
            canvas.width = 2048
            canvas.height = 64
            const ctx = canvas.getContext('2d')!

            // Gradiente base dourado
            const baseGradient = ctx.createLinearGradient(0, 0, 2048, 0)
            baseGradient.addColorStop(0, '#8B7355')
            baseGradient.addColorStop(0.3, '#D4A76A')
            baseGradient.addColorStop(0.6, '#F5E6D3')
            baseGradient.addColorStop(0.8, '#E5C995')
            baseGradient.addColorStop(1, '#C8B88B')

            ctx.fillStyle = baseGradient
            ctx.fillRect(0, 0, 2048, 64)

            // Adicionar micro-estruturas dos anéis
            for (let x = 0; x < 2048; x += 1) {
                const density = 0.7 + 0.3 * Math.sin(x * 0.05)
                const variation = Math.random() * 0.4 + 0.6
                const alpha = density * variation

                // Partículas individuais
                for (let y = 0; y < 64; y += 2) {
                    if (Math.random() < 0.3) {
                        const brightness = Math.random() * 0.5 + 0.5
                        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * brightness * 0.8})`
                        ctx.fillRect(x, y, 1, 1)
                    }
                }

                // Ondas de densidade
                const wave = Math.sin(x * 0.01) * 0.2 + 0.8
                ctx.fillStyle = `rgba(212, 167, 106, ${alpha * wave * 0.6})`
                ctx.fillRect(x, 0, 1, 64)
            }

            return new THREE.CanvasTexture(canvas)
        }

        // Anel B (mais denso)
        const createBRing = () => {
            const canvas = document.createElement('canvas')
            canvas.width = 1024
            canvas.height = 32
            const ctx = canvas.getContext('2d')!

            // Base mais clara e densa
            ctx.fillStyle = '#F5E6D3'
            ctx.fillRect(0, 0, 1024, 32)

            // Estrutura densa com variações
            for (let x = 0; x < 1024; x++) {
                const density = 0.9 + 0.1 * Math.sin(x * 0.08)
                
                // Spokes (raios radiais) - fenômeno real de Saturno
                const spokeIntensity = Math.sin(x * 0.02) * 0.3
                
                for (let y = 0; y < 32; y++) {
                    const particleDensity = Math.random()
                    if (particleDensity < density) {
                        const brightness = 0.8 + Math.random() * 0.2
                        const spoke = spokeIntensity * Math.sin(y * 0.5)
                        ctx.fillStyle = `rgba(245, 230, 211, ${brightness + spoke})`
                        ctx.fillRect(x, y, 1, 1)
                    }
                }
            }

            return new THREE.CanvasTexture(canvas)
        }

        // Anel C (mais transparente)
        const createCRing = () => {
            const canvas = document.createElement('canvas')
            canvas.width = 512
            canvas.height = 16
            const ctx = canvas.getContext('2d')!

            ctx.fillStyle = 'rgba(200, 184, 139, 0.3)'
            ctx.fillRect(0, 0, 512, 16)

            // Partículas esparsas
            for (let i = 0; i < 1000; i++) {
                const x = Math.random() * 512
                const y = Math.random() * 16
                const size = Math.random() * 2 + 1
                const opacity = Math.random() * 0.6 + 0.2

                ctx.fillStyle = `rgba(255, 248, 220, ${opacity})`
                ctx.fillRect(x, y, size, size)
            }

            return new THREE.CanvasTexture(canvas)
        }

        return {
            mainRing: createMainRing(),
            bRing: createBRing(),
            cRing: createCRing()
        }
    }, [])

    // Animação sutil
    useFrame(() => {
        if (ringsRef.current) {
            ringsRef.current.rotation.z += 0.0001
        }
    })

    return (
        <group ref={ringsRef} rotation={[-Math.PI / 2 + 0.1, 0, 0]}>
            {/* Anel C (interno, mais transparente) */}
            <mesh>
                <ringGeometry args={[innerRadius, innerRadius * 1.4, 128, 1]} />
                <meshBasicMaterial
                    map={ringTextures.cRing}
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Anel B (médio, mais denso) */}
            <mesh>
                <ringGeometry args={[innerRadius * 1.4, innerRadius * 1.8, 128, 1]} />
                <meshBasicMaterial
                    map={ringTextures.bRing}
                    transparent
                    opacity={0.9}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Gap Cassini (espaço entre B e A) */}
            
            {/* Anel A (externo, principal) */}
            <mesh>
                <ringGeometry args={[innerRadius * 1.9, outerRadius, 128, 1]} />
                <meshBasicMaterial
                    map={ringTextures.mainRing}
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}