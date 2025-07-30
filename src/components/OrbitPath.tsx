import { useMemo } from 'react'
import * as THREE from 'three'

interface OrbitPathProps {
    semiMajorAxis: number
    semiMinorAxis: number
    focalDistance: number
    color?: string
    opacity?: number
    hovered?: boolean
}

export default function OrbitPath({
    semiMajorAxis,
    semiMinorAxis,
    focalDistance,
    color = '#888888',
    opacity = 0.5,
    hovered = false
}: OrbitPathProps) {

    const curve = useMemo(() => {
        const points: THREE.Vector3[] = []
        const segments = 256

        for (let i = 0; i <= segments; i++) {
            const trueAnomaly = (i / segments) * Math.PI * 2
            
            // Usar exatamente a mesma fórmula do planeta para garantir alinhamento
            const x = (semiMajorAxis * Math.cos(trueAnomaly)) - focalDistance
            const y = 0 // Manter no plano horizontal
            const z = semiMinorAxis * Math.sin(trueAnomaly)
            
            points.push(new THREE.Vector3(x, y, z))
        }

        return new THREE.CatmullRomCurve3(points, true)
    }, [semiMajorAxis, semiMinorAxis, focalDistance])

    const geometry = useMemo(() => {
        return new THREE.TubeGeometry(curve, 256, 0.1, 8, true)
    }, [curve])

    return (
        <mesh geometry={geometry}>
            <meshBasicMaterial
                color={hovered ? '#CCCCCC' : color}
                transparent
                opacity={hovered ? opacity * 1.5 : opacity}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}