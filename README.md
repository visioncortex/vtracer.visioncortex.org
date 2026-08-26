# vtracer.visioncortex.org

The landing page for [VTracer](https://github.com/visioncortex/vtracer), the
raster-to-vector graphics converter.

Built with Vite + React + TypeScript, deployed to GitHub Pages on every push to
`main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Develop

```sh
nvm use          # Node 22, per .nvmrc
npm install
npm run dev
```

## Build

```sh
npm run build    # emits ./dist
npm run preview
```

`bash build.sh` is what CI runs — a clean install plus a production build.

## Notes

- Display type is [Gloock](https://fonts.google.com/specimen/Gloock); body is
  Inter and JetBrains Mono, all loaded from Google Fonts in `index.html`.
- `public/CNAME` pins the custom domain, and is copied into `dist` by Vite.
- The comparator in the "Pixels in, curves out" section
  ([`src/components/TraceDemo.tsx`](src/components/TraceDemo.tsx)) draws the same
  artwork twice — once into a small buffer that is upscaled with smoothing off,
  once at full device resolution — so the raster/vector contrast is genuine
  rather than a pair of pre-baked images.
- Page copy and the feature list come from the VTracer README.
