import { createContext, useContext } from "react";
import { en as fsEn, zhHans as fsZh } from "./fact-sheet-copy";
import { COMPARISONS, PLATFORMS, type OS } from "./site";

/**
 * Every word the landing page shows, one object per language, handed down
 * through context. Pages with no translation (the legal documents) render
 * without a provider and get English.
 *
 * Wherever the landing page and the fact sheet say the same thing, the words
 * come from fact-sheet-copy.ts, so the two pages cannot drift in either
 * language. The Chinese follows the app's glossary, as the fact sheet does.
 *
 * A heading with an accented word is a [before, accent, after] triple, since
 * the accent lands in a different place in each language.
 */
export type Lang = "en" | "zh";
type Accented = [string, string, string];
type Text = { title: string; body: string };

export type SiteCopy = {
  lang: Lang;
  /** This language's landing page, which every in-page link is relative to. */
  home: string;
  nav: { features: string; whatsNew: string; download: string };
  hero: {
    title: Accented;
    subStrong: string;
    sub: string;
    downloadFor: (os: OS) => string;
    downloadApp: string;
    seeWhat: string;
    free: string;
    alsoBefore: string;
    alsoAfter: string;
    and: string;
    allPlatforms: string;
    onDevice: string;
  };
  cmp: {
    againstAria: string;
    samplesAria: string;
    original: string;
    /** Sample names, keyed by COMPARISONS id. */
    samples: Record<string, string>;
    stats: (paths: number, kb: number) => string;
    drag: string;
    real: string;
    yourself: string;
    svg: (name: string) => string;
    listJoin: string;
    end: string;
    leftAlt: (sample: string, side: string) => string;
    rightAlt: (sample: string) => string;
  };
  wipeAria: (left: string, right: string) => string;
  sections: {
    design: { title: Accented; note: string };
    whatsNew: { title: string; note: string };
    prompt: { title: Accented; note: string };
    pencil: { title: Accented };
    download: { title: Accented; note: string };
    open: { title: Accented; note: string };
  };
  features: Text[];
  showcase: { title: string; blurb: string }[];
  source: string;
  sourceAlt: (title: string) => string;
  tracedAlt: (title: string) => string;
  genai: { alt: string; points: Text[] };
  pencil: FactSheetPencil;
  shotAlt: string;
  scarcity: { strong: string; rest: string };
  platforms: { yours: string; meta: Record<OS, string> };
  star: string;
  install: { aria: string; copy: string; copied: string };
  cta: { title: Accented; download: string; github: string };
  footer: { privacy: string; terms: string; cookies: string; language: string };
  consent: { aria: string; text: string; more: string; decline: string; accept: string };
};

type FactSheetPencil = typeof fsEn.pencil;

const META = Object.fromEntries(PLATFORMS.map((p) => [p.os, p.meta])) as Record<OS, string>;
const SAMPLES = Object.fromEntries(COMPARISONS.map((c) => [c.id, c.label]));

