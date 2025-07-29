import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import Planet from './Planet'
import Sun from './Sun'
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
                    {/* Iluminação melhorada */}
                    <ambientLight intensity={0.2} />
                    <pointLight position={[0, 0, 0]} intensity={5} color="#FDB813" />
                    <pointLight position={[150, 50, 0]} intensity={1} color="#FFFFFF" />
                    <pointLight position={[-150, -50, 0]} intensity={1} color="#FFFFFF" />
                    <directionalLight position={[0, 0, 100]} intensity={0.3} color="#FFFFFF" />

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

                    {/* Sol com textura animada */}
                    <Sun />

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