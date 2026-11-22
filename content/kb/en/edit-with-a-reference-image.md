---
title: "How to edit AI-generated art with a reference image"
description: Turn a round you like into the reference for the next one, describe the change, and get the same character with a new look. Step by step in VTracer.
section: tutorials
order: 10
published: 2026-11-22
---

You generated a character you like, and now you want it smiling, or waving, or in a new pose. Generating again from the same prompt gives you a different character. Use the round as a **reference image** instead: the model keeps the character, colors and pose, and changes only what you ask for.

This takes three steps in the [Gen AI lab](/kb/gen-ai-lab).

## Before you start

You need a model that supports reference images. In the Gen AI lab, that is **FLUX.2 klein**, which runs on your device, or **OpenAI Codex**, which runs in the cloud. Choose it from the **Model** menu at the top of the right panel. See [How to generate vector art with FLUX](/kb/flux-vector-art) and [How to generate vector art with ChatGPT Codex](/kb/chatgpt-codex-vector-art).

You also need a round to start from: any round in the **Rounds** column on the left.

## 1. Use the round as a reference image

Point to the round you want to edit, click its **⋯** menu at the top right, and choose **Use as reference image**.

![The VTracer app on the Gen AI tab. In the Rounds column on the left, the menu of round 1 is open, and its first item, Use as reference image, is marked 1. The canvas shows a cartoon red fox. The right panel shows the model, FLUX.2 klein 4B, and the prompt, with the Generate button below it marked 3.](/kb/images/edit-with-a-reference-image/round-menu.svg "Step 1: open the round's ⋯ menu and choose Use as reference image. The Generate button, marked 3, is for the last step.")

## 2. Check the pending round

A new round appears at the top of the column, marked **Pending**, with its source noted under it. Before you generate, check two things in the right panel:

- The round's image is in the **Sketch** panel. That is the picture the model will look at.
- **Reference** is selected under it, not **Reimagine**.

![The same window after step 1. A new round 3, marked Pending, is at the top of the Rounds column. In the right panel, the fox is in the Sketch panel and the Reference button below it is selected; all three are marked 2. The Subject and Details of the prompt are marked 3.](/kb/images/edit-with-a-reference-image/pending-round.svg "Step 2: the pending round, with the image in the Sketch panel and Reference selected. Step 3: the prompt.")

## 3. Edit the prompt and generate

Keep the **Subject** as it is, and change the **Details** to describe what should be different. Here the fox keeps its subject, *fox*, and the details ask for *smiling, mouth open, cute eyes*. Then click **Generate**, below the prompt and the art style, marked 3 in the first screenshot.

The new round is generated and traced to SVG like any other. Here is an edit made this way, with the details *smiling, mouth open, open eyes*:

![On the left, a cartoon fox sitting with its eyes closed in a contented smile. In the middle, the prompt words smiling, mouth open and open eyes. On the right, the same fox, with the same colors, markings, pose and tail, now grinning with its mouth open and one eye winking.](/kb/images/text-to-image-and-image-to-image/reference.svg "The reference on the left and the edited round on the right, traced. Only the expression changed.")

The ears, markings, pose and tail carry over almost exactly; only the expression follows the new prompt.

## Tips

- **Change one thing at a time.** A small change, such as an expression, keeps the character closest to the reference.
- **Build a set from one reference.** For a mascot in several poses or expressions, use the same first round as the reference for each variation, so they all match it rather than drifting.
- **Chain edits.** A round made from a reference can itself be the next reference.
- **If the result ignores the reference,** check that Reference is selected and that the model is FLUX.2 klein or Codex.

## How it works

A reference image is not the starting point of the generation. The model starts from noise, as with a prompt alone, and looks at the reference while it draws, the way it reads your prompt. That is why it can change an expression or a pose without fighting what is already in the picture. [Text-to-image vs image-to-image](/kb/text-to-image-and-image-to-image#reference-images) explains the difference.
