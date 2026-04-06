// ─── Canvas Magnifying Glass — função reutilizável ───────────────────────────
// Proporções da lupa PNG (medidas via pixel analysis):
//   centro do círculo: (0.272, 0.357) da imagem
//   raio do círculo:   0.268 da largura
//   aspect ratio PNG:  2304 / 1842 ≈ 1.251
const LUPA_PNG_SRC = 'assets/images/lupa.png'
const LUPA_CX      = 0.272
const LUPA_CY      = 0.357
const LUPA_R       = 0.268
const LUPA_AR      = 2304 / 1842

function setupLupa(canvasEl, imgEl, scrollAnchorEl, opts) {
  if (!canvasEl || !imgEl || !scrollAnchorEl) return

  const o = Object.assign({
    startX:    0.25,
    amplitude: 0.22,
    startY:    0.18,
    travelY:   0.62,
    radius:    0.10,
    speed:     1.0,
    zoom:      1.65,
  }, opts)

  const container = canvasEl.parentElement
  const ctx       = canvasEl.getContext('2d')

  const photo = new Image()
  photo.crossOrigin = 'anonymous'
  photo.src = imgEl.src

  const lupaEl = document.createElement('img')
  lupaEl.src   = LUPA_PNG_SRC
  lupaEl.style.cssText = [
    'position:absolute',
    'pointer-events:none',
    'mix-blend-mode:multiply',
    'will-change:left,top,width,height',
  ].join(';')
  container.appendChild(lupaEl)

  let rafId = null

  const drawLupa = (progress) => {
    const W = container.offsetWidth
    const H = container.offsetHeight
    canvasEl.width  = W
    canvasEl.height = H
    ctx.clearRect(0, 0, W, H)

    const glassX = W * (o.startX + o.amplitude * Math.sin(progress * Math.PI * 2))
    const glassY = H * (o.startY + progress * o.travelY)
    const glassR = Math.min(W, H) * o.radius

    // ── Zoom da foto dentro do círculo ────────────────────────────────────────
    ctx.save()
    ctx.beginPath()
    ctx.arc(glassX, glassY, glassR, 0, Math.PI * 2)
    ctx.clip()
    const scaledW = W * o.zoom
    const scaledH = H * o.zoom
    ctx.drawImage(photo,
      glassX - (glassX / W) * scaledW,
      glassY - (glassY / H) * scaledH,
      scaledW, scaledH
    )
    ctx.restore()

    // ── PNG da lupa posicionado sobre o canvas ────────────────────────────────
    const pngW = glassR / LUPA_R
    const pngH = pngW / LUPA_AR
    lupaEl.style.width  = pngW + 'px'
    lupaEl.style.height = pngH + 'px'
    lupaEl.style.left   = (glassX - LUPA_CX * pngW) + 'px'
    lupaEl.style.top    = (glassY - LUPA_CY * pngH) + 'px'
  }

  photo.onload = () => {
    drawLupa(0)

    const scrub = () => {
      const rect  = scrollAnchorEl.getBoundingClientRect()
      const range = scrollAnchorEl.offsetHeight * o.speed
      const prog  = Math.min(1, Math.max(0, -rect.top / range))
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => drawLupa(prog))
    }

    window.addEventListener('scroll', scrub, { passive: true })
    window.addEventListener('resize', scrub)
  }
}

// ─── Configurações ────────────────────────────────────────────────────────────
const setupLupaHero = {
  startX:    0.50,  // posição X inicial (0 = esquerda, 1 = direita)
  amplitude: 0.20,  // largura da oscilação lateral do S
  startY:    0.15,  // posição Y inicial (0 = topo, 1 = base)
  travelY:   0.70,  // quanto desce no total
  radius:    0.15,  // tamanho da lupa
  speed:     0.50,   // velocidade (maior = mais lento)
}

const setupLupaAbout = {
  startX:    0.35,
  amplitude: 0.25,
  startY:    0.20,
  travelY:   0.60,
  radius:    0.15,
  speed:     0.50,
}

// ─── Instâncias ───────────────────────────────────────────────────────────────
setupLupa(
  document.getElementById('lupa-canvas'),
  document.querySelector('#hero-media img'),
  document.getElementById('hero-section'),
  setupLupaHero
)

setupLupa(
  document.getElementById('lupa-canvas-about'),
  document.querySelector('#about-media img'),
  document.querySelector('#about-media').closest('section'),
  setupLupaAbout
)

