---
title: "From VTracer 1 to VTracer 2: noise, resolution and gradients"
description: VTracer 1 struggles with JPEG noise, low resolution and smooth gradients. How VTracer 2's deep-learning engine handles all three, without inventing detail.
section: vtracer-2
order: 10
published: 2026-11-22
---

VTracer 1 traces the pixels it is given, faithfully. That is its strength on clean artwork and its weakness on everything else: when the pixels are noisy, too few or smoothly shaded, it traces those problems too. VTracer 2 adds a step before tracing that fixes the image first, and traces smooth color as gradients.

![Three close-ups, each shown as the source image, the VTracer 1 trace and the VTracer 2 trace. A corgi from a heavily compressed JPEG: VTracer 1 traces blotches into the eyes and fur, VTracer 2 is clean. A lion badge from a 144-pixel PNG: VTracer 1's outlines are lumpy and grey, VTracer 2's are smooth and black. A sunset sky: VTracer 1 paints it one flat peach, VTracer 2 keeps the gradient.](/kb/images/vtracer-1-vs-vtracer-2/comparison.svg "The same three images, traced by VTracer 1 and VTracer 2: a compressed JPEG, a small PNG and a smooth gradient.")

## Three limits of VTracer 1

### JPEG noise

JPEG compression leaves blocks and ripples around edges, and colors that drift within flat areas. To VTracer 1's [clustering](/kb/color-clustering) those are real changes of color, so they come out as blotches, specks and ragged edges, each one a shape in the file. The corgi above shows it: VTracer 1 writes 1,556 shapes in 501 KB, VTracer 2 writes 414 in 190 KB.

### Low resolution

A small image has few pixels along each edge. In the 144-pixel lion badge above, a strand of mane is two or three pixels wide, and its anti-aliased edge pixels are grey. VTracer 1 has little to follow: outlines come out lumpy, and the grey edge pixels become grey shapes of their own. [Curve fitting](/kb/curve-fitting) can smooth a staircase, but it cannot recover a shape the pixels do not describe.

### Smooth gradients

Clustering groups pixels into regions of flat color, so a gradient has nowhere to go: it comes out as bands, or, as in the sunset above, merges into one flat color. A trace of a sky, a shaded cheek or a glowing sun loses exactly the part that made it look good.

## What VTracer 2 does

VTracer 2 puts a deep-learning engine in front of tracing. Before a single curve is fitted, it:

- **Removes noise.** Compression blocks, ripples and grain are cleaned away, so they never reach clustering.
- **Upscales.** The image is reconstructed at up to 8× its size, so every edge has many pixels to follow and thin details become shapes rather than smudges.
- **Traces gradients as gradients.** Smooth color comes out as linear, radial or [mesh gradients](/kb/mesh-gradients) instead of bands. [Gradient step](/kb/gradient-step) is the setting that shapes how smooth color is traced.

The model is small, about 4.5 million parameters, and runs entirely on your device, accelerated by Metal on macOS and Vulkan on Windows and Linux. Your images are never uploaded.

## Upscaling without hallucination

Most upscaling models are trained to make images look plausible, and they do it by inventing: texture in a flat area, an extra strand of hair, detail that was never there. For a photo that might pass. For tracing it is a problem, because every invented detail becomes an invented shape in your SVG.

VTracer 2's engine is built not to do that. It recovers what is in the image, the edges, colors and shapes the pixels describe, and does not imagine objects, textures or detail into your artwork.

## The cost: time

All of this takes more work than VTracer 1's linear pipeline, so a first trace in VTracer 2 takes longer, more so on large images. The app keeps the slow part's result, so adjusting settings afterwards stays quick. [Hardware and performance](/kb/hardware-and-performance) explains what makes it faster.

## Which to use

VTracer 1 remains open source and free, and on clean, high-resolution, flat-color artwork its results can be all you need. It is also the engine to build on in your own software. VTracer 2 is for everything else: real-world JPEGs, small images, AI-generated art and anything with shading. See [What is VTracer?](/kb/what-is-vtracer)

<!-- The VTracer 1 traces come from scripts/kb-traces.py (vt1_vs_vt2); the VTracer 2 traces are the landing page's and the lion badge figure's. -->
