import * as THREE from 'three'

export function createPlanetMaterial(planetId: string): THREE.Material {
  switch (planetId) {
    case 'mercury':
      return new THREE.MeshPhongMaterial({
        map: createMercuryTexture(),
        bumpMap: createMercuryTexture(),
        bumpScale: 0.005,
        specular: new THREE.Color('#111111'),
        shininess: 5
      })

    case 'venus':
      return new THREE.MeshPhongMaterial({
        map: createVenusTexture(),
        specular: new THREE.Color('#554422'),
        shininess: 15
      })

    case 'earth':
      return new THREE.MeshPhongMaterial({
        map: createEarthTexture(),
        bumpMap: createEarthBumpMap(),
        bumpScale: 0.005,
        specularMap: createEarthSpecularMap(),
        specular: new THREE.Color('#333366'),
        shininess: 30
      })

    case 'mars':
      return new THREE.MeshPhongMaterial({
        map: createMarsTexture(),
        bumpMap: createMarsTexture(),
        bumpScale: 0.01,
        specular: new THREE.Color('#111111'),
        shininess: 5
      })

    case 'jupiter':
      return new THREE.MeshPhongMaterial({
        map: createJupiterTexture(),
        specular: new THREE.Color('#111111'),
        shininess: 3
      })

    case 'saturn':
      return new THREE.MeshPhongMaterial({
        map: createSaturnTexture(),
        specular: new THREE.Color('#222211'),
        shininess: 8
      })

    case 'uranus':
      return new THREE.MeshPhongMaterial({
        map: createUranusTexture(),
        specular: new THREE.Color('#226677'),
        shininess: 15
      })

    case 'neptune':
      return new THREE.MeshPhongMaterial({
        map: createNeptuneTexture(),
        specular: new THREE.Color('#223366'),
        shininess: 20
      })

    default:
      return new THREE.MeshPhongMaterial({
        color: new THREE.Color('#CCCCCC')
      })
  }
}

// Textura de Mercúrio - crateras e superfície rochosa
function createMercuryTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Base cinza
  ctx.fillStyle = '#8B8B8B'
  ctx.fillRect(0, 0, 1024, 512)

  // Adicionar ruído
  const imageData = ctx.getImageData(0, 0, 1024, 512)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 50 - 25
    data[i] = Math.min(255, Math.max(0, data[i] + noise))
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise))
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise))
  }

  ctx.putImageData(imageData, 0, 0)

  // Crateras
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 1024
    const y = Math.random() * 512
    const radius = Math.random() * 30 + 5

    // Sombra da cratera
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, 'rgba(50, 50, 50, 0.8)')
    gradient.addColorStop(0.7, 'rgba(70, 70, 70, 0.5)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Urano - azul-esverdeado com atmosfera de metano
function createUranusTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Base azul-esverdeada característica
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGradient.addColorStop(0, '#5FE0E7')
  baseGradient.addColorStop(0.3, '#4FD0E7')
  baseGradient.addColorStop(0.7, '#3FC0D7')
  baseGradient.addColorStop(1, '#4FD0E7')

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 2048, 1024)

  // Faixas muito sutis (Urano tem poucas características visíveis)
  for (let y = 0; y < 1024; y += 80) {
    const alpha = 0.05 + Math.random() * 0.05
    ctx.fillStyle = `rgba(127, 255, 255, ${alpha})`
    ctx.fillRect(0, y, 2048, 40)
  }

  // Neblina de metano
  const methaneFog = ctx.createRadialGradient(1024, 512, 0, 1024, 512, 800)
  methaneFog.addColorStop(0, 'rgba(79, 208, 231, 0)')
  methaneFog.addColorStop(0.7, 'rgba(127, 255, 255, 0.1)')
  methaneFog.addColorStop(1, 'rgba(95, 224, 231, 0.2)')

  ctx.fillStyle = methaneFog
  ctx.fillRect(0, 0, 2048, 1024)

  // Pólos ligeiramente mais escuros
  const poleGradient = ctx.createLinearGradient(0, 0, 0, 200)
  poleGradient.addColorStop(0, 'rgba(0, 100, 150, 0.2)')
  poleGradient.addColorStop(1, 'rgba(0, 100, 150, 0)')

  ctx.fillStyle = poleGradient
  ctx.fillRect(0, 0, 2048, 200)

  // Pólo sul
  const southPoleGradient = ctx.createLinearGradient(0, 824, 0, 1024)
  southPoleGradient.addColorStop(0, 'rgba(0, 100, 150, 0)')
  southPoleGradient.addColorStop(1, 'rgba(0, 100, 150, 0.2)')

  ctx.fillStyle = southPoleGradient
  ctx.fillRect(0, 824, 2048, 200)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Netuno - azul profundo com tempestades
function createNeptuneTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Base azul profundo
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGradient.addColorStop(0, '#5B7CDD')
  baseGradient.addColorStop(0.5, '#4B70DD')
  baseGradient.addColorStop(1, '#3B64DD')

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 2048, 1024)

  // Faixas atmosféricas mais visíveis que Urano
  const bands = [
    { y: 100, height: 60, color: 'rgba(91, 124, 221, 0.3)' },
    { y: 200, height: 80, color: 'rgba(107, 140, 237, 0.2)' },
    { y: 350, height: 100, color: 'rgba(75, 112, 221, 0.3)' },
    { y: 500, height: 70, color: 'rgba(91, 124, 221, 0.25)' },
    { y: 650, height: 90, color: 'rgba(107, 140, 237, 0.2)' },
    { y: 800, height: 80, color: 'rgba(59, 100, 221, 0.3)' }
  ]

  bands.forEach(band => {
    const gradient = ctx.createLinearGradient(0, band.y, 0, band.y + band.height)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    gradient.addColorStop(0.5, band.color)
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, band.y, 2048, band.height)

    // Turbulência nas faixas
    for (let x = 0; x < 2048; x += 30) {
      const offset = Math.sin(x * 0.01) * 20
      ctx.fillStyle = band.color
      ctx.fillRect(x, band.y + offset, 30, band.height)
    }
  })

  // Grande Mancha Escura (similar à Grande Mancha Vermelha de Júpiter)
  const spotX = 800
  const spotY = 400

  for (let i = 0; i < 8; i++) {
    const scale = 1 - i * 0.1
    const spotGradient = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 70 * scale)
    spotGradient.addColorStop(0, `rgba(20, 50, 150, ${0.6 - i * 0.07})`)
    spotGradient.addColorStop(0.5, `rgba(30, 60, 180, ${0.4 - i * 0.05})`)
    spotGradient.addColorStop(1, `rgba(40, 70, 200, ${0.2 - i * 0.02})`)

    ctx.fillStyle = spotGradient
    ctx.save()
    ctx.translate(spotX, spotY)
    ctx.rotate(i * 0.15)
    ctx.beginPath()
    ctx.ellipse(0, 0, 100 * scale, 60 * scale, 0.2, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  // Nuvens de metano brancas (características de Netuno)
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const size = Math.random() * 30 + 20

    const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    cloudGradient.addColorStop(0, 'rgba(220, 230, 255, 0.4)')
    cloudGradient.addColorStop(0.5, 'rgba(200, 210, 255, 0.2)')
    cloudGradient.addColorStop(1, 'rgba(180, 190, 255, 0)')

    ctx.fillStyle = cloudGradient
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Vênus - atmosfera densa e nuvens
function createVenusTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Base amarelada
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 512)
  baseGradient.addColorStop(0, '#FFDAA0')
  baseGradient.addColorStop(0.5, '#FFD700')
  baseGradient.addColorStop(1, '#FFA500')

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 1024, 512)

  // Padrões de nuvens em espiral
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.lineWidth = 20

  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    const startX = Math.random() * 1024
    ctx.moveTo(startX, 0)

    for (let y = 0; y < 512; y += 10) {
      const x = startX + Math.sin(y * 0.02 + i) * 100
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  // Turbulência atmosférica
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 1024
    const y = Math.random() * 512
    const size = Math.random() * 100 + 50

    const swirl = ctx.createRadialGradient(x, y, 0, x, y, size)
    swirl.addColorStop(0, 'rgba(255, 248, 220, 0.2)')
    swirl.addColorStop(0.5, 'rgba(255, 228, 181, 0.1)')
    swirl.addColorStop(1, 'rgba(255, 218, 185, 0)')

    ctx.fillStyle = swirl
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura da Terra - continentes e oceanos detalhados
function createEarthTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Oceano com gradiente realista
  const oceanGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  oceanGradient.addColorStop(0, '#001A33')
  oceanGradient.addColorStop(0.3, '#003D7A')
  oceanGradient.addColorStop(0.7, '#0066CC')
  oceanGradient.addColorStop(1, '#004080')

  ctx.fillStyle = oceanGradient
  ctx.fillRect(0, 0, 2048, 1024)

  // Adicionar variação oceânica
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 50)
    gradient.addColorStop(0, 'rgba(0, 100, 200, 0.2)')
    gradient.addColorStop(1, 'rgba(0, 50, 150, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(x - 50, y - 50, 100, 100)
  }

  // Continentes detalhados
  // América do Norte
  drawDetailedContinent(ctx, 400, 300, 200, 150, '#228B22', '#3CB371')
  // América do Sul
  drawDetailedContinent(ctx, 450, 600, 100, 200, '#228B22', '#2E7D32')
  // África
  drawDetailedContinent(ctx, 1024, 512, 150, 250, '#8B7355', '#CD853F')
  // Europa
  drawDetailedContinent(ctx, 1024, 250, 100, 100, '#228B22', '#3CB371')
  // Ásia
  drawDetailedContinent(ctx, 1400, 300, 300, 200, '#228B22', '#2E7D32')
  // Austrália
  drawDetailedContinent(ctx, 1500, 700, 120, 80, '#CD853F', '#D2691E')

  // Calotas polares
  const polarGradient = ctx.createLinearGradient(0, 0, 0, 50)
  polarGradient.addColorStop(0, '#FFFFFF')
  polarGradient.addColorStop(1, '#E0FFFF')
  ctx.fillStyle = polarGradient
  ctx.fillRect(0, 0, 2048, 50)
  ctx.fillRect(0, 974, 2048, 50)

  // Nuvens realistas
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const size = Math.random() * 60 + 20

    const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)')
    cloudGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)')
    cloudGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = cloudGradient
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Mapa de relevo da Terra
function createEarthBumpMap(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Oceano (baixo)
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, 1024, 512)

  // Continentes (alto)
  ctx.fillStyle = '#808080'
  // Simplificado para o bump map
  ctx.fillRect(100, 200, 200, 150)
  ctx.fillRect(500, 200, 200, 200)
  ctx.fillRect(700, 150, 250, 250)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Mapa especular da Terra (oceanos refletem mais)
