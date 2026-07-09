import {
  AmbientLight,
  Box3,
  BufferAttribute,
  BufferGeometry,
  Color,
  ConeGeometry,
  DirectionalLight,
  DoubleSide,
  FogExp2,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  QuadraticBezierCurve3,
  Scene,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from 'three'
import { getSceneConfig, isRegionScene, REGION_SCENES } from './sceneConfig.js'

const WATER_LEVEL = -1.55
const REGION_ORDER = Object.keys(REGION_SCENES)
const SHOW_SCENE_ACTORS = document.documentElement.hasAttribute('data-show-scene-actors')
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

function createDuck(palette, { legendary = false } = {}) {
  const duck = new Group()
  const materials = {
    feathers: new MeshStandardMaterial({ color: palette.feathers, roughness: 0.76, transparent: true }),
    wing: new MeshStandardMaterial({ color: palette.wing, roughness: 0.8, transparent: true }),
    beak: new MeshStandardMaterial({ color: palette.beak, roughness: 0.58, transparent: true }),
    eye: new MeshBasicMaterial({ color: '#07121e', transparent: true }),
    ripple: new MeshBasicMaterial({ color: palette.accent ?? '#7cb6d2', transparent: true, opacity: 0.22, depthWrite: false }),
    cloak: new MeshStandardMaterial({ color: '#0c2f4d', roughness: 0.72, metalness: 0.08, transparent: true }),
  }

  const body = new Mesh(new SphereGeometry(0.38, 16, 10), legendary ? materials.cloak : materials.feathers)
  body.scale.set(1.25, 0.72, 0.82)
  body.castShadow = true
  duck.add(body)

  const chest = new Mesh(new SphereGeometry(0.27, 14, 9), materials.feathers)
  chest.position.set(0.17, 0.04, 0)
  chest.scale.set(0.75, 0.88, 0.72)
  duck.add(chest)

  const wing = new Mesh(new SphereGeometry(0.25, 14, 9), materials.wing)
  wing.position.set(-0.07, 0.02, 0.24)
  wing.scale.set(1.15, 0.45, 0.52)
  wing.rotation.z = -0.18
  duck.add(wing)

  const head = new Mesh(new SphereGeometry(0.24, 16, 10), materials.feathers)
  head.position.set(0.34, 0.28, 0)
  head.castShadow = true
  duck.add(head)

  const beak = new Mesh(new ConeGeometry(0.1, 0.27, 4), materials.beak)
  beak.position.set(0.61, 0.25, 0)
  beak.rotation.z = -Math.PI / 2
  beak.rotation.y = Math.PI / 4
  duck.add(beak)

  const eyeGeometry = new SphereGeometry(0.025, 8, 6)
  const nearEye = new Mesh(eyeGeometry, materials.eye)
  nearEye.position.set(0.45, 0.36, 0.2)
  duck.add(nearEye)
  const farEye = nearEye.clone()
  farEye.position.z = -0.2
  duck.add(farEye)

  if (legendary) {
    const medallion = new Mesh(new TorusGeometry(0.065, 0.014, 6, 18), materials.beak)
    medallion.position.set(0.23, 0.12, 0.29)
    medallion.rotation.x = Math.PI / 2
    duck.add(medallion)
  }

  const ripple = new Mesh(new TorusGeometry(0.58, 0.008, 6, 42), materials.ripple)
  ripple.position.y = -0.25
  ripple.rotation.x = Math.PI / 2
  duck.add(ripple)
  Object.values(materials).forEach((material) => {
    material.userData.baseOpacity = material.opacity
  })
  duck.userData.materials = Object.values(materials)
  duck.userData.baseScale = 1
  return duck
}

function createParticles(count) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const gold = new Color('#e0b75f')
  const mist = new Color('#8fc2de')

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3
    positions[offset] = (Math.random() - 0.5) * 18
    positions[offset + 1] = Math.random() * 8 - 1.4
    positions[offset + 2] = (Math.random() - 0.5) * 13
    const color = Math.random() > 0.82 ? gold : mist
    colors[offset] = color.r
    colors[offset + 1] = color.g
    colors[offset + 2] = color.b
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('color', new BufferAttribute(colors, 3))
  return new Points(geometry, new PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.52,
    depthWrite: false,
  }))
}

