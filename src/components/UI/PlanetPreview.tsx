import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { createPlanetMaterial } from '@/utils/planetMaterials'
import SaturnRings from '../SaturnRings'
import UranusRings from '../UranusRings'

interface PlanetPreviewProps {
    planetId: string
    hasRings?: boolean
    radius?: number
}

export default function PlanetPreview({ planetId, hasRings, radius = 1.5 }: PlanetPreviewProps) {
    const meshRef = useRef<Mesh>(null)

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005
        }
    })

    return (
        <group>
            <mesh ref={meshRef}>
                <sphereGeometry args={[radius, 64, 64]} />
                <primitive object={createPlanetMaterial(planetId)} />
            </mesh>

            {hasRings && planetId === 'saturn' && (
                <SaturnRings innerRadius={radius * 1.4} outerRadius={radius * 2.3} />
            )}

            {hasRings && planetId === 'uranus' && (
                <UranusRings innerRadius={radius * 1.3} outerRadius={radius * 1.8} />
            )}
        </group>
    )
}