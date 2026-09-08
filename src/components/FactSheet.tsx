import { COMPARISONS, FEATURES, GENAI, ORG, SHOWCASE, SHOWCASE_ASPECT, STAGE_ASPECT, TRIAL } from "../site";
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

const TRACES = TRIAL.traces.toLocaleString("en-US");

/**
 * Answers to what people ask before they trial or buy, kept in step with the
 * Terms — every one of these is stated there at greater length, and the Terms
 * are what governs if the two ever disagree.
 */
const FAQ: [string, React.ReactNode][] = [
  [
    "Do I need a credit card to try it?",
    "No. An account and nothing else — the trial is enabled from inside the app.",
  ],
  [
    "How long does the trial run?",
    `${TRIAL.days} days from activation, or ${TRACES} traces, whichever comes first.`,
  ],
  [
    "How many machines can I trial on?",
    "At most two. You can trial on both macOS and Windows, so you can make sure they both work. But not two PCs or two Macs.",
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
];

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
 */
export default function FactSheet() {
  const hero = COMPARISONS[0];

  return (
    <main className="fs">
      <header className="fs-head">
        <h1>VTracer 2</h1>
        <p className="fs-lede">
          VTracer 2 is the next-gen tracing engine of VTracer.
        </p>
      </header>

      <Split
        leftSrc={hero.original.src}
        rightSrc={hero.vtracer.src}
        leftLabel="Source"
        rightLabel="VTracer 2"
        alt="An illustrated portrait, half shown as its low-resolution source and half as the SVG VTracer 2 traced from it."
        stageAspect={STAGE_ASPECT}
        aspect={hero.aspect}
        focus={hero.focus}
      />
      <p className="fs-caption">
        Left, source image. Right, the SVG emitted by VTracer 2.
      </p>

      <Section title="What the engine does">
        <div className="fs-grid">
          {FEATURES.map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="New in VTracer 2">
        <div className="fs-cols">
          {SHOWCASE.map((item) => (
            <article key={item.id}>
              <Split
                leftSrc={item.original}
                rightSrc={item.vtracer}
                leftLabel="Source"
                rightLabel="VTracer 2"
                alt={`${item.title}: the source on the left, the VTracer 2 trace on the right.`}
                stageAspect={SHOWCASE_ASPECT}
                aspect={item.aspect}
                focus={item.focus}
                transparent={"transparent" in item && item.transparent}
              />
              <h3>{item.title}</h3>
              <p>{item.blurb}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Prompt to vector">
        <p>
          The Gen AI lab harnesses image generation models and runs them on your device.
          A guided prompt steers them toward art that traces well, so every result comes out as clean vectors.
        </p>
        {/* One screenshot per scheme; fact-sheet.css shows whichever matches
            the theme, including a theme the app has pinned. */}
        <figure className="fs-shot">
          <img
            className="light"
            src={GENAI.shot.light}
            alt={GENAI.shot.alt}
            width={GENAI.shot.width}
            height={GENAI.shot.height}
            loading="lazy"
          />
          <img
            className="dark"
            src={GENAI.shot.dark}
            alt={GENAI.shot.alt}
            width={GENAI.shot.width}
            height={GENAI.shot.height}
            loading="lazy"
          />
        </figure>
        <div className="fs-grid">
          {GENAI.points.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Output">
        <ul className="fs-list">
          <li>SVG, with adjustable curve simplification and path precision.</li>
          <li>Linear, radial and mesh gradients.</li>
          <li>Stacked compositing (no holes) or cutout (no seams).</li>
          <li>Background removal, producing a transparent canvas.</li>
        </ul>
      </Section>

      <Section title="Your artwork">
        <p>
          Your artwork never leaves this machine. The tracing engine runs locally, no
          request the app makes carries your images, your traces or their file names.
        </p>
      </Section>
      <Section title="Questions">
        <div className="fs-grid">
          {FAQ.map(([question, answer]) => (
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
