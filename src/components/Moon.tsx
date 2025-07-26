import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface MoonProps {
    planetRef: React.RefObject<Mesh>
    distance: number
    radius: number
    speed: number
    color?: string
}

export default function Moon({ planetRef, distance, radius, speed, color = '#CCCCCC' }: MoonProps) {
    const moonRef = useRef<Mesh>(null)
    const angle = useRef(Math.random() * Math.PI * 2)

    useFrame((state, delta) => {
        if (moonRef.current && planetRef.current) {
            // Orbitar ao redor do planeta
            angle.current += speed * delta

            const planetPos = planetRef.current.position
            moonRef.current.position.x = planetPos.x + Math.cos(angle.current) * distance
            moonRef.current.position.y = planetPos.y + Math.sin(angle.current) * distance * 0.2
            moonRef.current.position.z = planetPos.z + Math.sin(angle.current) * distance

            // Rotação da lua
            moonRef.current.rotation.y += 0.01
        }
    })

    return (
        <mesh ref={moonRef}>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshPhongMaterial color={color} />
        </mesh>
    )
}