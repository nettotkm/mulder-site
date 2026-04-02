const btn   = document.getElementById('menuBtn')
const menu  = document.getElementById('mobileMenu')
const open  = document.getElementById('iconOpen')
const close = document.getElementById('iconClose')

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden')
  open.classList.toggle('hidden')
  close.classList.toggle('hidden')
})
