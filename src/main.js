import './style.css'
import introVideoUrl from './assets/videos/ducklaus-intro.mp4?url'
import mergulhaoVideoUrl from './assets/videos/pato-mergulhao-brasileiro.mp4?url'

document.querySelector('#app').innerHTML = `
  <canvas id="three-background" aria-hidden="true"></canvas>

  <header class="site-header">
    <a class="brand" href="#inicio" aria-label="Ducklaus World — início">
      <span class="brand-mark" aria-hidden="true">D</span>
      <span>Ducklaus <em>World</em></span>
    </a>

    <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
      <span></span><span></span>
    </button>

    <nav class="nav" aria-label="Navegação principal">
      <a href="#sobre">Quem é</a>
      <a href="#pato-mergulhao">Mergulhão</a>
      <a class="nav-cta" href="#pato-mergulhao">Arquivo 002 <span>↗</span></a>
    </nav>
  </header>

  <main>
    <section class="hero" id="inicio" data-scene="hero">
      <div class="hero-stage">
        <div class="hero-film" aria-hidden="true">
          <video
            class="hero-film-video"
            data-scroll-video="intro"
            src="${introVideoUrl}"
            preload="auto"
            muted
            playsinline
            disablepictureinpicture
          ></video>
          <div class="hero-film-shade"></div>
        </div>

        <div class="hero-glow"></div>
        <div class="hero-copy reveal">
          <div class="eyebrow"><span></span> Documentário natural · Arquivo 001</div>
          <h1>Ducklaus<br><em>World.</em></h1>
          <p class="hero-tagline">O pato por trás do homem.<br><em>A lenda por trás do bico.</em></p>
          <p class="hero-description">Explore o mundo secreto dos patos, suas rotas, habitats e curiosidades.</p>
          <div class="hero-actions">
            <a class="button button-gold" href="#sobre">Entrar no Reino dos Patos <span>↓</span></a>
            <a class="text-link" href="#pato-mergulhao">Ver mergulhão <span>↗</span></a>
          </div>
        </div>

        <div class="film-meter" aria-hidden="true">
          <span>FILME 01</span>
          <i><b data-video-progress></b></i>
          <span data-video-status>CARREGANDO</span>
        </div>
        <div class="scroll-note">ROLE PARA REVELAR <span></span></div>
      </div>
    </section>

    <section class="section about" id="sobre" data-scene="about">
      <div class="section-number">01 / O ALTER EGO</div>
      <div class="about-heading reveal">
        <p class="kicker">ENTRE O HOMEM E O PATO</p>
        <h2>Quem é<br><em>Ducklaus?</em></h2>
      </div>
      <div class="about-content reveal">
        <p class="lead">Ducklaus não é apenas um nome.<br><span>É uma presença.</span></p>
        <p>Durante o dia, um amigo comum. À noite, um espírito emplumado que observa o mundo com olhos pequenos, julgamento severo e passos suspeitamente elegantes.</p>
        <p>Entre o homem e o pato existe uma lenda de hábitos aquáticos, silêncio calculado e absoluta confiança no próprio bico.</p>
        <div class="signature">Ducklaus <small>Presença, lenda & pato extraordinário</small></div>
      </div>
      <div class="manifesto-card glass-card reveal">
        <span class="quote">“</span>
        <p>O mundo é grande demais para ficar na mesma lagoa.</p>
        <span class="card-label">MANIFESTO Nº 01</span>
      </div>
    </section>

    <section class="mergulhao-story" id="pato-mergulhao" aria-labelledby="mergulhao-title">
      <div class="mergulhao-pin">
        <div class="mergulhao-copy reveal">
          <p class="kicker">ARQUIVO 002 · RIOS LIMPOS DO BRASIL</p>
          <h2 id="mergulhao-title">Pato-mergulhão<br><em>brasileiro.</em></h2>
          <p class="mergulhao-lead">O parente raro de Ducklaus: elegante, veloz no mergulho e exigente com a qualidade da água. Um pato que não aceita lagoa meia-boca.</p>
          <p>Agora o filme passa sozinho em loop, como um pequeno documentário dentro da página. Você rola normalmente e deixa o mergulhão fazer a pose de ave rara.</p>
        </div>

        <div class="mergulhao-media reveal">
          <video
            class="mergulhao-video"
            data-scroll-video="mergulhao"
            src="${mergulhaoVideoUrl}"
            preload="auto"
            autoplay
            loop
            muted
            playsinline
            disablepictureinpicture
          ></video>
          <div class="mergulhao-video-glass" aria-hidden="true"></div>
          <div class="mergulhao-video-label">
            <span>FILME 02</span>
            <i><b data-mergulhao-progress></b></i>
            <span data-mergulhao-status>CARREGANDO</span>
          </div>
        </div>

        <div class="mergulhao-facts" aria-label="Curiosidades sobre o pato-mergulhão brasileiro">
          <article class="mergulhao-card glass-card reveal is-active">
            <span>01</span>
            <h3>Onde vive</h3>
            <p>Prefere rios cristalinos, rasos e com correnteza, geralmente em regiões serranas com mata ciliar preservada.</p>
          </article>
          <article class="mergulhao-card glass-card reveal">
            <span>02</span>
            <h3>O que come</h3>
            <p>Caça principalmente pequenos peixes, como lambaris, e também pode capturar insetos aquáticos e pequenos invertebrados.</p>
          </article>
          <article class="mergulhao-card glass-card reveal">
            <span>03</span>
            <h3>Superpoder</h3>
            <p>Mergulha para buscar alimento em água limpa. Se o rio está turvo ou degradado, a vida dele fica muito mais difícil.</p>
          </article>
          <article class="mergulhao-card glass-card reveal">
            <span>04</span>
            <h3>Raridade real</h3>
            <p>É uma das aves aquáticas mais raras e ameaçadas das Américas. No universo Ducklaus, isso é status de nobreza fluvial.</p>
          </article>
        </div>
      </div>
    </section>
  </main>
`

const menuButton = document.querySelector('.menu-toggle')
const nav = document.querySelector('.nav')

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!isOpen))
  nav.classList.toggle('is-open', !isOpen)
})

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false')
  nav.classList.remove('is-open')
}))

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.14 })

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))

const startStoryExperience = async () => {
  const [{ initThreeScene }, { createLoopingVideo }] = await Promise.all([
    import('./threeScene.js'),
    import('./videoStory.js'),
  ])

  const sceneController = initThreeScene(document.querySelector('#three-background'))
  const introVideo = createLoopingVideo(document.querySelector('[data-scroll-video="intro"]'), {
    progressElement: document.querySelector('[data-video-progress]'),
    statusElement: document.querySelector('[data-video-status]'),
    endAt: 7.26,
  })
  const mergulhaoVideo = createLoopingVideo(document.querySelector('[data-scroll-video="mergulhao"]'), {
    progressElement: document.querySelector('[data-mergulhao-progress]'),
    progressProperty: '--mergulhao-progress',
    statusElement: document.querySelector('[data-mergulhao-status]'),
  })

  window.addEventListener('pagehide', () => {
    introVideo.destroy()
    mergulhaoVideo.destroy()
    sceneController?.destroy()
  }, { once: true })
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(startStoryExperience, { timeout: 600 })
} else {
  window.setTimeout(startStoryExperience, 0)
}
