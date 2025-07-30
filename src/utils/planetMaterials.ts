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

// Textura de Mercúrio melhorada - superfície realista
function createMercuryTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Base com gradiente de temperatura realista
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGradient.addColorStop(0, '#6B6B47') // Pólo norte mais frio
  baseGradient.addColorStop(0.5, '#8B7D6B') // Equador mais quente
  baseGradient.addColorStop(1, '#6B6B47') // Pólo sul

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 2048, 1024)

  // Adicionar textura de rocha detalhada
  const imageData = ctx.getImageData(0, 0, 2048, 1024)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % 2048
    const y = Math.floor((i / 4) / 2048)
    
    // Ruído multi-octave para textura realista
    const noise1 = Math.sin(x * 0.01) * Math.sin(y * 0.01) * 30
    const noise2 = Math.sin(x * 0.05) * Math.sin(y * 0.05) * 15
    const noise3 = Math.sin(x * 0.1) * Math.sin(y * 0.1) * 8
    const totalNoise = noise1 + noise2 + noise3

    data[i] = Math.min(255, Math.max(0, data[i] + totalNoise))
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + totalNoise * 0.8))
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + totalNoise * 0.6))
  }

  ctx.putImageData(imageData, 0, 0)

  // Crateras fotorealistas com sombras e highlights
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const radius = Math.random() * 60 + 10

    // Rim da cratera (elevação)
    const rimGradient = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius * 1.2)
    rimGradient.addColorStop(0, 'rgba(150, 140, 120, 0)')
    rimGradient.addColorStop(0.5, 'rgba(180, 170, 150, 0.4)')
    rimGradient.addColorStop(1, 'rgba(120, 110, 90, 0.2)')

    ctx.fillStyle = rimGradient
    ctx.beginPath()
    ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2)
    ctx.fill()

    // Interior da cratera (sombra)
    const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.8)
    craterGradient.addColorStop(0, 'rgba(40, 35, 30, 0.8)')
    craterGradient.addColorStop(0.7, 'rgba(60, 55, 45, 0.4)')
    craterGradient.addColorStop(1, 'rgba(80, 75, 65, 0)')

    ctx.fillStyle = craterGradient
    ctx.beginPath()
    ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Vênus ultra-realista - atmosfera densa com ácido sulfúrico
function createVenusTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Base atmosférica com gradiente de pressão realista
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGradient.addColorStop(0, '#FFE4B5') // Pólo norte - menos denso
  baseGradient.addColorStop(0.2, '#FFF8DC') // Alta atmosfera
  baseGradient.addColorStop(0.4, '#FFFACD') // Média atmosfera
  baseGradient.addColorStop(0.6, '#FFEFD5') // Baixa atmosfera
  baseGradient.addColorStop(0.8, '#FFE4B5') // Equador - mais denso
  baseGradient.addColorStop(1, '#FFF0E6') // Pólo sul

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 2048, 1024)

  // Padrões de nuvens de ácido sulfúrico em camadas
  for (let layer = 0; layer < 4; layer++) {
    const altitude = layer * 0.2
    const alpha = 0.6 - layer * 0.1
    
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 2048
      const y = Math.random() * 1024
      const size = Math.random() * 150 + 80
      
      // Nuvens espirais características de Vênus
      const spiralGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      spiralGradient.addColorStop(0, `rgba(255, 248, 220, ${alpha})`)
      spiralGradient.addColorStop(0.5, `rgba(255, 235, 205, ${alpha * 0.7})`)
      spiralGradient.addColorStop(1, `rgba(255, 222, 173, 0)`)

      ctx.fillStyle = spiralGradient
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(Math.sin(x * 0.01 + layer) * 0.5)
      ctx.scale(1, 0.6)
      ctx.beginPath()
      ctx.arc(0, 0, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // Super-rotação atmosférica (ventos de 300+ km/h)
  for (let y = 0; y < 1024; y += 50) {
    const windIntensity = 0.3 + Math.sin(y * 0.01) * 0.2
    ctx.strokeStyle = `rgba(255, 240, 200, ${windIntensity})`
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(0, y)
    
    for (let x = 0; x < 2048; x += 20) {
      const wave = Math.sin(x * 0.01 + y * 0.005) * 15
      ctx.lineTo(x, y + wave)
    }
    ctx.stroke()
  }

  // Hotspots vulcânicos (raramente visíveis através da atmosfera)
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const size = Math.random() * 30 + 15

    const hotspotGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    hotspotGradient.addColorStop(0, 'rgba(255, 200, 150, 0.4)')
    hotspotGradient.addColorStop(0.7, 'rgba(255, 220, 180, 0.2)')
    hotspotGradient.addColorStop(1, 'rgba(255, 235, 205, 0)')

    ctx.fillStyle = hotspotGradient
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Júpiter hiper-realista com detalhes atmosféricos
function createJupiterTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 4096
  canvas.height = 2048
  const ctx = canvas.getContext('2d')!

  // Faixas atmosféricas com composição química realista
  const bands = [
    { y: 0, height: 120, colors: ['#F5DEB3', '#FFE4B5', '#FAEBD7'], composition: 'ammonia' },
    { y: 120, height: 100, colors: ['#D2691E', '#CD853F', '#DEB887'], composition: 'sulfur' },
    { y: 220, height: 140, colors: ['#FFF8DC', '#FFFACD', '#FAFAD2'], composition: 'hydrogen' },
    { y: 360, height: 110, colors: ['#8B4513', '#A0522D', '#BC8F8F'], composition: 'phosphorus' },
    { y: 470, height: 130, colors: ['#FFE4C4', '#FFDEAD', '#F5DEB3'], composition: 'methane' },
    { y: 600, height: 120, colors: ['#D2691E', '#DEB887', '#F4A460'], composition: 'sulfur' },
    { y: 720, height: 140, colors: ['#FAEBD7', '#FFF8DC', '#FFFACD'], composition: 'hydrogen' },
    { y: 860, height: 110, colors: ['#8B4513', '#A0522D', '#D2691E'], composition: 'phosphorus' },
    { y: 970, height: 130, colors: ['#FFE4B5', '#FFDEAD', '#F5DEB3'], composition: 'ammonia' },
    { y: 1100, height: 120, colors: ['#BC8F8F', '#CD853F', '#DEB887'], composition: 'sulfur' },
    { y: 1220, height: 140, colors: ['#FFF8DC', '#FFFACD', '#FAFAD2'], composition: 'hydrogen' },
    { y: 1360, height: 110, colors: ['#D2691E', '#CD853F', '#F4A460'], composition: 'methane' },
    { y: 1470, height: 130, colors: ['#FFE4B5', '#FFDEAD', '#F5DEB3'], composition: 'ammonia' },
    { y: 1600, height: 120, colors: ['#8B4513', '#A0522D', '#BC8F8F'], composition: 'phosphorus' },
    { y: 1720, height: 140, colors: ['#FAEBD7', '#FFF8DC', '#FFFACD'], composition: 'hydrogen' },
    { y: 1860, height: 188, colors: ['#D2691E', '#CD853F', '#F4A460'], composition: 'sulfur' }
  ]

  // Desenhar cada faixa com turbulência avançada
  bands.forEach((band, bandIndex) => {
    const gradient = ctx.createLinearGradient(0, band.y, 0, band.y + band.height)
    band.colors.forEach((color, i) => {
      gradient.addColorStop(i / (band.colors.length - 1), color)
    })

    ctx.fillStyle = gradient
    ctx.fillRect(0, band.y, 4096, band.height)

    // Turbulência baseada na composição química
    const turbulenceIntensity = band.composition === 'hydrogen' ? 15 : 
                               band.composition === 'sulfur' ? 25 : 
                               band.composition === 'ammonia' ? 12 : 20

    for (let x = 0; x < 4096; x += 3) {
      const turbulence1 = Math.sin(x * 0.008 + bandIndex) * turbulenceIntensity
      const turbulence2 = Math.sin(x * 0.02 + bandIndex * 2) * (turbulenceIntensity * 0.5)
      const turbulence3 = Math.sin(x * 0.05 + bandIndex * 3) * (turbulenceIntensity * 0.3)
      const totalTurbulence = turbulence1 + turbulence2 + turbulence3

      const yOffset = band.y + totalTurbulence
      const colorIndex = Math.floor(Math.random() * band.colors.length)
      ctx.fillStyle = band.colors[colorIndex]
      ctx.fillRect(x, yOffset, 3, band.height)
    }

    // Vórtices menores em cada faixa
    for (let i = 0; i < 8; i++) {
      const vortexX = Math.random() * 4096
      const vortexY = band.y + Math.random() * band.height
      const vortexSize = Math.random() * 40 + 20

      for (let j = 0; j < 6; j++) {
        const scale = 1 - j * 0.15
        const vortexGradient = ctx.createRadialGradient(vortexX, vortexY, 0, vortexX, vortexY, vortexSize * scale)
        const alpha = 0.4 - j * 0.06
        vortexGradient.addColorStop(0, `${band.colors[0]}${Math.floor(alpha * 255).toString(16)}`)
        vortexGradient.addColorStop(0.5, `${band.colors[1]}${Math.floor(alpha * 0.7 * 255).toString(16)}`)
        vortexGradient.addColorStop(1, `${band.colors[2]}00`)

        ctx.fillStyle = vortexGradient
        ctx.save()
        ctx.translate(vortexX, vortexY)
        ctx.rotate(j * 0.3)
        ctx.beginPath()
        ctx.ellipse(0, 0, vortexSize * scale, vortexSize * scale * 0.7, 0.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }
  })

  // Grande Mancha Vermelha com estrutura de furacão realista
  const spotX = 2800
  const spotY = 1300

  // Estrutura do furacão em camadas
  for (let i = 0; i < 15; i++) {
    const scale = 1 - i * 0.06
    const rotation = i * 0.15
    const alpha = 0.9 - i * 0.055

    const gradient = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 200 * scale)
    gradient.addColorStop(0, `rgba(220, 50, 50, ${alpha})`)
    gradient.addColorStop(0.3, `rgba(180, 40, 40, ${alpha * 0.8})`)
    gradient.addColorStop(0.6, `rgba(150, 30, 30, ${alpha * 0.6})`)
    gradient.addColorStop(1, `rgba(120, 20, 20, 0)`)

    ctx.fillStyle = gradient
    ctx.save()
    ctx.translate(spotX, spotY)
    ctx.rotate(rotation)
    ctx.beginPath()
    ctx.ellipse(0, 0, 250 * scale, 150 * scale, 0.3 + i * 0.02, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  // Olho da tempestade
  const eyeGradient = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 30)
  eyeGradient.addColorStop(0, 'rgba(100, 20, 20, 0.8)')
  eyeGradient.addColorStop(0.7, 'rgba(80, 15, 15, 0.5)')
  eyeGradient.addColorStop(1, 'rgba(60, 10, 10, 0)')

  ctx.fillStyle = eyeGradient
  ctx.beginPath()
  ctx.arc(spotX, spotY, 30, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Saturno hiper-detalhada
function createSaturnTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 3072
  canvas.height = 1536
  const ctx = canvas.getContext('2d')!

  // Base atmosférica com gradiente de hidrogênio/hélio
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1536)
  baseGradient.addColorStop(0, '#FAF0E6')   // Pólo norte
  baseGradient.addColorStop(0.15, '#FFF8DC') // Norte temperado
  baseGradient.addColorStop(0.3, '#FFFACD')  // Norte tropical
  baseGradient.addColorStop(0.5, '#F5DEB3')  // Equador
  baseGradient.addColorStop(0.7, '#FFEFD5')  // Sul tropical
  baseGradient.addColorStop(0.85, '#FFE4B5') // Sul temperado
  baseGradient.addColorStop(1, '#FAEBD7')    // Pólo sul

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 3072, 1536)

  // Hexágono polar norte (fenômeno real de Saturno)
  const hexagonCenter = { x: 1536, y: 200 }
  const hexagonRadius = 180
  ctx.strokeStyle = 'rgba(200, 180, 150, 0.6)'
  ctx.lineWidth = 12
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const x = hexagonCenter.x + Math.cos(angle) * hexagonRadius
    const y = hexagonCenter.y + Math.sin(angle) * hexagonRadius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.stroke()

  // Preenchimento do hexágono
  const hexagonGradient = ctx.createRadialGradient(hexagonCenter.x, hexagonCenter.y, 0, hexagonCenter.x, hexagonCenter.y, hexagonRadius)
  hexagonGradient.addColorStop(0, 'rgba(180, 160, 130, 0.4)')
  hexagonGradient.addColorStop(0.7, 'rgba(200, 180, 150, 0.2)')
  hexagonGradient.addColorStop(1, 'rgba(220, 200, 170, 0)')

  ctx.fillStyle = hexagonGradient
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const x = hexagonCenter.x + Math.cos(angle) * hexagonRadius
    const y = hexagonCenter.y + Math.sin(angle) * hexagonRadius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()

  // Faixas atmosféricas muito sutis
  for (let y = 0; y < 1536; y += 60) {
    const alpha = 0.08 + Math.sin(y * 0.01) * 0.05
    const waveIntensity = Math.sin(y * 0.008) * 8
    
    ctx.fillStyle = `rgba(255, 245, 220, ${alpha})`
    ctx.beginPath()
    ctx.moveTo(0, y)
    
    for (let x = 0; x < 3072; x += 15) {
      const wave = Math.sin(x * 0.003 + y * 0.002) * waveIntensity
      ctx.lineTo(x, y + wave)
    }
    ctx.lineTo(3072, y + 30)
    ctx.lineTo(0, y + 30)
    ctx.closePath()
    ctx.fill()
  }

  // Tempestades ocasionais (dragões brancos)
  for (let i = 0; i < 3; i++) {
    const stormX = Math.random() * 3072
    const stormY = 400 + Math.random() * 700 // Zona temperada
    const stormSize = Math.random() * 100 + 60

    for (let j = 0; j < 8; j++) {
      const scale = 1 - j * 0.12
      const stormGradient = ctx.createRadialGradient(stormX, stormY, 0, stormX, stormY, stormSize * scale)
      const alpha = 0.5 - j * 0.06
      stormGradient.addColorStop(0, `rgba(255, 248, 240, ${alpha})`)
      stormGradient.addColorStop(0.5, `rgba(248, 240, 220, ${alpha * 0.7})`)
      stormGradient.addColorStop(1, `rgba(240, 230, 200, 0)`)

      ctx.fillStyle = stormGradient
      ctx.save()
      ctx.translate(stormX, stormY)
      ctx.rotate(j * 0.2)
      ctx.beginPath()
      ctx.ellipse(0, 0, stormSize * scale, stormSize * scale * 0.6, 0.1, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // Ondulações de densidade (spokes fantasma)
  for (let i = 0; i < 20; i++) {
    const spokeAlpha = 0.05 + Math.random() * 0.08
    ctx.strokeStyle = `rgba(220, 210, 190, ${spokeAlpha})`
    ctx.lineWidth = 2
    ctx.beginPath()
    
    const startY = Math.random() * 1536
    const endY = startY + (Math.random() - 0.5) * 200
    ctx.moveTo(0, startY)
    
    for (let x = 0; x < 3072; x += 50) {
      const curve = Math.sin(x * 0.002 + i) * 30
      const y = startY + (endY - startY) * (x / 3072) + curve
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura da Terra ultra-realista
function createEarthTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 4096
  canvas.height = 2048
  const ctx = canvas.getContext('2d')!

  // Oceano com profundidade realista
  const oceanGradient = ctx.createLinearGradient(0, 0, 0, 2048)
  oceanGradient.addColorStop(0, '#1a237e') // Ártico profundo
  oceanGradient.addColorStop(0.15, '#0d47a1') // Norte
  oceanGradient.addColorStop(0.4, '#1976d2') // Temperado
  oceanGradient.addColorStop(0.6, '#2196f3') // Tropical
  oceanGradient.addColorStop(0.85, '#1976d2') // Temperado sul
  oceanGradient.addColorStop(1, '#0d47a1') // Antártica

  ctx.fillStyle = oceanGradient
  ctx.fillRect(0, 0, 4096, 2048)

  // Continentes com elevação realista
  const continents = [
    // América do Norte
    { x: 800, y: 600, width: 600, height: 400, elevation: [0.2, 0.7, 0.9] },
    // América do Sul  
    { x: 1000, y: 1200, width: 400, height: 600, elevation: [0.3, 0.8, 0.6] },
    // África
    { x: 2200, y: 800, width: 500, height: 800, elevation: [0.4, 0.6, 0.8] },
    // Europa
    { x: 2100, y: 500, width: 400, height: 300, elevation: [0.3, 0.5, 0.7] },
    // Ásia
    { x: 2800, y: 400, width: 800, height: 600, elevation: [0.2, 0.9, 0.8] },
    // Austrália
    { x: 3400, y: 1400, width: 400, height: 300, elevation: [0.5, 0.3, 0.4] }
  ]

  continents.forEach(continent => {
    // Base do continente com gradiente de elevação
    const elevationGradient = ctx.createRadialGradient(
      continent.x, continent.y, 0,
      continent.x, continent.y, Math.max(continent.width, continent.height)
    )
    
    elevationGradient.addColorStop(0, `rgb(${Math.floor(60 + continent.elevation[0] * 100)}, ${Math.floor(80 + continent.elevation[1] * 80)}, ${Math.floor(40 + continent.elevation[2] * 60)})`)
    elevationGradient.addColorStop(0.5, `rgb(${Math.floor(40 + continent.elevation[0] * 80)}, ${Math.floor(60 + continent.elevation[1] * 60)}, ${Math.floor(20 + continent.elevation[2] * 40)})`)
    elevationGradient.addColorStop(1, `rgb(${Math.floor(80 + continent.elevation[0] * 60)}, ${Math.floor(100 + continent.elevation[1] * 40)}, ${Math.floor(60 + continent.elevation[2] * 20)})`)

    // Desenhar continente com forma mais orgânica
    ctx.fillStyle = elevationGradient
    ctx.beginPath()
    
    const points = []
    const numPoints = 20
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const radiusX = continent.width / 2 + (Math.random() - 0.5) * continent.width * 0.4
      const radiusY = continent.height / 2 + (Math.random() - 0.5) * continent.height * 0.4
      points.push({
        x: continent.x + Math.cos(angle) * radiusX,
        y: continent.y + Math.sin(angle) * radiusY
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

    // Adicionar montanhas e desertos
    for (let i = 0; i < 30; i++) {
      const mx = continent.x + (Math.random() - 0.5) * continent.width
      const my = continent.y + (Math.random() - 0.5) * continent.height
      const msize = Math.random() * 40 + 10

      // Montanhas (marrom/cinza)
      if (Math.random() > 0.6) {
        ctx.fillStyle = `rgba(${139 + Math.random() * 50}, ${69 + Math.random() * 50}, ${19 + Math.random() * 30}, 0.8)`
        ctx.beginPath()
        ctx.arc(mx, my, msize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Desertos (amarelo/laranja)
      if (Math.random() > 0.8) {
        ctx.fillStyle = `rgba(${238 + Math.random() * 17}, ${203 + Math.random() * 30}, ${173 + Math.random() * 20}, 0.6)`
        ctx.beginPath()
        ctx.arc(mx, my, msize * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  })

  // Calotas polares realistas
  const arcticGradient = ctx.createLinearGradient(0, 0, 0, 200)
  arcticGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
  arcticGradient.addColorStop(0.5, 'rgba(240, 248, 255, 0.7)')
  arcticGradient.addColorStop(1, 'rgba(220, 240, 255, 0.3)')
  
  ctx.fillStyle = arcticGradient
  ctx.fillRect(0, 0, 4096, 200)

  const antarcticGradient = ctx.createLinearGradient(0, 1848, 0, 2048)
  antarcticGradient.addColorStop(0, 'rgba(230, 245, 255, 0.3)')
  antarcticGradient.addColorStop(0.5, 'rgba(245, 250, 255, 0.7)')
  antarcticGradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)')
  
  ctx.fillStyle = antarcticGradient
  ctx.fillRect(0, 1848, 4096, 200)

  // Nuvens dinâmicas em camadas
  for (let layer = 0; layer < 3; layer++) {
    const alpha = 0.3 - layer * 0.1
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * 4096
      const y = Math.random() * 2048
      const size = Math.random() * 120 + 40

      const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      cloudGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
      cloudGradient.addColorStop(0.6, `rgba(250, 250, 250, ${alpha * 0.6})`)
      cloudGradient.addColorStop(1, `rgba(245, 245, 245, 0)`)

      ctx.fillStyle = cloudGradient
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Marte super-realista
function createMarsTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Base marciana com variação de ferro oxidado
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGradient.addColorStop(0, '#8B4513') // Pólo norte
  baseGradient.addColorStop(0.3, '#CD853F') // Norte temperado
  baseGradient.addColorStop(0.5, '#D2691E') // Equador
  baseGradient.addColorStop(0.7, '#A0522D') // Sul temperado
  baseGradient.addColorStop(1, '#654321') // Pólo sul

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 2048, 1024)

  // Terreno marciano com variação geológica detalhada
  const imageData = ctx.getImageData(0, 0, 2048, 1024)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % 2048
    const y = Math.floor((i / 4) / 2048)
    
    // Múltiplas camadas de ruído para terreno realista
    const noise1 = Math.sin(x * 0.008) * Math.sin(y * 0.008) * 25
    const noise2 = Math.sin(x * 0.02) * Math.sin(y * 0.02) * 15
    const noise3 = Math.sin(x * 0.05) * Math.sin(y * 0.05) * 8
    const noise4 = Math.sin(x * 0.1) * Math.sin(y * 0.1) * 4
    
    const totalNoise = noise1 + noise2 + noise3 + noise4

    // Variação de cor baseada na posição (simulando minerais diferentes)
    const latitudeEffect = Math.abs(y - 512) / 512
    const ironVariation = 1 + latitudeEffect * 0.3

    data[i] = Math.min(255, Math.max(0, data[i] * ironVariation + totalNoise))
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * 0.9 + totalNoise * 0.7))
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * 0.7 + totalNoise * 0.4))
  }

  ctx.putImageData(imageData, 0, 0)

  // Características geológicas marcianas
  // Valles Marineris (grande canyon)
  ctx.fillStyle = 'rgba(80, 40, 20, 0.8)'
  ctx.fillRect(800, 400, 600, 80)
  ctx.fillStyle = 'rgba(60, 30, 15, 0.6)'
  ctx.fillRect(820, 420, 560, 40)

  // Monte Olimpo e outras formações vulcânicas
  const volcanoes = [
    { x: 400, y: 300, size: 60 },
    { x: 1600, y: 400, size: 40 },
    { x: 1200, y: 600, size: 35 }
  ]

  volcanoes.forEach(volcano => {
    const volcanoGradient = ctx.createRadialGradient(volcano.x, volcano.y, 0, volcano.x, volcano.y, volcano.size)
    volcanoGradient.addColorStop(0, 'rgba(100, 50, 25, 0.8)')
    volcanoGradient.addColorStop(0.5, 'rgba(139, 69, 19, 0.6)')
    volcanoGradient.addColorStop(1, 'rgba(160, 82, 45, 0.2)')
    
    ctx.fillStyle = volcanoGradient
    ctx.beginPath()
    ctx.arc(volcano.x, volcano.y, volcano.size, 0, Math.PI * 2)
    ctx.fill()
  })

  // Crateras de impacto com detalhes realistas
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const radius = Math.random() * 40 + 5

    // Anel de ejeção
    const ejectionGradient = ctx.createRadialGradient(x, y, radius, x, y, radius * 2)
    ejectionGradient.addColorStop(0, 'rgba(180, 120, 80, 0.3)')
    ejectionGradient.addColorStop(0.5, 'rgba(160, 100, 60, 0.2)')
    ejectionGradient.addColorStop(1, 'rgba(140, 80, 40, 0)')

    ctx.fillStyle = ejectionGradient
    ctx.beginPath()
    ctx.arc(x, y, radius * 2, 0, Math.PI * 2)
    ctx.fill()

    // Cratera
    const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    craterGradient.addColorStop(0, 'rgba(60, 30, 15, 0.9)')
    craterGradient.addColorStop(0.7, 'rgba(100, 50, 25, 0.5)')
    craterGradient.addColorStop(1, 'rgba(139, 69, 19, 0.2)')

    ctx.fillStyle = craterGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Calotas polares de CO2 e água
  const northCapGradient = ctx.createLinearGradient(0, 0, 0, 100)
  northCapGradient.addColorStop(0, 'rgba(255, 240, 230, 0.9)')
  northCapGradient.addColorStop(1, 'rgba(255, 220, 200, 0.3)')
  
  ctx.fillStyle = northCapGradient
  ctx.fillRect(0, 0, 2048, 100)

  const southCapGradient = ctx.createLinearGradient(0, 924, 0, 1024)
  southCapGradient.addColorStop(0, 'rgba(255, 230, 210, 0.3)')
  southCapGradient.addColorStop(1, 'rgba(255, 250, 240, 0.9)')
  
  ctx.fillStyle = southCapGradient
  ctx.fillRect(0, 924, 2048, 100)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Mapa de relevo da Terra
function createEarthBumpMap(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Base oceânica (baixa elevação)
  ctx.fillStyle = '#303030'
  ctx.fillRect(0, 0, 2048, 1024)

  // Continentes com elevação realista
  const continents = [
    // América do Norte - com Montanhas Rochosas e Apalaches
    { x: 400, y: 300, width: 300, height: 200, elevation: 0.7 },
    // América do Sul - com Andes
    { x: 500, y: 600, width: 200, height: 300, elevation: 0.8 },
    // África - com planaltos
    { x: 1100, y: 400, width: 250, height: 400, elevation: 0.6 },
    // Europa - terreno moderado
    { x: 1050, y: 250, width: 200, height: 150, elevation: 0.5 },
    // Ásia - com Himalaias
    { x: 1400, y: 200, width: 400, height: 300, elevation: 0.9 },
    // Austrália - terreno baixo
    { x: 1700, y: 700, width: 200, height: 150, elevation: 0.4 }
  ]

  continents.forEach(continent => {
    const elevation = Math.floor(continent.elevation * 255)
    ctx.fillStyle = `rgb(${elevation}, ${elevation}, ${elevation})`
    
    // Desenhar continente
    ctx.beginPath()
    const points = []
    const numPoints = 16
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const radiusX = continent.width / 2 + (Math.random() - 0.5) * continent.width * 0.3
      const radiusY = continent.height / 2 + (Math.random() - 0.5) * continent.height * 0.3
      points.push({
        x: continent.x + Math.cos(angle) * radiusX,
        y: continent.y + Math.sin(angle) * radiusY
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

    // Adicionar cadeias montanhosas
    if (continent.elevation > 0.6) {
      for (let i = 0; i < 5; i++) {
        const mx = continent.x + (Math.random() - 0.5) * continent.width * 0.8
        const my = continent.y + (Math.random() - 0.5) * continent.height * 0.8
        const msize = Math.random() * 30 + 20

        const mountainElevation = Math.floor(Math.min(255, elevation + 60))
        ctx.fillStyle = `rgb(${mountainElevation}, ${mountainElevation}, ${mountainElevation})`
        ctx.beginPath()
        ctx.arc(mx, my, msize, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  })

  // Cadeias montanhosas específicas
  // Himalaias (elevação máxima)
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(1500, 300, 200, 50)
  
  // Andes
  ctx.fillStyle = '#E0E0E0'
  ctx.fillRect(520, 600, 30, 280)
  
  // Montanhas Rochosas
  ctx.fillStyle = '#D0D0D0'
  ctx.fillRect(350, 280, 40, 150)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Mapa especular da Terra (oceanos refletem mais)
function createEarthSpecularMap(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Oceano (altamente reflexivo)
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, 2048, 1024)

  // Continentes (baixa reflexão)
  const continents = [
    { x: 400, y: 300, width: 300, height: 200 },
    { x: 500, y: 600, width: 200, height: 300 },
    { x: 1100, y: 400, width: 250, height: 400 },
    { x: 1050, y: 250, width: 200, height: 150 },
    { x: 1400, y: 200, width: 400, height: 300 },
    { x: 1700, y: 700, width: 200, height: 150 }
  ]

  continents.forEach(continent => {
    ctx.fillStyle = '#202020' // Baixa reflexão para terra
    
    ctx.beginPath()
    const points = []
    const numPoints = 16
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const radiusX = continent.width / 2 + (Math.random() - 0.5) * continent.width * 0.3
      const radiusY = continent.height / 2 + (Math.random() - 0.5) * continent.height * 0.3
      points.push({
        x: continent.x + Math.cos(angle) * radiusX,
        y: continent.y + Math.sin(angle) * radiusY
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
  })

  // Lagos e rios (reflexivos)
  ctx.fillStyle = '#CCCCCC'
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const size = Math.random() * 15 + 5
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Calotas polares (gelo = reflexivo)
  ctx.fillStyle = '#F0F0F0'
  ctx.fillRect(0, 0, 2048, 80)
  ctx.fillRect(0, 944, 2048, 80)

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

// Textura de Urano melhorada - planeta inclinado
function createUranusTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Base azul-ciano com metano
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGradient.addColorStop(0, '#4DD0E1')   // Pólo sul (mais claro)
  baseGradient.addColorStop(0.2, '#26C6DA') // Região polar
  baseGradient.addColorStop(0.4, '#00BCD4') // Temperada
  baseGradient.addColorStop(0.6, '#00ACC1') // Equatorial
  baseGradient.addColorStop(0.8, '#0097A7') // Temperada
  baseGradient.addColorStop(1, '#00838F')   // Pólo norte (mais escuro)

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 2048, 1024)

  // Absorção de metano (faixas muito sutis)
  for (let y = 0; y < 1024; y += 120) {
    const methaneAbsorption = 0.03 + Math.sin(y * 0.01) * 0.02
    ctx.fillStyle = `rgba(0, 150, 170, ${methaneAbsorption})`
    ctx.fillRect(0, y, 2048, 60)
    
    // Variações de pressão
    for (let x = 0; x < 2048; x += 80) {
      const pressure = Math.sin(x * 0.005 + y * 0.003) * 10
      ctx.fillStyle = `rgba(70, 200, 220, ${methaneAbsorption * 0.5})`
      ctx.fillRect(x, y + pressure, 80, 60)
    }
  }

  // Características polares (devido à inclinação única)
  const polarGradient = ctx.createRadialGradient(1024, 100, 0, 1024, 100, 400)
  polarGradient.addColorStop(0, 'rgba(100, 220, 240, 0.3)')
  polarGradient.addColorStop(0.5, 'rgba(80, 200, 220, 0.2)')
  polarGradient.addColorStop(1, 'rgba(60, 180, 200, 0)')

  ctx.fillStyle = polarGradient
  ctx.beginPath()
  ctx.arc(1024, 100, 400, 0, Math.PI * 2)
  ctx.fill()

  // Pólo oposto
  const polarGradient2 = ctx.createRadialGradient(1024, 924, 0, 1024, 924, 400)
  polarGradient2.addColorStop(0, 'rgba(40, 160, 180, 0.4)')
  polarGradient2.addColorStop(0.5, 'rgba(60, 180, 200, 0.2)')
  polarGradient2.addColorStop(1, 'rgba(80, 200, 220, 0)')

  ctx.fillStyle = polarGradient2
  ctx.beginPath()
  ctx.arc(1024, 924, 400, 0, Math.PI * 2)
  ctx.fill()

  // Nuvens de metano (raras)
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const size = Math.random() * 50 + 30

    const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    cloudGradient.addColorStop(0, 'rgba(200, 250, 255, 0.3)')
    cloudGradient.addColorStop(0.6, 'rgba(180, 230, 240, 0.2)')
    cloudGradient.addColorStop(1, 'rgba(160, 210, 220, 0)')

    ctx.fillStyle = cloudGradient
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Textura de Netuno hiper-detalhada
function createNeptuneTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Base azul profundo com gradiente de pressão
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGradient.addColorStop(0, '#1565C0')   // Pólo norte
  baseGradient.addColorStop(0.2, '#1976D2') // Norte temperado
  baseGradient.addColorStop(0.4, '#2196F3') // Norte tropical
  baseGradient.addColorStop(0.6, '#03A9F4') // Equador
  baseGradient.addColorStop(0.8, '#00BCD4') // Sul tropical
  baseGradient.addColorStop(1, '#0097A7')   // Pólo sul

  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 2048, 1024)

  // Faixas atmosféricas dinâmicas
  const bands = [
    { y: 80, height: 100, color: 'rgba(30, 120, 200, 0.4)', speed: 0.8 },
    { y: 200, height: 120, color: 'rgba(50, 140, 220, 0.3)', speed: 1.2 },
    { y: 340, height: 140, color: 'rgba(20, 100, 180, 0.5)', speed: 0.6 },
    { y: 500, height: 110, color: 'rgba(40, 130, 210, 0.35)', speed: 1.0 },
    { y: 630, height: 130, color: 'rgba(25, 110, 190, 0.45)', speed: 0.9 },
    { y: 780, height: 164, color: 'rgba(35, 125, 205, 0.3)', speed: 1.1 }
  ]

  bands.forEach((band, index) => {
    // Base da faixa
    const gradient = ctx.createLinearGradient(0, band.y, 0, band.y + band.height)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    gradient.addColorStop(0.5, band.color)
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, band.y, 2048, band.height)

    // Turbulência de alta velocidade (ventos supersônicos)
    for (let x = 0; x < 2048; x += 25) {
      const turbulence = Math.sin(x * 0.008 + index * 2) * 25 * band.speed
      const microTurbulence = Math.sin(x * 0.03 + index) * 8
      const totalOffset = turbulence + microTurbulence

      ctx.fillStyle = band.color
      ctx.fillRect(x, band.y + totalOffset, 25, band.height)

      // Estruturas de cisalhamento
      if (Math.random() > 0.85) {
        ctx.fillStyle = `rgba(255, 255, 255, 0.1)`
        ctx.fillRect(x, band.y + totalOffset, 2, band.height * 0.3)
      }
    }
  })

  // Grande Mancha Escura (similar à de Júpiter mas transitória)
  const darkSpotX = 1200
  const darkSpotY = 600
  
  for (let i = 0; i < 12; i++) {
    const scale = 1 - i * 0.08
    const alpha = 0.7 - i * 0.055
    const rotation = i * 0.12

    const spotGradient = ctx.createRadialGradient(darkSpotX, darkSpotY, 0, darkSpotX, darkSpotY, 120 * scale)
    spotGradient.addColorStop(0, `rgba(10, 30, 80, ${alpha})`)
    spotGradient.addColorStop(0.4, `rgba(20, 50, 120, ${alpha * 0.8})`)
    spotGradient.addColorStop(0.8, `rgba(30, 70, 140, ${alpha * 0.5})`)
    spotGradient.addColorStop(1, `rgba(40, 90, 160, 0)`)

    ctx.fillStyle = spotGradient
    ctx.save()
    ctx.translate(darkSpotX, darkSpotY)
    ctx.rotate(rotation)
    ctx.beginPath()
    ctx.ellipse(0, 0, 140 * scale, 85 * scale, 0.25 + i * 0.015, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  // Nuvens de metano cristalizado (características brilhantes)
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 1024
    const size = Math.random() * 40 + 15

    const methaneGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    methaneGradient.addColorStop(0, 'rgba(220, 240, 255, 0.6)')
    methaneGradient.addColorStop(0.5, 'rgba(200, 220, 240, 0.4)')
    methaneGradient.addColorStop(1, 'rgba(180, 200, 220, 0)')

    ctx.fillStyle = methaneGradient
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Jatos e plumas atmosféricas
  for (let i = 0; i < 6; i++) {
    const jetX = Math.random() * 2048
    const jetY = Math.random() * 1024
    const jetLength = Math.random() * 200 + 100
    const jetWidth = Math.random() * 15 + 5

    ctx.strokeStyle = 'rgba(150, 200, 255, 0.4)'
    ctx.lineWidth = jetWidth
    ctx.beginPath()
    ctx.moveTo(jetX, jetY)
    
    for (let j = 0; j < jetLength; j += 10) {
      const curve = Math.sin(j * 0.05) * 20
      const fade = 1 - (j / jetLength)
      ctx.globalAlpha = 0.4 * fade
      ctx.lineTo(jetX + j + curve, jetY + Math.random() * 10 - 5)
    }
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}