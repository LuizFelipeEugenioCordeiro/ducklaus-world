const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function createLoopingVideo(video, {
  progressElement,
  statusElement,
  progressProperty = '--intro-progress',
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
    if (progressProperty) document.documentElement.style.setProperty(progressProperty, progress)
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
      if (progressProperty) document.documentElement.style.removeProperty(progressProperty)
    },
  }
}
