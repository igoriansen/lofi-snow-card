const envelope = document.getElementById('envelope')
const carta = document.getElementById('carta')
const player = document.getElementById('player')
const audio = new Audio('musica.mp3')
audio.preload = 'auto' // Garante que o arquivo local seja pré-carregado

envelope.addEventListener('click', function () {
  envelope.style.display = 'none'
  carta.style.display = 'block'
  player.classList.add('visivel')
  soltarParticulas() 

  // AUTOPLAY: Inicia o áudio local assim que o usuário clica para abrir o envelope
  audio.play().then(() => {
    const btn = document.getElementById('btn-play')
    const ondas = document.querySelectorAll('.onda')
    btn.textContent = '⏸'
    ondas.forEach(function (o) { o.classList.add('tocando') })
  }).catch(error => {
    console.log("O autoplay foi bloqueado pelo navegador ou o arquivo não foi encontrado:", error)
  })

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

// Efeito de Neve Lofi Minimalista para o portfólio
function soltarParticulas() {
  const canvas = document.getElementById('corações')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const flocos = []

  // Cria os flocos de neve iniciais
  function criarFloco() {
    flocos.push({
      x: Math.random() * canvas.width,
      y: -10, // Começa no topo da tela e cai
      raio: 1 + Math.random() * 3, // Tamanhos variados para dar profundidade
      densidade: Math.random() * 1,
      velocidade: 0.8 + Math.random() * 1.5, // Velocidade suave de queda
      opacidade: 0.4 + Math.random() * 0.6
    })
  }

  // Gera flocos continuamente por 5 segundos após abrir
  let intervalo = setInterval(criarFloco, 50)
  setTimeout(function () {
    clearInterval(intervalo)
    intervalo = null
  }, 5000)

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    flocos.forEach(function (f) {
      f.y += f.velocidade; // Faz cair ao invés de subir
      f.x += Math.sin(f.y / 30) * 0.5; // Balanço suave para os lados

      ctx.beginPath()
      ctx.arc(f.x, f.y, f.raio, 0, Math.PI * 2, true)
      ctx.fillStyle = "rgba(255, 255, 255, " + f.opacidade + ")" // Flocos brancos translúcidos
      ctx.fill()
    })

    // Remove os flocos que passarem do fundo da tela
    for (let i = flocos.length - 1; i >= 0; i--) {
      if (flocos[i].y > canvas.height + 10) flocos.splice(i, 1)
    }

    if (flocos.length > 0 || intervalo) requestAnimationFrame(animar)
  }

  animar()
}

