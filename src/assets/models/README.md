# Modelos GLB

Cada arquivo deve ter origem na linha d'água, escala aplicada, um único material e textura de até 512 px.

Limites:

- `ducklaus.glb`: até 15 mil triângulos e 400 KB.
- Modelos regionais: entre 5 e 12 mil triângulos e até 400 KB cada.

Para ativar um modelo, defina seu `modelUrl` em `src/sceneConfig.js` usando `new URL('./assets/models/arquivo.glb', import.meta.url).href`.
