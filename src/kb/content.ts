import { Marked, type Tokens } from "marked";
import type { Lang } from "../site";
import { SECTIONS } from "./copy";

/**
 * The knowledge base: one Markdown file per article per language, in
 * content/kb/<lang>/<slug>.md, turned into static pages by
 * scripts/prerender.mjs (and served the same way by the dev server):
 *
 *   content/kb/en/png-to-svg.md  →  /kb/png-to-svg
 *   content/kb/zh/png-to-svg.md  →  /zh/kb/png-to-svg
 *   content/kb/ja/png-to-svg.md  →  /ja/kb/png-to-svg
 *
 * A translation keeps the English file name, which is how the languages of
 * one article find each other (for hreflang and the language links). It
 * takes its section and order from the English original, so only the words
 * need translating. Nothing here reaches the browser bundle; the pages ship
 * as finished HTML.
 */

export const SITE = "https://vtracer.visioncortex.org";

/** In the order the language links list them; English is the original. */
export const KB_LANGS: Lang[] = ["en", "zh", "ja"];

export function kbBase(lang: Lang) {
  return lang === "en" ? "/kb/" : `/${lang}/kb/`;
}

export function articleUrl(lang: Lang, slug: string) {
  return kbBase(lang) + slug;
}

/**
 * Names that cannot be articles: /kb/images/ holds article images (in
 * public/kb/images/), and kb/template.html is the build's page shell.
 */
const RESERVED = new Set(["index", "images", "template"]);

export type Article = {
  lang: Lang;
  slug: string;
  title: string;
  description: string;
  /** A section id from SECTIONS in copy.ts. */
  section: string;
  /** Position within its section; ties fall back to the title. */
  order: number;
  /** YYYY-MM-DD. */
  published: string;
  /** YYYY-MM-DD; the published date when not given. */
  updated: string;
  /** Social card, root-relative; the site's card when not given. */
  image?: string;
  /** Shown by the dev server, left out of the build. */
  draft: boolean;
  html: string;
};

export type Section = { id: string; articles: Article[] };

const FILES = import.meta.glob<string>("/content/kb/*/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

type Meta = Omit<Article, "html"> & { body: string; fail: (msg: string) => never };

/* Two passes: front matter first, so that every body can be rendered
   knowing which translations exist (see localize below). English first,
   so translations can inherit from it. */
const metas: Meta[] = [];
for (const lang of KB_LANGS) {
  for (const [file, raw] of Object.entries(FILES)) {
    const [dir, name] = file.split("/").slice(-2);
    if (dir !== lang || name.startsWith("_")) continue;
    const original = lang === "en" ? undefined : metas.find((m) => m.lang === "en" && m.slug === name.replace(/\.md$/, ""));
    metas.push(parseMeta(lang, name, raw, original));
  }
}
for (const file of Object.keys(FILES)) {
  const dir = file.split("/").at(-2)!;
  if (!KB_LANGS.includes(dir as Lang)) {
    throw new Error(`${file.slice(1)}: content/kb/ holds one folder per language (${KB_LANGS.join(", ")})`);
  }
}

/** Published articles in each language, for linking between them. */
const LIVE = new Set(metas.filter((m) => !m.draft).map((m) => `${m.lang}/${m.slug}`));

const ALL: Article[] = metas.map(({ body, fail, ...meta }) => ({
  ...meta,
  html: render(meta.lang, body, meta.draft, fail),
}));

/** Articles in one language: published ones, plus drafts when asked (dev). */
export function articles(lang: Lang, drafts: boolean): Article[] {
  return ALL.filter((a) => a.lang === lang && (drafts || !a.draft));
}

/** The same article in every language it is available in, this one included. */
export function translations(slug: string, drafts: boolean): Article[] {
  return KB_LANGS.flatMap((lang) => articles(lang, drafts).filter((a) => a.slug === slug));
}

/** Articles grouped into their sections, each in reading order. */
export function sections(list: Article[]): Section[] {
  return SECTIONS.map(({ id }) => ({
    id,
    articles: list
      .filter((a) => a.section === id)
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
  })).filter((s) => s.articles.length > 0);
}

/* ------------------------------------------------------------- parsing */

/**
 * Front matter is a flat list of `key: value` lines between two `---` lines.
 * Quotes around a value are optional, and # starts a comment line. No
 * nesting, no lists: nothing here needs them, and a YAML parser would be a
 * dependency for nothing.
 */
function parseMeta(lang: Lang, name: string, raw: string, original?: Meta): Meta {
  const slug = name.replace(/\.md$/, "");
  const fail = (msg: string): never => {
    throw new Error(`content/kb/${lang}/${name}: ${msg}`);
  };

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail("file names are the URL, so use lowercase English words joined by hyphens");
  }
  if (RESERVED.has(slug)) fail(`"${slug}" is reserved`);

  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) fail("missing front matter (a block between two --- lines)");
  const [, head, body] = match!;

  const meta: Record<string, string> = {};
  for (const line of head.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const kv = /^([A-Za-z]+):\s*(.*?)\s*$/.exec(line);
    if (!kv) fail(`cannot read front matter line: ${line}`);
    meta[kv![1]] = kv![2].replace(/^(["'])(.*)\1$/, "$2");
  }

  const required = (key: string) => meta[key] || fail(`front matter needs "${key}"`);
  const date = (key: string) => {
    const value = meta[key];
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) fail(`"${key}" must be YYYY-MM-DD`);
    return value;
  };

  // A translation follows its original's place in the sidebar unless it says
  // otherwise; an article with no English original has to say.
  const section = meta.section || original?.section || required("section");
  if (!SECTIONS.some((s) => s.id === section)) {
    fail(`unknown section "${section}"; use one of ${SECTIONS.map((s) => s.id).join(", ")}, or add it to SECTIONS in src/kb/copy.ts`);
  }

  const description = required("description");
  // Search results cut descriptions at around 155-160 characters, or about
  // 80 for Chinese and Japanese, whose characters are twice as wide.
  const limit = lang === "en" ? 160 : 90;
  if (description.length > limit) {
    fail(`description is ${description.length} characters; keep it under ${limit}`);
  }
  const published = date("published") || fail('front matter needs "published"');

  return {
    lang,
    slug,
    title: required("title"),
    description,
    section,
    order: Number(meta.order ?? original?.order ?? 100),
    published,
    updated: date("updated") || published,
    image: meta.image || original?.image,
    draft: meta.draft === "true",
    body,
    fail,
  };
}

/* ------------------------------------------------------------ markdown */

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/&[a-z0-9#]+;/g, "")
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-") || "section"
  );
}

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/**
 * A translation is usually the English Markdown with the words replaced, so
 * its links still point at English pages. Point them at this language
 * instead wherever this language has the page: the landing page always,
 * the knowledge base's index always (this article is in it), and another
 * article once its translation is published.
 */
