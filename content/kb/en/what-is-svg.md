---
title: What is SVG?
description: SVG is the open, text-based vector image format of the web. What is inside an SVG file, where it works, and why it is the format VTracer produces.
section: basics
order: 20
published: 2026-11-21
---

SVG, short for **Scalable Vector Graphics**, is an open image format for vector graphics, published by the W3C, the body behind web standards such as HTML and CSS. An SVG file describes a picture as shapes, curves and colors written in plain text, so it scales to any size without losing sharpness. Every modern browser displays it, and every major design app opens it.

## An SVG file is text

Unlike a PNG or JPEG, an SVG is not a block of binary pixel data. It is XML, a markup language much like HTML, and you can open it in any text editor. Here is a complete SVG file:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160">
  <rect width="240" height="160" fill="#1b2a3a"/>
  <circle cx="160" cy="84" r="36" fill="#e0a63c"/>
  <path d="M0 120 C60 80 120 90 160 110 C190 125 215 120 240 105 L240 160 L0 160 Z" fill="#0088f7"/>
</svg>
```

And this is what it draws:

![A dark blue sky, an orange sun, and a blue hill that hides the bottom of the sun.](/kb/images/what-is-svg/example-rendered.svg "The SVG above, rendered. Scale it to any size and it stays sharp.")

What each part does:

- `viewBox="0 0 240 160"` sets up a coordinate system 240 units wide and 160 tall. The image can be shown at any pixel size; the units scale with it.
- `<rect>` and `<circle>` are ready-made shapes: the sky and the sun.
- `<path>` is the general-purpose shape, used for anything else: here, the hill.

## Paths: where the shapes live

A `<path>` is described by its `d` attribute, a short string of drawing commands, each a letter followed by coordinates:

| Command | Meaning |
| --- | --- |
| `M x y` | Move to a point without drawing: the start of a shape |
| `L x y` | Draw a straight line to a point |
| `C x1 y1 x2 y2 x y` | Draw a cubic Bézier curve to `x y`, bent by two control points |
| `Z` | Close the shape back to its start |

The hill above, drawn out:

![The hill path from the example, enlarged, with its anchor points labelled by their coordinates and its curves' control points shown as circles joined by dashed lines.](/kb/images/what-is-svg/path-anatomy.svg "The hill's path. Squares are anchor points; circles are the control points of the two C curves, which pull on the curve without lying on it.")

In a traced SVG, almost all of the file is path data like this, often thousands of commands. The fewer commands it takes to describe each outline, the smaller and cleaner the file. Turning a jagged pixel outline into a few smooth commands is the job of curve fitting: [Curve fitting](/kb/curve-fitting).

## Painting order

SVG draws its elements in the order they appear in the file, and each new one paints over what is already there. In the example, the sky comes first, then the sun, then the hill, so the hill covers the bottom of the sun. Nothing had to cut a hill-shaped hole out of the sun.

![The three elements of the example separated into layers: sky first, sun second, hill third, combining into the final picture.](/kb/images/what-is-svg/painting-order.svg "Elements paint in file order: 1 the sky, 2 the sun, 3 the hill, which covers part of the sun.")

This is exactly the idea behind VTracer's **stacked** mode, which layers shapes rather than cutting them against each other. It keeps every shape whole when you edit it, and for logos and flat artwork it usually gives a smaller file. See [Stacked vs cutout](/kb/stacked-vs-cutout).

## Colors and gradients

A shape's `fill` can be a flat color, as above, or a gradient:

- **Linear gradients** blend between colors along a straight line.
- **Radial gradients** blend outward from a point.

Smooth gradients matter for tracing: a sky that fades from orange to blue should come out as one gradient, not as dozens of bands of flat color. VTracer 2 traces gradients as gradients.

## SVG versions

SVG 1.1, the version every browser supports, has been stable since the 2000s. SVG 2 added refinements, most of which browsers now support. Some features were drafted for SVG 2 but never implemented by browsers, among them **mesh gradients**, which can blend colors across a whole grid of points. See [What is a mesh gradient?](/kb/mesh-gradients)

## Where SVG works

- **Browsers and websites**: as an image, inline in HTML, or as a CSS background. Every modern browser supports it.
- **Design apps**: Illustrator, Figma, Inkscape, Affinity, CorelDRAW and others open and save SVG.
- **Making and production**: cutting machines (Cricut, Silhouette), laser software (LightBurn, xTool), CNC and 3D tools (Tinkercad, Fusion, Blender) import SVG. See [Why convert a JPEG or PNG to vector?](/kb/why-convert-images-to-vector)

## SVG vs PNG

| | SVG | PNG |
| --- | --- | --- |
| Type | Vector: shapes and curves | Raster: pixels |
| Scaling | Sharp at any size | Fixed resolution |
| Editing | Shape by shape, or as text | Pixel by pixel |
| Best for | Logos, icons, illustration, cutting and printing | Screenshots, photos, painted detail |
| Transparency | Yes | Yes |

## Why VTracer outputs SVG

SVG is open, it is text, and it opens everywhere, from a browser to a laser cutter. Whatever you plan to do with a traced image, an SVG is the safest file to start from, and any design app can turn it into AI, EPS, PDF or DXF if a particular tool asks for one.