function pointOnSphere(latitude, longitude, radius = 1.18) {
  const phi = MathUtils.degToRad(90 - latitude)
  const theta = MathUtils.degToRad(longitude + 180)
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function createGlobe() {
  const globe = new Group()
  const shell = new Mesh(
    new SphereGeometry(1.18, 24, 16),
    new MeshBasicMaterial({ color: '#5eb0cf', wireframe: true, transparent: true, opacity: 0.28, depthWrite: false }),
  )
  const glow = new Mesh(
    new SphereGeometry(1.14, 24, 16),
    new MeshBasicMaterial({ color: '#0d4160', transparent: true, opacity: 0.2, depthWrite: false }),
  )
  globe.add(glow, shell)

  const routes = [
    [[42, -102], [-15, -58]],
    [[50, 9], [3, 25]],
    [[34, 105], [-27, 133]],
    [[40, -75], [48, 12]],
  ]
  routes.forEach(([from, to]) => {
    const start = pointOnSphere(from[0], from[1])
    const end = pointOnSphere(to[0], to[1])
    const middle = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.65)
    const curve = new QuadraticBezierCurve3(start, middle, end)
    const arc = new Mesh(
      new TubeGeometry(curve, 28, 0.009, 4, false),
      new MeshBasicMaterial({ color: '#e3b95f', transparent: true, opacity: 0.62, depthWrite: false }),
    )
    globe.add(arc)
  })
  globe.userData.materials = []
  globe.traverse((object) => {
    if (object.material) {
      object.material.userData.baseOpacity = object.material.opacity
      globe.userData.materials.push(object.material)
    }
  })
  return globe
}

function setOpacity(object, opacity) {
  if (!object) return
  const materials = object.userData.materials ?? []
  materials.forEach((material) => {
    material.transparent = true
    material.opacity = material.userData.baseOpacity == null
      ? opacity
      : material.userData.baseOpacity * opacity
  })
  object.visible = opacity > 0.005
}

function collectMaterials(object) {
  const materials = []
  object.traverse((child) => {
    if (!child.material) return
    const source = Array.isArray(child.material) ? child.material : [child.material]
    const cloned = source.map((material) => {
      const clone = material.clone()
      clone.transparent = true
      clone.userData.baseOpacity = material.opacity
      materials.push(clone)
      return clone
    })
    child.material = Array.isArray(child.material) ? cloned : cloned[0]
  })
  object.userData.materials = materials
}

function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose()
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.filter(Boolean).forEach((material) => material.dispose())
  })
}

function createNoopController() {
  return { setStoryState() {}, preloadRegion() {}, destroy() {} }
}

