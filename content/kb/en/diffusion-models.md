---
title: "How AI image generators work: diffusion models explained"
description: Diffusion models turn noise into pictures one step at a time. How they work, what text encoders, latents and steps are, and how the model families differ.
section: gen-ai
order: 12
published: 2026-11-22
---

Almost every AI image generator in use today, from Stable Diffusion to FLUX, is a **diffusion model**. The idea is simple to state: start from pure noise, and remove a little of it at a time until a picture is left. What the picture shows is steered by your prompt. Knowing how that works explains most of what you see when you generate artwork: why the same prompt gives a different image each time, why some models need four steps and others fifty, and why some follow instructions so much better than others.

## From noise to a picture

A diffusion model is trained on a simple task. Take a real image, add some random noise to it, and ask the model to predict the noise, so it can be taken away again. Repeated over millions of images and every amount of noise, from a faint grain to pure static, the model learns what images look like at every stage of being buried in noise. This approach was shown to produce high-quality images by [Ho, Jain and Abbeel in 2020](https://arxiv.org/abs/2006.11239).

To generate, the process runs backwards. The model starts from random noise and, step by step, predicts and removes some of it. Each step reveals a little more structure: first the rough layout, then shapes and colors, then details.

![Five squares in a row: pure colored static, then a fox faintly emerging from the noise, growing clearer in each square, to a clean cartoon fox on white.](/kb/images/diffusion-models/denoising.svg "An illustration of denoising: each step removes some of the noise, until only the picture is left. A real model works on a compressed version of the image, not on the pixels shown here.")

The random noise the process starts from is set by a **seed**. The same seed, prompt and model give the same image; a new seed gives a new image. That is why the [Gen AI lab](/kb/gen-ai-lab) shows the seed of every round.

## The parts of a model

A modern text-to-image model is really three models working together:

- **A text encoder** reads your prompt and turns it into numbers the image model can use. Older models use CLIP, trained to match images with captions; newer ones use a full language model, such as T5 or Qwen3, which understands longer and more precise instructions.
- **The denoiser** does the generating. Earlier models use a **UNet**, a network designed for images. Newer ones use a **diffusion transformer**, the same kind of architecture as language models, which scales better and follows prompts more closely.
- **An autoencoder**, often called the VAE. Working on full-size pixels would be slow, so the denoiser works on a small compressed version of the image, called the **latent**, and the autoencoder turns the finished latent back into pixels. This is the idea behind Stable Diffusion, introduced as [latent diffusion by Rombach and colleagues](https://arxiv.org/abs/2112.10752).

## Steps, guidance and turbo models

A classic diffusion model takes 25 to 50 **steps**, each a full run of the denoiser, and uses **classifier-free guidance**, which runs the model twice per step, with and without the prompt, and pushes the result toward the prompt ([Ho and Salimans](https://arxiv.org/abs/2207.12598)). That is accurate, but slow.

**Turbo** and **distilled** models are trained to do the same job in far fewer steps, typically 1 to 8, and without a separate guidance pass. A slow, accurate teacher model trains a fast student to jump straight to a good result. [Adversarial Diffusion Distillation](https://arxiv.org/abs/2311.17042), behind SD-Turbo and SDXL-Turbo, was one of the first methods to get down to a single step. Distilled models are what make generation practical on a laptop, and they are what the Gen AI lab runs.

In the Gen AI lab, the number of steps is a setting. Each model starts from a value that suits it, and you can raise it for more refinement or lower it for speed; a distilled model gains little beyond the handful of steps it was trained for.

Many newer models, FLUX among them, are trained with **flow matching**, also called rectified flow, which learns to move noise toward an image along a straight path, so fewer steps are needed ([Lipman and colleagues](https://arxiv.org/abs/2210.02747), [Liu and colleagues](https://arxiv.org/abs/2209.03003)).

## Running models on your own device

The full versions of these models are large: tens of gigabytes for the biggest. To run on an ordinary computer, each part is **quantized**: its numbers are stored with fewer bits, 8 or 4 instead of 16, which shrinks the download and the memory it needs, at a small cost in quality. The models in the Gen AI lab are quantized this way, from about 2 GB for the smallest to about 12 GB for the largest.

## The model families

The Gen AI lab runs five models from three families:

| Model | From | Released | Denoiser | Text encoder | Download | Memory needed |
| --- | --- | --- | --- | --- | --- | --- |
| [SD-Turbo](/kb/stable-diffusion-vector-art) | Stability AI | Nov 2023 | UNet, distilled from Stable Diffusion 2.1 | CLIP | 2.0 GB | 4 GB |
| [SDXL-Turbo](/kb/stable-diffusion-vector-art) | Stability AI | Nov 2023 | UNet, distilled from SDXL 1.0 | Two CLIP encoders | 4.1 GB | 6 GB |
| [FLUX.1 schnell](/kb/flux-vector-art) | Black Forest Labs | Aug 2024 | 12B diffusion transformer | T5-XXL and CLIP | 12.4 GB | 16 GB |
| [FLUX.2 klein 4B](/kb/flux-vector-art) | Black Forest Labs | Jan 2026 | 4B diffusion transformer | Qwen3-4B | 5.1 GB | 8 GB |
| [Z-Image Turbo](/kb/z-image-vector-art) | Alibaba, Tongyi-MAI | Nov 2025 | 6B diffusion transformer | Qwen3-4B | 6.5 GB | 8 GB |

**Memory needed** is the free memory to generate at 512 × 512: unified memory on Apple Silicon, or graphics memory on a dedicated GPU, which can fall back to system memory if it runs short. The model itself takes up roughly its download size, plus room to work. See [Hardware and performance](/kb/hardware-and-performance).

<!-- Download: the quantized files the app installs (SD-Turbo and SDXL-Turbo at 8 bits, the others at 4 bits, with an 8-bit T5 for FLUX.1), from the app's model index. -->

The lab can also generate with **OpenAI Codex**, which runs gpt-image-2 in OpenAI's cloud on your own ChatGPT plan, with nothing to download: see [How to generate vector art with ChatGPT Codex](/kb/chatgpt-codex-vector-art).

### Where the models come from

VTracer does not make or distribute these models. When you choose one in the Gen AI lab, the app downloads it directly from Hugging Face, from the publisher's own repository or from a community quantization of the publisher's model, and installs it on your device. Before it downloads, you accept the model's license, which is between you and its publisher. Each model's guide links its source and license.

The pattern is clear across the generations. The 2023 Stability models are small and fast, but their CLIP text encoders understand prompts only loosely. The newer transformer models pair the denoiser with a real language model, and follow instructions such as *plain white background* or *flat colors, no gradients* far more faithfully, which matters a great deal when the image is going to be traced. [Which AI image model is best for vector art?](/kb/ai-models-for-vector-art) compares all five on the same prompts.

## From text, or from an image

Everything above describes **text-to-image**: generating from noise and a prompt. A diffusion model can also start from an existing picture, such as your sketch, by adding some noise to it and denoising from there. That is **image-to-image**, and it is how [Pencil to vector](/kb/pencil-to-vector) works. See [Text-to-image vs image-to-image](/kb/text-to-image-and-image-to-image).
