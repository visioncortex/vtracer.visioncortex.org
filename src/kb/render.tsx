// Server-only: never hot-reloaded, so fast refresh's one-export rule is moot.
/* oxlint-disable react/only-export-components */
import type { ReactNode } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import Footer from "../components/Footer";
import { KbArticle, KbIndex } from "../components/Kb";
import Nav from "../components/Nav";
import { CopyContext, LANGS, copyFor, type Lang } from "../site-copy";
import { KB_LANGS, SITE, articleUrl, articles, kbBase, sections, translations, type Article } from "./content";
import { KB_COPY } from "./copy";

/**
 * Server side of the knowledge base, shared by the dev server (vite.config.ts)
 * and the build (scripts/prerender.mjs). Both fill kb/template.html with what
 * renderKbPage returns; kb/template.html carries the client entry, which
 * brings the nav and footer to life.
 */

type Options = { drafts: boolean };
export type KbPage = { tag: string; head: string; body: string };

/** Matches every knowledge base URL: /kb/, /zh/kb/png-to-svg and so on. */
export const KB_URL = /^\/(?:(zh|ja)\/)?kb(?:\/([^/]*))?$/;

/** Languages with at least one article to show. */
function liveLangs({ drafts }: Options) {
  return KB_LANGS.filter((lang) => articles(lang, drafts).length > 0);
}

/** Every page's path. A language with no articles yet gets no pages. */
export function kbPaths(opts: Options): string[] {
  return liveLangs(opts).flatMap((lang) => [
    kbBase(lang),
    ...articles(lang, opts.drafts).map((a) => articleUrl(lang, a.slug)),
  ]);
}

/** For sitemap.xml: each page with the date it last changed. */
export function kbSitemap(opts: Options): { loc: string; lastmod: string }[] {
  return liveLangs(opts).flatMap((lang) => {
    const list = articles(lang, opts.drafts);
    const newest = list.map((a) => a.updated).sort().at(-1)!;
    return [
      { loc: SITE + kbBase(lang), lastmod: newest },
      ...list.map((a) => ({ loc: SITE + articleUrl(lang, a.slug), lastmod: a.updated })),
    ];
  });
}

/** The page at a URL path, or null if there is none. */
export function renderKbPage(path: string, opts: Options): KbPage | null {
  const clean = path.replace(/(\/index)?\.html$/, "").replace(/\/$/, "");
  const match = KB_URL.exec(clean);
  if (!match) return null;
  const lang = (match[1] ?? "en") as Lang;
  const slug = match[2];
  const t = KB_COPY[lang];
  const list = articles(lang, opts.drafts);
  if (list.length === 0) return null;
  const grouped = sections(list);

  if (!slug) {
    const versions = liveLangs(opts).map((l) => ({ lang: l, url: SITE + kbBase(l) }));
    return {
      tag: t.tag,
      head: head({
        lang,
        title: t.title,
        description: t.description,
        url: SITE + kbBase(lang),
        type: "website",
        versions,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t.title,
          description: t.description,
          url: SITE + kbBase(lang),
          inLanguage: t.tag,
        },
      }),
      body: shell(
        lang,
        clean + "/",
        renderToStaticMarkup(<KbIndex lang={lang} sections={grouped} />),
        footerLinks(opts, Object.fromEntries(versions.map((v) => [v.lang, kbBase(v.lang)]))),
      ),
    };
  }

  const article = list.find((a) => a.slug === slug);
  if (!article) return null;
  const all = translations(slug, opts.drafts);
  const others = all.filter((a) => a.lang !== lang);

  return {
    tag: t.tag,
    head: head({
      lang,
      title: `${article.title} — VTracer`,
      description: article.description,
      url: SITE + articleUrl(lang, slug),
      type: "article",
      image: article.image,
      robots: article.draft ? "noindex" : undefined,
      versions: all.map((a) => ({ lang: a.lang, url: SITE + articleUrl(a.lang, slug) })),
      extra: [
        `<meta property="article:published_time" content="${article.published}" />`,
        `<meta property="article:modified_time" content="${article.updated}" />`,
      ],
      jsonLd: articleJsonLd(article),
    }),
    body: shell(
      lang,
      clean,
      renderToStaticMarkup(<KbArticle article={article} sections={grouped} others={others} />),
      footerLinks(opts, Object.fromEntries(all.map((a) => [a.lang, articleUrl(a.lang, slug)]))),
    ),
  };
}