function localize(lang: Lang, href: string) {
  if (lang === "en") return href;
  const m = /^\/(kb\/(?:([a-z0-9-]+))?)?([#?].*)?$/.exec(href);
  if (!m) return href;
  const [, kb, slug, rest = ""] = m;
  if (!kb) return `/${lang}/${rest}`;
  if (!slug) return kbBase(lang) + rest;
  return LIVE.has(`${lang}/${slug}`) ? articleUrl(lang, slug) + rest : href;
}

/**
 * An image on a line of its own becomes a figure, its title the caption:
 *
 *   ![Alt text](/kb/images/slug/file.svg "Caption shown under the image")
 *
 * A placeholder is an image whose address is the word placeholder; the alt
 * text says what to capture or generate. The dev server shows it as a
 * dashed box, and the build refuses to publish an article that still has
 * one:
 *
 *   ![Screenshot: the export dialog, dark theme](placeholder "Caption")
 */
function figure({ href, title, text }: Tokens.Image, onPlaceholder: () => void) {
  const caption = title ? `<figcaption>${escapeAttr(title)}</figcaption>` : "";
  if (href === "placeholder") {
    onPlaceholder();
    return `<figure class="kb-figure kb-placeholder"><div class="kb-placeholder-box"><span class="kb-placeholder-tag">Placeholder</span><span>${escapeAttr(text)}</span></div>${caption}</figure>\n`;
  }
  if (/\.(mp4|webm)$/.test(href)) {
    // A short clip loops like a GIF; its still, <name>-poster.webp beside it,
    // stands in for readers who ask for less motion (see kb.css).
    const poster = escapeAttr(href.replace(/\.(mp4|webm)$/, "-poster.webp"));
    return `<figure class="kb-figure kb-video"><video class="motion" src="${escapeAttr(href)}" poster="${poster}" aria-label="${escapeAttr(text)}" autoplay muted loop playsinline preload="metadata"></video><img class="still" src="${poster}" alt="${escapeAttr(text)}" loading="lazy" decoding="async" />${caption}</figure>\n`;
  }
  return `<figure class="kb-figure"><img src="${escapeAttr(href)}" alt="${escapeAttr(text)}" loading="lazy" decoding="async" />${caption}</figure>\n`;
}

function render(lang: Lang, body: string, draft: boolean, fail: (msg: string) => never): string {
  const ids = new Set<string>();
  let placeholders = 0;
  const marked = new Marked({
    gfm: true,
    renderer: {
      paragraph({ tokens }: Tokens.Paragraph) {
        const content = tokens.filter((t) => !(t.type === "text" && !t.raw.trim()));
        if (content.length === 1 && content[0].type === "image") {
          return figure(content[0] as Tokens.Image, () => placeholders++);
        }
        return false;
      },
      // The title is the page's one <h1>, so the body starts at ##. Every
      // ## and ### gets an id, so a section can be linked to directly.
      heading({ tokens, depth }: Tokens.Heading) {
        if (depth === 1) fail('the title is the heading; start sections at "##"');
        const inner = this.parser.parseInline(tokens);
        if (depth > 3) return `<h${depth}>${inner}</h${depth}>\n`;
        let id = slugify(inner);
        for (let n = 2; ids.has(id); n++) id = `${slugify(inner)}-${n}`;
        ids.add(id);
        return `<h${depth} id="${id}"><a class="kb-anchor" href="#${id}">${inner}</a></h${depth}>\n`;
      },
      image({ href, title, text }: Tokens.Image) {
        if (href === "placeholder") fail("put each placeholder on a line of its own");
        const t = title ? ` title="${escapeAttr(title)}"` : "";
        return `<img src="${escapeAttr(href)}" alt="${escapeAttr(text)}"${t} loading="lazy" decoding="async" />`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const t = title ? ` title="${escapeAttr(title)}"` : "";
        // Off-site links open in place like any other; they just should not
        // pass the page's opener along.
        const rel = /^https?:\/\//.test(href) && !href.startsWith(SITE) ? ' rel="noopener"' : "";
        return `<a href="${escapeAttr(localize(lang, href))}"${t}${rel}>${inner}</a>`;
      },
    },
  });
  // <!-- comments --> are notes for writers and translators, never published.
  const html = marked.parse(body.replace(/<!--[\s\S]*?-->/g, ""), { async: false });
  if (placeholders > 0 && !draft) {
    fail(`${placeholders} placeholder(s) left; replace them before publishing`);
  }
  return (
    html
      // Wide tables scroll on their own rather than widening the page.
      .replace(/<table>/g, '<div class="kb-table"><table>')
      .replace(/<\/table>/g, "</table></div>")
  );
}
