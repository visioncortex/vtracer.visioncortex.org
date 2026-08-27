import Comparator from "./Comparator";
import { PLATFORMS } from "../site";
import { useDownloads } from "../useDownloads";
import { useOS } from "../useOS";

export default function Hero() {
  const os = useOS();
  const download = useDownloads();
  const others = PLATFORMS.filter((p) => p.os !== os);

  return (
    <section className="hero">
      <div className="shell">
        <h1 className="display hero-title">
          The next-gen <span className="accent">VTracer</span> has arrived
        </h1>

        <p className="hero-sub">
          <strong>The best vectorizer, on your device.</strong> A deep-learning engine cleans up
          and sharpens your artwork first, then traces it — crisp edges, smooth gradients, and curves
          you would have drawn yourself.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href={download(os)}>
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
                  <a href={download(p.os)}>{p.os}</a>
                </span>
              ))}
            </>
          ) : (
            "macOS, Windows and Linux"
          )}{" "}
          · Tracing runs entirely on your device
        </p>

        <Comparator />
      </div>
    </section>
  );
}
