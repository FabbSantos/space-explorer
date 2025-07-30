import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface UranusRingsProps {
    innerRadius: number
    outerRadius: number
}

export default function UranusRings({ innerRadius, outerRadius }: UranusRingsProps) {
    const ringsRef = useRef<THREE.Group>(null)

    // Anéis de Urano são muito diferentes - estreitos, escuros e bem definidos
    const ringData = useMemo(() => {
        const rings = [
            { name: 'Zeta', distance: 1.0, width: 0.025, opacity: 0.7, color: '#718096' },
            { name: 'Six', distance: 1.08, width: 0.015, opacity: 0.6, color: '#8A9BA8' },
            { name: 'Five', distance: 1.15, width: 0.020, opacity: 0.65, color: '#9FB3C8' },
            { name: 'Four', distance: 1.22, width: 0.012, opacity: 0.55, color: '#718096' },
            { name: 'Alpha', distance: 1.3, width: 0.035, opacity: 0.8, color: '#A0AEC0' },
            { name: 'Beta', distance: 1.38, width: 0.025, opacity: 0.75, color: '#8A9BA8' },
            { name: 'Eta', distance: 1.45, width: 0.015, opacity: 0.6, color: '#718096' },
            { name: 'Gamma', distance: 1.52, width: 0.030, opacity: 0.7, color: '#9FB3C8' },
            { name: 'Delta', distance: 1.6, width: 0.020, opacity: 0.65, color: '#A0AEC0' },
            { name: 'Lambda', distance: 1.68, width: 0.008, opacity: 0.5, color: '#8A9BA8' },
            { name: 'Epsilon', distance: 1.75, width: 0.040, opacity: 0.9, color: '#B2C5D7' }
        ]

        return rings.map(ring => {
            const canvas = document.createElement('canvas')
            canvas.width = 1024
            canvas.height = 16
            const ctx = canvas.getContext('2d')!

            // Fundo transparente
            ctx.fillStyle = 'rgba(0, 0, 0, 0)'
            ctx.fillRect(0, 0, 1024, 16)

            // Anel estreito mas mais visível
            const gradient = ctx.createLinearGradient(0, 0, 1024, 0)
            gradient.addColorStop(0, `rgba(0, 0, 0, 0)`)
            gradient.addColorStop(0.2, `${ring.color}AA`)
            gradient.addColorStop(0.5, `${ring.color}FF`)
            gradient.addColorStop(0.8, `${ring.color}AA`)
            gradient.addColorStop(1, `rgba(0, 0, 0, 0)`)

            ctx.fillStyle = gradient
            ctx.fillRect(0, 4, 1024, 8)

            // Adicionar brilho nas bordas para maior visibilidade
            const edgeGradient = ctx.createLinearGradient(0, 0, 1024, 0)
            edgeGradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
            edgeGradient.addColorStop(0.3, `rgba(255, 255, 255, 0.3)`)
            edgeGradient.addColorStop(0.7, `rgba(255, 255, 255, 0.3)`)
            edgeGradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

            ctx.fillStyle = edgeGradient
            ctx.fillRect(0, 4, 1024, 2)
            ctx.fillRect(0, 10, 1024, 2)

            // Adicionar irregularidades mais visíveis
            for (let x = 0; x < 1024; x += 3) {
                const irregularity = Math.random() * 0.6 + 0.4
                if (Math.random() > 0.6) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${irregularity * 0.9})`
                    ctx.fillRect(x, 3, 3, 10)
                }
            }

            const texture = new THREE.CanvasTexture(canvas)
            texture.needsUpdate = true

            return {
                ...ring,
                texture,
                actualDistance: innerRadius * ring.distance,
                actualWidth: innerRadius * ring.width
            }
        })
    }, [innerRadius])

    // Animação muito sutil (Urano tem rotação retrógrada)
    useFrame(() => {
        if (ringsRef.current) {
            ringsRef.current.rotation.z -= 0.0001 // Rotação retrógrada mais visível
        }
    })

    // Urano tem inclinação axial de ~98°, então os anéis ficam quase verticais
    return (
        <group ref={ringsRef} rotation={[Math.PI / 2 - 0.9, 0, 0]}>
            {ringData.map((ring, index) => (
                <mesh key={ring.name}>
                    <ringGeometry 
                        args={[
                            ring.actualDistance - ring.actualWidth / 2,
                            ring.actualDistance + ring.actualWidth / 2,
                            128,
                            1
                        ]} 
                    />
                    <meshBasicMaterial
                        map={ring.texture}
                        transparent
                        opacity={ring.opacity}
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    )
}