---
title: Stacked vs cutout mode
description: Stacked mode layers shapes on top of each other; cutout mode tiles them side by side. How they differ in file size, editing and cutting, and when to use each.
section: how-tracing-works
order: 30
published: 2026-11-22
---

After clustering has found the regions of an image, a tracer has to decide how to write them as shapes. VTracer offers two ways: **stacked**, its default, and **cutout**. Both look identical once rendered; they differ in how the shapes are built, which matters for file size, for editing and for machines that cut along every path.

## Two ways to build the same picture

![A blue drop with a white highlight, on a dark background, pulled into its three pieces twice. Stacked: a plain background, a whole drop and the highlight. Cutout: the background with a drop-shaped hole, the drop with a highlight-shaped hole, and the highlight. Gold lines mark every outline in the file.](/kb/images/stacked-vs-cutout/stacked-vs-cutout.svg "The same image as pieces. Gold marks each outline the file has to describe: stacked writes each edge once, cutout writes it twice, once for each side.")

- **Stacked** layers the shapes like paper cutouts. The background is a plain rectangle, the drop is whole, and the highlight sits on top. Each shape carries on underneath the shapes above it, and SVG's painting order does the rest: later shapes cover earlier ones, as explained in [What is SVG?](/kb/what-is-svg)
- **Cutout** cuts the shapes against each other like a jigsaw. Nothing overlaps: the background has a drop-shaped hole, and the drop has a hole where the highlight goes.

## File size

In cutout mode, every boundary between two shapes is written twice: once as the edge of one shape, and again as the edge, or the hole, of its neighbour. In stacked mode the shape on top carries the edge alone, and the shape beneath does not have to follow it. For the drop above, traced by VTracer 1, that makes the stacked file **1.1 KB** and the cutout file **2.9 KB**.

That saving is reliable for logos and flat artwork, but it is not a rule for every image. A shape lower in the stack still needs an outline of its own, around everything that rests on it, and in an image with many nested shades, such as a photo, those outlines add up. Traced with VTracer 1's default settings:

| Image | Stacked | Cutout |
| --- | --- | --- |
| The drop above, 120 × 120 | 1.1 KB | 2.9 KB |
| A lion badge logo, 144 × 144 | 9.8 KB | 17.3 KB |
| A photo of a cat and a dog, 800 × 597 | 1.04 MB | 675 KB |

So for logos, icons and illustration, stacked is usually the smaller file; for detailed, shaded images, cutout can be.

<!-- Measured with VTracer 1.0.0-alpha.4, default settings except the mode, by scripts/kb-traces.py (measure). -->

## Editing

Stacked shapes are easier to work with in a design app:

- **Every shape is whole.** Select the drop and you get the whole drop, not a ring with a hole punched in it. Move or recolor a shape and nothing behind it shows through.
- **The bottom layer is the silhouette.** The lowest shape of the subject is its whole outline, ready to recolor, use as a mask, or thicken into a border.

![A cartoon fox in color; the same fox's bottom-most shape alone, in blue, the silhouette of the whole fox; and the fox on a white border made by thickening that silhouette, like a die-cut sticker.](/kb/images/stacked-vs-cutout/silhouette.svg "In a stacked trace, the bottom shape is the silhouette of the whole subject: one path, ready to become a mask or a sticker border.")

That is why the cut line for a die-cut sticker is a single offset of one shape in stacked mode. See [Why convert a JPEG or PNG to vector?](/kb/why-convert-images-to-vector)

## Cutout is now seam-free

Older versions of VTracer built cutout mode by tracing each region separately, so two neighbours did not always share exactly the same edge, and gaps opened where they should have met.

VTracer 1.0 rebuilt cutout mode as a **seam-free mosaic**: it traces each boundary once and gives it to both neighbours, so the pieces fit exactly, with no gaps and no overlaps. With curve simplification turned on, each shared boundary is simplified once for both shapes, so they stay matched.

## Which to use

Use **stacked**, the default, for:

- Logos, icons and illustration you will edit, recolor or rearrange.
- Layered vinyl and paper crafts, where each layer sits on the one below.
- Stickers and masks built from the silhouette.

Use **cutout** for:

- Single-sheet cutting, plotting and laser work, where overlapping shapes would mean cutting the same line twice.
- Screen printing and embroidery, where colors should not be printed or stitched on top of each other.
- Detailed or photographic images, where it can be the smaller file.
- Anything where every point of the image should belong to exactly one shape, such as a mosaic or a paint-by-numbers template.
