---
title: Gradient step explained
description: Gradient step controls how a tracer turns smooth color into shapes. What the setting does, how VTracer 2 picks it, and one image compared from 0 to 128.
section: vtracer-2
order: 20
published: 2026-11-22
---

Smooth color is the hardest thing for a tracer to describe. A sky that fades from orange to blue has no edges for clustering to find, yet it is not one color either. **Gradient step** is the setting that decides how finely such a change of color is divided.

## What it measures

Gradient step is a color difference. When VTracer builds its [tree of regions](/kb/color-clustering), a region only becomes a layer of its own if its color differs from the layer beneath by at least the gradient step. Values run from 0 to 255.

- **A small step** keeps small differences apart: more shapes and a larger file. At 0, nothing is merged at all.
- **A large step** merges them: fewer, broader shapes and a smaller file, with the shading inside each shape left to its gradient.

In VTracer 1, the default is 16, and every layer is a flat color, so a gradient always comes out as bands; the step only decides how many. VTracer 2 traces gradients as gradients, so the step decides something more useful: where one smooth area ends and the next begins.


## The same image at different values

A soft, clay-like character is a hard test: almost every part of it is shaded. Here it is traced by VTracer 2 at three gradient steps, and once more with mesh gradients:

![A cartoon girl's head with soft, rounded shading, with a box marking her eyes and cheek; then a close-up of that area from the source and from four VTracer 2 traces. At gradient step 0 the skin and hair are mottled with small patches; at 16 the patches are broader; at 32 the shading is flat, with hard edges across the cheek; at 32 with mesh gradients, the blush and the shine on the hair fade smoothly, closest to the source.](/kb/images/gradient-step/steps.svg "The source and its close-up, then VTracer 2 at gradient step 0, 16 and 32, and 32 with mesh gradients, each with its path count and file size.")

| Gradient step | Paths | File size | What you see |
| --- | --- | --- | --- |
| 0 | 337 | 237 KB | Nothing merged: every slight change of shading keeps its own shape, so skin and hair look mottled |
| 16 | 185 | 158 KB | Broader areas, fewer patches |
| 32 | 99 | 93 KB | Broad, flat areas, with hard edges where the shading should fade |
| 32 with mesh gradients | 142 | 147 KB | The broad areas of 32, shaded smoothly inside: the closest to the source |

A smaller step is not a smoother trace. At 0, the tracer keeps every faint step in the shading as an edge between shapes, and edges are what the eye notices. A larger step gives fewer edges, and the shading inside each area is then up to its gradient. A linear gradient can only change in one direction, so the round cheek at 32 still shows seams; a [mesh gradient](/kb/mesh-gradients) can follow the shading in any direction, so with it, step 32 comes out smooth. Here is the whole face:

![Three versions of the same cartoon girl's head, with soft, clay-like shading, shown whole. First, the source image. Second, the VTracer 2 trace at gradient step 32: the cheeks and hair are broken into flat bands with hard edges. Third, the same trace with mesh gradients: the blush on the cheeks and the shine on the hair fade smoothly, close to the source.](/kb/images/gradient-step/mesh.svg "The source, and step 32 without and with mesh gradients. The mesh adds 43 paths and keeps the same broad areas, shaded smoothly inside.")

## Let VTracer 2 choose

You rarely need to set it yourself. VTracer 2 picks a gradient step for each image on its first trace, looking at the artwork itself, so a flat logo and a painted illustration each start from a value that suits them. Change it only if the result is not what you want:

- **Too many shapes, or a mottled, patchy look:** raise the gradient step.
- **Two different colors merged into one:** lower it.
- **Hard edges across soft shading:** turn on Mesh Gradient.

## Where the gradients go

The smooth areas are written into the SVG as gradients: linear and radial gradients, which every browser and design app draws, or, with the Mesh Gradient option on, [mesh gradients](/kb/mesh-gradients), which can follow color that changes in several directions at once.
