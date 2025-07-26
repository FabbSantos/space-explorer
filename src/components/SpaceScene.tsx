import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import Planet from './Planet'
import CameraControls from './CameraControls'
import HUD from './UI/HUD'
import PlanetPopup from './UI/PlanetPopup'
import SpaceParticles from './SpaceParticles'
import { PLANETS_DATA } from '@/lib/constants'

export default function SpaceScene() {
    const [selectedPlanet, setSelectedPlanet] = useState<any>(null)

    return (
        <>
            <Canvas
                camera={{ position: [0, 50, 100], fov: 60 }}
                gl={{ antialias: true, alpha: false }}
            >
                <Suspense fallback={null}>
                    {/* Iluminação */}
                    <ambientLight intensity={0.15} />
                    <pointLight position={[0, 0, 0]} intensity={4} color="#FDB813" />
                    <pointLight position={[100, 0, 0]} intensity={0.5} color="#FFFFFF" />
                    <pointLight position={[-100, 0, 0]} intensity={0.5} color="#FFFFFF" />

                    {/* Estrelas de fundo */}
                    <Stars
                        radius={300}
                        depth={50}
                        count={5000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={1}
                    />

                    {/* Sol */}
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[10, 64, 64]} />
                        <meshBasicMaterial color="#FDB813" />
                    </mesh>

                    {/* Glow do sol - múltiplas camadas */}
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[12, 64, 64]} />
                        <meshBasicMaterial color="#FFA500" transparent opacity={0.4} />
                    </mesh>
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[14, 64, 64]} />
                        <meshBasicMaterial color="#FF8C00" transparent opacity={0.2} />
                    </mesh>
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[16, 64, 64]} />
                        <meshBasicMaterial color="#FF6347" transparent opacity={0.1} />
                    </mesh>

                    {/* Partículas espaciais */}
                    <SpaceParticles />

                    {/* Planetas */}
                    {PLANETS_DATA.map((planet) => (
                        <Planet
                            key={planet.id}
                            {...planet}
                            onSelect={setSelectedPlanet}
                        />
                    ))}

                    {/* Controles da câmera */}
                    <CameraControls />
                </Suspense>
            </Canvas>

            {/* Interface do usuário */}
            <HUD />

            {/* Popup de informações do planeta */}
            <PlanetPopup
                planet={selectedPlanet}
                onClose={() => setSelectedPlanet(null)}
            />
        </>
    )
}