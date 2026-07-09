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
  <header class="site-header">
    <a class="brand" href="#inicio" aria-label="Ducklaus World — início">
      <span class="brand-mark" aria-hidden="true">D</span>
      <span>Ducklaus <em>World</em></span>
    </a>

    <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
      <span></span><span></span>
    </button>

    <nav class="nav" aria-label="Navegação principal">
      <a href="#sobre">Sobre</a>
      <a href="#pato-mergulhao">Pato-mergulhão</a>
      <a href="#koloa-maoli">Koloa Maoli</a>
      <a href="#arquivo-visual">Outras espécies</a>
      <a class="nav-cta" href="#arquivo-visual">Ver galeria <span>↗</span></a>
    </nav>
  </header>

  <main>
    <section class="hero" id="inicio">
      <div class="hero-stage">
        <div class="hero-film" aria-hidden="true">
          <video
            class="hero-film-video"
            data-loop-video="intro"
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
          <div class="eyebrow"><span></span> Atlas visual de conservação</div>
          <h1>Ducklaus<br><em>World.</em></h1>
          <p class="hero-tagline">Patos ameaçados em destaque.</p>
          <p class="hero-description">Landing page com vídeos, infográficos e dados essenciais sobre habitat, alimentação, distribuição e conservação de espécies selecionadas.</p>
          <div class="hero-actions">
            <a class="button button-gold" href="#sobre">Conhecer o projeto <span>↓</span></a>
            <a class="text-link" href="#pato-mergulhao">Ver espécies <span>↗</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section about" id="sobre">
      <div class="section-number">01 / SOBRE O PROJETO</div>
      <div class="about-heading reveal">
        <p class="kicker">OBJETIVO</p>
        <h2>Sobre o<br><em>projeto.</em></h2>
      </div>
      <div class="about-content reveal">
        <p class="lead">Ducklaus World é um atlas visual sobre patos ameaçados.</p>
        <p>A página reúne vídeos, infográficos e informações objetivas sobre espécies de patos de diferentes regiões do mundo.</p>
        <p>O conteúdo destaca habitat, alimentação, distribuição geográfica e principais ameaças à conservação.</p>
        <div class="signature">Ducklaus World <small>Atlas visual de espécies aquáticas</small></div>
      </div>
      <div class="manifesto-card glass-card reveal">
        <span class="quote">“</span>
        <p>Duas espécies com vídeo e uma galeria complementar de infográficos.</p>
        <span class="card-label">ESCOPO DO SITE</span>
      </div>
    </section>

    <section class="mergulhao-story" id="pato-mergulhao" aria-labelledby="mergulhao-title">
      <div class="mergulhao-pin">
        <div class="mergulhao-copy reveal">
          <p class="kicker">ESPÉCIE EM DESTAQUE · BRASIL</p>
          <h2 id="mergulhao-title">Pato-mergulhão<br><em>brasileiro.</em></h2>
          <p class="mergulhao-lead">Espécie brasileira criticamente ameaçada, associada a rios limpos, frios, rápidos e bem preservados.</p>
          <p>A seção apresenta vídeo, infográfico e dados básicos sobre habitat, dieta, comportamento e conservação.</p>
        </div>

        <div class="mergulhao-media reveal">
          <video
            class="mergulhao-video"
            data-loop-video="mergulhao"
            src="${mergulhaoVideoUrl}"
            preload="auto"
            autoplay
            loop
            muted
            playsinline
            disablepictureinpicture
          ></video>
          <div class="mergulhao-video-glass" aria-hidden="true"></div>
        </div>

        <button
          class="species-poster mergulhao-poster glass-card reveal"
          type="button"
          data-lightbox-src="${mergulhaoInfograficoUrl}"
          data-lightbox-title="Pato-mergulhão brasileiro — infográfico completo"
          aria-label="Abrir infográfico completo do pato-mergulhão brasileiro"
        >
          <img src="${mergulhaoInfograficoUrl}" alt="Infográfico visual do pato-mergulhão brasileiro" loading="lazy">
          <span class="poster-hint">Ampliar imagem</span>
        </button>

        <div class="mergulhao-facts" aria-label="Informações sobre o pato-mergulhão brasileiro">
          <article class="mergulhao-card glass-card reveal">
            <span>01</span>
            <h3>Onde vive</h3>
            <p>Prefere rios cristalinos, rasos e com correnteza, geralmente em regiões serranas com mata ciliar preservada.</p>
          </article>
          <article class="mergulhao-card glass-card reveal">
            <span>02</span>
            <h3>O que come</h3>
            <p>Alimenta-se principalmente de pequenos peixes e também pode capturar insetos aquáticos e outros invertebrados.</p>
          </article>
          <article class="mergulhao-card glass-card reveal">
            <span>03</span>
            <h3>Comportamento</h3>
            <p>Mergulha para capturar alimento em água limpa, usando o corpo alongado e o bico estreito para buscar presas.</p>
          </article>
          <article class="mergulhao-card glass-card reveal">
            <span>04</span>
            <h3>Conservação</h3>
            <p>É uma das aves aquáticas mais raras das Américas e depende da preservação de rios saudáveis.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="koloa-story" id="koloa-maoli" aria-labelledby="koloa-title">
      <div class="koloa-shell">
        <div class="koloa-header reveal">
          <p class="kicker">ESPÉCIE EM DESTAQUE · HAVAÍ</p>
          <h2 id="koloa-title">Koloa Maoli<br><em>pato-havaiano.</em></h2>
          <p>Pato de superfície endêmico do Havaí. A seção resume habitat, alimentação, comportamento e principais ameaças à conservação da espécie.</p>
        </div>

        <div class="koloa-media reveal">
          <video
            class="koloa-video"
            data-loop-video="koloa"
            src="${koloaVideoUrl}"
            preload="auto"
            autoplay
            loop
            muted
            playsinline
            disablepictureinpicture
          ></video>
          <div class="koloa-video-frame" aria-hidden="true"></div>
        </div>

        <button
          class="species-poster koloa-poster glass-card reveal"
          type="button"
          data-lightbox-src="${koloaInfograficoUrl}"
          data-lightbox-title="Koloa Maoli — infográfico completo"
          aria-label="Abrir infográfico completo do Koloa Maoli"
        >
          <img src="${koloaInfograficoUrl}" alt="Infográfico visual do pato-havaiano Koloa Maoli" loading="lazy">
          <span class="poster-hint">Ampliar imagem</span>
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
            <h3>Alimentação</h3>
            <p>Filtra alimento na água e pode inclinar o corpo, deixando a cauda para cima, sem precisar mergulhar fundo.</p>
          </article>
          <article class="koloa-card glass-card reveal danger">
            <span>04</span>
            <h3>Ameaça</h3>
            <p>A hibridização com marrecos-domésticos introduzidos é uma das principais ameaças à identidade genética da espécie.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="visual-archive" id="arquivo-visual" aria-labelledby="visual-archive-title">
      <div class="visual-archive-heading reveal">
        <p class="kicker">OUTRAS ESPÉCIES</p>
        <h2 id="visual-archive-title">Galeria de<br><em>infográficos.</em></h2>
        <p>Infográficos complementares com informações básicas sobre espécies ameaçadas. Clique em cada imagem para visualizar em tela cheia.</p>
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
            <span class="poster-hint">Ampliar imagem</span>
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
            <span class="poster-hint">Ampliar imagem</span>
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
            <span class="poster-hint">Ampliar imagem</span>
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

const startVideoLoops = async () => {
  const { createLoopingVideo } = await import('./videoStory.js')

  const introVideo = createLoopingVideo(document.querySelector('[data-loop-video="intro"]'), { endAt: 7.26 })
  const mergulhaoVideo = createLoopingVideo(document.querySelector('[data-loop-video="mergulhao"]'), { progressProperty: null })
  const koloaVideo = createLoopingVideo(document.querySelector('[data-loop-video="koloa"]'), { progressProperty: null })

  window.addEventListener('pagehide', () => {
    introVideo.destroy()
    mergulhaoVideo.destroy()
    koloaVideo.destroy()
  }, { once: true })
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(startVideoLoops, { timeout: 600 })
} else {
  window.setTimeout(startVideoLoops, 0)
}
