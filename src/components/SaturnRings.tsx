import { useMemo } from 'react'
import * as THREE from 'three'

interface SaturnRingsProps {
    innerRadius: number
    outerRadius: number
}

export default function SaturnRings({ innerRadius, outerRadius }: SaturnRingsProps) {
    const ringTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 2048
        canvas.height = 64
        const ctx = canvas.getContext('2d')!

        // Criar padrão de anéis com gaps
        const rings = [
            { start: 0, end: 0.15, opacity: 0.7, color: '#D4A76A' },
            { start: 0.15, end: 0.18, opacity: 0.1, color: '#000000' }, // Gap
            { start: 0.18, end: 0.35, opacity: 0.8, color: '#E5C995' },
            { start: 0.35, end: 0.37, opacity: 0.05, color: '#000000' }, // Gap menor
            { start: 0.37, end: 0.55, opacity: 0.9, color: '#F5E6D3' },
            { start: 0.55, end: 0.57, opacity: 0.1, color: '#000000' }, // Gap
            { start: 0.57, end: 0.75, opacity: 0.6, color: '#C8B88B' },
            { start: 0.75, end: 0.76, opacity: 0.05, color: '#000000' }, // Gap fino
            { start: 0.76, end: 0.90, opacity: 0.4, color: '#A0826D' },
            { start: 0.90, end: 1.0, opacity: 0.2, color: '#8B7355' }
        ]

        // Desenhar cada anel
        rings.forEach(ring => {
            const startX = ring.start * 2048
            const width = (ring.end - ring.start) * 2048

            // Gradiente radial para cada anel
            const gradient = ctx.createLinearGradient(startX, 0, startX + width, 0)

            if (ring.color !== '#000000') {
                gradient.addColorStop(0, `${ring.color}00`)
                gradient.addColorStop(0.1, `${ring.color}${Math.floor(ring.opacity * 255).toString(16)}`)
                gradient.addColorStop(0.5, `${ring.color}${Math.floor(ring.opacity * 255).toString(16)}`)
                gradient.addColorStop(0.9, `${ring.color}${Math.floor(ring.opacity * 255).toString(16)}`)
                gradient.addColorStop(1, `${ring.color}00`)
            } else {
                gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
            }

            ctx.fillStyle = gradient
            ctx.fillRect(startX, 0, width, 64)

            // Adicionar partículas/ruído aos anéis
            if (ring.color !== '#000000') {
                for (let i = 0; i < width; i += 2) {
                    for (let j = 0; j < 64; j += 2) {
                        if (Math.random() > 0.7) {
                            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`
                            ctx.fillRect(startX + i, j, 1, 1)
                        }
                    }
                }
            }
        })

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
    }, [])

    const ringMaterial = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            map: ringTexture,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })
    }, [ringTexture])

    return (
        <mesh rotation={[-Math.PI / 2 + 0.3, 0, 0]}>
            <ringGeometry args={[innerRadius, outerRadius, 128, 1]} />
            <primitive object={ringMaterial} />
        </mesh>
    )
}