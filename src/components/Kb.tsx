import type { ReactNode } from "react";
import { KB_COPY, SECTIONS } from "../kb/copy";
import { articleUrl, kbBase, type Article, type Section } from "../kb/content";
import { LANGS, type Lang } from "../site-copy";

function sectionName(id: string, lang: Lang) {
  return SECTIONS.find((s) => s.id === id)!.name[lang];
}

/**
 * Sidebar plus content column. Below the tablet breakpoint the sidebar moves
 * under the article, so a phone opens on the article itself, with the
 * breadcrumb at the top for the way back.
 */
export function KbLayout({
  lang,
  sections,
  current,
  children,
}: {
  lang: Lang;
  sections: Section[];
  current?: string;
  children: ReactNode;
}) {
  const t = KB_COPY[lang];
  return (
    <main className="kb">
      <div className="shell kb-shell">
        <div className="kb-main">{children}</div>
        <nav className="kb-side" aria-label={t.kb}>
          <a className="kb-side-home" href={kbBase(lang)} aria-current={current ? undefined : "page"}>
            {t.kb}
          </a>
          {sections.map((s) => (
            <div className="kb-side-group" key={s.id}>
              <p className="kb-side-title">{sectionName(s.id, lang)}</p>
              <ul>
                {s.articles.map((a) => (
                  <li key={a.slug}>
                    <a
                      href={articleUrl(lang, a.slug)}
                      aria-current={a.slug === current ? "page" : undefined}
                    >
                      {a.title}
                      {a.draft ? <span className="kb-draft">{t.draft}</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </main>
  );
}

export function KbIndex({ lang, sections }: { lang: Lang; sections: Section[] }) {
  const t = KB_COPY[lang];
  return (
    <KbLayout lang={lang} sections={sections}>
      <header className="kb-head">
        <p className="eyebrow">VTracer</p>
        <h1 className="display kb-title">{t.kb}</h1>
        <p className="kb-lede">{t.description}</p>
      </header>
      {sections.map((s) => (
        <section className="kb-index-section" key={s.id}>
          <h2>{sectionName(s.id, lang)}</h2>
          <ul className="kb-cards">
            {s.articles.map((a) => (
              <li key={a.slug}>
                <a href={articleUrl(lang, a.slug)}>
                  <span className="kb-card-title">{a.title}</span>
                  <span className="kb-card-desc">{a.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </KbLayout>
  );
}

export function KbArticle({
  article,
  sections,
  others,
}: {
  article: Article;
  sections: Section[];
  /** This article in the other languages it has been translated into. */
  others: Article[];
}) {
  const { lang } = article;
  const t = KB_COPY[lang];
  // Previous and next in sidebar order, across section boundaries.
  const flat = sections.flatMap((s) => s.articles);
  const i = flat.findIndex((a) => a.slug === article.slug);
  const prev = flat[i - 1];
  const next = flat[i + 1];

  return (
    <KbLayout lang={lang} sections={sections} current={article.slug}>
      <article>
        <header className="kb-head">
          <nav className="kb-crumbs" aria-label={t.breadcrumb}>
            <a href={kbBase(lang)}>{t.kb}</a>
            <span aria-hidden="true">/</span>
            <span>{sectionName(article.section, lang)}</span>
          </nav>
          <h1 className="display kb-title">{article.title}</h1>
          <p className="kb-updated">
            {article.updated === article.published ? t.published : t.updated}{" "}
            <time dateTime={article.updated}>{t.date(article.updated)}</time>
          </p>
          {others.length > 0 ? (
            <p className="kb-langs">
              {t.alsoIn}
              {others.map((o, n) => {
                const l = LANGS.find((x) => x.lang === o.lang)!;
                return (
                  <span key={o.lang}>
                    {n > 0 ? " · " : null}
                    <a href={articleUrl(o.lang, o.slug)} hrefLang={l.tag} lang={l.tag}>
                      {l.name}
                    </a>
                  </span>
                );
              })}
            </p>
          ) : null}
        </header>
        <div className="kb-prose" dangerouslySetInnerHTML={{ __html: article.html }} />
      </article>
      {prev || next ? (
        <nav className="kb-pager" aria-label={t.more}>
          {prev ? (
            <a className="kb-pager-prev" href={articleUrl(lang, prev.slug)}>
              <span className="kb-pager-label">{t.previous}</span>
              {prev.title}
            </a>
          ) : null}
          {next ? (
            <a className="kb-pager-next" href={articleUrl(lang, next.slug)}>
              <span className="kb-pager-label">{t.next}</span>
              {next.title}
            </a>
          ) : null}
        </nav>
      ) : null}
    </KbLayout>
  );
}
