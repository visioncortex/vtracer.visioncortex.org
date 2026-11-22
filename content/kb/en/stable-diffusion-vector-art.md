---
title: "How to generate vector art with Stable Diffusion: SD-Turbo and SDXL-Turbo"
description: Run Stable Diffusion's turbo models on your own computer and trace the results to SVG. How SD-Turbo and SDXL-Turbo differ, how to use them in VTracer, and tips.
section: gen-ai
order: 40
published: 2026-11-22
---

**Stable Diffusion** is the model family that brought AI image generation to ordinary computers, and its fast **turbo** versions run in VTracer's [Gen AI lab](/kb/gen-ai-lab) on your own machine. They are the quickest models in the lab, and the smallest downloads. They are also the oldest designs here, and they follow layout instructions loosely, so getting clean vector art from them takes a little care.

## The two models at a glance

| | SD-Turbo | SDXL-Turbo |
| --- | --- | --- |
| Made by | Stability AI | Stability AI |
| Released | November 2023 | November 2023 |
| Model | UNet, distilled from Stable Diffusion 2.1 | UNet, distilled from SDXL 1.0 |
| Distillation | Adversarial Diffusion Distillation | Adversarial Diffusion Distillation |
| Text encoder | CLIP | Two CLIP encoders |
| Recommended steps | 1 to 4 | 1 to 4 |
| Native size | 512 × 512 | 512 × 512 |
| Download | 2.0 GB | 4.1 GB |
| Memory needed | 4 GB | 6 GB |
| Downloaded from | [Green-Sky/SD-Turbo-GGUF](https://huggingface.co/Green-Sky/SD-Turbo-GGUF), a quantization of [stabilityai/sd-turbo](https://huggingface.co/stabilityai/sd-turbo) | [OlegSkutte/sdxl-turbo-GGUF](https://huggingface.co/OlegSkutte/sdxl-turbo-GGUF), a quantization of [stabilityai/sdxl-turbo](https://huggingface.co/stabilityai/sdxl-turbo) |
| License | Stability AI Community License | Stability AI Community License |

VTracer does not distribute these models: the app downloads them from the repositories above when you choose them, and you accept the license, which is between you and Stability AI. The [Stability AI Community License](https://stability.ai/license) allows commercial use for individuals and organizations with under USD 1 million in annual revenue; above that, Stability AI requires an enterprise license.

Both were made fast with [Adversarial Diffusion Distillation](https://arxiv.org/abs/2311.17042), which lets them generate in a single step. Their model cards ([SD-Turbo](https://huggingface.co/stabilityai/sd-turbo), [SDXL-Turbo](https://huggingface.co/stabilityai/sdxl-turbo)) note that neither renders legible text, and that SD-Turbo follows prompts less closely than SDXL-Turbo.

## How to generate vector art with Stable Diffusion in VTracer

1. Open the **Gen AI** tab and choose **SD-Turbo** or **SDXL-Turbo** from the model menu. The first time, accept its license, and the app downloads it from Hugging Face and installs it.
2. Type a short **subject**, and pick an [art style](/kb/art-styles). **Inked**, with thick outlines and flat cel colors, was designed for SDXL-Turbo.
3. **Generate.** The image is generated on your device and traced by VTracer 2, with the background removed.
4. Generate several rounds with different seeds, and keep the one with the plainest background.

## SD-Turbo: speed first

![A smiling grey and white shiba inu puppy, sitting, drawn with dark outlines and flat colors, traced by SD-Turbo in 86 paths.](/kb/images/stable-diffusion-vector-art/sd-turbo.svg "A shiba inu, sitting and smiling, by SD-Turbo, traced: 86 paths, 57 KB.")

- **Fast and light.** A round, generation and tracing together, takes a few seconds, and the 2 GB download runs where larger models will not.
- **Good with simple subjects.** Animals, mascots and objects come out as friendly, outlined illustrations like the shiba above, in under 100 paths.
- **Loose with instructions.** Give it a complicated scene or style and it tends to add backgrounds, extra characters or garbled lettering; on the anime test prompts in [our comparison](/kb/ai-models-for-vector-art), its traces averaged 730 paths.

## SDXL-Turbo: detail first

- **Rich, painterly detail.** Fur, feathers, chrome and reflections, closer to a finished illustration than SD-Turbo manages.
- **Detail costs paths.** Every highlight and texture becomes a shape: a detailed subject such as a motorcycle can take over 1,000 paths, where a simple animal takes a few hundred.
- **Backgrounds creep in.** On the anime test prompts in [our comparison](/kb/ai-models-for-vector-art), it painted whole backdrops despite *pure white background*.

## Prompt tips

- **Short prompts, strong style words.** CLIP reads keywords better than sentences: *flat colors, thick outlines, sticker* works better than a long description.
- **Choose a bold style.** Stencil, Flat design, Clip art and Inked leave the least room for clutter.
- **Generate many, keep few.** Each round is quick; take the best idea further with a newer model, or as a sketch in [Pencil to vector](/kb/pencil-to-vector).
- **Simplify after tracing.** If an SVG is too heavy, raise VTracer's [gradient step](/kb/gradient-step) to merge similar shades.

## Best for

Fast brainstorming, simple icons and silhouettes, rich illustration where file size matters less, and computers without a strong GPU. For cleaner vectors, see [Z-Image](/kb/z-image-vector-art) and [FLUX](/kb/flux-vector-art), and the full comparison in [Which AI image model is best for vector art?](/kb/ai-models-for-vector-art)
