import { FEATURES, GENAI, PENCIL, SHOWCASE, TRIAL } from "./site";

/**
 * Every word the fact sheet shows, one object per language. Media, framing and
 * aspect ratios stay in site.ts; the lists here line up with those by index,
 * and checkCopy fails the build if one ever falls out of step.
 *
 * The English is drawn from site.ts wherever the landing page says the same
 * thing, so the two cannot drift. The Chinese follows the app's own glossary
 * (vtracer-app/frontend/src/i18n/zh-Hans.js): 描摹 for trace, 授权 for
 * licence, 堆叠 and 镂空 for the compositing modes, 画风 and 强度 for the Gen
 * AI controls, and 你 throughout, with spaces around Latin text and numbers.
 */
type Text = { title: string; body: string };

export type FactSheetCopy = {
  lede: string;
  /** Label on the source side of every comparison stage. */
  source: string;
  heroAlt: string;
  caption: string;
  showcaseAlt: (title: string) => string;
  sections: {
    engine: string;
    whatsNew: string;
    prompt: string;
    pencil: string;
    output: string;
    artwork: string;
    questions: string;
  };
  /** In FEATURES order. */
  features: Text[];
  /** In SHOWCASE order. */
  showcase: { title: string; blurb: string }[];
  genai: { intro: string; alt: string; points: Text[]; byo: Text };
  /** Points in PENCIL.points order; `media` is the image alt or video label. */
  pencil: {
    intro: string;
    heroLabel: string;
    points: (Text & { note?: string; media: string })[];
  };
  output: string[];
  artwork: string;
  faq: [string, string][];
};

export const en: FactSheetCopy = {
  lede: "VTracer 2 is the next-gen tracing engine of VTracer.",
  source: "Source",
  heroAlt:
    "An illustrated portrait, half shown as its low-resolution source and half as the SVG VTracer 2 traced from it.",
  caption: "Left, source image. Right, the SVG emitted by VTracer 2.",
  showcaseAlt: (title) => `${title}: the source on the left, the VTracer 2 trace on the right.`,
  sections: {
    engine: "What the engine does",
    whatsNew: "New in VTracer 2",
    prompt: "Prompt to vector",
    pencil: "Pencil to vector",
    output: "Output",
    artwork: "Your artwork",
    questions: "Questions",
  },
  features: FEATURES.map(({ title, body }) => ({ title, body })),
  showcase: SHOWCASE.map(({ title, blurb }) => ({ title, blurb })),
  genai: {
    intro:
      "The Gen AI lab harnesses image generation models and runs them on your device. A guided prompt steers them toward art that traces well, so every result comes out as clean vectors.",
    alt: GENAI.shot.alt,
    points: GENAI.points,
    byo: {
      title: "Bring your own model",
      body: "VTracer can also talk to an sd-server you host yourself for generating graphics. It can be on the same machine, or on another machine you own.",
    },
  },
  pencil: {
    intro: PENCIL.intro,
    heroLabel: PENCIL.hero.label,
    points: PENCIL.points.map((point) => ({
      title: point.title,
      body: point.body,
      note: point.note,
      media: point.image?.alt ?? point.video?.label ?? "",
    })),
  },
  output: [
    "SVG, with adjustable curve simplification and path precision.",
    "Linear, radial and mesh gradients.",
    "Stacked compositing (no holes) or cutout (no seams).",
    "Background removal, producing a transparent canvas.",
  ],
  artwork:
    "Your artwork never leaves this machine. The tracing engine runs locally, no request the app makes carries your images, your traces or their file names.",
  faq: [
    [
      "Do I need a credit card to try it?",
      "No. An account and nothing else — the trial is enabled from inside the app.",
    ],
    [
      "How long does the trial run?",
      `${TRIAL.days} days from activation, or ${TRIAL.traces.toLocaleString("en-US")} traces, whichever comes first.`,
    ],
    [
      "How many machines can I trial on?",
      "At most two. You can trial on both macOS and Windows, so you can make sure they both work. Linux support is coming soon.",
    ],
    [
      "What happens when the trial ends?",
      "The VTracer 2 features switch off and the rest of the app keeps working. Everything you have already traced stays on your disk, untouched.",
    ],
    [
      "Can I sell what I trace?",
      "Yes, client work included — that is what the app is for. What a license does not cover is automating the app or offering its tracing to other people as a service.",
    ],
    [
      "Does it need an internet connection?",
      "Tracing does not. Activation does, once, and an activated device keeps working offline afterwards.",
    ],
    [
      "Is it a subscription?",
      "No. A license is perpetual and covers every release in its model line. Paid licenses are not on sale yet.",
    ],
    [
      "And VTracer 1?",
      "Unchanged, and staying that way: MIT-licensed, free for any use, including commercially.",
    ],
  ],
};

