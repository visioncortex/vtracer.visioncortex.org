---
title: "Color clustering: how a tracer finds shapes"
description: The first stage of tracing groups pixels into regions. A brief comparison of clustering algorithms, from k-means to hierarchical, and the one VTracer uses.
section: how-tracing-works
order: 20
published: 2026-11-22
---

Before a tracer can draw a single curve, it has to decide which pixels belong together. That first stage is **clustering**: grouping pixels into regions of similar color, each of which becomes a shape in the SVG. It decides how many shapes there are, where their edges fall and how many colors the result has, so it shapes the trace more than any other stage.

## What clustering has to weigh

- **Color.** Pixels of similar color belong together, but how similar is similar enough? Anti-aliased edges, noise and shading mean that almost no two neighbouring pixels are exactly alike.
- **Position.** Two red patches on opposite sides of an image are two shapes, not one. A tracer needs regions that are connected, not just a list of colors.
- **Detail.** Group too eagerly and small features vanish into their surroundings. Group too timidly and a flat area turns into hundreds of specks, each one a path in the file.

## A brief comparison

Clustering is a well-studied problem in image processing. These are the families you will meet most often:

| Approach | Uses position | Number of colors | What it means for tracing |
| --- | --- | --- | --- |
| Thresholding, fixed or adaptive | Adaptive: yes | Two: black and white | Clean line art, but no color |
| Palette quantization (median cut, octree) | No | Fixed in advance | Fast; each color can scatter into many specks |
| k-means | No, unless position is added as a feature | Fixed in advance | Iterative; the result depends on where it starts |
| Mean shift | Optional | Found from the image | No count to choose, but slow on large images |
| Superpixels (SLIC) | Yes | Many small regions | Compact regions of similar size, which still need merging |
| Watershed | Yes | Found from the edges | Regions that follow the edges in the image |
| Hierarchical clustering | Yes | A whole tree, coarse to fine | Detail can be chosen after the fact, and the tree gives stacking |

The color-only methods are the classic way to reduce a picture to a palette, and they are fast. For tracing, though, a palette is not enough: every pixel that rounds to a given color joins it, wherever it is, so stray pixels along edges and in noisy areas become specks of their own.

## What VTracer uses

VTracer 1 offers three of these approaches, chosen with its **clustering** setting:

| Clustering | Approach | Best for |
| --- | --- | --- |
| `color-cluster`, the default | Hierarchical clustering | Logos, illustration and most color images |
| `watershed` | Hierarchical watershed | Photos and detailed images, with regions that follow the shapes of objects |
| `bw` | Thresholding, fixed or adaptive | Line art, scans and photographed drawings |

### Hierarchical clustering

The default, `color-cluster`, is the hierarchical clustering algorithm. Its own write-up describes it with an analogy: villages ally into tribes, tribes into kingdoms, kingdoms into empires, until the whole world is one union. It works in three stages:

1. **Clustering.** Neighbouring pixels of the same color, at a chosen color precision, are joined into clusters: small connected patches, each with a position and a shape.
2. **Building the tree.** Starting from the smallest, each cluster is merged into the neighbour whose average color is closest, step by step, until one cluster covers the whole image. The merges form a tree, from many small clusters at the bottom to the image's base tone at the top.
3. **Walking the tree.** VTracer traces the tree from the top down, laying each layer on the one before, as a painter lays down the background first, then the objects, then the details.

![The same small drop image shown four times, cut from the cluster tree at 2, 4, 12 and 386 clusters: from a flat drop on a flat background, through bands of shading, to every detail including the highlight.](/kb/images/color-clustering/image-tree.svg "One image tree, cut at four levels: 2, 4, 12 and all 386 clusters. The highlight, the smallest region, is among the first to merge away.")

The tree is why VTracer can stack its shapes: every layer is a whole region, and the layers above it sit inside it. See [Stacked vs cutout](/kb/stacked-vs-cutout).

Its settings:

| Setting | Default | What it does |
| --- | --- | --- |
| Color precision | 6 | Significant bits per color channel, 1 to 8. Lower values treat more colors as the same |
| Gradient step | 16 | How different a cluster's color has to be from the layer above to become a layer of its own, 0 to 255 |
| Filter speckle | 4 | Patches smaller than this many pixels are discarded |

### Watershed

A watershed treats the image as a landscape, where strong edges are ridges and flat areas are valleys. Imagine water rising from the lowest points: each valley fills into a basin, and wherever two basins meet, a boundary forms. Regions therefore follow the edges in the image, the outlines of the objects in it, rather than bands of similar color.

![A watershed shown in one dimension, three times. Above, a row of an image in five colors. In the middle, the strength of its edges drawn as a landscape with four ridges, flooded with water; each pool takes the color of its region, and dashed lines mark the ridges that stay above the water. Below, the resulting regions. As the water rises from left to right, the lowest ridges go under and their regions merge, giving 5, 4 and then 3 regions.](/kb/images/color-clustering/watershed.svg "A watershed in one dimension. Each row of the image becomes a landscape whose ridges are its edges. Flooded, every basin is a region, with a boundary on each ridge above the water. As the water rises, the weakest edges go under first: 5 regions, then 4, then 3.")

VTracer's watershed is hierarchical: as the water rises, neighbouring basins merge, building a tree of coarse and fine regions much like the one above. A single setting, **watershed detail**, chooses where to cut the tree. The default is 128, and each step of about 25 roughly doubles the number of regions. Anti-aliased pixels along an edge are assigned to whichever side they are closer to in color, so boundaries come out calm rather than ragged. In stacked mode, the coarse regions sit below the finer ones; in cutout mode, the regions tile the image directly.

### Thresholding

For black-and-white work, `bw` splits every pixel into foreground or background:

- A **fixed threshold**, from 0 to 255, treats everything darker than it as ink.
- An **adaptive threshold** compares each pixel with the average of the pixels around it, using the Bradley–Roth method. A shadow across a photographed page or uneven scanner lighting then no longer swallows the lines, because each line only has to be darker than its own surroundings.

Whichever method forms the regions, VTracer 1 can also snap the result to a fixed palette of your own colors, or reduce it to a set number of colors.

## Where clustering struggles

![On the left, a smooth sunset sky over a dark hill, and its VTracer 1 trace in which the whole sky is one flat brown. On the right, a small drop saved as a heavily compressed JPEG, and its trace with pale halos and specks around the edge.](/kb/images/color-clustering/where-clustering-struggles.svg "Traced with VTracer 1's default settings: a smooth gradient comes out as one flat color, and JPEG compression noise becomes halos and specks.")

- **Smooth gradients.** In a gradient, every pixel is very close to its neighbours, so clustering keeps merging them. With the default settings, the whole sunset sky above becomes one flat color. At full color precision it comes out as bands instead: 14 at the default gradient step, 44 at a step of 0. Either way, flat regions cannot describe a smooth change.
- **JPEG noise.** Compression leaves blocks and ripples around edges. To the clusterer they are real changes of color, so they become pale halos, specks and ragged edges.
- **Low resolution.** In a small image, a thin line or an eye is only a pixel or two wide, and an anti-aliased edge pixel is as likely to join the wrong region as the right one.

These are exactly the problems VTracer 2 tackles before clustering begins. See [From VTracer 1 to VTracer 2](/kb/vtracer-1-vs-vtracer-2).

<!-- Figures: image-tree.svg runs the algorithm above (scripts/kb-diagrams.py). The traces come from VTracer 1.0.0-alpha.4 (scripts/kb-traces.py); the band counts are gradient.png traced at color precision 8, gradient step 16 and 0. -->
