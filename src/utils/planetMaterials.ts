import * as THREE from 'three'

export function createPlanetMaterial(planetId: string): THREE.Material {
  switch (planetId) {
    case 'mercury':
      return new THREE.MeshPhongMaterial({
        color: new THREE.Color('#B8B8B8'),
        emissive: new THREE.Color('#4A4A4A'),
        emissiveIntensity: 0.1,
        bumpScale: 0.05,
        specular: new THREE.Color('#222222'),
        shininess: 10
      })

    case 'venus':
      return new THREE.MeshPhongMaterial({
        color: new THREE.Color('#FFE5B4'),
        emissive: new THREE.Color('#FFA500'),
        emissiveIntensity: 0.05,
        specular: new THREE.Color('#554422'),
        shininess: 15
      })

    case 'earth':
      return new THREE.MeshPhongMaterial({
        color: new THREE.Color('#4A90E2'),
        specular: new THREE.Color('#5555FF'),
        shininess: 25,
        map: createEarthTexture()
      })

    case 'mars':
      return new THREE.MeshPhongMaterial({
        color: new THREE.Color('#FF6B6B'),
        emissive: new THREE.Color('#8B0000'),
        emissiveIntensity: 0.03,
        bumpScale: 0.05,
        specular: new THREE.Color('#331111'),
        shininess: 10
      })

    case 'jupiter':
      return new THREE.MeshPhongMaterial({
        map: createJupiterTexture(),
        specular: new THREE.Color('#333333'),
        shininess: 5
      })

    case 'saturn':
      return new THREE.MeshPhongMaterial({
        map: createSaturnTexture(),
        specular: new THREE.Color('#444444'),
        shininess: 8
      })

    default:
      return new THREE.MeshPhongMaterial({
        color: new THREE.Color('#CCCCCC')
      })
  }
}

// Textura procedural da Terra melhorada
function createEarthTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Gradiente de oceano
  const oceanGradient = ctx.createRadialGradient(512, 256, 0, 512, 256, 512)
  oceanGradient.addColorStop(0, '#1E90FF')
  oceanGradient.addColorStop(1, '#000080')
  ctx.fillStyle = oceanGradient
  ctx.fillRect(0, 0, 1024, 512)

  // Continentes com gradiente
  const landGradient = ctx.createRadialGradient(512, 256, 0, 512, 256, 400)
  landGradient.addColorStop(0, '#228B22')
  landGradient.addColorStop(0.5, '#3CB371')
  landGradient.addColorStop(1, '#2E7D32')

  ctx.fillStyle = landGradient

  // América
  drawContinent(ctx, 200, 256, 60, 120)
  // África/Europa
  drawContinent(ctx, 512, 256, 80, 140)
  // Ásia
  drawContinent(ctx, 760, 200, 120, 80)
  // Austrália
  drawContinent(ctx, 800, 350, 40, 30)

  // Calotas polares
  ctx.fillStyle = '#F0F8FF'
  ctx.fillRect(0, 0, 1024, 30)
  ctx.fillRect(0, 482, 1024, 30)

  // Nuvens
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 1024
    const y = Math.random() * 512
    const size = Math.random() * 40 + 20

    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()

    // Adicionar brilho
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Função auxiliar para desenhar continentes
function drawContinent(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
  ctx.beginPath()
  ctx.ellipse(x, y, width / 2, height / 2, Math.random() * 0.5, 0, Math.PI * 2)
  ctx.fill()

  // Adicionar detalhes
  for (let i = 0; i < 3; i++) {
    const offsetX = (Math.random() - 0.5) * width * 0.5
    const offsetY = (Math.random() - 0.5) * height * 0.5
    ctx.beginPath()
    ctx.ellipse(x + offsetX, y + offsetY, width / 4, height / 4, Math.random() * Math.PI, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Textura procedural de Júpiter melhorada
function createJupiterTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Faixas de Júpiter
  const bands = [
    { color: '#D4A76A', width: 40 },
    { color: '#FFE5CC', width: 30 },
    { color: '#C8986B', width: 50 },
    { color: '#FFF8DC', width: 25 },
    { color: '#8B7355', width: 45 },
    { color: '#FAEBD7', width: 35 },
    { color: '#A0522D', width: 40 },
    { color: '#FFE4B5', width: 30 },
    { color: '#D2691E', width: 50 },
    { color: '#FFDEAD', width: 35 }
  ]

  let y = 0
  bands.forEach(band => {
    // Gradiente para cada faixa
    const gradient = ctx.createLinearGradient(0, y, 0, y + band.width)
    gradient.addColorStop(0, band.color)
    gradient.addColorStop(0.5, adjustBrightness(band.color, 20))
    gradient.addColorStop(1, band.color)

    ctx.fillStyle = gradient
    ctx.fillRect(0, y, 1024, band.width)

    // Adicionar turbulência
    for (let x = 0; x < 1024; x += 20) {
      const offset = Math.sin(x * 0.01) * 5
      ctx.fillStyle = adjustBrightness(band.color, Math.random() * 20 - 10)
      ctx.fillRect(x, y + offset, 20, band.width)
    }

    y += band.width
  })

  // Grande Mancha Vermelha
  const spotX = 700
  const spotY = 320
  const spotGradient = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 60)
  spotGradient.addColorStop(0, '#CD5C5C')
  spotGradient.addColorStop(0.5, '#B22222')
  spotGradient.addColorStop(1, '#8B0000')

  ctx.fillStyle = spotGradient
  ctx.beginPath()
  ctx.ellipse(spotX, spotY, 80, 50, 0.2, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura procedural de Saturno melhorada
function createSaturnTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Base dourada
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 512)
  baseGradient.addColorStop(0, '#FFE4B5')
  baseGradient.addColorStop(0.5, '#FFDEAD')
  baseGradient.addColorStop(1, '#F5DEB3')

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 1024, 512)

  // Faixas sutis
  const saturnBands = [
    '#FFF8DC', '#FAEBD7', '#FFE4C4', '#FFDAB9', '#FFE4B5'
  ]

  saturnBands.forEach((color, i) => {
    const y = (i / saturnBands.length) * 512
    const height = 512 / saturnBands.length

    const gradient = ctx.createLinearGradient(0, y, 0, y + height)
    gradient.addColorStop(0, color)
    gradient.addColorStop(0.5, adjustBrightness(color, 10))
    gradient.addColorStop(1, color)

    ctx.fillStyle = gradient
    ctx.fillRect(0, y, 1024, height)

    // Adicionar variações sutis
    ctx.fillStyle = `${color}33`
    for (let x = 0; x < 1024; x += 50) {
      const wave = Math.sin(x * 0.01) * 10
      ctx.fillRect(x, y + wave, 50, height)
    }
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Função auxiliar para ajustar brilho
function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt

  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1)
}