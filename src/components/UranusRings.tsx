import { useMemo } from 'react'
import * as THREE from 'three'

interface UranusRingsProps {
    innerRadius: number
    outerRadius: number
}

export default function UranosRings({ innerRadius, outerRadius }: UranusRingsProps) {
    const ringTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 1024
        canvas.height = 32
        const ctx = canvas.getContext('2d')!

        // Anéis de Urano são muito finos e escuros
        ctx.fillStyle = 'rgba(0, 0, 0, 0)'
        ctx.fillRect(0, 0, 1024, 32)

        // Anéis principais (muito estreitos)
        const rings = [
            { position: 0.2, width: 0.02, opacity: 0.6 },
            { position: 0.3, width: 0.01, opacity: 0.4 },
            { position: 0.4, width: 0.02, opacity: 0.5 },
            { position: 0.5, width: 0.01, opacity: 0.3 },
            { position: 0.6, width: 0.03, opacity: 0.7 },
            { position: 0.7, width: 0.01, opacity: 0.4 },
            { position: 0.8, width: 0.02, opacity: 0.5 },
            { position: 0.9, width: 0.01, opacity: 0.3 }
        ]

        rings.forEach(ring => {
            const x = ring.position * 1024
            const width = ring.width * 1024

            const gradient = ctx.createLinearGradient(x - width / 2, 0, x + width / 2, 0)
            gradient.addColorStop(0, `rgba(100, 120, 140, 0)`)
            gradient.addColorStop(0.5, `rgba(100, 120, 140, ${ring.opacity})`)
            gradient.addColorStop(1, `rgba(100, 120, 140, 0)`)

            ctx.fillStyle = gradient
            ctx.fillRect(x - width / 2, 0, width, 32)
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
            opacity: 0.6,
            depthWrite: false
        })
    }, [ringTexture])

    // Urano tem uma inclinação única - quase 90 graus!
    return (
        <mesh rotation={[0, 0, Math.PI / 2]}>
            <ringGeometry args={[innerRadius, outerRadius, 64, 1]} />
            <primitive object={ringMaterial} />
        </mesh>
    )
}