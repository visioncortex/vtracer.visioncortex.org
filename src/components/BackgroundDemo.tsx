import { useId, useState } from "react";

/**
 * A flat piece of clip art of the kind designers actually hand a tracer:
 * artwork sitting on a solid colour plate. Ticking the box drops the plate,
 * which is what the "remove background" option does to the emitted SVG.
 */
export default function BackgroundDemo() {
  const [removed, setRemoved] = useState(false);
  const uid = useId().replace(/:/g, "");

  const sun = `sun-${uid}`;
  const far = `far-${uid}`;
  const near = `near-${uid}`;

  return (
    <div className="bg-demo">
      <div className={removed ? "bg-stage transparent" : "bg-stage"}>
        <svg viewBox="0 0 400 300" role="img" aria-label="A flat illustration of hills at sunset">
          <defs>
            <radialGradient id={sun} cx="50%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#ffe4a8" />
              <stop offset="58%" stopColor="#f0bb52" />
              <stop offset="100%" stopColor="#d1892a" />
            </radialGradient>
            <linearGradient id={far} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5cbcff" />
              <stop offset="100%" stopColor="#0b7ddd" />
            </linearGradient>
            <linearGradient id={near} x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="#0a63c4" />
              <stop offset="100%" stopColor="#06326b" />
            </linearGradient>
          </defs>

          {!removed && <rect width="400" height="300" fill="#f2ece0" />}

          <circle cx="288" cy="98" r="47" fill={`url(#${sun})`} />

          <g fill="none" stroke="#1d1d1b" strokeWidth="3" strokeLinecap="round">
            <path d="M104 84 q13 -13 26 0" />
            <path d="M130 84 q13 -13 26 0" />
            <path d="M148 122 q10 -10 20 0" />
            <path d="M168 122 q10 -10 20 0" />
          </g>

          <path
            d="M0 300 L0 198 C74 150 138 212 208 186 C286 157 338 206 400 180 L400 300 Z"
            fill={`url(#${far})`}
          />
          <path
            d="M0 300 L0 248 C92 210 172 268 252 242 C322 219 360 252 400 238 L400 300 Z"
            fill={`url(#${near})`}
          />
        </svg>
      </div>

      <div className="bg-panel">
        <h3>Backgrounds, gone</h3>
        <p>
          Clip art on a solid plate is the most common thing a vectorizer gets handed, and the most
          tedious thing to clean up afterwards. In VTracer 2 it is one checkbox.
        </p>

        <label className="switch">
          <input
            type="checkbox"
            checked={removed}
            onChange={(e) => setRemoved(e.target.checked)}
          />
          <span className="switch-box" aria-hidden="true" />
          <span>Remove background</span>
        </label>

        <pre className="bg-out">
          <code>
            {removed
              ? "<svg viewBox=\"0 0 400 300\">\n  <!-- no background plate -->\n  <circle … />"
              : "<svg viewBox=\"0 0 400 300\">\n  <rect fill=\"#f2ece0\" … />\n  <circle … />"}
          </code>
        </pre>
      </div>
    </div>
  );
}
