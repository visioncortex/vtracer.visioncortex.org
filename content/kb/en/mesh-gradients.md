---
title: What is a mesh gradient?
description: A mesh gradient blends colors across a grid of points. SVG 2 drafted it but browsers never drew it. What it is, where it works, and how XSVG makes it portable.
section: vtracer-2
order: 30
published: 2026-11-22
---

A **mesh gradient** blends color across a grid. Each corner of the grid has a color, and inside each cell the color blends smoothly between its corners. Because every corner can be different, a mesh can describe color that changes in several directions at once: the glow on a cheek, a sky that is warm near the sun and cool overhead, the shading of a folded cloth.

## Linear, radial and mesh

![The same drop filled three ways: a linear gradient from light blue at the top to dark blue at the bottom; a radial gradient glowing out from one point; and a mesh gradient whose grid of colored corners, drawn on top, blends into a shape no single direction or center could give.](/kb/images/mesh-gradients/linear-radial-mesh.svg "A linear gradient changes along one direction, a radial gradient out from one point. A mesh gradient sets a color at every corner of a grid, here 3 × 2 cells, and blends between them.")

- A **linear gradient** blends along a straight line: every point on a line across it has the same color.
- A **radial gradient** blends outward from a point: every point on a circle around it has the same color.
- A **mesh gradient** has no such rule. Its color at any point comes from the corners of the cell it falls in, so it can follow any shape of shading.

To get a similar result with linear and radial gradients alone, an illustrator stacks many shapes, each with its own gradient, and blurs or blends them together. A mesh does it in one.

## Drafted for SVG 2, drawn by no browser

Mesh gradients were written into the drafts of SVG 2: a mesh made of patches with four curved edges, known as Coons patches, and a color at each corner. By the [SVG 2 Candidate Recommendation of September 2016](https://www.w3.org/TR/2016/CR-SVG2-20160915/pservers.html#MeshGradients), they had a section of their own, under the element name `<mesh>`.

Browsers never implemented them. In May 2018 the SVG Working Group [removed mesh gradients from SVG 2](https://github.com/w3c/svgwg/issues/449), together with hatches, as features at risk of having no implementations, and the [change](https://github.com/w3c/svgwg/pull/452) deferred them to a future version of SVG. The [current SVG 2 specification](https://www.w3.org/TR/SVG2/pservers.html) has no mesh gradients; its [list of changes](https://www.w3.org/TR/SVG2/changes.html) records both their arrival and their deferral.

**Inkscape** implemented the drafts and has created mesh gradients since version 0.92, writing them as `<meshgradient>`. Its [own documentation](https://wiki.inkscape.org/wiki/Mesh_Gradients) warns that browsers may not support them, and suggests replacing a mesh with a bitmap for the web: open such a file in a browser and the meshed shapes show up empty.

Adobe Illustrator has its own gradient mesh, but since SVG has no equivalent, it saves the mesh into SVG as an embedded bitmap image, not as a mesh: zoom in and it [pixelates](https://community.adobe.com/questions-652/how-to-export-proper-svg-with-gradient-mesh-from-illustrator-to-sketch-app-825420).

## XSVG: mesh gradients that work everywhere

[XSVG](https://xsvg.visioncortex.org/), short for eXtensible SVG, is a format from Vision Cortex, the team behind VTracer. It adds elements SVG does not have, mesh gradients among them, in a namespace of their own, so an ordinary viewer simply skips them and the file never breaks. **Compiling** an XSVG file turns every extension into plain SVG.

XSVG implements the SVG 2 mesh: it reads the `<meshgradient>` that Inkscape writes, curved Coons patches and all, as well as its own simpler `x:mesh`, a grid of corner colors. See the [XSVG mesh gradient documentation](https://xsvg.visioncortex.org/docs/mesh-gradients/overview/).

A mesh compiles to a tiny image, often just 2 × 2 pixels, sized and placed so that the viewer's own smooth image scaling recreates the blend, and clipped to the shape's outline, so edges stay sharp at any zoom. The result draws in every browser and design app.

## Mesh gradients in VTracer 2

Turn on **Mesh Gradient** in the tracing options, and VTracer 2 can describe a smoothly shaded area as one mesh instead of many bands or gradient shapes. That suits exactly the artwork VTracer 1 struggled with: painted illustration, AI-generated art, anything with soft shading.

Take the blush on a cheek. In this trace of an anime illustration, the whole face, blush included, is one mesh: a grid of 16 × 16 patches with a color at each corner. The blush is just a few warmer corners on each cheek, and the viewer blends them into a soft glow. Compiled to plain SVG, the entire face mesh is one PNG of 17 × 17 pixels, one pixel per corner: 952 bytes.

![Four panels in a two by two grid. Top: the source anime illustration, with a pink blush on each cheek, and the finished VTracer 2 trace. Bottom, over a faint copy of the face: the mesh as a grid of 17 by 17 colored dots, with a cluster of pink dots on each cheek, and the same colors blended smoothly into soft patches of skin tone and blush.](/kb/images/mesh-gradients/blush.svg "A blush, as a mesh. Top: the source and VTracer 2's trace. Bottom: the face's mesh in place, a color at each of 17 × 17 corners, and those corners compiled to one 952-byte PNG, blended by the viewer.")

Mesh gradients matter most on shading that turns in every direction, such as a soft 3D character. Here is one traced at the same [gradient step](/kb/gradient-step), first without and then with mesh gradients:

![Three versions of the same cartoon girl's head, with soft, clay-like shading, shown whole. First, the source image. Second, the VTracer 2 trace at gradient step 32: the cheeks and hair are broken into flat bands with hard edges. Third, the same trace with mesh gradients: the blush on the cheeks and the shine on the hair fade smoothly, close to the source.](/kb/images/gradient-step/mesh.svg "The source, and VTracer 2's trace at gradient step 32 without and with mesh gradients. Without, the round cheeks and hair break into bands; with, they fade as in the source.")

- **Save as SVG** writes plain SVG, with each mesh compiled, so the file opens anywhere.
- **Save as XSVG**, from the menu below Save as SVG, keeps the meshes as XSVG elements, with the background and foreground as separate layers of an artboard.


In a design app, a compiled mesh is an image clipped to a shape: it looks right at any size, but its colors are edited as an image, not as points.
