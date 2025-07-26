import { create } from 'zustand'

interface GameState {
    selectedPlanet: any | null
    setSelectedPlanet: (planet: any | null) => void
    cameraTarget: 'free' | 'planet' | 'sun'
    setCameraTarget: (target: 'free' | 'planet' | 'sun') => void
}

export const useGameState = create<GameState>((set) => ({
    selectedPlanet: null,
    setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
    cameraTarget: 'free',
    setCameraTarget: (target) => set({ cameraTarget: target }),
}))