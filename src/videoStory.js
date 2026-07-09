const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function createLoopingVideo(video, {
  progressElement,
  statusElement,
  startAt = 0.01,
  endAt,
} = {}) {
  if (!video) return { destroy() {} }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let rangeEnd = 0

  const updateProgress = () => {
    if (!rangeEnd) return
    if (video.currentTime >= rangeEnd) {
      video.currentTime = startAt
      if (!reducedMotion) video.play().catch(() => {})
    }

    const progress = clamp((video.currentTime - startAt) / Math.max(rangeEnd - startAt, 0.01))
    document.documentElement.style.setProperty('--intro-progress', progress)
    if (progressElement) progressElement.style.transform = `scaleX(${progress})`
  }

  const handleMetadata = () => {
    rangeEnd = Math.max(0.01, Math.min(video.duration - 0.02, endAt ?? video.duration - 0.02))
    video.currentTime = Math.min(startAt, rangeEnd)
    video.muted = true
    document.documentElement.classList.add('intro-video-ready')
    if (statusElement) statusElement.textContent = reducedMotion ? 'PAUSADO' : 'LOOP'
    if (reducedMotion) video.pause()
    else video.play().catch(() => {})
  }

  const handleError = () => {
    document.documentElement.classList.add('intro-video-error')
    if (statusElement) statusElement.textContent = 'VÍDEO INDISPONÍVEL'
  }

  video.addEventListener('loadedmetadata', handleMetadata)
  video.addEventListener('timeupdate', updateProgress)
  video.addEventListener('error', handleError)
  video.load()
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA) handleMetadata()

  return {
    destroy() {
      video.pause()
      video.removeEventListener('loadedmetadata', handleMetadata)
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('error', handleError)
      document.documentElement.style.removeProperty('--intro-progress')
    },
  }
}

export function createVideoScrubber(video, {
  progressElement,
  statusElement,
  startAt = 0.01,
  endAt,
} = {}) {
  if (!video) return { setProgress() {}, destroy() {} }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let duration = 0
  let rangeEnd = 0
  let progress = 0
  let frame = 0
  let destroyed = false

  const render = () => {
    frame = 0
    if (destroyed) return

    const safeProgress = reducedMotion ? 0 : clamp(progress)
    document.documentElement.style.setProperty('--intro-progress', safeProgress)
    if (progressElement) progressElement.style.transform = `scaleX(${safeProgress})`

    if (!duration || video.readyState < HTMLMediaElement.HAVE_METADATA) return
    const rangeStart = Math.min(Math.max(0.01, startAt), rangeEnd)
    const targetTime = rangeStart + (rangeEnd - rangeStart) * safeProgress
    if (Math.abs(video.currentTime - targetTime) > 0.025) video.currentTime = targetTime
  }

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render)
  }

  const handleMetadata = () => {
    duration = Number.isFinite(video.duration) ? video.duration : 0
    rangeEnd = Math.max(0.01, Math.min(duration - 0.02, endAt ?? duration - 0.02))
    video.pause()
    if (duration && video.currentTime === 0) video.currentTime = Math.min(startAt, rangeEnd)
    document.documentElement.classList.add('intro-video-ready')
    if (statusElement) statusElement.textContent = duration ? `${rangeEnd.toFixed(1)} SEG` : 'PRONTO'
    requestRender()
  }

  const handleError = () => {
    document.documentElement.classList.add('intro-video-error')
    if (statusElement) statusElement.textContent = 'IMAGEM RESERVA'
  }

  video.addEventListener('loadedmetadata', handleMetadata)
  video.addEventListener('error', handleError)
  video.load()
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA) handleMetadata()

  return {
    setProgress(nextProgress) {
      progress = nextProgress
      requestRender()
    },
    destroy() {
      destroyed = true
      window.cancelAnimationFrame(frame)
      video.removeEventListener('loadedmetadata', handleMetadata)
      video.removeEventListener('error', handleError)
      video.pause()
      video.removeAttribute('src')
      video.load()
      document.documentElement.style.removeProperty('--intro-progress')
    },
  }
}
