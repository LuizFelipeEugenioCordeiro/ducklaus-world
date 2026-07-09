const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function initScrollStory({
  selector = '[data-scene]',
  onUpdate,
  onEnter,
  onApproach,
} = {}) {
  const steps = [...document.querySelectorAll(selector)]
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let animationFrame = 0
  let lastScrollY = window.scrollY
  let activeId = ''

  const update = () => {
    animationFrame = 0
    const viewportAnchor = window.innerHeight * 0.52
    const direction = window.scrollY >= lastScrollY ? 1 : -1
    lastScrollY = window.scrollY

    let activeStep = steps[0]
    let closestDistance = Number.POSITIVE_INFINITY

    steps.forEach((step) => {
      const rect = step.getBoundingClientRect()
      const center = rect.top + rect.height * 0.5
      const distance = Math.abs(center - viewportAnchor)
      if (distance < closestDistance) {
        closestDistance = distance
        activeStep = step
      }
    })

    if (!activeStep) return
    const rect = activeStep.getBoundingClientRect()
    const isStickyStep = activeStep.dataset.progressMode === 'sticky'
    const progress = reducedMotion
      ? (rect.top <= viewportAnchor ? 1 : 0)
      : isStickyStep
        ? clamp(-rect.top / Math.max(rect.height - window.innerHeight, 1))
        : clamp((viewportAnchor - rect.top) / Math.max(rect.height, 1))
    const id = activeStep.dataset.scene
    activeStep.style.setProperty('--scene-progress', `${(progress * 100).toFixed(1)}%`)

    if (id !== activeId) {
      document.querySelectorAll(`${selector}.is-scene-active`).forEach((step) => step.classList.remove('is-scene-active'))
      activeStep.classList.add('is-scene-active')
      document.documentElement.dataset.scene = id
      activeId = id
      onEnter?.({ id, element: activeStep, direction })
    }

    onUpdate?.({ id, progress, direction })
  }

  const requestUpdate = () => {
    if (!animationFrame) animationFrame = window.requestAnimationFrame(update)
  }

  const approachObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onApproach?.(entry.target.dataset.scene)
    })
  }, { rootMargin: '65% 0px', threshold: 0 })

  steps.forEach((step) => approachObserver.observe(step))
  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate)
  requestUpdate()

  return () => {
    window.cancelAnimationFrame(animationFrame)
    window.removeEventListener('scroll', requestUpdate)
    window.removeEventListener('resize', requestUpdate)
    approachObserver.disconnect()
  }
}