export const zhHans: FactSheetCopy = {
  lede: "VTracer 2 是 VTracer 的新一代描摹引擎。",
  source: "原图",
  heroAlt: "一幅插画人像，一半是低分辨率的原图，一半是 VTracer 2 从中描摹出的 SVG。",
  caption: "左为原图，右为 VTracer 2 输出的 SVG。",
  showcaseAlt: (title) => `${title}：左为原图，右为 VTracer 2 的描摹结果。`,
  sections: {
    engine: "引擎能做什么",
    whatsNew: "VTracer 2 新功能",
    prompt: "从提示词到矢量图",
    pencil: "从铅笔草图到矢量图",
    output: "输出",
    artwork: "你的作品",
    questions: "常见问题",
  },
  features: [
    {
      title: "先放大，再描摹",
      body: "在拟合任何一条曲线之前，引擎会先把你的图片重建到最高 8 倍。传统描摹工具会把细节压成锯齿状的台阶，在这里它们会呈现为干净的几何形状。",
    },
    {
      title: "不凭空捏造",
      body: "放大模型总爱无中生有。我们的模型不会往你的作品里臆造物体、纹理或细节，只还原原本就有的内容。这一约束是引擎设计的一部分。",
    },
    {
      title: "在你的设备上运行",
      body: "一个 450 万参数的模型：小到足以快速运行，并且完全在本地，在 macOS 上由 Metal 加速。你的作品从不离开这台机器，描摹流程中没有任何服务器。",
    },
    {
      title: "扛得住真实的 JPEG",
      body: "杂噪、色块、马赛克，还有被反复保存过十几次的文件。引擎专为越过压缩损伤去描摹而设计，而不是把损伤本身原样描摹下来。",
    },
    {
      title: "原生渐变",
      body: "平滑的渐变会作为渐变输出，而不是用上百个分段色块去模仿。",
    },
    {
      title: "堆叠模式",
      body: "VTracer 的独有功能：形状层层堆叠，而不是彼此切割。节点更少，文件更小，得到的文档打开和编辑起来都真正顺手。",
    },
  ],
  showcase: [
    {
      title: "是渐变，不是色块",
      blurb: "渐隐的天空依然平滑：以渐变输出，而不是被切成上百块。",
    },
    {
      title: "JPEG 压缩？没问题",
      blurb: "手上只有压缩严重的 JPEG？VTracer 2 会去除噪点、还原细节，把压缩伪影留在身后。",
    },
    {
      title: "背景，一键去除",
      blurb: "剪贴画常常带着纯色底板。勾选一项，描摹结果就会落在透明背景上。",
    },
  ],
  genai: {
    intro:
      "Gen AI 实验室调用图像生成模型，并在你的设备上运行。引导式提示词会把模型引向便于描摹的画面，因此每个结果都能成为干净的矢量图。",
    alt: "VTracer 应用的 Gen AI 实验室。右侧的提示词面板写着 corgi, sitting, smiling；中间的透明画布上是一只描摹好的卡通柯基；左侧一列是此前的各个回合及其随机种子。",
    points: [
      {
        title: "从提示词到矢量图",
        body: "输入提示词，得到 SVG。应用在你的设备上生成图片，并在同一流程中完成描摹，所以你拿到的是透明背景上的干净几何形状，可以直接放进你的设计作品。",
      },
      {
        title: "你的模型，你的机器",
        body: "选一个模型，在应用内下载，它就保存在你的设备上。支持多种扩散模型，也可以使用你自己的模型。提示词不会离开你自己的机器。无需订阅，无需上传。",
      },
    ],
    byo: {
      title: "自带模型",
      body: "VTracer 也可以连接你自己部署的 sd-server 来生成图形。它可以在同一台机器上，也可以在你拥有的另一台机器上。",
    },
  },
  pencil: {
    intro:
      "给铅笔草图拍张照，拖进来就行。VTracer 会把你的线条从纸面上提取出来，去掉纸张、阴影和污渍，再以此生成。强度调低，只清理草图；调高，则变成完整的彩色作品。",
    heroLabel:
      "在笔记本上用铅笔画一只狐狸，拍照后拖进 VTracer 的 Gen AI 实验室，先清理成线稿，再生成一只彩色卡通狐狸。",
    points: [
      {
        title: "草图，清理干净",
        body: "随手画在餐巾纸上的草图，再也不用扔掉。拍张照，拖进来。纸张和杂质被擦除，排线被填实，你的线条干净得就像在数位板上画的一样，可以直接进入生成流程。",
        note: "画风：线稿 · 强度：0.2",
        media:
          "灰色纸上用铅笔画的三只猫，带有阴影，还有一只擦了一半的第四只猫；旁边是同样三只猫的干净黑色线稿，背景透明。",
      },
      {
        title: "干净的矢量图，拿来就用",
        body: "堆叠模式让形状层层叠放，而不是彼此切割，因此每个形状都保持完整，便于编辑和改色。就像你亲手扫描、清理，再一笔一笔精心描摹出来的一样。",
        note: "画风：卡通 · 强度：0.5",
        media:
          "矢量编辑器中一只描摹好的卡通狐狸。它的形状被选中并拖开，可以看到它只由几个完整的堆叠形状组成，彩色形状下方是一块深色底层。",
      },
    ],
  },
  output: [
    "SVG，可调节曲线简化程度和路径精度。",
    "线性、径向和网格渐变。",
    "堆叠合成（无孔洞）或镂空合成（无接缝）。",
    "去除背景，得到透明画布。",
  ],
  artwork:
    "你的作品从不离开这台机器。描摹引擎在本地运行，应用发出的任何请求都不会携带你的图片、描摹结果或它们的文件名。",
  faq: [
    ["试用需要信用卡吗？", "不需要。只需一个账户，在应用内即可开启试用。"],
    [
      "试用期有多长？",
      `自激活起 ${TRIAL.days} 天，或 ${TRIAL.traces.toLocaleString("zh-CN")} 次描摹，以先到者为准。`,
    ],
    [
      "可以在几台机器上试用？",
      "最多两台。你可以同时在 macOS 和 Windows 上试用，确认两边都能正常工作。Linux 支持即将推出。",
    ],
    [
      "试用结束后会怎样？",
      "VTracer 2 的功能会关闭，应用的其余部分照常可用。你已经描摹好的所有内容都原封不动地留在你的磁盘上。",
    ],
    [
      "描摹出的作品可以拿去卖吗？",
      "可以，包括客户项目，这本来就是这款应用的用途。授权不涵盖的是：自动化操控应用，或把它的描摹能力作为服务提供给他人。",
    ],
    [
      "需要联网吗？",
      "描摹不需要。激活需要联网一次，激活后的设备之后可以离线使用。",
    ],
    [
      "是订阅制吗？",
      "不是。授权是永久的，涵盖其模型系列中的每一个版本。付费授权尚未开售。",
    ],
    [
      "那 VTracer 1 呢？",
      "保持不变，以后也是如此：采用 MIT 许可，可免费用于任何用途，包括商业用途。",
    ],
  ],
};

/**
 * The lists above are matched to site.ts by position. If a feature, sample or
 * card is added there and not here, the page would quietly pair the wrong
 * words with the wrong picture; this makes the prerender fail instead.
 */
export function checkCopy(copy: FactSheetCopy) {
  const pairs: [string, number, number][] = [
    ["features", copy.features.length, FEATURES.length],
    ["showcase", copy.showcase.length, SHOWCASE.length],
    ["genai.points", copy.genai.points.length, GENAI.points.length],
    ["pencil.points", copy.pencil.points.length, PENCIL.points.length],
  ];
  for (const [name, have, want] of pairs) {
    if (have !== want) {
      throw new Error(`fact sheet copy: ${name} has ${have} entries, site.ts has ${want}`);
    }
  }
}
