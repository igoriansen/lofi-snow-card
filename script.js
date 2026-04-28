const envelope = document.getElementById('envelope')
const carta = document.getElementById('carta')
const player = document.getElementById('player')
const audio = new Audio('musica.mp3')

envelope.addEventListener('click', function () {
  envelope.style.display = 'none'
  carta.style.display = 'block'
  player.classList.add('visivel')
  soltarCoracoes()

  const paragrafos = document.querySelectorAll('.paragrafo-animado')
  paragrafos.forEach(function (paragrafo) {
    const delay = paragrafo.getAttribute('data-delay')
    setTimeout(function () {
      paragrafo.classList.add('visivel')
    }, delay * 1000)
  })
})

function toggleMusica() {
  const btn = document.getElementById('btn-play')
  const ondas = document.querySelectorAll('.onda')

  if (audio.paused) {
    audio.play()
    btn.textContent = '⏸'
    ondas.forEach(function (o) { o.classList.add('tocando') })
  } else {
    audio.pause()
    btn.textContent = '▶'
    ondas.forEach(function (o) { o.classList.remove('tocando') })
  }
}

function soltarCoracoes() {
  const canvas = document.getElementById('corações')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const coracoes = []
  const emojis = ['❤', '🌸', '💕', '♡']

  function criarCoracao() {
    coracoes.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      tamanho: 14 + Math.random() * 18,
      velocidade: 1.2 + Math.random() * 1.8,
      balanco: Math.random() * 2 - 1,
      opacidade: 0.7 + Math.random() * 0.3,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      drift: 0,
    })
  }

  let intervalo = setInterval(criarCoracao, 130)
  setTimeout(function () {
    clearInterval(intervalo)
    intervalo = null
  }, 3000)

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    coracoes.forEach(function (c) {
      c.y -= c.velocidade
      c.drift += 0.03
      c.x += Math.sin(c.drift) * c.balanco
      ctx.globalAlpha = c.opacidade
      ctx.font = c.tamanho + 'px serif'
      ctx.fillText(c.emoji, c.x, c.y)
    })

    ctx.globalAlpha = 1

    for (let i = coracoes.length - 1; i >= 0; i--) {
      if (coracoes[i].y < -30) coracoes.splice(i, 1)
    }

    if (coracoes.length > 0 || intervalo) requestAnimationFrame(animar)
  }

  animar()
}