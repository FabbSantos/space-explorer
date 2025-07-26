export const PLANETS_DATA = [
    {
        id: 'mercury',
        name: 'Mercúrio',
        radius: 1.5,
        distance: 20,
        color: '#8C7853',
        rotationSpeed: 0.01,
        orbitSpeed: 0.47,
        info: 'O menor planeta do Sistema Solar e o mais próximo do Sol.',
        moons: 0,
        dayLength: '58.6 dias',
        yearLength: '88 dias',
        temperature: '-173°C a 427°C',
        atmosphere: 'Quase inexistente',
        texture: 'mercury'
    },
    {
        id: 'venus',
        name: 'Vênus',
        radius: 2.5,
        distance: 30,
        color: '#FFC649',
        rotationSpeed: 0.008,
        orbitSpeed: 0.35,
        info: 'Conhecido como "Estrela da Manhã", tem uma atmosfera densa e tóxica.',
        moons: 0,
        dayLength: '243 dias',
        yearLength: '225 dias',
        temperature: '462°C',
        atmosphere: 'CO₂ (96%), N₂ (3%)',
        texture: 'venus'
    },
    {
        id: 'earth',
        name: 'Terra',
        radius: 2.6,
        distance: 40,
        color: '#4A90E2',
        rotationSpeed: 0.01,
        orbitSpeed: 0.29,
        info: 'Nosso planeta natal, o único conhecido com vida.',
        moons: 1,
        dayLength: '24 horas',
        yearLength: '365 dias',
        temperature: '-88°C a 58°C',
        atmosphere: 'N₂ (78%), O₂ (21%)',
        texture: 'earth',
        moonData: [
            { name: 'Lua', radius: 0.5, distance: 5, speed: 1 }
        ]
    },
    {
        id: 'mars',
        name: 'Marte',
        radius: 2,
        distance: 50,
        color: '#CD5C5C',
        rotationSpeed: 0.009,
        orbitSpeed: 0.24,
        info: 'O "Planeta Vermelho", possível candidato para colonização futura.',
        moons: 2,
        dayLength: '24.6 horas',
        yearLength: '687 dias',
        temperature: '-143°C a 35°C',
        atmosphere: 'CO₂ (95%), N₂ (3%)',
        texture: 'mars',
        moonData: [
            { name: 'Fobos', radius: 0.3, distance: 3, speed: 2 },
            { name: 'Deimos', radius: 0.2, distance: 4, speed: 1.5 }
        ]
    },
    {
        id: 'jupiter',
        name: 'Júpiter',
        radius: 6,
        distance: 70,
        color: '#C88B3A',
        rotationSpeed: 0.02,
        orbitSpeed: 0.13,
        info: 'O maior planeta do Sistema Solar, um gigante gasoso.',
        moons: 79,
        dayLength: '9.9 horas',
        yearLength: '12 anos',
        temperature: '-108°C',
        atmosphere: 'H₂ (90%), He (10%)',
        texture: 'jupiter',
        moonData: [
            { name: 'Io', radius: 0.6, distance: 8, speed: 1.8 },
            { name: 'Europa', radius: 0.5, distance: 10, speed: 1.4 },
            { name: 'Ganimedes', radius: 0.8, distance: 12, speed: 1 },
            { name: 'Calisto', radius: 0.7, distance: 14, speed: 0.8 }
        ]
    },
    {
        id: 'saturn',
        name: 'Saturno',
        radius: 5,
        distance: 90,
        color: '#FAD5A5',
        rotationSpeed: 0.018,
        orbitSpeed: 0.09,
        info: 'Famoso por seus impressionantes anéis de gelo e rocha.',
        moons: 82,
        dayLength: '10.7 horas',
        yearLength: '29 anos',
        temperature: '-139°C',
        atmosphere: 'H₂ (96%), He (3%)',
        texture: 'saturn',
        hasRings: true,
        moonData: [
            { name: 'Titã', radius: 0.8, distance: 10, speed: 0.9 },
            { name: 'Encélado', radius: 0.3, distance: 7, speed: 1.2 }
        ]
    }
]

export const GAME_STATES = {
    MENU: 'menu',
    EXPLORING: 'exploring',
    LANDING: 'landing',
    ON_PLANET: 'on_planet'
}

export const CAMERA_MODES = {
    FREE: 'free',
    FOLLOW: 'follow',
    CINEMATIC: 'cinematic'
}