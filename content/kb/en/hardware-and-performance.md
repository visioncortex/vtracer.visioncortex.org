---
title: Hardware and performance in VTracer 2
description: Where VTracer 2 spends its time, how the app caches the slow part so changing settings stays quick, and which hardware makes tracing faster.
section: vtracer-2
order: 40
published: 2026-11-22
---

VTracer 2 does far more work than a classic tracer: before it fits a single curve, a deep-learning engine cleans up, upscales and clusters the image. That runs entirely on your own machine, so your hardware decides how long the first trace takes.

## Where the time goes

Almost all of it goes into the first stage, the deep-learning engine, which works on the image at up to 8× its size. Everything after it, from layering shapes to fitting curves and writing gradients, is quick by comparison.

So VTracer 2 keeps the result. The first trace of an image pays for the slow stage; after that, the app reuses it:

- **Adjusting settings** re-runs only the stages after it, so changes to the trace show up quickly.
- **Opening the same image again** later skips the slow stage, as long as its result is still in the cache.


The cache lives on disk, limited to 2 GB by default. You can change the limit in the app's settings; lowering it frees the space straight away.

## Hardware that makes it faster

The engine runs on the GPU where it can: through **Metal** on macOS and **Vulkan** on Windows and Linux. Two kinds of machine run it well:

- **A processor with a strong integrated GPU and unified memory**, such as Apple Silicon Macs. The GPU shares the system's memory, so even a large upscaled image has room.
- **A dedicated graphics card with more than 4 GB of its own memory.** Large upscaled images need room; a card with less memory may run out on big inputs.


VTracer 2.0.14 made the engine use about half the memory and run up to twice as fast on integrated GPUs, so keep the app up to date.

Without a suitable GPU, the engine runs on the CPU, using every core, and still produces the same trace, only more slowly.

## Supported systems

- **macOS** on Apple Silicon.
- **Windows** 10 (64-bit, with TPM) and Windows 11.
- **Linux**: Debian, Ubuntu, Fedora and Arch-based distributions.

## If tracing is slow or fails

- **Keep the input under 4096 × 4096 pixels.** Crop it to the part you need, or scale it down. VTracer 2 upscales the image before tracing, so a huge input risks running out of memory.
- **Close other GPU-heavy apps**, such as games, video editors or other AI tools, which compete for GPU memory.
- **Update your graphics drivers**, especially on Windows and Linux, where VTracer 2 relies on Vulkan.
- **If the GPU misbehaves,** turn off *Use GPU acceleration where available* under Settings › Tracing to run the engine on the CPU only.
- **Keep the cache large enough** to hold the images you come back to, so they do not have to be processed again.