// ─── Lupa hover — Portfólio ───────────────────────────────────────────────────
function setupLupaPortfolio() {
  const section = document.getElementById('portfolio-section')
  if (!section) return

  const RADIUS = 50 // raio da lente em px (tamanho fixo, não relativo)
  const ZOOM   = 2.2

  // Canvas flutuante (fixed, segue o cursor)
  const floatCanvas = document.createElement('canvas')
  floatCanvas.style.cssText = 'position:fixed;pointer-events:none;z-index:200;display:none;'
  document.body.appendChild(floatCanvas)

  const floatLupa = document.createElement('img')
  floatLupa.src = LUPA_PNG_SRC
  floatLupa.style.cssText = 'position:fixed;pointer-events:none;z-index:201;mix-blend-mode:multiply;display:none;'
  document.body.appendChild(floatLupa)

  const ctx = floatCanvas.getContext('2d')

  // Cache das imagens já carregadas
  const imgCache = new Map()
  const getPhoto = (src) => {
    if (!imgCache.has(src)) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = src
      imgCache.set(src, img)
    }
    return imgCache.get(src)
  }

  const render = (mouseX, mouseY, photo, imgRect) => {
    const R    = RADIUS
    const size = R * 2
    floatCanvas.width  = size
    floatCanvas.height = size
    floatCanvas.style.left = (mouseX - R) + 'px'
    floatCanvas.style.top  = (mouseY - R) + 'px'

    ctx.clearRect(0, 0, size, size)

    // Zoom centrado no cursor dentro da imagem
    ctx.save()
    ctx.beginPath()
    ctx.arc(R, R, R, 0, Math.PI * 2)
    ctx.clip()

    const ix = (mouseX - imgRect.left) / imgRect.width
    const iy = (mouseY - imgRect.top)  / imgRect.height
    const sw = imgRect.width  * ZOOM
    const sh = imgRect.height * ZOOM
    ctx.drawImage(photo, R - ix * sw, R - iy * sh, sw, sh)
    ctx.restore()

    // PNG da lupa alinhado ao canvas
    const pngW = R / LUPA_R
    const pngH = pngW / LUPA_AR
    floatLupa.style.width  = pngW + 'px'
    floatLupa.style.height = pngH + 'px'
    floatLupa.style.left   = (mouseX - LUPA_CX * pngW) + 'px'
    floatLupa.style.top    = (mouseY - LUPA_CY * pngH) + 'px'
  }

  const show = () => {
    floatCanvas.style.display = 'block'
    floatLupa.style.display   = 'block'
  }
  const hide = () => {
    floatCanvas.style.display = 'none'
    floatLupa.style.display   = 'none'
  }

  section.querySelectorAll('img').forEach(img => {
    const photo = getPhoto(img.src)  // pré-carrega

    img.addEventListener('mouseenter', show)
    img.addEventListener('mouseleave', hide)
    img.addEventListener('mousemove', (e) => {
      if (!photo.complete) return
      render(e.clientX, e.clientY, photo, img.getBoundingClientRect())
    })
  })
}

setupLupaPortfolio()

// ─── Navbar shadow on scroll ─────────────────────────────────────────────────
const nav = document.querySelector('nav')

window.addEventListener('scroll', () => {
  if (!nav) return
  nav.classList.toggle('nav-scrolled', window.scrollY > 60)
}, { passive: true })

// ─── Navbar toggle ───────────────────────────────────────────────────────────
const btn   = document.getElementById('menuBtn')
const menu  = document.getElementById('mobileMenu')
const open  = document.getElementById('iconOpen')
const close = document.getElementById('iconClose')

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden')
  open.classList.toggle('hidden')
  close.classList.toggle('hidden')
})

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      revealObserver.unobserve(e.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// ─── Counter animation ───────────────────────────────────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return
    const el      = e.target
    const target  = parseFloat(el.dataset.counter)
    const suffix  = el.dataset.suffix || ''
    const dur     = 1800
    const start   = performance.now()

    const tick = (now) => {
      const prog = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - prog, 3)
      const val  = Math.round(ease * target)
      el.textContent = val + suffix
      if (prog < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    counterObserver.unobserve(el)
  })
}, { threshold: 0.5 })

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el))

// ─── Magnetic Buttons ────────────────────────────────────────────────────────
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r  = btn.getBoundingClientRect()
    const x  = e.clientX - r.left - r.width  / 2
    const y  = e.clientY - r.top  - r.height / 2
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`
  })
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = ''
  })
})
