import { useEffect } from 'react'

interface PlanetPopupProps {
  planet: {
    id: string
    name: string
    radius: number
    distance: number
    color: string
    info?: string
    moons?: number
    dayLength?: string
    yearLength?: string
    temperature?: string
    atmosphere?: string
  } | null
  onClose: () => void
}

export default function PlanetPopup({ planet, onClose }: PlanetPopupProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!planet) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-gray-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-white">{planet.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Planet Preview */}
        <div className="w-32 h-32 mx-auto mb-4 relative">
          <div
            className="w-full h-full rounded-full shadow-lg"
            style={{ backgroundColor: planet.color }}
          />
        </div>

        {/* Info */}
        <div className="space-y-4">
          <p className="text-gray-300">{planet.info}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {planet.moons !== undefined && (
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-gray-400">Luas</div>
                <div className="text-white font-semibold">{planet.moons}</div>
              </div>
            )}
            {planet.dayLength && (
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-gray-400">Duração do dia</div>
                <div className="text-white font-semibold">{planet.dayLength}</div>
              </div>
            )}
            {planet.yearLength && (
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-gray-400">Duração do ano</div>
                <div className="text-white font-semibold">{planet.yearLength}</div>
              </div>
            )}
            {planet.temperature && (
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-gray-400">Temperatura</div>
                <div className="text-white font-semibold">{planet.temperature}</div>
              </div>
            )}
          </div>

          {planet.atmosphere && (
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-gray-400 text-sm mb-1">Atmosfera</div>
              <div className="text-white text-sm">{planet.atmosphere}</div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            Explorar
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}