import type { Lang } from "../site";

/**
 * Every word the knowledge base's own chrome shows, per language. The
 * articles themselves are Markdown in content/kb/<lang>/. The Chinese and
 * Japanese follow the landing page's wording, as in site-copy.ts.
 */

export type KbCopy = {
  /** The tag for <html lang> and hreflang, as LANGS in site-copy.ts has it. */
  tag: string;
  kb: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  previous: string;
  next: string;
  more: string;
  breadcrumb: string;
  draft: string;
  /** Leads the links to this article's translations, punctuation included. */
  alsoIn: string;
  date: (iso: string) => string;
  /** Google Fonts families on top of the Latin set, for CJK headings. */
  fonts: string;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const cjkDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}年${m}月${d}日`;
};

export const KB_COPY: Record<Lang, KbCopy> = {
  en: {
    tag: "en",
    kb: "Knowledge base",
    title: "VTracer Knowledge Base",
    description:
      "Tutorials and guides for turning raster images into clean, editable SVG with VTracer: tracing settings, workflows and troubleshooting.",
    published: "Published",
    updated: "Updated",
    previous: "Previous",
    next: "Next",
    more: "More articles",
    breadcrumb: "Breadcrumb",
    draft: "draft",
    alsoIn: "Also in: ",
    // 2026-11-21 → 21 November 2026, the way the legal pages write dates.
    date: (iso) => {
      const [y, m, d] = iso.split("-").map(Number);
      return `${d} ${MONTHS[m - 1]} ${y}`;
    },
    fonts: "",
  },
  zh: {
    tag: "zh-Hans",
    kb: "知识库",
    title: "VTracer 知识库",
    description: "使用 VTracer 将位图转换为干净、可编辑的 SVG 的教程与指南：描摹设置、工作流程与疑难解答。",
    published: "发布于",
    updated: "更新于",
    previous: "上一篇",
    next: "下一篇",
    more: "更多文章",
    breadcrumb: "导航路径",
    draft: "草稿",
    alsoIn: "其他语言：",
    date: cjkDate,
    fonts: "family=Noto+Serif+SC:wght@600&",
  },
  ja: {
    tag: "ja",
    kb: "ナレッジベース",
    title: "VTracer ナレッジベース",
    description:
      "VTracer でラスター画像をきれいで編集しやすい SVG に変換するためのチュートリアルとガイド。トレース設定、ワークフロー、トラブルシューティング。",
    published: "公開",
    updated: "更新",
    previous: "前へ",
    next: "次へ",
    more: "その他の記事",
    breadcrumb: "パンくずリスト",
    draft: "下書き",
    alsoIn: "他の言語：",
    date: cjkDate,
    fonts: "family=Noto+Serif+JP:wght@600&",
  },
};

/**
 * Sidebar sections, in the order they are listed. Articles name a section by
 * its id; one naming any other id fails the build, so a typo cannot quietly
 * start a new section. Sections with no articles are left out.
 */
export const SECTIONS: { id: string; name: Record<Lang, string> }[] = [
  {
    id: "basics",
    name: { en: "Basics", zh: "基础知识", ja: "基礎知識" },
  },
  {
    id: "how-tracing-works",
    name: { en: "How tracing works", zh: "描摹原理", ja: "トレースの仕組み" },
  },
  {
    id: "vtracer-2",
    name: { en: "VTracer 2", zh: "VTracer 2", ja: "VTracer 2" },
  },
  {
    id: "gen-ai",
    name: { en: "Gen AI", zh: "Gen AI", ja: "Gen AI" },
  },
  {
    id: "tutorials",
    name: { en: "Tutorials", zh: "教程", ja: "チュートリアル" },
  },
  {
    id: "troubleshooting",
    name: { en: "Troubleshooting", zh: "疑难解答", ja: "トラブルシューティング" },
  },
];
