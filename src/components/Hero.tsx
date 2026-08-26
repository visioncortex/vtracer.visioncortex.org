import Comparator from "./Comparator";
import { DOWNLOAD_URL, PLATFORMS } from "../site";
import { useOS } from "../useOS";

export default function Hero() {
  const os = useOS();
  const others = PLATFORMS.filter((p) => p.os !== os);

  return (
    <section className="hero">
      <div className="shell">
        <h1 className="display hero-title">
          The next-gen <span className="accent">VTracer</span> has arrived
        </h1>

        <p className="hero-sub">
          <strong>The best vectorizer, at your fingertips.</strong> A deep-learning engine cleans up
          and sharpens your artwork first, then traces it — crisp edges, real gradients, and lines
          you would have drawn yourself.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href={DOWNLOAD_URL}>
            {os ? `Download for ${os}` : "Download the app"}
          </a>
          <a className="btn btn-ghost" href="#features">
            See what it does
          </a>
        </div>

        <p className="hero-meta">
          Free to download ·{" "}
          {os ? (
            <>
              also for{" "}
              {others.map((p, i) => (
                <span key={p.os}>
                  {i > 0 && " and "}
                  <a href={DOWNLOAD_URL}>{p.os}</a>
                </span>
              ))}
            </>
          ) : (
            "macOS, Windows and Linux"
          )}{" "}
          · Runs entirely on your device
        </p>

        <Comparator />
      </div>
    </section>
  );
}
