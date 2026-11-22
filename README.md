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

## Knowledge base

Articles live in [`content/kb/`](content/kb/), one Markdown file per article
per language, and are rendered to plain static HTML at build time:

| File | URL |
| --- | --- |
| `content/kb/en/png-to-svg.md` | `/kb/png-to-svg` |
| `content/kb/zh/png-to-svg.md` | `/zh/kb/png-to-svg` |
| `content/kb/ja/png-to-svg.md` | `/ja/kb/png-to-svg` |

`/kb/`, `/zh/kb/` and `/ja/kb/` list each language's articles. While writing,
`npm run dev` serves every page at the same URLs and reloads on save.

Each file starts with front matter:

```md
---
title: How to convert a PNG to SVG
description: Shown in search results; under 160 characters (90 for zh/ja).
section: tutorials
order: 10
published: 2026-11-21
updated: 2026-11-28
draft: true
---
```

- `section` is an id from `SECTIONS` in [`src/kb/copy.ts`](src/kb/copy.ts),
  which also names each section in every language and sets the sidebar order.
  `order` sorts articles within a section (default 100).
- `updated` defaults to `published`. `image` (root-relative) overrides the
  social card.
- `draft: true` shows the article in dev, marked as a draft, and leaves it out
  of the build. Files starting with `_` are ignored entirely.
- The title is the page's `<h1>`, so the body starts at `##`. Every `##` and
  `###` gets a linkable id.
- Put images in `public/kb/images/<slug>/` and reference them as
  `/kb/images/<slug>/name.png`. Link between articles as `/kb/<slug>`.
- An image on a line of its own becomes a figure, and its title becomes the
  caption: `![Alt text](/kb/images/slug/file.svg "Caption")`.
- A `.mp4` or `.webm` in the same place becomes a short clip that plays muted
  and loops, like a GIF. Put its still beside it as `<name>-poster.webp`;
  readers who ask for less motion see the still instead.
- A **placeholder** marks an image still to capture or generate:
  `![What to capture](placeholder "Caption")`. The dev server shows it as a
  dashed box; the build refuses to publish an article that still has one.
- `<!-- comments -->` are notes for writers and translators and never reach
  the page.
- Diagrams are drawn by [`scripts/kb-diagrams.py`](scripts/kb-diagrams.py)
  (`python3 scripts/kb-diagrams.py` regenerates them). They carry no words,
  only numbers, file types and code, so every language uses the same files;
  the captions do the explaining.
- Only what an article shows goes in `public/kb/images/`, because everything
  there is served. What the figures are drawn from (traces, photos, sketches,
  samples from the app) lives in `scripts/kb-sources/`, outside the build:
  `images/<slug>/` for files the figures read, and `gen-ai/` for the Gen AI
  samples that [`scripts/kb-gen-samples.py`](scripts/kb-gen-samples.py)
  collects. [`scripts/kb-traces.py`](scripts/kb-traces.py) makes the VTracer 1
  sample traces (it needs `pip install --pre vtracer`).

**Translating.** Copy the English file to the same name under `zh/` or `ja/`
and translate the title, description and body; `section`, `order` and `image`
are taken from the English original, and `published` is the translation's
own date. Links to `/`, `/kb/` and `/kb/<slug>` are pointed at the same
language automatically once that page exists in it. Translations of one
article link to each other (hreflang and an "Also in" line), and the footer's
language picker goes to the same article in the chosen language. The chrome
around the articles (sidebar labels, dates, prev/next) is in `KB_COPY` in
`src/kb/copy.ts`.

The build also writes `sitemap.xml` (the landing pages plus every published
article in every language) and adds Article and breadcrumb structured data to
each page. A language with no published articles gets no pages at all.
