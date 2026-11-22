---
title: How vector tracing works
description: Vector tracing turns pixels into shapes in three stages: clustering, compositing and curve fitting. What each stage does, and what it means for your SVG.
section: how-tracing-works
order: 10
published: 2026-11-22
---

A vector tracer, also called a vectorizer, reads a raster image and writes out shapes. To do that it has to answer three questions: which pixels belong together, how the resulting regions are layered, and how to describe each region's outline as curves. VTracer answers them in three stages: **clustering**, **compositing** and **curve fitting**.

![A small drop image in four steps: blurry pixels; the same pixels in three flat colors; those colors as three stacked layers pulled apart, the background, the whole drop and the highlight; and the drop as smooth vector shapes with a few anchor points.](/kb/images/how-vector-tracing-works/stages.svg "The image, then the three stages. 1 clustering groups pixels into regions of flat color. 2 compositing layers the regions into shapes, here each on its own layer, with the whole drop under the highlight. 3 curve fitting replaces each staircase outline with a few smooth curves.")

## 1. Clustering: which pixels belong together

An image has no shapes in it, only pixels, and neighbouring pixels are rarely exactly the same color. Edges are blurred by anti-aliasing, flat areas carry noise, and shading changes slowly across a surface. Clustering groups pixels into **regions**: connected areas of similar color that will each become a shape.

This stage decides most of what you see in the result: how many shapes there are, where their edges fall, and how much detail survives. Group too eagerly and a face loses its eyes; too timidly and a flat sky turns into hundreds of specks. [Color clustering](/kb/color-clustering) compares the common algorithms and explains the one VTracer uses.

## 2. Compositing: how the shapes are layered

Regions sit inside and beside one another, and there are two ways to write them as shapes:

- **Stacked**: shapes are layered like paper cutouts. A shape lower down carries on underneath the ones on top of it, so every shape stays whole.
- **Cutout**: shapes are cut against each other like a jigsaw. Nothing overlaps, and a shape with something inside it gets a hole.

Stacked shapes are easier to edit, and for logos and flat artwork they usually make a smaller file. Cutout suits machines that should never cut the same line twice. [Stacked vs cutout](/kb/stacked-vs-cutout) shows both side by side, with real file sizes.

## 3. Curve fitting: from staircase to curves

A region's outline follows pixel edges, so a diagonal line or a curve comes out as a staircase. Curve fitting replaces each staircase with a few smooth Bézier curves that follow the same outline, keeping real corners sharp. It decides how smooth the result looks, how many nodes each shape has, and with simplification, much of the file size. [Curve fitting](/kb/curve-fitting) walks through the steps.

## What each stage controls

| Stage | Decides | VTracer settings |
| --- | --- | --- |
| Clustering | How many shapes, where the edges fall, how many colors | Color precision, gradient step, filter speckle |
| Compositing | Whether shapes overlap or tile; how easy they are to edit | Stacked or cutout |
| Curve fitting | Smoothness, sharp corners, number of nodes and file size | Mode, simplify, path precision |

## Where the input image limits the result

Tracing can only be as good as the pixels it starts from, and three problems are common:

- **JPEG noise.** Compression leaves blocks and ripples around edges. To the clustering stage they are real changes of color, so they become specks and pale halos.
- **Low resolution.** A small image has few pixels along each edge, so there is little for curve fitting to follow, and fine detail is a pixel or two wide.
- **Smooth gradients.** Clustering groups pixels into regions of flat color, so a gradient comes out flat or as bands.

VTracer 2 adds a step before all three stages: its deep-learning engine cleans up and upscales the image first, and it traces gradients as gradients. [From VTracer 1 to VTracer 2](/kb/vtracer-1-vs-vtracer-2) shows the difference.
