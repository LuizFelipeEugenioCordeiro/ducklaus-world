import './style.css'
import introVideoUrl from './assets/videos/ducklaus-intro.mp4?url'
import mergulhaoVideoUrl from './assets/videos/pato-mergulhao-brasileiro.mp4?url'
import mergulhaoInfograficoUrl from './assets/images/pato-mergulhao-infografico.png?url'
import koloaVideoUrl from './assets/videos/koloa-maoli.mp4?url'
import koloaInfograficoUrl from './assets/images/koloa-maoli-infografico.png?url'
import mergansoEscamosoInfograficoUrl from './assets/images/merganso-escamoso-infografico.png?url'
import zarroMadagascarInfograficoUrl from './assets/images/zarro-madagascar-infografico.png?url'
import baersPochardInfograficoUrl from './assets/images/baers-pochard-infografico.png?url'

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
      <a href="#koloa-maoli">Koloa</a>
      <a href="#arquivo-visual">Arquivo visual</a>
      <a class="nav-cta" href="#arquivo-visual">Finalizar atlas <span>↗</span></a>
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

        <button
          class="species-poster mergulhao-poster glass-card reveal"
          type="button"
          data-lightbox-src="${mergulhaoInfograficoUrl}"
          data-lightbox-title="Pato-mergulhão brasileiro — infográfico completo"
          aria-label="Abrir infográfico completo do pato-mergulhão brasileiro"
        >
          <img src="${mergulhaoInfograficoUrl}" alt="Infográfico visual do pato-mergulhão brasileiro" loading="lazy">
          <span class="poster-hint">Clique para ampliar</span>
        </button>

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

    <section class="koloa-story" id="koloa-maoli" aria-labelledby="koloa-title">
      <div class="koloa-shell">
        <div class="koloa-header reveal">
          <p class="kicker">ARQUIVO 003 · ILHAS DO HAVAÍ</p>
          <h2 id="koloa-title">Koloa Maoli<br><em>pato-havaiano.</em></h2>
          <p>Um pato de superfície, endêmico do Havaí, que parece ter saído de um cartaz antigo de expedição científica. Elegante, discreto e oficialmente cheio de problemas causados por humanos — bem Ducklaus em modo denúncia tropical.</p>
        </div>

        <div class="koloa-media reveal">
          <video
            class="koloa-video"
            data-scroll-video="koloa"
            src="${koloaVideoUrl}"
            preload="auto"
            autoplay
            loop
            muted
            playsinline
            disablepictureinpicture
          ></video>
          <div class="koloa-video-frame" aria-hidden="true"></div>
          <div class="koloa-video-label">
            <span>FILME 03</span>
            <i><b data-koloa-progress></b></i>
            <span data-koloa-status>CARREGANDO</span>
          </div>
        </div>

        <button
          class="species-poster koloa-poster glass-card reveal"
          type="button"
          data-lightbox-src="${koloaInfograficoUrl}"
          data-lightbox-title="Koloa Maoli — infográfico completo"
          aria-label="Abrir infográfico completo do Koloa Maoli"
        >
          <img src="${koloaInfograficoUrl}" alt="Infográfico visual do pato-havaiano Koloa Maoli" loading="lazy">
          <span class="poster-hint">Clique para ampliar</span>
        </button>

        <div class="koloa-facts">
          <article class="koloa-card glass-card reveal">
            <span>01</span>
            <h3>Onde vive</h3>
            <p>É endêmico do Havaí e usa áreas úmidas, pântanos, lagoas, campos alagados, riachos e plantações de taro.</p>
          </article>
          <article class="koloa-card glass-card reveal">
            <span>02</span>
            <h3>O que come</h3>
            <p>Alimenta-se de vegetação de água doce, sementes, moluscos, insetos e outros pequenos invertebrados aquáticos.</p>
          </article>
          <article class="koloa-card glass-card reveal">
            <span>03</span>
            <h3>Como se alimenta</h3>
            <p>É um pato de superfície: filtra alimento na água e pode inclinar o corpo, deixando a cauda para cima, sem precisar mergulhar fundo.</p>
          </article>
          <article class="koloa-card glass-card reveal danger">
            <span>04</span>
            <h3>Grande ameaça</h3>
            <p>A hibridização com marrecos-domésticos/mallards introduzidos é uma das maiores ameaças à identidade genética da espécie.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="visual-archive" id="arquivo-visual" aria-labelledby="visual-archive-title">
      <div class="visual-archive-heading reveal">
        <p class="kicker">ARQUIVO VISUAL · ESPÉCIES SEM FILME</p>
        <h2 id="visual-archive-title">Outros patos<br><em>em dossiê.</em></h2>
        <p>Sem vídeo por enquanto: só o essencial, em fila, para fechar o atlas Ducklaus com aquele ar de coleção científica que se leva sério demais — do jeitinho certo.</p>
      </div>

      <div class="archive-row" aria-label="Infográficos de outros patos ameaçados">
        <article class="archive-card reveal">
          <button
            class="species-poster archive-poster glass-card"
            type="button"
            data-lightbox-src="${mergansoEscamosoInfograficoUrl}"
            data-lightbox-title="Merganso-escamoso — infográfico completo"
            aria-label="Abrir infográfico completo do merganso-escamoso"
          >
            <img src="${mergansoEscamosoInfograficoUrl}" alt="Infográfico do merganso-escamoso" loading="lazy">
            <span class="poster-hint">Clique para ampliar</span>
          </button>
          <div class="archive-card-copy">
            <span>Japão e Leste Asiático</span>
            <h3>Merganso-escamoso</h3>
            <p>Vive em rios claros e arborizados. Dieta com peixes pequenos, insetos aquáticos e crustáceos.</p>
          </div>
        </article>

        <article class="archive-card reveal">
          <button
            class="species-poster archive-poster glass-card"
            type="button"
            data-lightbox-src="${zarroMadagascarInfograficoUrl}"
            data-lightbox-title="Zarro-de-madagáscar — infográfico completo"
            aria-label="Abrir infográfico completo do zarro-de-madagáscar"
          >
            <img src="${zarroMadagascarInfograficoUrl}" alt="Infográfico do zarro-de-madagáscar" loading="lazy">
            <span class="poster-hint">Clique para ampliar</span>
          </button>
          <div class="archive-card-copy">
            <span>Madagáscar</span>
            <h3>Zarro-de-madagáscar</h3>
            <p>Habita lagos profundos de origem vulcânica. Alimenta-se de insetos, larvas e invertebrados de água doce.</p>
          </div>
        </article>

        <article class="archive-card reveal">
          <button
            class="species-poster archive-poster glass-card"
            type="button"
            data-lightbox-src="${baersPochardInfograficoUrl}"
            data-lightbox-title="Baer's Pochard — infográfico completo"
            aria-label="Abrir infográfico completo do Baer's Pochard"
          >
            <img src="${baersPochardInfograficoUrl}" alt="Infográfico do Baer's Pochard" loading="lazy">
            <span class="poster-hint">Clique para ampliar</span>
          </button>
          <div class="archive-card-copy">
            <span>Ásia Oriental</span>
            <h3>Baer's Pochard</h3>
            <p>Prefere lagos rasos, brejos e vegetação densa. Come sementes, plantas aquáticas, moluscos e invertebrados.</p>
          </div>
        </article>
      </div>
    </section>
  </main>

  <div class="image-lightbox" data-lightbox aria-hidden="true">
    <button class="image-lightbox-backdrop" type="button" data-lightbox-close aria-label="Fechar imagem ampliada"></button>
    <figure class="image-lightbox-panel" role="dialog" aria-modal="true" aria-label="Imagem ampliada">
      <button class="image-lightbox-close" type="button" data-lightbox-close aria-label="Fechar">×</button>
      <img data-lightbox-image src="" alt="">
      <figcaption data-lightbox-caption></figcaption>
    </figure>
  </div>
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