/** Puts a page into kb/template.html (raw in dev, built in production). */
export function fillTemplate(template: string, page: KbPage): string {
  for (const marker of ['<html lang="en">', "<!--kb:head-->", "<!--kb:body-->"]) {
    if (!template.includes(marker)) throw new Error(`kb/template.html has lost ${marker}`);
  }
  return template
    .replace('<html lang="en">', `<html lang="${page.tag}">`)
    .replace("<!--kb:head-->", page.head)
    .replace("<!--kb:body-->", page.body);
}

/* ------------------------------------------------------------------ */

/**
 * Where the footer's language picker goes from this page: the same page in
 * that language where there is one, else that language's knowledge base,
 * else (by leaving it out) that language's landing page.
 */
function footerLinks(opts: Options, same: Partial<Record<Lang, string>>) {
  const live = liveLangs(opts);
  const links: Partial<Record<Lang, string>> = {};
  for (const { lang } of LANGS) {
    const link = same[lang] ?? (live.includes(lang) ? kbBase(lang) : undefined);
    if (link) links[lang] = link;
  }
  return links;
}

/**
 * The nav and footer are mounted by src/kb.tsx, since they react to the
 * visitor's platform and consent. Their markup is rendered here too, so the
 * page reads complete before any script runs. The article in between is
 * plain HTML and never touched by React in the browser. The footer's
 * language links ride along in a data attribute for the client to pick up.
 */
function shell(lang: Lang, path: string, main: string, langLinks: Partial<Record<Lang, string>>) {
  const copy = copyFor(KB_COPY[lang].tag, path);
  const wrap = (node: ReactNode) =>
    renderToString(<CopyContext.Provider value={copy}>{node}</CopyContext.Provider>);
  return [
    `<div id="kb-nav">${wrap(<Nav />)}</div>`,
    main,
    `<div id="kb-footer" data-lang-links="${esc(JSON.stringify(langLinks))}">${wrap(
      <Footer langLinks={langLinks} />,
    )}</div>`,
  ].join("\n");
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function head({
  lang,
  title,
  description,
  url,
  type,
  image,
  robots,
  versions,
  extra = [],
  jsonLd,
}: {
  lang: Lang;
  title: string;
  description: string;
  url: string;
  type: "website" | "article";
  image?: string;
  robots?: string;
  /** This page in every language it exists in, itself included. */
  versions: { lang: Lang; url: string }[];
  extra?: string[];
  jsonLd: object;
}) {
  const card = SITE + (image ?? "/og-card.png");
  const tag = (l: Lang) => KB_COPY[l].tag;
  const english = versions.find((v) => v.lang === "en");
  // One alternate per language and an x-default, only when there is more
  // than one language to choose from.
  const alternates =
    versions.length > 1
      ? [
          ...versions.map((v) => `<link rel="alternate" hreflang="${tag(v.lang)}" href="${esc(v.url)}" />`),
          english ? `<link rel="alternate" hreflang="x-default" href="${esc(english.url)}" />` : "",
        ]
      : [];
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    robots ? `<meta name="robots" content="${robots}" />` : "",
    `<link rel="canonical" href="${esc(url)}" />`,
    ...alternates,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="VTracer" />`,
    `<meta property="og:locale" content="${{ en: "en_US", zh: "zh_CN", ja: "ja_JP" }[lang]}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(card)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...extra,
    // JSON in a script element ends at the first "</", so escape every "<".
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
    // Gloock has no CJK glyphs; zh and ja add a Noto Serif for headings, as
    // their landing pages do.
    `<link href="https://fonts.googleapis.com/css2?family=Gloock&${KB_COPY[lang].fonts}family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

function articleJsonLd(a: Article) {
  const url = SITE + articleUrl(a.lang, a.slug);
  const t = KB_COPY[a.lang];
  const org = { "@type": "Organization", name: "Vision Cortex", url: "https://www.visioncortex.org" };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: a.title,
        description: a.description,
        url,
        mainEntityOfPage: url,
        datePublished: a.published,
        dateModified: a.updated,
        image: SITE + (a.image ?? "/og-card.png"),
        inLanguage: t.tag,
        author: org,
        publisher: org,
        about: { "@type": "SoftwareApplication", name: "VTracer", url: `${SITE}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "VTracer", item: SITE + (a.lang === "en" ? "/" : `/${a.lang}/`) },
          { "@type": "ListItem", position: 2, name: t.kb, item: SITE + kbBase(a.lang) },
          { "@type": "ListItem", position: 3, name: a.title, item: url },
        ],
      },
    ],
  };
}
