# Knowledge base plan

Not published: only `content/kb/<lang>/*.md` becomes pages. All articles in
`en/` are published (none is a draft), and every fact flagged for
confirmation was confirmed on 2026-11-22. Writers' notes in `<!-- ... -->`
comments never reach the page.

## Images still to add

Parked as comments so their articles can publish; turn one back into a
`![...](placeholder "...")` line to see it in dev, then replace it with the image.

- `why-convert-images-to-vector`: a photo collage of one traced logo as a
  vinyl sticker, a laser-engraved coaster and a 3D-printed keychain. (The
  800% zoom is done: `logo-png-vs-svg-800.svg`, drawn by `kb-diagrams.py`
  from `lion-badge.png` and `lion-badge.svg` in `scripts/kb-sources/images/`.)

`what-is-vtracer` reuses the landing page's screenshots (app window, Gen AI
lab, pencil sketch, vector layers); swap in others if you prefer. Its
translations should use the `zh`/`ja` Gen AI screenshots.

## Reading order

| # | Section | Article | Slug |
| - | --- | --- | --- |
| 1 | Basics | What are vector graphics? *(written)* | `what-are-vector-graphics` |
| 2 | Basics | Why convert a JPEG or PNG to vector? *(written)* | `why-convert-images-to-vector` |
| 3 | Basics | What is SVG? *(written)* | `what-is-svg` |
| 4 | Basics | What is VTracer? *(written)* | `what-is-vtracer` |
| 5 | How tracing works | How vector tracing works *(written)* | `how-vector-tracing-works` |
| 6 | How tracing works | Color clustering *(written)* | `color-clustering` |
| 7 | How tracing works | Stacked vs cutout *(written)* | `stacked-vs-cutout` |
| 8 | How tracing works | Curve fitting *(written)* | `curve-fitting` |
| 9 | VTracer 2 | From VTracer 1 to VTracer 2 *(written)* | `vtracer-1-vs-vtracer-2` |
| 10 | VTracer 2 | Gradient step explained *(written)* | `gradient-step` |
| 11 | VTracer 2 | What is a mesh gradient? *(written)* | `mesh-gradients` |
| 12 | VTracer 2 | Hardware and performance *(written)* | `hardware-and-performance` |
| 13 | Gen AI | The Gen AI lab: from prompt to vector *(written)* | `gen-ai-lab` |
| 14 | Gen AI | How AI image generators work: diffusion models explained *(written)* | `diffusion-models` |
| 15 | Gen AI | Text-to-image vs image-to-image *(written)* | `text-to-image-and-image-to-image` |
| 16 | Gen AI | Which AI image model is best for vector art? *(written)* | `ai-models-for-vector-art` |
| 17 | Gen AI | Art styles in the Gen AI lab *(written)* | `art-styles` |
| 18 | Gen AI | Pencil to vector *(written)* | `pencil-to-vector` |
| 19 | Gen AI | How to generate vector art with Stable Diffusion *(written)* | `stable-diffusion-vector-art` |
| 20 | Gen AI | How to generate vector art with FLUX *(written)* | `flux-vector-art` |
| 21 | Gen AI | How to generate vector art with Z-Image Turbo *(written)* | `z-image-vector-art` |
| 22 | Gen AI | How to generate vector art with ChatGPT Codex *(written)* | `chatgpt-codex-vector-art` |
| 23 | Tutorials | How to edit AI-generated art with a reference image *(written)* | `edit-with-a-reference-image` |

The Gen AI comparisons come from rounds in the app's history, collected by
`scripts/kb-gen-samples.py` into `scripts/kb-sources/gen-ai/` (previews and
`samples.json`); `kb-diagrams.py` draws the figures from there. Model facts
(publisher, release, architecture, license) are from the model cards and
papers linked in each article.

Slugs are the URLs in every language, so settle them before publishing.

## Open questions

Settled while writing articles 5-8, from the VTracer 1.0 README and the
Vision Cortex write-ups: cutout became seam-free in VTracer 1.0. Two claims
from the brain dump turned out to need care, and the articles say so:

- **Stacked is smaller** holds for logos and flat art (lion badge 9.8 KB vs
  17.3 KB cutout) but not for detailed images (photo 1.04 MB vs 675 KB).
- **Curve fitting shrinks files**: spline cuts nodes about fivefold but not
  bytes, since a curve carries six numbers; the saving comes from 1.0's
  simplify (about half). Article 8 is retitled accordingly.

The numbers come from `scripts/kb-traces.py` (VTracer 1, `pip install --pre
vtracer`); its traces feed the figures in `scripts/kb-diagrams.py`.

The VTracer 2 articles draw only on public sources: the landing page,
`CHANGELOG_VT2.md` and `CHANGELOG_APP.md` in `~/vtracer-public`, and the XSVG
docs. They describe what the engine does, never how, and do not mention
what is undisclosed. All facts in them were confirmed on 2026-11-22; the
Illustrator gradient mesh line links an Adobe Community answer as its source.

## Images to make

One sample image carried through the tracing articles keeps them consistent
and cheap to translate (images carry no text):

- Clustering → shapes → curves for one image (articles 5, 6, 8)
- Stacked vs cutout, shapes pulled apart, with path count and size (7)
- VT1 vs VT2 on noise, low resolution and a gradient (9); the landing page
  comparisons may already cover this
- Gradient step at 0, 8, 16, 32, 64, 128 (10)
- Linear vs radial vs mesh (11)

Figures go in `public/kb/images/<slug>/`; their sources in
`scripts/kb-sources/images/<slug>/`, which is not served. Diagrams for articles 1-4 are
drawn by `scripts/kb-diagrams.py`; the drop shape there can carry through the
tracing articles too.

## Later

Tutorials, once the concepts are in place (several follow from the use cases
in article 2): PNG to SVG, JPG to SVG, vectorize a
logo, sketch to line art, prompt to vector, SVGs for Cricut and laser cutting,
batch tracing with the CLI or Python.
