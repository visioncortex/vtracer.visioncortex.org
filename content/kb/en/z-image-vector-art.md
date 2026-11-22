---
title: How to generate vector art with Z-Image Turbo
description: Z-Image Turbo is the best model for prompt to vector: every art style, many anime styles, and the cleanest SVGs. How to run it in VTracer, with samples.
section: gen-ai
order: 42
published: 2026-11-22
---

**Z-Image Turbo** is an open image generation model from Alibaba's Tongyi-MAI lab, and the best model in VTracer's [Gen AI lab](/kb/gen-ai-lab) for turning a prompt into vector art. It handles every art style, from a single-color stencil to low poly and linocut, adapts to many styles of anime and illustration, and makes the cleanest artwork to trace: flat colors, simple shapes and a plain background, giving SVGs with few paths and small files. It runs on your own computer and is free for commercial use.

## Z-Image Turbo at a glance

| | |
| --- | --- |
| Made by | Tongyi-MAI, Alibaba |
| Released | November 2025 |
| Model | 6-billion-parameter diffusion transformer, distilled from Z-Image for speed |
| Text encoder | Qwen3-4B, a language model, so it follows detailed instructions |
| Recommended steps | 8 |
| Download | 6.5 GB |
| Memory needed | 8 GB |
| Downloaded from | [leejet/Z-Image-Turbo-GGUF](https://huggingface.co/leejet/Z-Image-Turbo-GGUF), a quantization of [Tongyi-MAI/Z-Image-Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo); the text encoder from [unsloth/Qwen3-4B-GGUF](https://huggingface.co/unsloth/Qwen3-4B-GGUF) and the autoencoder from [second-state/FLUX.1-schnell-GGUF](https://huggingface.co/second-state/FLUX.1-schnell-GGUF) |
| License | Apache 2.0: commercial use allowed |

VTracer does not distribute the model: the app downloads it from the repositories above when you choose it, and you accept its license, which is between you and the publisher.

Its architecture is a single-stream diffusion transformer: the text and the image are processed in one shared sequence. Z-Image was also trained to render text in Chinese and English, and its language-model text encoder reads both. Sources: the [model card](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo) and the [Z-Image paper](https://arxiv.org/abs/2511.22699).

## How to generate vector art with Z-Image Turbo in VTracer

1. Open the **Gen AI** tab and choose **Z-Image Turbo** from the model menu. The first time, accept its license, and the app downloads it from Hugging Face and installs it: about 6.5 GB. After that it runs offline.
2. Type a **subject**, such as *a red fox sitting*, and add any **details**.
3. Pick an [art style](/kb/art-styles). Z-Image Turbo supports all of them.
4. **Generate.** The lab generates the image on your device and traces it with VTracer 2, with the background removed.
5. Try a few **seeds**, star the rounds you like, and save the SVG.

## Every art style

Z-Image Turbo follows every [art style](/kb/art-styles) in the lab faithfully. The art styles sheet was made with it: one prompt, *a red fox sitting*, one seed, nine styles.

![Nine traced red foxes by Z-Image Turbo, numbered and named: None, Inked, Flat design, Clip art, Cartoon, Stencil, Low poly, Linocut and Line art.](/kb/images/art-styles/styles.svg "One prompt and seed, nine art styles, all by Z-Image Turbo.")

Each style comes out as a distinct look rather than a variation on one, and each stays traceable: from a single-color stencil in 2 paths to a detailed inked fox in 90.

## Anime, in many styles

The same versatility carries over to anime and manga. Describe the style in the prompt, and Z-Image Turbo draws it:

![Four traced anime girls with short hair by Z-Image Turbo: a chibi with a big head and flat colors; a shoujo manga girl with sparkling eyes and pastel hair; a shonen manga girl in bold black ink; and a retro anime cel girl with thick outlines and a muted palette. Between 22 and 233 paths.](/kb/images/z-image-vector-art/z-image-turbo.svg "Z-Image Turbo, traced: chibi, shoujo manga, shonen manga ink and retro anime cel styles, from the same subject and seed.")

| Style | Prompt began | Paths | SVG size |
| --- | --- | --- | --- |
| Chibi | *chibi anime style, cute, big head, flat colors* | 22 | 18 KB |
| Shoujo manga | *shoujo manga illustration, big sparkling eyes, flowing hair, flat pastel colors* | 215 | 88 KB |
| Shonen manga | *shonen manga style, dynamic ink, bold lines, black and white* | 233 | 72 KB |
| Retro anime | *vintage anime cel art, flat colors, thick outlines, muted palette* | 91 | 40 KB |

Each prompt went on *of a girl with short hair, pure white background, centered, simple composition*, with the same seed.

## What it does well

- **Versatile.** Every art style and a wide range of illustration styles, each drawn distinctly.
- **The fewest shapes.** On the test prompts in [our comparison](/kb/ai-models-for-vector-art), its traces averaged 70 paths and 29 KB, the smallest of any model.
- **It follows instructions.** *Pure white background*, *centered*, *flat colors*: it does what the prompt says, so there is little to clean up.
- **Flat, graphic color.** Shading is kept to what the style needs, which is what traces into clean vector shapes.

Its restraint can occasionally go too far: with a very soft, pastel prompt, it sometimes produces artwork so pale that features almost disappear. Name the colors you want, or choose a bolder style.

## Prompt tips

- **Write a sentence, not a list of tags.** The Qwen3 text encoder understands natural language, so *a red fox sitting, orange and white fur* works better than a pile of keywords.
- **Name the colors.** Z-Image keeps palettes restrained unless told otherwise.
- **Keep the subject simple.** One subject, whole and centered, traces best.

## Best for

Almost anything you start from a prompt: logos, icons and mascots, stickers and die cuts, anime and illustration in a chosen style, cutting machines and laser work, and anything where a small, editable SVG matters. If you are not sure which model to use, start with this one. To work from a sketch or edit an existing image, use [FLUX.2 klein](/kb/flux-vector-art) instead. Compare it with the other models in [Which AI image model is best for vector art?](/kb/ai-models-for-vector-art)

## From a sketch

Z-Image Turbo also works from your own drawing in [Pencil to vector](/kb/pencil-to-vector), but it sticks closely to a sketch, keeping your lines much as they are, which leaves the model less freedom to draw. [FLUX.2 klein](/kb/flux-vector-art) is the better choice for image-to-image. The [strength comparison](/kb/text-to-image-and-image-to-image#strength) shows one sketch generated by it at two strengths.
