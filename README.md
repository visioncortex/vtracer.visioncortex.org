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
- The build has three HTML entries, listed in `vite.config.ts`: the landing
  page, [`privacy-policy.html`](privacy-policy.html) and
  [`terms-of-service.html`](terms-of-service.html). They are real static
  documents rather than client-side routes because GitHub Pages has no SPA
  fallback here, and because Google's OAuth review fetches `/privacy-policy`
  and `/terms-of-service` directly — root-level `.html` files so the exact
  slashless URLs answer 200 without a redirect. `scripts/prerender.mjs` runs
  after the build and bakes each document's full text into its HTML, so the
  legal pages are readable without JavaScript; their entries hydrate.
- The company facts inside those two documents — legal entity, registered
  office, company number, governing law, "last updated" — all come from `LEGAL`
  in [`src/site.ts`](src/site.ts). `address` is still empty; a company
  registered in England has to publish its registered office alongside its
  number, and the contact block prints it as soon as it is set.
- The comparator in the "Pixels in, curves out" section
  ([`src/components/TraceDemo.tsx`](src/components/TraceDemo.tsx)) draws the same
  artwork twice — once into a small buffer that is upscaled with smoothing off,
  once at full device resolution — so the raster/vector contrast is genuine
  rather than a pair of pre-baked images.
- Page copy and the feature list come from the VTracer README.
