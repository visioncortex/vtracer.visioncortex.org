---
title: What is VTracer?
description: VTracer turns ideas, sketches and raster images into clean, editable SVG on your own device. The whole workflow, from first idea to finished vector.
section: basics
order: 30
published: 2026-11-21
---

VTracer is a vectorizer: it converts raster images such as PNG, JPEG and WebP into SVG vector graphics. With VTracer 2, it covers the whole journey of a piece of vector artwork, from a first idea, typed as a prompt or drawn on paper, to clean, editable shapes in your design app. Everything runs on your own device.

## From idea to vector

![Four steps in a row: a text prompt and a pencil sketch; a pixel image; the same shape as a vector with anchor points; and the shapes pulled apart and recolored in an editor.](/kb/images/what-is-vtracer/workflow.svg "1 an idea, as a prompt or a sketch. 2 an image. 3 the trace. 4 editing the shapes.")

### 1. Start from an idea, a sketch or an image

You can start with an image you already have: a logo, clip art, an illustration, a photo of a drawing. Or start from nothing but an idea:

- **Prompt to vector.** Type what you want in the [Gen AI lab](/kb/gen-ai-lab). Image generation models run inside the app, on your device, and a guided prompt steers them toward artwork that traces well.
- **[Pencil to vector](/kb/pencil-to-vector).** Snap a photo of a pencil sketch and drop it in. VTracer lifts your lines off the page, leaving paper, shadows and smudges behind. At low strength it tidies the sketch into clean line art; at high strength it turns it into finished color artwork.

![A cartoon corgi, sitting and smiling, traced as a vector on the left; on the right, the prompt that made it: the words corgi, sitting and smiling.](/kb/images/what-is-vtracer/prompt-to-vector.svg "Prompt to vector: three words in, a finished SVG out. The corgi is the app's output as it came, with the background removed.")

<!-- The chips in the figure are the prompt as typed, in English. corgi.svg is the Gen AI lab's own output; prompt-to-vector.svg is drawn from it by scripts/kb-diagrams.py. -->

![A phone photo of a pencil sketch of a sitting fox with a bushy tail, and the prompt words fox, sitting and smiling, leading to the same fox as finished color vector artwork: orange fur, white chest and tail tip, dark legs.](/kb/images/what-is-vtracer/pencil-to-vector.svg "Pencil to vector: a phone photo of a sketch and a short prompt in, finished color artwork out, with the pose and the details kept.")

### 2. Get the image ready to trace

Most images are not ready for tracing as they come. They are small, or saved as JPEG with compression noise, or full of smooth color changes. VTracer 2's deep-learning engine cleans up and upscales the image before it traces a single curve, recovering what is there without inventing detail. [From VTracer 1 to VTracer 2](/kb/vtracer-1-vs-vtracer-2) explains why this matters.

### 3. Trace

The trace turns pixels into shapes in three stages: grouping pixels into regions of color, layering those regions into shapes, and fitting smooth curves to their outlines. [How vector tracing works](/kb/how-vector-tracing-works) goes through each one.

![The VTracer 2 desktop app comparing a traced tiger mascot against its source, with model, clustering, compositing and curve-fitting controls in the side panel.](/vtracer2-app-dark.png "The VTracer 2 app: source and trace side by side, with the tracing settings on the right.")

### 4. Edit and use

The result is a standard SVG. Open it in Illustrator, Figma, Inkscape or Affinity, or send it straight to a cutting machine, laser or 3D tool. In **stacked** mode, shapes are layered rather than cut against each other, so each one stays whole and easy to select, move and recolor. See [Stacked vs cutout](/kb/stacked-vs-cutout).

![A traced cartoon fox in a vector editor, its shapes pulled apart to show a few whole, stacked shapes.](/pencil/vector-layers.mp4 "Stacked shapes in a vector editor: each one whole, with a solid base beneath the colored ones.")

## What you get out

- **SVG**, with adjustable curve simplification and path precision.
- **Linear, radial and mesh gradients**, so smooth color stays smooth.
- **Stacked** compositing (no holes) or **cutout** (no seams).
- **Background removal**, for artwork on a transparent canvas.

## VTracer 1 and VTracer 2

| | VTracer 1 | VTracer 2 |
| --- | --- | --- |
| What it is | The open-source tracing engine | The next-generation engine, in the desktop app |
| How you use it | Command line, and libraries for Rust, Python and Node | App for macOS, Windows and Linux |
| Before tracing | Traces the image as it is | Deep-learning cleanup and upscaling, up to 8× |
| Gradients | Flat color regions | Traced as gradients |
| Also includes | | Gen AI lab, Pencil to vector, background removal |
| License | MIT, free for any use, including commercial | Free download; VTracer 2 is activated in the app, with a free trial |

VTracer 1 stays open source and free. If you trace images in your own software or scripts, it is the engine to build on. Install it with `cargo install vtracer-cli`, `pip install vtracer` or `npm i @visioncortex/vtracer`.

## Everything stays on your device

Tracing runs locally, accelerated by Metal on macOS and Vulkan on Windows and Linux. Your images, traces and prompts are never uploaded, and generation models are downloaded once and stored on your machine. Tracing needs no internet connection.

## Where to go next

- New to vectors? Start with [What are vector graphics?](/kb/what-are-vector-graphics)
- Wondering what to use vectors for? [Why convert a JPEG or PNG to vector?](/kb/why-convert-images-to-vector)
- Curious how tracing works? [How vector tracing works](/kb/how-vector-tracing-works)
