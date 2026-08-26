const ITEMS = [
  "Rust",
  "WebAssembly",
  "Python",
  "npm",
  "Command line",
  "Desktop app",
  "MIT / Apache-2.0",
];

export default function Marquee() {
  // Rendered twice so the -50% translate loops without a visible seam.
  const track = [...ITEMS, ...ITEMS];

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
