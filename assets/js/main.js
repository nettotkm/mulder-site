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
  startX:    0.20,  // posição X inicial (0 = esquerda, 1 = direita)
  amplitude: 0.22,  // largura da oscilação lateral do S
  startY:    0.30,  // posição Y inicial (0 = topo, 1 = base)
  travelY:   0.62,  // quanto desce no total
  radius:    0.10,  // tamanho da lupa
  speed:     1.0,   // velocidade (maior = mais lento)
}

const setupLupaAbout = {
  startX:    0.25,
  amplitude: 0.20,
  startY:    0.18,
  travelY:   0.60,
  radius:    0.10,
  speed:     1.0,
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

// ─── Navbar ──────────────────────────────────────────────────────────────────
const btn   = document.getElementById('menuBtn')
const menu  = document.getElementById('mobileMenu')
const open  = document.getElementById('iconOpen')
const close = document.getElementById('iconClose')

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden')
  open.classList.toggle('hidden')
  close.classList.toggle('hidden')
})
