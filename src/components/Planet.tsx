import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group, Vector3 } from 'three'
import * as THREE from 'three'
import { createPlanetMaterial } from '@/utils/planetMaterials'
import Moon from './Moon'
import SaturnRings from './SaturnRings'
import UranusRings from './UranusRings'
import OrbitPath from './OrbitPath'

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
    eccentricity?: number
    onSelect: (planet: any) => void
}

export default function Planet(props: PlanetProps) {
    const meshRef = useRef<Mesh>(null)
    const ringsRef = useRef<Group>(null)
    const [hovered, setHovered] = useState(false)

    // Material com textura procedural
    const material = useMemo(() => createPlanetMaterial(props.id), [props.id])

    // Parâmetros orbitais corrigidos
    const eccentricity = props.eccentricity || 0.01 // Reduzir excentricidade padrão
    const semiMajorAxis = props.distance
    const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity)
    const focalDistance = semiMajorAxis * eccentricity

    // Estado inicial da órbita
    const meanAnomaly = useRef(Math.random() * Math.PI * 2)

    // Função corrigida para calcular a posição na órbita elíptica
    const calculateOrbitalPosition = (M: number) => {
        // Resolver a equação de Kepler
        let E = M
        for (let i = 0; i < 10; i++) {
            E = E - (E - eccentricity * Math.sin(E) - M) / (1 - eccentricity * Math.cos(E))
        }

        // Calcular a anomalia verdadeira
        const trueAnomaly = 2 * Math.atan2(
            Math.sqrt(1 + eccentricity) * Math.sin(E / 2),
            Math.sqrt(1 - eccentricity) * Math.cos(E / 2)
        )

        // Calcular a distância do planeta ao Sol
        const r = semiMajorAxis * (1 - eccentricity * Math.cos(E))

        // Posição cartesiana no plano XZ (horizontal) - ajustada para alinhar com OrbitPath
        const x = (semiMajorAxis * Math.cos(trueAnomaly)) - focalDistance
        const y = 0 // Manter no plano horizontal
        const z = semiMinorAxis * Math.sin(trueAnomaly)

        return { x, y, z, r }
    }

    // Animação de órbita e rotação
    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotação do planeta
            meshRef.current.rotation.y += props.rotationSpeed

            // Movimento orbital seguindo as leis de Kepler
            const currentPos = calculateOrbitalPosition(meanAnomaly.current)

            // Velocidade angular baseada na distância atual
            const angularVelocity = props.orbitSpeed * Math.pow(semiMajorAxis / currentPos.r, 1.5)

            // Incrementar a anomalia média
            meanAnomaly.current += angularVelocity * delta
            if (meanAnomaly.current > Math.PI * 2) {
                meanAnomaly.current -= Math.PI * 2
            }

            // Calcular nova posição
            const newPos = calculateOrbitalPosition(meanAnomaly.current)
            meshRef.current.position.set(newPos.x, newPos.y, newPos.z)

            // Atualizar posição dos anéis para seguir o planeta
            if (ringsRef.current) {
                ringsRef.current.position.copy(meshRef.current.position)
            }
        }
    })

    return (
        <group>
            {/* Órbita visual elíptica */}
            <OrbitPath
                semiMajorAxis={semiMajorAxis}
                semiMinorAxis={semiMinorAxis}
                focalDistance={focalDistance}
                color="#555555"
                opacity={hovered ? 0.8 : 0.3}
                hovered={hovered}
            />

            {/* Planeta */}
            <mesh
                ref={meshRef}
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
                material={material}
            >
                <sphereGeometry args={[props.radius, 128, 128]} />
            </mesh>

            {/* Anéis de Saturno */}
            {props.hasRings && props.id === 'saturn' && (
                <group ref={ringsRef}>
                    <SaturnRings
                        innerRadius={props.radius * 1.4}
                        outerRadius={props.radius * 2.3}
                    />
                </group>
            )}

            {/* Anéis de Urano */}
            {props.hasRings && props.id === 'uranus' && (
                <group ref={ringsRef}>
                    <UranusRings
                        innerRadius={props.radius * 1.3}
                        outerRadius={props.radius * 1.8}
                    />
                </group>
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

            {props.hasMoon && props.id === 'uranus' && (
                <>
                    <Moon planetRef={meshRef} distance={props.radius * 2} radius={0.3} speed={1.5} color="#B0C4DE" />
                    <Moon planetRef={meshRef} distance={props.radius * 2.8} radius={0.25} speed={1.2} color="#ADD8E6" />
                    <Moon planetRef={meshRef} distance={props.radius * 3.5} radius={0.2} speed={0.9} color="#87CEEB" />
                </>
            )}

            {props.hasMoon && props.id === 'neptune' && (
                <>
                    <Moon planetRef={meshRef} distance={props.radius * 2.2} radius={0.35} speed={1.8} color="#E0E0E0" />
                    <Moon planetRef={meshRef} distance={props.radius * 3} radius={0.2} speed={1.3} color="#D3D3D3" />
                </>
            )}
        </group>
    )
}