import { useState } from 'react'

export default function HUD() {
    const [showControls, setShowControls] = useState(true)

    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-auto">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <h1 className="text-white text-xl font-bold">Space Explorer</h1>
                    <p className="text-gray-300 text-sm">Sistema Solar</p>
                </div>

                <button
                    onClick={() => setShowControls(!showControls)}
                    className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-black/70 transition-colors"
                >
                    {showControls ? 'Ocultar' : 'Mostrar'} Controles
                </button>
            </div>

            {/* Controls Help */}
            {showControls && (
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 pointer-events-auto">
                    <h3 className="text-white font-bold mb-2">Controles</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                        <li>🖱️ Arrastar: Rotacionar câmera</li>
                        <li>🖱️ Scroll: Zoom in/out</li>
                        <li>🖱️ Botão direito: Mover câmera</li>
                        <li>🖱️ Clique: Selecionar planeta</li>
                    </ul>
                </div>
            )}

            {/* Mini Map / Radar */}
            <div className="absolute bottom-4 right-4 w-32 h-32 bg-black/50 backdrop-blur-sm rounded-lg p-2 pointer-events-auto">
                <div className="w-full h-full rounded border border-green-500/50 relative">
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                    {/* Aqui podemos adicionar a posição dos planetas no minimapa */}
                </div>
            </div>
        </div>
    )
}