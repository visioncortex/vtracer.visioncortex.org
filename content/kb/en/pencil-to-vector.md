---
title: "Pencil to vector: from a paper sketch to SVG"
description: Photograph a pencil sketch, and the Gen AI lab turns it into clean line art or color artwork as SVG. How it works, what strength does, and tips.
section: gen-ai
order: 30
published: 2026-11-22
---

Pencil to vector starts from your own drawing. Snap a photo of a sketch on paper, drop it into the Gen AI lab, and it comes back as an SVG: tidied into clean line art, or developed into finished color artwork, with your composition and pose kept.

![A phone photo of a pencil sketch of a sitting fox, and the prompt words fox, sitting and smiling, leading to the same fox as finished color vector artwork.](/kb/images/what-is-vtracer/pencil-to-vector.svg "A phone photo of a sketch and a short prompt in, finished color artwork out.")

## How it works

![A phone photo of a pencil sketch of a sitting fox on grey paper; the same sketch cleaned into crisp black lines on white; and the finished fox, colored and traced to SVG.](/kb/images/pencil-to-vector/steps.svg "The photo, the clean ink VTracer lifts from it, and the finished trace. Every sketch round starts by cleaning up the photo.")

1. **Cleaning up the photo.** Before any generation, VTracer cleans up your photo. A small model finds your pencil lines and lifts them off the page, leaving the paper, its grey cast, shadows, smudges and even ruled or grid lines behind. What remains is clean ink on white, as crisp as a drawing made on a tablet.
2. **Generating.** The lab generates from that clean drawing together with your prompt and [art style](/kb/art-styles), so the result follows your drawing rather than inventing its own. Because the model sees clean lines, not a photo of paper, the paper's texture and shadows never find their way into the artwork.
3. **Tracing.** VTracer 2 traces the result to SVG, as in any [Gen AI round](/kb/gen-ai-lab).

You choose what the round starts from: the clean **ink**, in black and white; a **shaded** version, with color; or the **original** photo.

![A photo of three cats sketched in pencil on grey paper, with a half-erased fourth cat; the same three cats cleaned into black ink on white, the erased cat gone; and the three cats as clean, even line art, traced to SVG.](/kb/images/pencil-to-vector/cats.svg "Three cats: the photo, the clean ink, and the line art generated from it. The half-erased cat and the shadows stay on the page.")

## Strength

**Strength** decides how far the generation may move away from your sketch, from 0 to 1.

- **Lower strength** stays close: it cleans the sketch into crisp line art, keeping every line where you drew it. Pair it with the Line art style.
- **Higher strength** takes more liberty: it fills, colors and shades the drawing into finished artwork, while keeping its pose and proportions.
- **Very high strength** treats the sketch as a loose suggestion, and the result drifts further from it.

Where the change happens depends on the model. In our tests, Z-Image Turbo kept the fox sketch as line art at 0.5 and colored it fully at 0.75, while FLUX.2 klein and Codex colored it fully at 0.5. [Text-to-image vs image-to-image](/kb/text-to-image-and-image-to-image#strength) shows the sketch at both strengths. Some models can also use your sketch as a **reference image** rather than a starting point, which keeps its composition while redrawing it freely.

## Getting a good result

- **Draw with clear, dark lines.** Light, feathery strokes are harder to separate from the paper.
- **Photograph in even light,** straight on, with the drawing filling most of the frame.
- **One subject per sketch** works best, as with any Gen AI round.
- **Name the subject in the prompt.** A few words, such as *fox, sitting, smiling*, tell the model what your lines are meant to be.
- **Start low and raise strength** until the result has as much finish as you want.
- **Use FLUX.2 klein.** It is the best model in the lab for working from a drawing, and Codex also follows drawings closely; see [Which AI image model is best for vector art?](/kb/ai-models-for-vector-art)

The output is a [stacked](/kb/stacked-vs-cutout) SVG, so every shape stays whole and easy to recolor, and its bottom layer is the silhouette of the whole drawing.
