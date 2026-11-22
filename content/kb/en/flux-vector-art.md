---
title: "How to generate vector art with FLUX: FLUX.1 schnell and FLUX.2 klein"
description: Run Black Forest Labs' open FLUX models on your computer and trace the results to SVG. How FLUX.1 schnell and FLUX.2 klein differ, and how to use them.
section: gen-ai
order: 41
published: 2026-11-22
---

**FLUX** is the image model family from Black Forest Labs, founded by researchers behind the original Stable Diffusion. Two of its open models run in VTracer's [Gen AI lab](/kb/gen-ai-lab) on your own computer: **FLUX.1 schnell**, the large original with the finest line work, and **FLUX.2 klein**, a compact newer model that is quick, and the best in the lab when you start from an image: your sketch, or a picture to edit with a reference. Both follow instructions such as *plain white background* well, which is what clean vector art needs.

## The two models at a glance

| | FLUX.1 schnell | FLUX.2 klein 4B |
| --- | --- | --- |
| Made by | Black Forest Labs | Black Forest Labs |
| Released | August 2024 | January 2026 |
| Model | 12-billion-parameter rectified-flow transformer | 4-billion-parameter rectified-flow transformer |
| Distillation | Latent adversarial diffusion distillation | Step- and guidance-distilled |
| Text encoder | T5-XXL and CLIP | Qwen3-4B |
| Recommended steps | 1 to 4 | 4 |
| Reference images | No | Yes |
| Download | 12.4 GB | 5.1 GB |
| Memory needed | 16 GB | 8 GB |
| Downloaded from | [city96/FLUX.1-schnell-gguf](https://huggingface.co/city96/FLUX.1-schnell-gguf) and [city96/t5-v1_1-xxl-encoder-gguf](https://huggingface.co/city96/t5-v1_1-xxl-encoder-gguf), quantizations of [black-forest-labs/FLUX.1-schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell) and its T5 encoder; CLIP from [comfyanonymous/flux_text_encoders](https://huggingface.co/comfyanonymous/flux_text_encoders), the autoencoder from [second-state/FLUX.1-schnell-GGUF](https://huggingface.co/second-state/FLUX.1-schnell-GGUF) | [leejet/FLUX.2-klein-4B-GGUF](https://huggingface.co/leejet/FLUX.2-klein-4B-GGUF), a quantization of [black-forest-labs/FLUX.2-klein-4B](https://huggingface.co/black-forest-labs/FLUX.2-klein-4B); the text encoder from [unsloth/Qwen3-4B-GGUF](https://huggingface.co/unsloth/Qwen3-4B-GGUF) |
| License | Apache 2.0 | Apache 2.0 |

VTracer does not distribute these models: the app downloads them from the repositories above when you choose them, and you accept the license, which is between you and Black Forest Labs. Both are Apache 2.0, which allows commercial use. Other FLUX.2 models, such as klein 9B and FLUX.2 [dev], have non-commercial licenses and are not in the lab.

FLUX models are trained with **flow matching**, which moves noise toward an image along a straight path, and pair the image model with a large language model as the text encoder, so they understand long, precise prompts. Sources: the model cards for [FLUX.1 schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell) and [FLUX.2 klein 4B](https://huggingface.co/black-forest-labs/FLUX.2-klein-4B), and Black Forest Labs' announcements of [FLUX.1](https://bfl.ai/announcements/24-08-01-bfl) and [FLUX.2 klein](https://bfl.ai/blog/flux2-klein-towards-interactive-visual-intelligence).

## How to generate vector art with FLUX in VTracer

1. Open the **Gen AI** tab and choose **FLUX.1 schnell** or **FLUX.2 klein** from the model menu. The first time, accept its license, and the app downloads it from Hugging Face and installs it. FLUX.1 schnell is the largest download in the lab, so allow time and disk space.
2. Type a **subject** and any **details**, and pick an [art style](/kb/art-styles).
3. **Generate.** The image is generated on your device and traced by VTracer 2, with the background removed.
4. With FLUX.2 klein, click the **⋯** menu on a round in the column on the left and choose **Use as reference image**, then describe the change and generate again. The next round carries over its character or style. See [How to edit AI-generated art with a reference image](/kb/edit-with-a-reference-image).

## FLUX.2 klein: the best for image-to-image

![Two traces by FLUX.2 klein: a cartoon fox sitting with its eyes closed in a contented smile, in 74 paths; and a smiling anime girl with short pastel hair and soft shading, in 320 paths.](/kb/images/flux-vector-art/flux-2-klein.svg "FLUX.2 klein, traced: a fox (74 paths, 37 KB) and a 1990s shoujo-style girl, traced with mesh gradients (320 paths, 173 KB).")

- **Compact SVGs.** Clean, flat shapes with crisp outlines: the fox takes 74 paths, and on the anime test prompts in [our comparison](/kb/ai-models-for-vector-art) its traces averaged 130.
- **Soft shading, kept soft.** The girl, from the comparison's *1990s shoujo anime* prompt, has pastel cel shading and a blush, traced with mesh gradients. [What is a mesh gradient?](/kb/mesh-gradients#mesh-gradients-in-vtracer-2) shows how that blush is stored.
- **Reads more than English.** Its Qwen3 text encoder reads Chinese directly: a prompt of just *红狐*, red fox, goes to the model as written.
- **Follows your drawing, with freedom.** It keeps the pose and expression of a sketch in [Pencil to vector](/kb/pencil-to-vector), but does not just color in your lines: it still draws the picture its own way.
- **Fast.** About 22 seconds a round in our test, generation and tracing together.

From a prompt alone, [Z-Image Turbo](/kb/z-image-vector-art) gives better results. Choose FLUX.2 klein when you start from an image.

### The best model for image editing

FLUX.2 klein is the model to use when you want to change a picture rather than make a new one. Give it a round's result as a **reference image** and describe the change: it keeps the character, colors and pose, and changes only what you ask for. Here, the fox above was given back with the prompt *smiling, mouth open, open eyes*:

![On the left, the cartoon fox with its eyes closed in a contented smile. In the middle, the prompt words smiling, mouth open and open eyes. On the right, the same fox, with the same colors, markings, pose and tail, now grinning with its mouth open and one eye winking.](/kb/images/text-to-image-and-image-to-image/reference.svg "Editing with a reference image in FLUX.2 klein: the same fox, a new expression.")

The ears, markings, pose and tail carry over almost exactly; only the expression changes. Use it to give a mascot new expressions or poses, or to build a consistent set. See [Text-to-image vs image-to-image](/kb/text-to-image-and-image-to-image#reference-images) for how reference images work.

## FLUX.1 schnell: fine line work

![Three traced illustrations by FLUX.1 schnell: a sitting corgi, a cartoon guinea pig, and a vintage motorcycle, between 150 and 1,009 paths.](/kb/images/flux-vector-art/flux-1-schnell.svg "FLUX.1 schnell, traced: a corgi, a guinea pig in the Cartoon style, and a vintage motorcycle.")

- **Fine detail.** Fur, whiskers, chrome and spokes come through cleanly, on a plain background, as asked.
- **More detail, more paths.** The corgi and guinea pig take 150 to 213 paths; the motorcycle, with all its parts, 1,009.
- **Size and speed.** The largest download, the most memory, and about 40 seconds a round in our test.

## Prompt tips

- **Describe in plain sentences.** Both read prompts with a language model, so *a red fox sitting, orange and white fur, flat colors* works well.
- **Ask for flatness.** Add *flat colors, no shading* when you want fewer, larger shapes; FLUX.1 in particular shades readily.
- **Use a reference for sets.** With FLUX.2 klein, generate the first character, then use it as the reference for each variation.

## Best for

FLUX.2 klein: anything that starts from an image, such as your sketches in Pencil to vector, editing with reference images, and character sets and mascots. FLUX.1 schnell: detailed illustration, line art and ink styles, and artwork you will print large. Compare them with the other models in [Which AI image model is best for vector art?](/kb/ai-models-for-vector-art)
