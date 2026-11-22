---
title: "Curve fitting: from pixel staircase to smooth curves"
description: The last stage of tracing turns jagged pixel outlines into a few smooth Bézier curves. How it works, what its settings do, and its effect on file size.
section: how-tracing-works
order: 40
published: 2026-11-22
---

After clustering, every region of an image is a patch of pixels, and its outline runs along pixel edges: across, down, across, down. A diagonal line or a curve becomes a staircase. **Curve fitting** is the last stage of tracing: it replaces each staircase with a few smooth curves that follow the same outline, while keeping the corners that are really there.

## Three ways to draw the same outline

VTracer can stop at different points along the way, and its three modes show the steps:

![The same small drop traced three times over its pixels: as a pixel staircase with 68 nodes, as a polygon with 10 straight sides, and as a smooth spline with 8 nodes.](/kb/images/curve-fitting/modes.svg "One 40 × 40 drop, traced in VTracer's three modes over its pixels. The gold squares are the nodes: 68 for pixel, 10 for polygon, 8 for spline.")

- **Pixel** keeps the staircase: every step is a node. It is a faithful copy of the pixels, which is what you want for pixel art.
- **Polygon** replaces the staircase with straight lines. Few nodes, but curves become corners.
- **Spline**, the default, smooths the outline into Bézier curves, keeping sharp corners only where the shape has them.

## How VTracer fits curves

VTracer's tracing write-up describes the pipeline in five steps:

1. **Walking the outline.** A walker follows the edge of each region, combining consecutive steps in the same direction. This is the pixel mode result.
2. **Removing staircases.** Each staircase becomes a straight line. To keep a shape consistent, it chooses throughout whether to cut corners inward or outward.
3. **Simplifying.** A line is stretched over as much of the path as it can follow within a tolerance, and the points in between are dropped. This is the polygon mode result.
4. **Smoothing.** The polygon is subdivided with a four-point scheme, adding points that round off its edges, until every segment is shorter than a set length. Vertices that turn sharply enough are kept as corners rather than rounded.
5. **Splicing and fitting.** The smoothed path is cut where its bend changes direction or where it has turned far enough, and a cubic Bézier curve is fitted to each piece. This is the spline result.

## The settings

| Setting | Default | What it does |
| --- | --- | --- |
| Mode | Spline | Pixel, polygon or spline, as above |
| Corner threshold | 60° | How sharply the path must turn at a point to stay a corner |
| Segment length | 4 | Smoothing subdivides until segments are shorter than this, from 3.5 to 10 |
| Splice threshold | 45° | How far a curve may turn before it is cut into two |
| Simplify | Off | Refits smooth runs with the fewest curves that stay within this distance, in pixels |
| Path precision | 2 | Decimal places written for each coordinate |

The defaults for corners, segments and splicing suit virtually every image; in VTracer 1.0 they are hidden from the command line's help for that reason. **Simplify**, new in 1.0, is the setting that moves smoothness and file size. Try values from 1 to 2.5.

## What it does to file size

Fewer nodes do not automatically mean a smaller file. A step in the pixel outline is written with two numbers, but a Bézier curve needs six: two control points and an end point. Traced with VTracer 1:

| Mode | Lion badge logo, 144 × 144 | Cat and dog photo, 800 × 597 |
| --- | --- | --- |
| Pixel | 10.6 KB | 742 KB |
| Polygon | 3.0 KB | 280 KB |
| Spline | 9.8 KB | 1.04 MB |
| Spline, simplify 1.5 | 4.8 KB | 677 KB |

<!-- Measured with VTracer 1.0.0-alpha.4, stacked, otherwise default settings, by scripts/kb-traces.py (measure). -->

- **Spline** uses about a fifth of the commands of the pixel outline (391 against 2,242 for the lion badge), but the file is no smaller, and for the photo it is larger, because each command carries more numbers.
- **Polygon** is the smallest, at the cost of angular outlines.
- **Simplification** is where curve fitting saves space: it halves the spline file for the logo and takes a third off the photo, while staying within a pixel and a half of the original outline.

**Path precision** trims every number. Two decimal places, the default, is a hundredth of a pixel at the image's own size, far finer than anyone can see.

## Smoothness vs fidelity

- **Too loose**, and corners round off and small bumps disappear: a star's points go soft, lettering loses its serifs.
- **Too tight**, and the curves follow every wobble of the pixel edge, so the staircase creeps back as lumps.

The size of the image matters as much as the settings. With more pixels along each edge, the fitter has more to follow, which is why VTracer 2 upscales an image before tracing it. See [From VTracer 1 to VTracer 2](/kb/vtracer-1-vs-vtracer-2).
