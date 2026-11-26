import Accented from "./Accented";
import Footer from "./Footer";
import Nav from "./Nav";
import { graphicDesign, graphicDesignJa, graphicDesignZh, type UseCaseCopy } from "../use-case-copy";
import { useDownloads } from "../useDownloads";
import { useOS } from "../useOS";

/** A numbered section in the landing page's chrome. */
function Section({
  id,
  num,
  title,
  note,
  children,
}: {
  id: string;
  num: string;
  title: [string, string, string];
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section" id={id}>
      <div className="shell">
        <div className="section-head">
          <span className="section-num">{num}</span>
          <div>
            <h2 className="display section-title">
              <Accented parts={title} />
            </h2>
            <p className="section-note">{note}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function Cards({ points }: { points: { title: string; body: string }[] }) {
  // An even four as two pairs; three or six fill the landing page's columns.
  return (
    <div className={points.length === 4 ? "feature-grid pairs" : "feature-grid"}>
      {points.map((point) => (
        <article className="feature" key={point.title}>
          <h3>{point.title}</h3>
          <p>{point.body}</p>
        </article>
      ))}
    </div>
  );
}

/**
 * Use case: graphic design. The art styles and Pencil to vector, told the
 * landing page's way, with the knowledge base's figures. The knowledge base
 * articles go deeper; this page sells the workflow.
 */
export default function GraphicDesign({ copy }: { copy: UseCaseCopy }) {
  const os = useOS();
  const download = useDownloads();

  return (
    <>
      <Nav />
      <main>
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="display hero-title uc-title">
              <Accented parts={copy.title} />
            </h1>
            <p className="hero-sub">
              <strong>{copy.subStrong}</strong> {copy.sub}
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={download(os)}>
                {copy.download}
              </a>
              <a className="btn btn-ghost" href="#styles">
                {copy.seeStyles}
              </a>
            </div>
            <p className="hero-meta">{copy.meta}</p>
          </div>
        </section>

        <Section id="styles" num="01" title={copy.styles.title} note={copy.styles.note}>
          <figure className="uc-figure narrow">
            <img src="/kb/images/art-styles/styles.svg" alt={copy.styles.alt} width={840} height={944} />
            <figcaption>{copy.styles.caption}</figcaption>
          </figure>
          <Cards points={copy.styles.jobs} />
        </Section>

        <Section id="sketch" num="02" title={copy.sketch.title} note={copy.sketch.note}>
          {copy.sketch.points.map((point) => (
            <article className="showcase-item uc-wide" key={point.src}>
              <img className="uc-wide-img" src={point.src} alt={point.alt} width={988} height={324} loading="lazy" />
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </Section>

        <Section id="design-app" num="03" title={copy.app.title} note={copy.app.note}>
          <Cards points={copy.app.points} />
        </Section>

        <Section id="on-device" num="04" title={copy.device.title} note={copy.device.note}>
          <Cards points={copy.device.points} />
        </Section>

        <section className="cta">
          <div className="shell">
            <h2 className="display">
              <Accented parts={copy.cta.title} />
            </h2>
            <div className="hero-cta">
              <a className="btn btn-primary" href={download(os)}>
                {copy.cta.download}
              </a>
              <a className="btn btn-ghost" href={copy.links[0].href}>
                {copy.cta.guides}
              </a>
            </div>
            <p className="hero-meta">
              {copy.learn}:{" "}
              {copy.links.map((link, i) => (
                <span key={link.href}>
                  {i > 0 && " · "}
                  <a href={link.href}>{link.label}</a>
                </span>
              ))}
            </p>
          </div>
        </section>
      </main>
      <Footer langLinks={{ en: graphicDesign.path, zh: graphicDesignZh.path, ja: graphicDesignJa.path }} />
    </>
  );
}
