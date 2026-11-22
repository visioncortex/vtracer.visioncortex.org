---
title: Why convert a JPEG or PNG to vector?
description: Logos, print, laser engraving, die cutting, 3D printing: why so many design and making workflows need a vector file, and what goes wrong with a JPEG or PNG.
section: basics
order: 15
published: 2026-11-21
---

Because a JPEG or PNG is a fixed grid of pixels, it can only be shown well at one size and it has no outlines for a machine to follow. Printing large, building a brand, cutting vinyl, engraving with a laser or modelling for a 3D printer all need either sharpness at any size or shapes to follow, and a vector file gives both.

A familiar story: the only copy of a logo is a 300-pixel PNG saved from an old website, and now it has to go on a banner, a sticker sheet and a laser-engraved sign. Converting it to vector once covers all three.

<!-- Placeholder, add when ready: Photo collage: one traced logo made into three real objects, a vinyl sticker, a laser-engraved wooden coaster and a 3D-printed keychain. Caption: "One vector file, three very different machines." -->

## Logos and brand assets

A logo has to work everywhere at once: a 16-pixel browser icon, a business card, a shop sign, an embroidered polo shirt. A raster logo only looks right near the size it was saved at. A vector logo is drawn fresh at every size.

Vector also makes the variations a brand needs easy: a one-color version for stamps and engraving, a white version for dark backgrounds, an outline version for embroidery. Each is a quick change of fill colors rather than a redraw. This is why printers, sign makers and agencies routinely ask for the logo "as a vector file", meaning SVG, AI, EPS or PDF.

![A lion badge logo's face zoomed to 800%, twice: on the left the 144-pixel PNG, its edges broken into blocky pixels; on the right the traced SVG, with smooth, sharp edges.](/kb/images/why-convert-images-to-vector/logo-png-vs-svg-800.svg "A 144 × 144 logo at 800%. The PNG shows its pixels; the SVG is drawn fresh at the new size.")

## Graphic design and illustration

In Illustrator, Figma, Inkscape or Affinity, a vector is made of parts you can work with: select a shape, recolor it, move it, reuse it in another layout. A raster image is a single block you can only paint over.

Converting artwork to vector turns a picture into a design asset. That includes artwork that started life as pixels: a scanned sketch, a client's old JPEG, or an image from an AI generator. [What is VTracer?](/kb/what-is-vtracer) walks through that workflow from idea to finished SVG.

## Websites and apps

SVG icons and illustrations stay crisp on high-resolution screens, are usually smaller than an equivalent PNG, and can be recolored with CSS. One file serves every screen density.

## Printing

Print needs far more pixels than a screen: the usual guidance is around 300 pixels per inch at the final size. For a 2-metre banner, that is a raster file tens of thousands of pixels wide. A vector file prints sharp at any size with no such arithmetic, which is why large format printing, vehicle wraps and signage prefer it.

**Screen printing** goes further. Each ink is printed through its own screen, so the artwork has to be split into one layer per color, called color separations. With vector artwork in a few solid colors, each separation is simply the shapes of one color.

![A sunset illustration made of three colors, shown as the sum of three separate single-color layers: the sun, the back hill and the front hill.](/kb/images/why-convert-images-to-vector/color-separations.svg "Color separations for screen printing: one screen per ink. In vector artwork each separation is just the shapes of one color.")

## Laser cutting and engraving

A laser works in two ways:

1. **Cutting and scoring** move the beam along a path, once around each outline. That path has to come from vector shapes.
2. **Raster engraving** sweeps the beam back and forth, line by line, like a printer, and can work from a picture.

![A drop shape marked two ways: on the left a dashed line where the laser follows the outline once; on the right horizontal lines where the laser sweeps across the whole shape.](/kb/images/why-convert-images-to-vector/laser-cut-vs-engrave.svg "1: cutting and scoring follow the vector outline once. 2: raster engraving sweeps across the whole area, line by line.")

Laser software such as LightBurn and xTool Creative Space imports SVG directly. The quality of the outline matters more than anywhere else: every speck in the trace becomes a tiny stray cut, and a gap in an outline means a part that does not come free.

## Die cutting, vinyl and stickers

Cutting machines such as Cricut and Silhouette, and the dies used for stickers and packaging, cut along a line, and that line is a vector path. A PNG uploaded to a cutting app has to have its cut lines guessed for it; an SVG brings clean ones, one per shape.

For a die-cut sticker, the cut line is usually the outline of the whole artwork pushed outward to leave a white border:

![A blue drop illustration, and the same drop as a sticker: a white border around it with a dashed cut line along the border's edge.](/kb/images/why-convert-images-to-vector/sticker-cut-line.svg "A die-cut sticker: the cut line (dashed) follows the artwork's silhouette, offset outward for the border.")

Traced in [stacked mode](/kb/stacked-vs-cutout), the bottom-most shape already *is* the silhouette, so making the cut line is a single offset in your design app.

## 3D printing and CNC

3D modelling tools turn a flat SVG into a solid by **extruding** it, pushing the shape up to a chosen height. Tinkercad, Fusion and Blender all import SVG, and some slicers can import one directly. That is how logos become keychains, signs, stencils, stamps and cookie cutters.

![A flat blue drop shape, then the same drop extruded into a solid with thickness, lying flat as on a print bed.](/kb/images/why-convert-images-to-vector/extrude-3d.svg "Extruding: a flat vector shape becomes a solid with thickness, ready to slice and print.")

CNC routers, plasma cutters and vinyl plotters follow paths in exactly the way a laser does, so the same SVG drives them too. Embroidery digitizing also starts from clean vector shapes.

## What makes a vector good for these jobs

Not every vector file is a good one. Whatever the destination, look for:

- **Clean, closed shapes.** No gaps in outlines, no stray specks.
- **Few nodes.** Smooth curves with few anchor points cut, engrave and edit more cleanly than jagged outlines with thousands. See [Curve fitting](/kb/curve-fitting).
- **Few, solid colors** for screen printing, vinyl and engraving. See [Color clustering](/kb/color-clustering).
- **The right layering.** Layered vinyl and paper crafts suit stacked shapes, each layer sitting on the one below. A single-sheet laser or plotter cut suits cutout shapes, where no edge is cut twice. See [Stacked vs cutout](/kb/stacked-vs-cutout).

## How to convert

Converting a raster image into vector shapes is called **vector tracing**. VTracer does it on your own device, and VTracer 2 first cleans up and upscales the image, so even a small or heavily compressed JPEG can produce clean outlines. Start with [What is VTracer?](/kb/what-is-vtracer), or read [How vector tracing works](/kb/how-vector-tracing-works) to see what happens inside.
