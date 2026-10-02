import { COMPARISONS, GENAI, ORG, PENCIL, SHOWCASE, SHOWCASE_ASPECT, STAGE_ASPECT } from "../site";
import { checkCopy, type FactSheetCopy } from "../fact-sheet-copy";
import { frame, type Focus } from "../frame";

/**
 * A comparison stage fixed at the halfway point. The marketing page lets you
 * drag this; here it stays where it is, so the page needs no script at all.
 */
function Split({
  leftSrc,
  rightSrc,
  leftLabel,
  rightLabel,
  alt,
  stageAspect,
  aspect,
  focus,
  transparent,
}: {
  leftSrc: string;
  rightSrc: string;
  leftLabel: string;
  rightLabel: string;
  alt: string;
  stageAspect: number;
  aspect: number;
  focus: Focus;
  transparent?: boolean;
}) {
  const framing = frame(stageAspect, aspect, focus);

  return (
    <div
      className={transparent ? "fs-stage checker" : "fs-stage"}
      style={{ aspectRatio: String(stageAspect) }}
    >
      {/* Right of the divider: the genuine SVG the engine emitted. */}
      <div className="fs-layer">
        <img src={rightSrc} alt={alt} style={framing} />
      </div>
      <div className="fs-layer" style={{ clipPath: "inset(0 50% 0 0)" }}>
        <img className="raster" src={leftSrc} alt="" style={framing} />
      </div>
      <span className="fs-tag left">{leftLabel}</span>
      <span className="fs-tag right">{rightLabel}</span>
      <div className="fs-divider" aria-hidden="true" />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="fs-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/**
 * The in-app fact sheet: the marketing page with the selling taken out. Same
 * facts and the same samples, but no bloom, no display type at scale, nothing
 * to drag, and nothing asking the reader to download an app they already have.
 *
 * Rendered once per language, each to its own static page, since a page with
 * no script cannot choose its language at load time. Every word comes from
 * `copy`; the FAQ there is kept in step with the Terms, which govern if the
 * two ever disagree.
 */
export default function FactSheet({ copy }: { copy: FactSheetCopy }) {
  checkCopy(copy);
  const hero = COMPARISONS[0];

  return (
    <main className="fs">
      <header className="fs-head">
        <h1>VTracer 2</h1>
        <p className="fs-lede">
          {copy.lede}
        </p>
      </header>

      <Split
        leftSrc={hero.original.src}
        rightSrc={hero.vtracer.src}
        leftLabel={copy.source}
        rightLabel="VTracer 2"
        alt={copy.heroAlt}
        stageAspect={STAGE_ASPECT}
        aspect={hero.aspect}
        focus={hero.focus}
      />
      <p className="fs-caption">
        {copy.caption}
      </p>

      <Section title={copy.sections.engine}>
        <div className="fs-grid">
          {copy.features.map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title={copy.sections.whatsNew}>
        <div className="fs-cols">
          {SHOWCASE.map((item, i) => (
            <article key={item.id}>
              <Split
                leftSrc={item.original}
                rightSrc={item.vtracer}
                leftLabel={copy.source}
                rightLabel="VTracer 2"
                alt={copy.showcaseAlt(copy.showcase[i].title)}
                stageAspect={SHOWCASE_ASPECT}
                aspect={item.aspect}
                focus={item.focus}
                transparent={"transparent" in item && item.transparent}
              />
              <h3>{copy.showcase[i].title}</h3>
              <p>{copy.showcase[i].blurb}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title={copy.sections.prompt}>
        <p>{copy.genai.intro}</p>
        {/* One screenshot per scheme; fact-sheet.css shows whichever matches
            the theme, including a theme the app has pinned. */}
        <figure className="fs-shot">
          <img
            className="light"
            src={GENAI.shot.rounds[0].light}
            alt={copy.genai.alt}
            width={GENAI.shot.width}
            height={GENAI.shot.height}
            loading="lazy"
          />
          <img
            className="dark"
            src={GENAI.shot.rounds[0].dark}
            alt={copy.genai.alt}
            width={GENAI.shot.width}
            height={GENAI.shot.height}
            loading="lazy"
          />
        </figure>
        <div className="fs-grid">
          {copy.genai.points.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
          <article>
            <h3>{copy.genai.byo.title}</h3>
            <p>{copy.genai.byo.body}</p>
          </article>
        </div>
      </Section>

      <Section title={copy.sections.pencil}>
        <p>{copy.pencil.intro}</p>
        {/* The demo waits for a click here: it is half a minute long and this
            page sits in a panel beside the reader's work, so nothing should
            move or download until they ask. */}
        <figure className="fs-video">
          <video
            src={PENCIL.hero.src}
            poster={PENCIL.hero.poster}
            width={PENCIL.hero.width}
            height={PENCIL.hero.height}
            aria-label={copy.pencil.heroLabel}
            controls
            playsInline
            preload="none"
          />
        </figure>
        <div className="fs-cols fs-pair">
          {PENCIL.points.map((point, i) => {
            const text = copy.pencil.points[i];
            const mark = copy.pencil.points.slice(0, i + 1).filter((p) => p.note).length;
            return (
              <article key={point.image?.src ?? point.video?.src}>
                <div className="fs-media">
                  {point.image ? (
                    <img
                      src={point.image.src}
                      alt={text.media}
                      width={point.image.width}
                      height={point.image.height}
                      loading="lazy"
                    />
                  ) : (
                    point.video && (
                      <>
                        {/* Five seconds, and its point is the motion, so it
                            loops like a GIF. With no script to consult the
                            reader's motion setting, CSS swaps in the still. */}
                        <video
                          className="motion"
                          src={point.video.src}
                          width={point.video.width}
                          height={point.video.height}
                          aria-label={text.media}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                        <img
                          className="still"
                          src={point.video.poster}
                          alt={text.media}
                          width={point.video.width}
                          height={point.video.height}
                          loading="lazy"
                        />
                      </>
                    )
                  )}
                </div>
                <h3>{text.title}</h3>
                <p>
                  {text.body}
                  {text.note && <sup className="fs-mark">{mark}</sup>}
                </p>
                {text.note && (
                  <p className="fs-note">
                    <sup>{mark}</sup> {text.note}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </Section>

      <Section title={copy.sections.output}>
        <ul className="fs-list">
          {copy.output.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Section>

      <Section title={copy.sections.artwork}>
        <p>{copy.artwork}</p>
      </Section>
      <Section title={copy.sections.questions}>
        <div className="fs-grid">
          {copy.faq.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Framed inside the app, where following a link in place would strand
          the reader with no way back. Everything opens out. */}
      <footer className="fs-foot">
        <p>
          &copy;{" "}
          <a href={ORG} target="_blank" rel="noopener noreferrer">
            Vision Cortex
          </a>
        </p>
      </footer>
    </main>
  );
}