const lightbox = document.querySelector('[data-lightbox]')
const lightboxImage = document.querySelector('[data-lightbox-image]')
const lightboxCaption = document.querySelector('[data-lightbox-caption]')
const lightboxCloseButton = document.querySelector('.image-lightbox-close')
let lastFocusedElement = null

const closeLightbox = () => {
  if (!lightbox.classList.contains('is-open')) return
  lightbox.classList.remove('is-open')
  lightbox.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('lightbox-open')
  lightboxImage.removeAttribute('src')
  lightboxImage.alt = ''
  lightboxCaption.textContent = ''
  lastFocusedElement?.focus()
}

const openLightbox = (trigger) => {
  lastFocusedElement = document.activeElement
  const thumbnail = trigger.querySelector('img')
  lightboxImage.src = trigger.dataset.lightboxSrc
  lightboxImage.alt = thumbnail?.alt ?? trigger.dataset.lightboxTitle ?? 'Imagem ampliada'
  lightboxCaption.textContent = trigger.dataset.lightboxTitle ?? ''
  document.body.classList.add('lightbox-open')
  lightbox.setAttribute('aria-hidden', 'false')
  lightbox.classList.add('is-open')
  lightboxCloseButton.focus()
}

document.querySelectorAll('[data-lightbox-src]').forEach((trigger) => {
  trigger.addEventListener('click', () => openLightbox(trigger))
})

document.querySelectorAll('[data-lightbox-close]').forEach((button) => {
  button.addEventListener('click', closeLightbox)
})

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox()
})

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
  const koloaVideo = createLoopingVideo(document.querySelector('[data-scroll-video="koloa"]'), {
    progressElement: document.querySelector('[data-koloa-progress]'),
    progressProperty: '--koloa-progress',
    statusElement: document.querySelector('[data-koloa-status]'),
  })

  window.addEventListener('pagehide', () => {
    introVideo.destroy()
    mergulhaoVideo.destroy()
    koloaVideo.destroy()
    sceneController?.destroy()
  }, { once: true })
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(startStoryExperience, { timeout: 600 })
} else {
  window.setTimeout(startStoryExperience, 0)
}
