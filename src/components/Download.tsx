import { PLATFORMS, RELEASES } from "../site";

export default function Download() {
  return (
    <div className="dl-grid">
      {PLATFORMS.map((p) => (
        <a className="dl" key={p.os} href={RELEASES}>
          <span className="dl-os">{p.os}</span>
          <span className="dl-meta">{p.meta}</span>
          <span className="dl-go">Get the latest release →</span>
        </a>
      ))}
    </div>
  );
}
