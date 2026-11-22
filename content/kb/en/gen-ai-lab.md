---
title: "The Gen AI lab: from prompt to vector"
description: The Gen AI lab generates artwork from a prompt on your own device and traces it to SVG. How a round works, which models it runs, and where your prompt goes.
section: gen-ai
order: 10
published: 2026-11-22
---

The Gen AI lab turns a few words into a finished SVG. It runs an image generation model on your device, then traces the result with VTracer 2 in the same pipeline, so what you get back is clean vector shapes on a transparent background, ready for your design app, cutting machine or laser.

## How a round works

Each generation is a **round**. You describe what you want, pick an art style and a model, and press generate:

1. **The prompt.** You name a **subject**, such as *a red fox sitting*, and optionally add **details** and a longer **description**.
2. **The guided prompt.** The lab builds the full prompt for you, in the chosen [art style](/kb/art-styles), and steers the model toward artwork that traces well: one subject, centered, whole, on a plain background.
3. **Generation.** The model paints the image on your device, typically at 512 × 512 pixels.
4. **Tracing.** VTracer 2 removes the background, cleans up and upscales the image, picks a [gradient step](/kb/gradient-step) to suit it, and traces it.

![A cartoon red fox as generated, a 512 by 512 image on a white background, and the same fox as a traced SVG on a transparent checkerboard.](/kb/images/gen-ai-lab/round.svg "One round: the image the model generated, and the SVG VTracer 2 traced from it, with the background removed.")

Rounds stay in a column on the left of the lab, each with its model and seed. Star the ones you like to keep them.

### Use a round as the input for the next

Any round's result can be the starting picture for another round, to carry its look forward or to change it with words:

1. Click the **⋯** menu at the top right of the round, in the column on the left, and choose **Use as reference image**.
2. In the new **Pending** round, check that the image is in the **Sketch** panel and **Reference** is selected.
3. Write the change you want in the prompt, such as *smiling, mouth open*, and **Generate**.

[How to edit AI-generated art with a reference image](/kb/edit-with-a-reference-image) walks through it with screenshots.

## Seeds

A **seed** is the random number a generation starts from. The same prompt, art style, model and seed give the same image again; change the seed and you get a different take on the same idea. That makes a round easy to reproduce, and lets you compare art styles or models fairly, as in [Art styles](/kb/art-styles), where every fox shares one seed.

## Models

The lab runs five open models, from three families. VTracer does not distribute them: when you choose one, you accept its license, and the app downloads it from Hugging Face, from the publisher or a community quantization of the publisher's model, and installs it on your device.

| Model | Family | Best for |
| --- | --- | --- |
| Z-Image Turbo | [Z-Image](/kb/z-image-vector-art) | Prompt to vector: every art style, and the cleanest SVGs |
| FLUX.2 klein | [FLUX](/kb/flux-vector-art) | Image-to-image: from a sketch, or editing with a reference image |
| FLUX.1 schnell | [FLUX](/kb/flux-vector-art) | Detailed illustration and fine line work |
| SDXL-Turbo | [Stable Diffusion](/kb/stable-diffusion-vector-art) | Rich, painterly detail |
| SD-Turbo | [Stable Diffusion](/kb/stable-diffusion-vector-art) | Speed on modest hardware |

[Which AI image model is best for vector art?](/kb/ai-models-for-vector-art) compares all five on the same prompts, and [How AI image generators work](/kb/diffusion-models) explains what sets them apart. Larger models need more memory: see [Hardware and performance](/kb/hardware-and-performance).

### Bring your own model

The lab can also send generation to an **sd-server** you run yourself, on the same machine or another machine you own, so you can use any model it can load.

### OpenAI Codex

If you use OpenAI's Codex, the lab can generate with it instead. You sign in to Codex yourself, and it uses your own plan. This is the one option in which your prompt leaves your machine: it is sent to OpenAI. Tracing still runs on your device. See [How to generate vector art with ChatGPT Codex](/kb/chatgpt-codex-vector-art).

## Your prompt stays on your device

With a local model or your own server, the prompt, the generated image and the trace never leave machines you control. There is no subscription and no upload.

### Prompts in Chinese or Japanese

You can write your prompt in **Chinese** or **Japanese**. Z-Image Turbo and FLUX.2 klein read them directly: their text encoder, Qwen3, is a multilingual language model. The other models, SD-Turbo, SDXL-Turbo and FLUX.1 schnell, only understand English, so for them the lab translates your prompt into English first.

The translation uses the same models as [Firefox Translations](https://github.com/mozilla/translations), Mozilla's translation engine, which are small, about 36 MB per language, and run entirely on your machine. Download them from the app's **Language** tab; like everything else in the lab, your prompt is not sent anywhere to be translated. For example, a prompt of *柴犬, 座っていること, 微笑んでいる* reached SD-Turbo as *Shiba Inu, Sitting, She's smiling*.

## From a sketch instead

A prompt is not the only way in. Drop in a photo of a pencil sketch, and the lab generates from your drawing as well as your words; or give it an earlier round as a reference, from the round's **⋯** menu, and edit it with words. See [Pencil to vector](/kb/pencil-to-vector) and [Text-to-image vs image-to-image](/kb/text-to-image-and-image-to-image).