function createEarthSpecularMap(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Oceano (reflexivo)
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, 1024, 512)

  // Continentes (não reflexivos)
  ctx.fillStyle = '#000000'
  ctx.fillRect(100, 200, 200, 150)
  ctx.fillRect(500, 200, 200, 200)
  ctx.fillRect(700, 150, 250, 250)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Marte - superfície avermelhada e crateras
function createMarsTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Base vermelha marciana
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 512)
  baseGradient.addColorStop(0, '#CD5C5C')
  baseGradient.addColorStop(0.5, '#B22222')
  baseGradient.addColorStop(1, '#8B0000')

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 1024, 512)

  // Adicionar variação de terreno
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 1024
    const y = Math.random() * 512
    const size = Math.random() * 100 + 50

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    gradient.addColorStop(0, 'rgba(139, 69, 19, 0.3)')
    gradient.addColorStop(1, 'rgba(160, 82, 45, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(x - size, y - size, size * 2, size * 2)
  }

  // Calotas polares de CO2
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.fillRect(0, 0, 1024, 30)
  ctx.fillRect(0, 482, 1024, 30)

  // Crateras e características
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 1024
    const y = Math.random() * 512
    const radius = Math.random() * 20 + 10

    ctx.strokeStyle = 'rgba(100, 0, 0, 0.5)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Júpiter - faixas e grande mancha vermelha
function createJupiterTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Criar faixas turbulentas
  const bands = [
    { y: 0, height: 80, colors: ['#F5DEB3', '#FFE4B5', '#FAEBD7'] },
    { y: 80, height: 60, colors: ['#D2691E', '#CD853F', '#DEB887'] },
    { y: 140, height: 100, colors: ['#FFF8DC', '#FFFACD', '#FAFAD2'] },
    { y: 240, height: 70, colors: ['#8B4513', '#A0522D', '#BC8F8F'] },
    { y: 310, height: 90, colors: ['#FFE4C4', '#FFDEAD', '#F5DEB3'] },
    { y: 400, height: 80, colors: ['#D2691E', '#DEB887', '#F4A460'] },
    { y: 480, height: 100, colors: ['#FAEBD7', '#FFF8DC', '#FFFACD'] },
    { y: 580, height: 70, colors: ['#8B4513', '#A0522D', '#D2691E'] },
    { y: 650, height: 90, colors: ['#FFE4B5', '#FFDEAD', '#F5DEB3'] },
    { y: 740, height: 80, colors: ['#BC8F8F', '#CD853F', '#DEB887'] },
    { y: 820, height: 100, colors: ['#FFF8DC', '#FFFACD', '#FAFAD2'] },
    { y: 920, height: 104, colors: ['#D2691E', '#CD853F', '#F4A460'] }
  ]

  // Desenhar cada faixa com turbulência
  bands.forEach(band => {
    const gradient = ctx.createLinearGradient(0, band.y, 0, band.y + band.height)
    band.colors.forEach((color, i) => {
      gradient.addColorStop(i / (band.colors.length - 1), color)
    })

    ctx.fillStyle = gradient
    ctx.fillRect(0, band.y, 2048, band.height)

    // Adicionar turbulência
    for (let x = 0; x < 2048; x += 5) {
      const turbulence = Math.sin(x * 0.01) * 10 + Math.sin(x * 0.05) * 5
      const yOffset = band.y + turbulence

      ctx.fillStyle = band.colors[Math.floor(Math.random() * band.colors.length)]
      ctx.fillRect(x, yOffset, 5, band.height)
    }
  })

  // Grande Mancha Vermelha
  const spotX = 1400
  const spotY = 650

  // Vórtice principal
  for (let i = 0; i < 10; i++) {
    const scale = 1 - i * 0.1
    const gradient = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 120 * scale)
    gradient.addColorStop(0, `rgba(178, 34, 34, ${0.8 - i * 0.08})`)
    gradient.addColorStop(0.5, `rgba(205, 92, 92, ${0.6 - i * 0.06})`)
    gradient.addColorStop(1, `rgba(139, 0, 0, ${0.3 - i * 0.03})`)

    ctx.fillStyle = gradient
    ctx.save()
    ctx.translate(spotX, spotY)
    ctx.rotate(i * 0.2)
    ctx.beginPath()
    ctx.ellipse(0, 0, 150 * scale, 90 * scale, 0.3, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Saturno - faixas sutis
function createSaturnTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Base com gradiente suave
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGradient.addColorStop(0, '#FAEBD7')
  baseGradient.addColorStop(0.2, '#FFE4B5')
  baseGradient.addColorStop(0.4, '#FFDEAD')
  baseGradient.addColorStop(0.6, '#F5DEB3')
  baseGradient.addColorStop(0.8, '#FFE4C4')
  baseGradient.addColorStop(1, '#FAEBD7')

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 2048, 1024)

  // Faixas muito sutis
  for (let y = 0; y < 1024; y += 40) {
    const alpha = 0.1 + Math.random() * 0.1
    ctx.fillStyle = `rgba(255, 248, 220, ${alpha})`
    ctx.fillRect(0, y, 2048, 20)

    // Adicionar ondulação sutil
    for (let x = 0; x < 2048; x += 10) {
      const wave = Math.sin(x * 0.005) * 5
      ctx.fillStyle = `rgba(255, 235, 205, ${alpha * 0.5})`
      ctx.fillRect(x, y + wave, 10, 20)
    }
  }

  // Tempestades ocasionais (muito sutis)
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const size = Math.random() * 40 + 20

    const storm = ctx.createRadialGradient(x, y, 0, x, y, size)
    storm.addColorStop(0, 'rgba(255, 228, 181, 0.3)')
    storm.addColorStop(1, 'rgba(255, 218, 185, 0)')

    ctx.fillStyle = storm
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Função auxiliar para desenhar continentes detalhados
function drawDetailedContinent(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color1: string,
  color2: string
) {
  // Base do continente
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(width, height))
  gradient.addColorStop(0, color1)
  gradient.addColorStop(0.7, color2)
  gradient.addColorStop(1, color1)

  ctx.fillStyle = gradient
  ctx.beginPath()

  // Forma irregular mais realista
  const points = []
  const numPoints = 20
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2
    const radiusX = width / 2 + (Math.random() - 0.5) * width * 0.3
    const radiusY = height / 2 + (Math.random() - 0.5) * height * 0.3
    points.push({
      x: x + Math.cos(angle) * radiusX,
      y: y + Math.sin(angle) * radiusY
    })
  }

  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    const cp1x = (points[i - 1].x + points[i].x) / 2
    const cp1y = (points[i - 1].y + points[i].y) / 2
    ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cp1x, cp1y)
  }
  ctx.closePath()
  ctx.fill()

  // Adicionar textura de terreno
  for (let i = 0; i < 10; i++) {
    const tx = x + (Math.random() - 0.5) * width
    const ty = y + (Math.random() - 0.5) * height
    const tsize = Math.random() * 20 + 10

    ctx.fillStyle = `rgba(34, 139, 34, ${Math.random() * 0.3})`
    ctx.beginPath()
    ctx.arc(tx, ty, tsize, 0, Math.PI * 2)
    ctx.fill()
  }
}