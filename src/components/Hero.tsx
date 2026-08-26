import { RELEASES, REPO } from "../site";

export default function Hero() {
  return (
    <section className="hero">
      <div className="shell">
        <p className="hero-badge">
          <span className="dot" />
          <span className="eyebrow">VTracer 2.0 — out now</span>
        </p>

        <h1 className="display hero-title">
          The next-gen <span className="accent">VTracer</span> has arrived
        </h1>

        <p className="hero-sub">
          <strong>The best vectorizer, at your fingertips.</strong> Turn any raster image into clean,
          compact SVG — from gigapixel blueprints down to pixel art.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href={RELEASES}>
            Download for free
          </a>
          <a className="btn btn-ghost" href={REPO}>
            View source
          </a>
        </div>

        <p className="hero-meta">Open source · macOS · Windows · Linux</p>

        <figure className="shot">
          <img
            src="/desktop-app.png"
            alt="The VTracer desktop app tracing a scanned locomotive blueprint, with the A/B comparator open and clustering, compositing and curve-fitting controls in the side panel."
            width={1552}
            height={922}
          />
        </figure>
      </div>
    </section>
  );
}
