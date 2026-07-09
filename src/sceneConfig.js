const regionScene = ({ accent, water, fog, rotation, feathers, wing, beak }) => ({
  camera: [0, 1.3, 6.8],
  lookAt: [0, -0.75, 0],
  accent,
  water,
  fog,
  fogDensity: 0.065,
  globeOpacity: 0.62,
  globeScale: 1,
  globeRotation: rotation,
  mainDuckOpacity: 0,
  regionDuckOpacity: 1,
  regionDuckPosition: [1.8, -1.25, 0.25],
  duckPalette: { feathers, wing, beak },
  modelUrl: null,
})

export const STATIC_SCENES = {
  hero: {
    camera: [0, 1.65, 7.8],
    lookAt: [0, -0.7, 0],
    accent: '#d8ae56',
    water: '#0b4967',
    fog: '#061627',
    fogDensity: 0.075,
    globeOpacity: 0,
    globeScale: 0.3,
    globeRotation: [0.1, 0],
    mainDuckOpacity: 1,
    regionDuckOpacity: 0,
  },
  about: {
    camera: [1.05, 1.45, 6.55],
    lookAt: [0.25, -0.68, 0],
    accent: '#edc873',
    water: '#123c56',
    fog: '#081d31',
    fogDensity: 0.082,
    globeOpacity: 0,
    globeScale: 0.45,
    globeRotation: [0.1, 0.35],
    mainDuckOpacity: 0.85,
    regionDuckOpacity: 0,
  },
  map: {
    camera: [0, 2.15, 8.6],
    lookAt: [0, -0.45, 0],
    accent: '#79bdd8',
    water: '#0a405e',
    fog: '#06192c',
    fogDensity: 0.058,
    globeOpacity: 1,
    globeScale: 1,
    globeRotation: [0.14, -0.4],
    mainDuckOpacity: 0.14,
    regionDuckOpacity: 0,
  },
  curiosidades: {
    camera: [-0.5, 1.75, 7.4],
    lookAt: [0, -0.55, 0],
    accent: '#e2b85e',
    water: '#0d3b55',
    fog: '#071827',
    fogDensity: 0.085,
    globeOpacity: 0.18,
    globeScale: 0.72,
    globeRotation: [0.2, 0.8],
    mainDuckOpacity: 0.18,
    regionDuckOpacity: 0.16,
  },
  footer: {
    camera: [0, 1.35, 8.2],
    lookAt: [0, -0.9, 0],
    accent: '#f0d18c',
    water: '#071f34',
    fog: '#030b13',
    fogDensity: 0.1,
    globeOpacity: 0,
    globeScale: 0.2,
    globeRotation: [0.1, 1.2],
    mainDuckOpacity: 0.75,
    regionDuckOpacity: 0,
  },
}

export const REGION_SCENES = {
  'america-do-norte': regionScene({
    accent: '#85d6c5', water: '#0b5361', fog: '#071f2d', rotation: [0.15, -1.8],
    feathers: '#dce8dd', wing: '#287367', beak: '#d4a348',
  }),
  'america-do-sul': regionScene({
    accent: '#5fd3a8', water: '#075746', fog: '#06261e', rotation: [-0.5, -1.25],
    feathers: '#d6dfd8', wing: '#174f3e', beak: '#cf7d42',
  }),
  europa: regionScene({
    accent: '#91b9d8', water: '#234e6d', fog: '#142435', rotation: [0.2, -0.15],
    feathers: '#d8dfdf', wing: '#657c8e', beak: '#b9a064',
  }),
  africa: regionScene({
    accent: '#e5ad5d', water: '#3e4354', fog: '#241b24', rotation: [-0.25, 0.25],
    feathers: '#d9d0b8', wing: '#4c4037', beak: '#c7883b',
  }),
  asia: regionScene({
    accent: '#e2a34e', water: '#35374c', fog: '#211827', rotation: [0.2, 1.05],
    feathers: '#efe0ca', wing: '#9f493d', beak: '#da6a45',
  }),
  oceania: regionScene({
    accent: '#69d5dc', water: '#0d5962', fog: '#08262d', rotation: [-0.55, 2.35],
    feathers: '#bec8c4', wing: '#345f63', beak: '#788c82',
  }),
}

export const isRegionScene = (id) => Object.hasOwn(REGION_SCENES, id)

export const getSceneConfig = (id) => REGION_SCENES[id] ?? STATIC_SCENES[id] ?? STATIC_SCENES.hero
