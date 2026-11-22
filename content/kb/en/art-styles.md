---
title: Art styles in the Gen AI lab
description: One prompt in nine art styles, from cartoon to stencil and line art. What each looks like, how it traces, and which suits logos, stickers, cutting and print.
section: gen-ai
order: 20
published: 2026-11-22
---

An **art style** tells the Gen AI lab what kind of artwork to make. You write the subject; the style adds the look, from soft cartoon shading to a single-color silhouette. Because the lab is making artwork to trace, every style is a vector-friendly one: flat colors, clean edges, nothing photographic.

## One prompt, nine styles

Here is the same prompt, *a red fox sitting*, with the same model and the same [seed](/kb/gen-ai-lab#seeds), in each of the nine styles. Only the style changes.

![Nine traced red foxes in a three by three grid, numbered and named: None, a clean illustration with no style added; an inked cartoon with thick outlines; a minimal flat design; a mascot-like clip art fox with bold black outlines; a soft cartoon; a single red stencil silhouette; a low-poly fox made of triangles; a bold linocut in red and black; and a fox drawn in thin black outline only.](/kb/images/art-styles/styles.svg "One prompt, one seed, one model, nine art styles, numbered as in the table below.")

| # | Style | The look | Paths | SVG size |
| --- | --- | --- | --- | --- |
| 1 | None | No style added: a clean vector illustration in the model's own manner | 29 | 22 KB |
| 2 | Inked | Thick ink outlines and flat cel colors, like a comic | 90 | 58 KB |
| 3 | Flat design | Minimal geometric shapes, defined by color alone, no outlines | 15 | 8.3 KB |
| 4 | Clip art | A mascot look: bold black outlines, flat colors, simple shapes | 15 | 12 KB |
| 5 | Cartoon | A friendly cartoon illustration with soft shading | 39 | 25 KB |
| 6 | Stencil | A single-color silhouette, like a pictogram | 2 | 3.5 KB |
| 7 | Low poly | Built from flat triangles, like a faceted gem | 53 | 31 KB |
| 8 | Linocut | Bold carved shapes and heavy black, in two colors, like a woodcut print | 40 | 23 KB |
| 9 | Line art | A clean, even outline, no fill and no shading | 13 | 8.8 KB |

<!-- Generated with Z-Image Turbo, 512 × 512, 8 steps, seed 42, traced by VTracer 2 with the background removed. -->

## How the style changes the trace

The style decides how much there is to trace. Inked art, with its outlines and many cel-shaded patches, comes out at 90 paths; a stencil is a single silhouette in two. Simple styles make small, tidy files that are easy to edit; detailed styles keep more of the character.

Each style also comes with tracing settings that suit it. Stencil, for example, is traced in [cutout mode](/kb/stacked-vs-cutout), so its one color comes out as a single clean shape with no overlaps, ready to cut.

## Choosing a style

| For | Try |
| --- | --- |
| Logos, icons and mascots | Clip art, Flat design |
| Stickers and die cuts | Clip art, Cartoon, Inked |
| Single-color cutting: vinyl, stencils, laser-cut silhouettes | Stencil |
| Laser engraving, coloring pages, embroidery outlines | Line art, Linocut |
| Screen printing in a few inks | Linocut, Flat design, Stencil |
| Illustration to edit and recolor | Cartoon, Inked, None |
| Geometric, modern decoration | Low poly, Flat design |

Why these uses need vectors in the first place: [Why convert a JPEG or PNG to vector?](/kb/why-convert-images-to-vector)

## Tips

- **Describe the subject, not the style.** The style adds its own wording, so *a red fox sitting* is enough; adding *flat colors* or *outlines* yourself can pull against it.
- **Try a few seeds.** Each seed is a new take on the same prompt and style.
- **Keep it to one subject.** The lab is tuned for a single, whole subject on a plain background, which is what traces cleanly.
