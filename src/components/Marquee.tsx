import { MARQUEE } from "../site";

export default function Marquee() {
  // Rendered twice so the -50% translate loops without a visible seam.
  const track = [...MARQUEE, ...MARQUEE];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