export const en: SiteCopy = {
  lang: "en",
  home: "/",
  nav: { features: "Features", whatsNew: "What’s new", download: "Download" },
  hero: {
    title: ["The next-gen ", "VTracer", " has arrived"],
    subStrong: "The best vectorizer, on your device.",
    sub: "A deep-learning engine cleans up and sharpens your artwork first, then traces it — crisp edges, smooth gradients, and curves you would have drawn yourself.",
    downloadFor: (os) => `Download for ${os}`,
    downloadApp: "Download the app",
    seeWhat: "See what it does",
    free: "Free to download",
    alsoBefore: "also for ",
    alsoAfter: "",
    and: " and ",
    allPlatforms: "macOS and Windows",
    onDevice: "Tracing runs entirely on your device",
  },
  cmp: {
    againstAria: "What to compare VTracer 2 against",
    samplesAria: "Sample artwork",
    original: "Original",
    samples: SAMPLES,
    stats: (paths, kb) => `${paths.toLocaleString("en-US")} paths · ${kb} KB`,
    drag: "Drag to compare",
    real: "Both traces are the real SVG files",
    yourself: "Compare the traces yourself: ",
    svg: (name) => `${name} SVG`,
    listJoin: ", ",
    end: ".",
    leftAlt: (sample, side) => `${sample}, ${side}`,
    rightAlt: (sample) => `${sample} traced by VTracer 2`,
  },
  wipeAria: (left, right) => `Comparison position between ${left} and ${right}`,
  sections: {
    design: {
      title: ["Built for ", "design", " work"],
      note: "Logos, clip art, illustration, brand assets — the artwork designers actually put through a vectorizer, handled the way they need it handled.",
    },
    whatsNew: {
      title: "New in VTracer 2",
      note: "Three things the old engine could not do. Drag any of them — the right-hand side of each is the real SVG.",
    },
    prompt: {
      title: ["Prompt to ", "vector", ""],
      note: "Generative Diffusion models run inside the app, on your device. A guided prompt steers them toward art that traces well, so every result comes out as clean vectors.",
    },
    pencil: { title: ["Pencil to ", "vector", ""] },
    download: {
      title: ["Start with the ", "free", " app"],
      note: "Download the app and start tracing. Activate VTracer 2 inside the app to start a free trial, no credit card required.",
    },
    open: {
      title: ["VTracer 1 stays ", "open", ". Forever."],
      note: "The original engine is MIT-licensed, recently revamped, and free to use in anything you build. That is not changing.",
    },
  },
  features: fsEn.features,
  showcase: fsEn.showcase,
  source: "Source",
  sourceAlt: (title) => `${title}, source`,
  tracedAlt: (title) => `${title}, traced by VTracer 2`,
  genai: { alt: fsEn.genai.alt, points: fsEn.genai.points },
  pencil: fsEn.pencil,
  shotAlt:
    "The VTracer 2 desktop app comparing a traced tiger mascot against its source, with model, clustering, compositing and curve-fitting controls in the side panel.",
  scarcity: {
    strong: "We invite professional designers and illustrators to shape our product.",
    rest: "Seats are limited — register in the app to request early access!",
  },
  platforms: { yours: "Your platform", meta: META },
  star: "Star on GitHub",
  install: { aria: "Installation target", copy: "Copy", copied: "Copied" },
  cta: {
    title: ["Unleash your ", "creativity.", ""],
    download: "Download VTracer",
    github: "VTracer 1 on GitHub",
  },
  footer: {
    privacy: "Privacy",
    terms: "Terms",
    cookies: "Cookie settings",
    language: "Language",
  },
  consent: {
    aria: "Cookie consent",
    text: "We use cookies to understand how our site is used and to improve it.",
    more: "Learn more",
    decline: "Decline",
    accept: "Accept",
  },
};

