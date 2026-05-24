export class StarrySky {
  constructor(canvas, effect = 'stars') {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.particles = []
    this.meteors = []
    this.mouse = { x: 0, y: 0 }
    this.animationId = null
    this.effect = effect
    this.time = 0
    this.init()
  }

  init() {
    this.resize()
    this.createParticles()
    this.bindEvents()
    this.animate()
  }

  setEffect(effect) {
    this.effect = effect
    this.createParticles()
  }

  resize() {
    const dpr = window.devicePixelRatio || 1
    this.canvas.width = window.innerWidth * dpr
    this.canvas.height = window.innerHeight * dpr
    this.canvas.style.width = window.innerWidth + 'px'
    this.canvas.style.height = window.innerHeight + 'px'
    this.ctx.scale(dpr, dpr)
  }

  createParticles() {
    this.particles = []
    const count = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 12000))
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle())
    }
  }

  createParticle() {
    const base = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: { r: 255, g: 255, b: 255 }
    }

    if (this.effect === 'vangogh') {
      base.color = { r: 255, g: 223, b: 100 }
      base.angle = Math.random() * Math.PI * 2
      base.radius = 50 + Math.random() * 100
    } else if (this.effect === 'monet') {
      const colors = [
        { r: 255, g: 182, b: 193 },
        { r: 173, g: 216, b: 230 },
        { r: 221, g: 160, b: 221 }
      ]
      base.color = colors[Math.floor(Math.random() * colors.length)]
      base.size = 3 + Math.random() * 6
      base.wobble = Math.random() * Math.PI * 2
    } else if (this.effect === 'cyberpunk') {
      base.color = { r: 0, g: 255, b: 159 }
      base.gridX = Math.floor(Math.random() * 15)
      base.gridY = Math.floor(Math.random() * 15)
    } else if (this.effect === 'japanese') {
      base.color = { r: 255, g: 182, b: 193 }
      base.rotation = Math.random() * Math.PI * 2
      base.rotSpeed = (Math.random() - 0.5) * 0.02
    } else if (this.effect === 'aurora') {
      const colors = [
        { r: 0, g: 255, b: 136 },
        { r: 0, g: 200, b: 255 },
        { r: 100, g: 0, b: 255 }
      ]
      base.color = colors[Math.floor(Math.random() * colors.length)]
      base.waveOffset = Math.random() * Math.PI * 2
    } else {
      const colors = [
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 217, b: 102 },
        { r: 200, g: 220, b: 255 }
      ]
      base.color = colors[Math.floor(Math.random() * colors.length)]
    }

    return base
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    })
    window.addEventListener('resize', () => {
      this.resize()
      this.createParticles()
    })
    setInterval(() => {
      if (Math.random() < 0.3) this.createMeteor()
    }, 3000)
  }

  createMeteor() {
    this.meteors.push({
      x: Math.random() * window.innerWidth * 1.5,
      y: -50,
      speed: 8 + Math.random() * 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      length: 80 + Math.random() * 60,
      opacity: 1,
      decay: 0.015 + Math.random() * 0.01,
      width: 1.5 + Math.random() * 1.5
    })
  }

  drawStars(p, time) {
    const twinkle = Math.sin(time * p.twinkleSpeed + p.twinklePhase)
    const opacity = p.opacity * (0.6 + twinkle * 0.4)
    this.ctx.beginPath()
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    this.ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${opacity})`
    this.ctx.fill()
    if (p.size > 1.2) {
      const g = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
      g.addColorStop(0, `rgba(${p.color.r},${p.color.g},${p.color.b},${opacity * 0.4})`)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
      this.ctx.fillStyle = g
      this.ctx.fill()
    }
  }

  drawVangogh(p, time) {
    const angle = p.angle + time * 0.5
    const wobble = Math.sin(time + p.twinklePhase) * 20
    const x = p.x + Math.cos(angle) * (p.radius + wobble)
    const y = p.y + Math.sin(angle) * (p.radius + wobble)
    this.ctx.beginPath()
    this.ctx.arc(x, y, p.size, 0, Math.PI * 2)
    this.ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.opacity})`
    this.ctx.fill()
  }

  drawMonet(p, time) {
    const x = p.x + Math.sin(time * 0.5 + p.wobble) * 2
    const y = p.y + Math.cos(time * 0.3 + p.wobble) * 2
    const scale = 1 + Math.sin(time + p.wobble) * 0.2
    const g = this.ctx.createRadialGradient(x, y, 0, x, y, p.size * scale)
    g.addColorStop(0, `rgba(${p.color.r},${p.color.g},${p.color.b},${p.opacity * 0.8})`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    this.ctx.beginPath()
    this.ctx.arc(x, y, p.size * scale * 2, 0, Math.PI * 2)
    this.ctx.fillStyle = g
    this.ctx.fill()
  }

  drawCyberpunk(p, time) {
    const cellW = window.innerWidth / 15
    const cellH = window.innerHeight / 15
    const x = p.gridX * cellW + cellW / 2
    const y = p.gridY * cellH + cellH / 2
    const pulse = Math.sin(time * 2 + p.gridX + p.gridY) * 0.5 + 0.5
    this.ctx.beginPath()
    this.ctx.arc(x, y, 2 + pulse * 3, 0, Math.PI * 2)
    this.ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${pulse * 0.8})`
    this.ctx.fill()
    if (p.gridX < 14) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, y)
      this.ctx.lineTo(x + cellW, y)
      this.ctx.strokeStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${pulse * 0.15})`
      this.ctx.lineWidth = 0.5
      this.ctx.stroke()
    }
  }

  drawSakura(p, time) {
    p.rotation += p.rotSpeed
    p.y += 0.3 + Math.sin(time + p.x) * 0.2
    p.x += Math.sin(time * 0.5 + p.y * 0.01) * 0.5
    if (p.y > window.innerHeight + 20) {
      p.y = -20
      p.x = Math.random() * window.innerWidth
    }
    this.ctx.save()
    this.ctx.translate(p.x, p.y)
    this.ctx.rotate(p.rotation)
    this.ctx.globalAlpha = p.opacity * 0.8
    this.ctx.beginPath()
    this.ctx.arc(0, 0, p.size, 0, Math.PI * 2)
    this.ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},0.8)`
    this.ctx.fill()
    this.ctx.globalAlpha = 1
    this.ctx.restore()
  }

  drawAurora(p, time) {
    const wave = Math.sin(time * 0.5 + p.waveOffset) * 50
    const x = p.x + wave
    const y = p.y + Math.sin(time * 0.3 + p.x * 0.01) * 30
    const g = this.ctx.createRadialGradient(x, y, 0, x, y, p.size * 6)
    g.addColorStop(0, `rgba(${p.color.r},${p.color.g},${p.color.b},${p.opacity * 0.6})`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    this.ctx.beginPath()
    this.ctx.arc(x, y, p.size * 6, 0, Math.PI * 2)
    this.ctx.fillStyle = g
    this.ctx.fill()
  }

  drawMeteor(m) {
    const tailX = m.x - Math.cos(m.angle) * m.length
    const tailY = m.y - Math.sin(m.angle) * m.length
    const g = this.ctx.createLinearGradient(m.x, m.y, tailX, tailY)
    g.addColorStop(0, `rgba(255,255,255,${m.opacity})`)
    g.addColorStop(0.3, `rgba(255,217,102,${m.opacity * 0.8})`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    this.ctx.beginPath()
    this.ctx.moveTo(m.x, m.y)
    this.ctx.lineTo(tailX, tailY)
    this.ctx.strokeStyle = g
    this.ctx.lineWidth = m.width
    this.ctx.lineCap = 'round'
    this.ctx.stroke()
  }

  updateParticle(p) {
    const dx = this.mouse.x - p.x
    const dy = this.mouse.y - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 150) {
      const force = (150 - dist) / 150
      const angle = Math.atan2(dy, dx)
      p.x -= Math.cos(angle) * force * 1.5
      p.y -= Math.sin(angle) * force * 1.5
    }
    if (this.effect !== 'japanese') {
      p.x += p.speedX
      p.y += p.speedY
    }
    if (p.x < -50) p.x = window.innerWidth + 50
    if (p.x > window.innerWidth + 50) p.x = -50
    if (p.y < -50) p.y = window.innerHeight + 50
    if (p.y > window.innerHeight + 50) p.y = -50
  }

  animate() {
    this.time = Date.now() * 0.001
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.particles.forEach(p => {
      this.updateParticle(p)
      if (this.effect === 'vangogh') this.drawVangogh(p, this.time)
      else if (this.effect === 'monet') this.drawMonet(p, this.time)
      else if (this.effect === 'cyberpunk') this.drawCyberpunk(p, this.time)
      else if (this.effect === 'japanese') this.drawSakura(p, this.time)
      else if (this.effect === 'aurora') this.drawAurora(p, this.time)
      else this.drawStars(p, this.time)
    })
    this.meteors = this.meteors.filter(m => m.opacity > 0)
    this.meteors.forEach(m => {
      m.x += Math.cos(m.angle) * m.speed
      m.y += Math.sin(m.angle) * m.speed
      m.opacity -= m.decay
      this.drawMeteor(m)
    })
    this.animationId = requestAnimationFrame(() => this.animate())
  }

  createFirework(x, y) {
    const colors = ['#FFD966', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 / 50) * i
      const speed = 2 + Math.random() * 4
      const hex = colors[Math.floor(Math.random() * colors.length)]
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      this.particles.push({
        x, y,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        opacity: 1,
        twinkleSpeed: 0.1,
        twinklePhase: 0,
        color: { r, g, b }
      })
    }
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId)
  }
}