export function initThreeScene(canvas) {
  if (!canvas) return null

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const compactMode = window.matchMedia('(max-width: 700px)').matches
  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, antialias: !compactMode, powerPreference: 'high-performance' })
  } catch {
    document.documentElement.classList.add('no-webgl')
    return createNoopController()
  }

  const scene = new Scene()
  scene.background = new Color('#061627')
  scene.fog = new FogExp2('#061627', 0.075)

  const camera = new PerspectiveCamera(52, 1, 0.1, 60)
  const cameraLookAt = new Vector3(0, -0.7, 0)
  camera.position.set(0, 1.65, 7.8)

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, compactMode ? 1.1 : 1.5))
  renderer.shadowMap.enabled = !compactMode

  const ambientLight = new AmbientLight('#7ca5c1', 0.72)
  const hemisphereLight = new HemisphereLight('#d5e9f3', '#06111d', 1.15)
  const moonLight = new DirectionalLight('#ffe0a0', 2.25)
  moonLight.position.set(-4, 7, 4)
  moonLight.castShadow = !compactMode
  scene.add(ambientLight, hemisphereLight, moonLight)

  const waterGeometry = new PlaneGeometry(30, 22, compactMode ? 20 : 34, compactMode ? 14 : 24)
  const waterBasePositions = waterGeometry.attributes.position.array.slice()
  const waterMaterial = new MeshStandardMaterial({
    color: '#0b4967', emissive: '#05273c', emissiveIntensity: 0.4,
    roughness: 0.38, metalness: 0.28, transparent: true, opacity: 0.8, side: DoubleSide,
  })
  const water = new Mesh(waterGeometry, waterMaterial)
  water.position.y = WATER_LEVEL
  water.rotation.x = -Math.PI / 2
  water.receiveShadow = !compactMode
  scene.add(water)

  const waterGrid = new Mesh(
    waterGeometry,
    new MeshBasicMaterial({ color: '#58a2c2', transparent: true, opacity: 0.1, wireframe: true, depthWrite: false }),
  )
  waterGrid.position.y = WATER_LEVEL + 0.012
  waterGrid.rotation.x = -Math.PI / 2
  scene.add(waterGrid)

  const particles = createParticles(compactMode ? 90 : 210)
  scene.add(particles)

  const mainDuck = createDuck({
    feathers: '#eef5f2', wing: '#cbdce1', beak: '#d8a33f', accent: '#d8ae56',
  }, { legendary: true })
  mainDuck.position.set(1.8, -1.25, 0.25)
  mainDuck.scale.setScalar(1.35)
  mainDuck.userData.baseScale = 1.35
  if (SHOW_SCENE_ACTORS) scene.add(mainDuck)

  const globe = createGlobe()
  globe.position.set(-0.5, -0.2, -1.3)
  globe.scale.setScalar(0.3)
  setOpacity(globe, 0)
  if (SHOW_SCENE_ACTORS) scene.add(globe)

  const regionRoot = new Group()
  if (SHOW_SCENE_ACTORS) scene.add(regionRoot)

  const modelCache = new Map()
  const loadingModels = new Map()
  let activeRegionId = ''
  let currentRegionModel = null
  let previousRegionModel = null
  let regionTransition = 1
  let loadToken = 0

  const buildProceduralRegion = (id) => {
    const config = REGION_SCENES[id]
    const object = createDuck({ ...config.duckPalette, accent: config.accent })
    object.userData.regionId = id
    object.userData.baseScale = 1.55
    object.scale.setScalar(1.55)
    return object
  }

  const prepareGlb = (model) => {
    collectMaterials(model)
    const bounds = new Box3().setFromObject(model)
    const size = bounds.getSize(new Vector3())
    const center = bounds.getCenter(new Vector3())
    model.position.sub(center)
    model.position.y += size.y * 0.5
    const wrapper = new Group()
    wrapper.add(model)
    const scale = size.y > 0 ? 1.2 / size.y : 1
    wrapper.scale.setScalar(scale)
    wrapper.userData.baseScale = scale
    wrapper.userData.materials = model.userData.materials
    return wrapper
  }

  const trimModelCache = (keepId) => {
    const protectedIds = new Set([keepId, activeRegionId])
    const entries = [...modelCache.entries()].filter(
      ([id, object]) =>
        !protectedIds.has(id) &&
        object !== currentRegionModel &&
        object !== previousRegionModel,
    )
    while (modelCache.size > 2 && entries.length) {
      const [id, object] = entries.shift()
      if (object.parent) object.parent.remove(object)
      disposeObject(object)
      modelCache.delete(id)
    }
  }

  const loadRegionModel = async (id) => {
    if (!isRegionScene(id)) return null
    if (modelCache.has(id)) return modelCache.get(id)
    if (loadingModels.has(id)) return loadingModels.get(id)

    const promise = (async () => {
      const config = REGION_SCENES[id]
      let object
      if (config.modelUrl) {
        try {
          const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
          const gltf = await new GLTFLoader().loadAsync(config.modelUrl)
          object = prepareGlb(gltf.scene)
        } catch {
          object = buildProceduralRegion(id)
        }
      } else {
        object = buildProceduralRegion(id)
      }
      modelCache.set(id, object)
      loadingModels.delete(id)
      trimModelCache(id)
      return object
    })()
    loadingModels.set(id, promise)
    return promise
  }

  const showRegion = async (id) => {
    if (!isRegionScene(id) || activeRegionId === id) return
    const token = ++loadToken
    const nextModel = await loadRegionModel(id)
    if (!nextModel || token !== loadToken) return

    previousRegionModel = currentRegionModel
    currentRegionModel = nextModel
    activeRegionId = id
    regionTransition = 0
    if (!currentRegionModel.parent) regionRoot.add(currentRegionModel)
    setOpacity(currentRegionModel, 0)
  }

  const pointer = { x: 0, y: 0 }
  const pointerTarget = { x: 0, y: 0 }
  let storyState = { id: 'hero', progress: 0, direction: 1 }
  let targetConfig = getSceneConfig('hero')
  let globeOpacityValue = 0

  const setStoryState = ({ id, progress = 0, direction = 1 }) => {
    storyState = { id, progress: clamp(progress), direction }
    targetConfig = getSceneConfig(id)
    if (SHOW_SCENE_ACTORS && isRegionScene(id)) showRegion(id)
  }

  const preloadRegion = (id) => {
    if (!SHOW_SCENE_ACTORS) return
    if (!isRegionScene(id)) return
    loadRegionModel(id)
    const nextId = REGION_ORDER[REGION_ORDER.indexOf(id) + 1]
    if (nextId && modelCache.size < 2) loadRegionModel(nextId)
  }

  const handlePointerMove = (event) => {
    pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2
    pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 2
  }

  const resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('resize', resize)
  resize()

  const startTime = performance.now()
  const targetCamera = new Vector3()
  const targetLookAt = new Vector3()
  const targetWaterColor = new Color()
  const targetFogColor = new Color()
  const targetAccent = new Color()
  let animationFrame = 0
  let frameCount = 0
  let destroyed = false

  const render = () => {
    animationFrame = 0
    if (destroyed) return
    const time = (performance.now() - startTime) / 1000
    const progress = storyState.progress
    const ease = reducedMotion ? 1 : 0.045

    pointer.x += (pointerTarget.x - pointer.x) * 0.025
    pointer.y += (pointerTarget.y - pointer.y) * 0.025

    targetCamera.fromArray(targetConfig.camera)
    targetLookAt.fromArray(targetConfig.lookAt)
    if (storyState.id === 'hero') targetCamera.z -= progress * 1.15
    if (storyState.id === 'about') targetCamera.x += progress * 0.45
    if (isRegionScene(storyState.id)) targetCamera.z -= progress * 0.35
    targetCamera.x += pointer.x * (compactMode ? 0.08 : 0.24)
    targetCamera.y -= pointer.y * (compactMode ? 0.05 : 0.12)
    camera.position.lerp(targetCamera, ease)
    cameraLookAt.lerp(targetLookAt, ease)
    camera.lookAt(cameraLookAt)

    targetWaterColor.set(targetConfig.water)
    targetFogColor.set(targetConfig.fog)
    targetAccent.set(targetConfig.accent)
    waterMaterial.color.lerp(targetWaterColor, ease)
    waterGrid.material.color.lerp(targetAccent, ease)
    scene.fog.color.lerp(targetFogColor, ease)
    scene.background.lerp(targetFogColor, ease)
    scene.fog.density = MathUtils.lerp(scene.fog.density, targetConfig.fogDensity, ease)
    moonLight.color.lerp(targetAccent, ease)
    ambientLight.intensity = MathUtils.lerp(ambientLight.intensity, storyState.id === 'about' ? 0.45 : 0.72, ease)

    const globeProgressRotation = storyState.id === 'map' ? progress * 0.7 : 0
    globe.rotation.x = MathUtils.lerp(globe.rotation.x, targetConfig.globeRotation[0], ease)
    globe.rotation.y = MathUtils.lerp(globe.rotation.y, targetConfig.globeRotation[1] + globeProgressRotation, ease)
    const globeScale = MathUtils.lerp(globe.scale.x, targetConfig.globeScale, ease)
    globe.scale.setScalar(globeScale)
    globeOpacityValue = MathUtils.lerp(globeOpacityValue, targetConfig.globeOpacity, ease * 2)
    setOpacity(globe, globeOpacityValue)

    let mainDuckTargetOpacity = targetConfig.mainDuckOpacity
    const mainDuckTargetPosition = new Vector3(1.8, -1.25, 0.25)
    if (storyState.id === 'footer') {
      mainDuckTargetPosition.x = -2.3 + progress * 4.8
      mainDuckTargetPosition.z = -0.4 - progress * 1.8
      mainDuckTargetOpacity *= 1 - progress * 0.55
    }
    mainDuck.position.lerp(mainDuckTargetPosition, ease)
    mainDuck.position.y += reducedMotion ? 0 : Math.sin(time * 0.85) * 0.0015
    mainDuck.rotation.y = MathUtils.lerp(mainDuck.rotation.y, storyState.id === 'about' ? -0.35 + progress * 0.7 : -0.15, ease)
    setOpacity(mainDuck, mainDuckTargetOpacity)

    if (currentRegionModel) {
      regionTransition = reducedMotion ? 1 : Math.min(1, regionTransition + 0.025)
      const smoothTransition = regionTransition * regionTransition * (3 - 2 * regionTransition)
      const regionPosition = targetConfig.regionDuckPosition ?? [1.8, -1.25, 0.25]
      currentRegionModel.position.fromArray(regionPosition)
      currentRegionModel.position.y += reducedMotion ? 0 : Math.sin(time * 0.9) * 0.05
      currentRegionModel.rotation.y = -0.35 + progress * 0.55
      const currentScale = currentRegionModel.userData.baseScale * MathUtils.lerp(0.88, 1, smoothTransition)
      currentRegionModel.scale.setScalar(currentScale)
      setOpacity(currentRegionModel, targetConfig.regionDuckOpacity * smoothTransition)

      if (previousRegionModel && previousRegionModel !== currentRegionModel) {
        setOpacity(previousRegionModel, targetConfig.regionDuckOpacity * (1 - smoothTransition))
        if (regionTransition >= 1) {
          regionRoot.remove(previousRegionModel)
          previousRegionModel = null
          trimModelCache(activeRegionId)
        }
      }
    }

    if (!reducedMotion) {
      const positions = waterGeometry.attributes.position
      for (let index = 0; index < positions.count; index += 1) {
        const offset = index * 3
        const x = waterBasePositions[offset]
        const y = waterBasePositions[offset + 1]
        positions.setZ(index, Math.sin(x * 0.55 + time * 0.65) * 0.12 + Math.cos(y * 0.72 + time * 0.5) * 0.08)
      }
      positions.needsUpdate = true
      if (!compactMode && frameCount % 3 === 0) waterGeometry.computeVertexNormals()
      particles.rotation.y = time * 0.012 + pointer.x * 0.025
      particles.position.y = Math.sin(time * 0.18) * 0.08
      frameCount += 1
    }

    renderer.render(scene, camera)
    animationFrame = window.requestAnimationFrame(render)
  }

  const handleVisibilityChange = () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = 0
    } else if (!animationFrame && !destroyed) {
      render()
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)
  render()

  const destroy = () => {
    if (destroyed) return
    destroyed = true
    window.cancelAnimationFrame(animationFrame)
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    modelCache.forEach((object) => disposeObject(object))
    scene.traverse((object) => {
      object.geometry?.dispose()
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.filter(Boolean).forEach((material) => material.dispose())
    })
    renderer.dispose()
  }

  return { setStoryState, preloadRegion, destroy }
}