export const zh: SiteCopy = {
  lang: "zh",
  home: "/zh/",
  nav: { features: "特性", whatsNew: "新功能", download: "下载" },
  hero: {
    title: ["新一代 ", "VTracer", " 来了"],
    subStrong: "最好的矢量化工具，就在你的设备上。",
    sub: "深度学习引擎先清理、锐化你的作品，再进行描摹：边缘清晰，渐变平滑，曲线就像你亲手画的一样。",
    downloadFor: (os) => `下载 ${os} 版`,
    downloadApp: "下载应用",
    seeWhat: "看看它能做什么",
    free: "免费下载",
    alsoBefore: "另有 ",
    alsoAfter: " 版",
    and: " 和 ",
    allPlatforms: "macOS 和 Windows",
    onDevice: "描摹完全在你的设备上进行",
  },
  cmp: {
    againstAria: "VTracer 2 的对比对象",
    samplesAria: "示例作品",
    original: "原图",
    samples: { illustration: "插画", graphic: "图形" },
    stats: (paths, kb) => `${paths.toLocaleString("zh-CN")} 条路径 · ${kb} KB`,
    drag: "拖动对比",
    real: "两份描摹结果都是真实的 SVG 文件",
    yourself: "自己对比描摹结果：",
    svg: (name) => `${name} SVG`,
    listJoin: "、",
    end: "。",
    leftAlt: (sample, side) => `${sample}，${side}`,
    rightAlt: (sample) => `${sample}，由 VTracer 2 描摹`,
  },
  wipeAria: (left, right) => `${left}与${right}之间的对比位置`,
  sections: {
    design: {
      title: ["为", "设计", "工作而生"],
      note: "标志、剪贴画、插画、品牌素材：设计师真正需要矢量化的作品，都按他们需要的方式处理。",
    },
    whatsNew: {
      title: "VTracer 2 新功能",
      note: "旧引擎做不到的三件事。每一个都可以拖动，右侧都是真实的 SVG。",
    },
    prompt: {
      title: ["从提示词到", "矢量图", ""],
      note: "生成式扩散模型在应用内、在你的设备上运行。引导式提示词把它们引向便于描摹的画面，因此每个结果都能成为干净的矢量图。",
    },
    pencil: { title: ["从铅笔草图到", "矢量图", ""] },
    download: {
      title: ["从", "免费", "应用开始"],
      note: "下载应用，开始描摹。在应用内激活 VTracer 2 即可开始免费试用，无需信用卡。",
    },
    open: {
      title: ["VTracer 1 永远", "开源", "。"],
      note: "初代引擎采用 MIT 许可，最近刚完成翻新，可以免费用在你构建的任何东西里。这一点不会改变。",
    },
  },
  features: fsZh.features,
  showcase: fsZh.showcase,
  source: "原图",
  sourceAlt: (title) => `${title}，原图`,
  tracedAlt: (title) => `${title}，由 VTracer 2 描摹`,
  genai: { alt: fsZh.genai.alt, points: fsZh.genai.points },
  pencil: fsZh.pencil,
  shotAlt:
    "VTracer 2 桌面应用正在对比描摹好的老虎吉祥物与原图，侧边栏里是模型、聚合、合成和曲线拟合等参数。",
  scarcity: {
    strong: "我们邀请专业设计师和插画师一起打磨产品。",
    rest: "名额有限，在应用内注册即可申请抢先体验！",
  },
  platforms: {
    yours: "你的平台",
    meta: { macOS: "通用版 · Metal 加速", Windows: "x64 · 安装程序", Linux: "x64 · AppImage" },
  },
  star: "在 GitHub 上点星",
  install: { aria: "安装方式", copy: "复制", copied: "已复制" },
  cta: {
    title: ["释放你的", "创造力", "。"],
    download: "下载 VTracer",
    github: "GitHub 上的 VTracer 1",
  },
  footer: {
    // The legal documents are English only; the label says so before the click.
    privacy: "隐私政策（英文）",
    terms: "服务条款（英文）",
    cookies: "Cookie 设置",
    language: "语言",
  },
  consent: {
    aria: "Cookie 同意",
    text: "我们使用 Cookie 来了解网站的使用情况并加以改进。",
    more: "了解详情（英文）",
    decline: "拒绝",
    accept: "接受",
  },
};

/**
 * The footer switcher's targets. English is /en/, not /: / redirects
 * Chinese-preferring browsers on every visit, so a link there could bounce
 * the reader straight back.
 */
export const LANGS: { lang: Lang; name: string; href: string }[] = [
  { lang: "en", name: "English", href: "/en/" },
  { lang: "zh", name: "简体中文", href: "/zh/" },
];

/**
 * The copy for the page being served. On /en/, in-page links stay under /en/
 * so a reader who chose English is never routed back through /.
 */
export function copyFor(lang: string, path: string): SiteCopy {
  if (lang.startsWith("zh")) return zh;
  return path.startsWith("/en/") ? { ...en, home: "/en/" } : en;
}

export const CopyContext = createContext<SiteCopy>(en);

export function useCopy() {
  return useContext(CopyContext);
}
