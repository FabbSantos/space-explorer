import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { createPlanetMaterial } from '@/utils/planetMaterials'
import Moon from './Moon'

interface PlanetProps {
    id: string
    name: string
    radius: number
    distance: number
    color: string
    rotationSpeed: number
    orbitSpeed: number
    info?: string
    moons?: number
    dayLength?: string
    yearLength?: string
    temperature?: string
    atmosphere?: string
    texture?: string
    hasRings?: boolean
    hasMoon?: boolean
    onSelect: (planet: any) => void
}

export default function Planet(props: PlanetProps) {
    const meshRef = useRef<Mesh>(null)
    const ringsRef = useRef<Mesh>(null)
    const [hovered, setHovered] = useState(false)

    // Material com textura procedural
    const materialProps = useMemo(() => createPlanetMaterial(props.id), [props.id])

    // Estado inicial da órbita
    const orbitAngle = useRef(Math.random() * Math.PI * 2)

    // Animação de órbita e rotação
    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotação do planeta
            meshRef.current.rotation.y += props.rotationSpeed

            // Órbita ao redor do sol
            orbitAngle.current += props.orbitSpeed * delta
            meshRef.current.position.x = Math.cos(orbitAngle.current) * props.distance
            meshRef.current.position.z = Math.sin(orbitAngle.current) * props.distance

            // Atualizar posição dos anéis
            if (ringsRef.current) {
                ringsRef.current.position.copy(meshRef.current.position)
            }
        }
    })

    return (
        <group>
            {/* Órbita visual */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[props.distance - 0.1, props.distance + 0.1, 64]} />
                <meshBasicMaterial color="#444444" opacity={0.3} transparent />
            </mesh>

            {/* Planeta */}
            <mesh
                ref={meshRef}
                position={[props.distance, 0, 0]}
                onPointerOver={(e) => {
                    e.stopPropagation()
                    setHovered(true)
                    document.body.style.cursor = 'pointer'
                }}
                onPointerOut={(e) => {
                    e.stopPropagation()
                    setHovered(false)
                    document.body.style.cursor = 'auto'
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    props.onSelect(props)
                }}
                scale={hovered ? 1.1 : 1}
            >
                <sphereGeometry args={[props.radius, 64, 64]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>

            {/* Anéis de Saturno */}
            {props.hasRings && (
                <mesh
                    ref={ringsRef}
                    rotation={[-0.3, 0, 0]}
                >
                    <ringGeometry args={[props.radius * 1.4, props.radius * 2.3, 64]} />
                    <meshBasicMaterial
                        color="#E5C995"
                        opacity={0.8}
                        transparent
                        side={2}
                    />
                </mesh>
            )}

            {/* Luas */}
            {props.hasMoon && props.id === 'earth' && (
                <Moon
                    planetRef={meshRef}
                    distance={props.radius * 2.5}
                    radius={props.radius * 0.27}
                    speed={1}
                    color="#DDDDDD"
                />
            )}

            {props.hasMoon && props.id === 'jupiter' && (
                <>
                    <Moon planetRef={meshRef} distance={props.radius * 1.8} radius={0.5} speed={2} />
                    <Moon planetRef={meshRef} distance={props.radius * 2.5} radius={0.4} speed={1.5} />
                    <Moon planetRef={meshRef} distance={props.radius * 3.2} radius={0.6} speed={1} />
                    <Moon planetRef={meshRef} distance={props.radius * 4} radius={0.45} speed={0.8} />
                </>
            )}

            {props.hasMoon && props.id === 'saturn' && (
                <>
                    <Moon planetRef={meshRef} distance={props.radius * 3} radius={0.4} speed={1.2} />
                    <Moon planetRef={meshRef} distance={props.radius * 4} radius={0.3} speed={0.9} />
                </>
            )}

            {/* Nome do planeta ao passar o mouse */}
            {hovered && (
                <sprite position={[0, props.radius + 2, 0]}>
                    <spriteMaterial color="white" />
                </sprite>
            )}
        </group>
    )
}