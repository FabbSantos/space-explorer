export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    {/* Animação de órbita */}
                    <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-pulse" />
                    <div className="absolute inset-2 border-2 border-blue-400/40 rounded-full animate-pulse animation-delay-200" />
                    <div className="absolute inset-4 border-2 border-blue-300/50 rounded-full animate-pulse animation-delay-400" />

                    {/* Planeta central */}
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

                    {/* Satélite orbitando */}
                    <div className="absolute inset-0 animate-spin">
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2" />
                    </div>
                </div>

                <h2 className="text-white text-xl font-semibold mb-2">Carregando o Universo...</h2>
                <p className="text-gray-400 text-sm">Preparando sua jornada espacial</p>
            </div>
        </div>
    )
}