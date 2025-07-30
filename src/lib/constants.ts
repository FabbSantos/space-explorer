export const PLANETS_DATA = [
    {
        id: 'mercury',
        name: 'Mercúrio',
        radius: 1.5,
        distance: 20,
        color: '#8C7853',
        rotationSpeed: 0.01,
        orbitSpeed: 0.47,
        eccentricity: 0.206, // Órbita mais elíptica
        info: 'O menor planeta do Sistema Solar e o mais próximo do Sol.',
        moons: 0,
        dayLength: '59 dias terrestres',
        yearLength: '88 dias terrestres',
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
        eccentricity: 0.007, // Órbita quase circular
        info: 'Conhecido como "Estrela da Manhã", tem uma atmosfera densa e tóxica.',
        moons: 0,
        dayLength: '243 dias terrestres',
        yearLength: '225 dias terrestres',
        temperature: '462°C (média)',
        atmosphere: '96% dióxido de carbono, nuvens de ácido sulfúrico',
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
        eccentricity: 0.017, // Órbita quase circular
        info: 'Nosso planeta natal, o único conhecido com vida.',
        moons: 1,
        dayLength: '24 horas',
        yearLength: '365.25 dias',
        temperature: '-88°C a 58°C',
        atmosphere: '78% nitrogênio, 21% oxigênio',
        texture: 'earth',
        hasMoon: true
    },
    {
        id: 'mars',
        name: 'Marte',
        radius: 2,
        distance: 50,
        color: '#CD5C5C',
        rotationSpeed: 0.009,
        orbitSpeed: 0.24,
        eccentricity: 0.093, // Órbita moderadamente elíptica
        info: 'O "Planeta Vermelho", possível candidato para colonização futura.',
        moons: 2,
        dayLength: '24h 37min',
        yearLength: '687 dias terrestres',
        temperature: '-143°C a 35°C',
        atmosphere: '95% dióxido de carbono, muito fina',
        texture: 'mars'
    },
    {
        id: 'jupiter',
        name: 'Júpiter',
        radius: 6,
        distance: 70,
        color: '#C88B3A',
        rotationSpeed: 0.02,
        orbitSpeed: 0.13,
        eccentricity: 0.049, // Órbita levemente elíptica
        info: 'O maior planeta do Sistema Solar, um gigante gasoso.',
        moons: 95,
        dayLength: '10 horas',
        yearLength: '12 anos terrestres',
        temperature: '-108°C (topo das nuvens)',
        atmosphere: '90% hidrogênio, 10% hélio',
        texture: 'jupiter',
        hasMoon: true
    },
    {
        id: 'saturn',
        name: 'Saturno',
        radius: 5,
        distance: 90,
        color: '#FAD5A5',
        rotationSpeed: 0.018,
        orbitSpeed: 0.09,
        eccentricity: 0.052, // Órbita levemente elíptica
        info: 'Famoso por seus impressionantes anéis de gelo e rocha.',
        moons: 146,
        dayLength: '10.7 horas',
        yearLength: '29 anos terrestres',
        temperature: '-139°C (média)',
        atmosphere: '96% hidrogênio, 3% hélio',
        texture: 'saturn',
        hasRings: true,
        hasMoon: true
    },
    {
        id: 'uranus',
        name: 'Urano',
        radius: 4,
        distance: 110,
        color: '#4FD0E7',
        rotationSpeed: 0.015,
        orbitSpeed: 0.06,
        eccentricity: 0.047, // Órbita levemente elíptica
        info: 'O planeta inclinado, gira de lado com um eixo quase horizontal.',
        moons: 27,
        dayLength: '17.2 horas',
        yearLength: '84 anos terrestres',
        temperature: '-195°C (média)',
        atmosphere: '82% hidrogênio, 15% hélio, 2% metano',
        texture: 'uranus',
        hasRings: true,
        hasMoon: true
    },
    {
        id: 'neptune',
        name: 'Netuno',
        radius: 3.9,
        distance: 130,
        color: '#4B70DD',
        rotationSpeed: 0.016,
        orbitSpeed: 0.05,
        eccentricity: 0.009, // Órbita quase circular
        info: 'O planeta mais distante, com os ventos mais rápidos do Sistema Solar.',
        moons: 16,
        dayLength: '16.1 horas',
        yearLength: '165 anos terrestres',
        temperature: '-200°C (média)',
        atmosphere: '80% hidrogênio, 19% hélio, traços de metano',
        texture: 'neptune',
        hasMoon: true
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