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


// ─── Lupa hover — genérica (portfólio + hero + about) ────────────────────────
function setupLupaHover(images, radius = 50, zoom = 2.2) {
  if (!images || images.length === 0) return

  const floatCanvas = document.createElement('canvas')
  floatCanvas.style.cssText = 'position:fixed;pointer-events:none;z-index:200;display:none;'
  document.body.appendChild(floatCanvas)

  const floatLupa = document.createElement('img')
  floatLupa.src = LUPA_PNG_SRC
  floatLupa.style.cssText = 'position:fixed;pointer-events:none;z-index:201;mix-blend-mode:multiply;display:none;'
  document.body.appendChild(floatLupa)

  const ctx = floatCanvas.getContext('2d')

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
    const R    = radius
    const size = R * 2
    floatCanvas.width  = size
    floatCanvas.height = size
    floatCanvas.style.left = (mouseX - R) + 'px'
    floatCanvas.style.top  = (mouseY - R) + 'px'

    ctx.clearRect(0, 0, size, size)
    ctx.save()
    ctx.beginPath()
    ctx.arc(R, R, R, 0, Math.PI * 2)
    ctx.clip()

    const ix = (mouseX - imgRect.left) / imgRect.width
    const iy = (mouseY - imgRect.top)  / imgRect.height
    const sw = imgRect.width  * zoom
    const sh = imgRect.height * zoom
    ctx.drawImage(photo, R - ix * sw, R - iy * sh, sw, sh)
    ctx.restore()

    const pngW = R / LUPA_R
    const pngH = pngW / LUPA_AR
    floatLupa.style.width  = pngW + 'px'
    floatLupa.style.height = pngH + 'px'
    floatLupa.style.left   = (mouseX - LUPA_CX * pngW) + 'px'
    floatLupa.style.top    = (mouseY - LUPA_CY * pngH) + 'px'
  }

  const show = () => { floatCanvas.style.display = 'block'; floatLupa.style.display = 'block' }
  const hide = () => { floatCanvas.style.display = 'none';  floatLupa.style.display = 'none'  }

  images.forEach(img => {
    const photo = getPhoto(img.src)
    img.addEventListener('mouseenter', show)
    img.addEventListener('mouseleave', hide)
    img.addEventListener('mousemove', (e) => {
      if (!photo.complete) return
      render(e.clientX, e.clientY, photo, img.getBoundingClientRect())
    })
  })
}

// Portfólio
const portfolioImgs = document.querySelectorAll('#portfolio-section img')
setupLupaHover(portfolioImgs, 50, 2.2)

// Hero e About — radius maior para imagens maiores
const heroImg  = document.querySelector('#hero-media img')
const aboutImg = document.querySelector('#about-media img')
const heroAboutImgs = [heroImg, aboutImg].filter(Boolean)
setupLupaHover(heroAboutImgs, 80, 2.0)

// ─── Intro sweep — passada única ao entrar na tela ────────────────────────────
function playLupaIntro(img, { radius = 80, zoom = 2.0, duration = 1800 } = {}) {
  if (!img) return

  const container = img.parentElement
  const photo = new Image()
  photo.crossOrigin = 'anonymous'
  photo.src = img.src

  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:10;'
  container.style.position = 'relative'
  container.appendChild(canvas)

  const lupaEl = document.createElement('img')
  lupaEl.src = LUPA_PNG_SRC
  lupaEl.style.cssText = 'position:absolute;pointer-events:none;mix-blend-mode:multiply;z-index:11;'
  container.appendChild(lupaEl)

  const ctx = canvas.getContext('2d')

  const draw = (progress) => {
    const W = container.offsetWidth
    const H = container.offsetHeight
    canvas.width  = W
    canvas.height = H
    ctx.clearRect(0, 0, W, H)

    // Trajeto em S: Y desce linearmente, X oscila em seno (um ciclo completo = S)
    const gy = H * (0.15 + progress * 0.70)
    const gx = W * (0.50 + 0.30 * Math.sin(progress * Math.PI * 2))
    const R  = radius

    // Fade in/out nas bordas da animação
    const opacity = progress < 0.1 ? progress / 0.1
                  : progress > 0.85 ? (1 - progress) / 0.15
                  : 1
    ctx.globalAlpha = opacity

    ctx.save()
    ctx.beginPath()
    ctx.arc(gx, gy, R, 0, Math.PI * 2)
    ctx.clip()
    const sw = W * zoom
    const sh = H * zoom
    ctx.drawImage(photo, gx - (gx / W) * sw, gy - (gy / H) * sh, sw, sh)
    ctx.restore()
    ctx.globalAlpha = 1

    const pngW = R / LUPA_R
    const pngH = pngW / LUPA_AR
    lupaEl.style.opacity = opacity
    lupaEl.style.width   = pngW + 'px'
    lupaEl.style.height  = pngH + 'px'
    lupaEl.style.left    = (gx - LUPA_CX * pngW) + 'px'
    lupaEl.style.top     = (gy - LUPA_CY * pngH) + 'px'
  }

  const cleanup = () => {
    canvas.remove()
    lupaEl.remove()
  }

  const animate = (startTime) => (now) => {
    const progress = Math.min((now - startTime) / duration, 1)
    draw(progress)
    if (progress < 1) requestAnimationFrame(animate(startTime))
    else cleanup()
  }

  const start = () => requestAnimationFrame((now) => animate(now)(now))

  if (photo.complete) start()
  else photo.onload = start
}

// Dispara a passada quando a imagem entrar na tela
const introObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return
    introObserver.unobserve(e.target)
    // Pequeno delay para a imagem já estar visível
    setTimeout(() => playLupaIntro(e.target), 400)
  })
}, { threshold: 0.4 })

heroAboutImgs.forEach(img => introObserver.observe(img))

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
