import { useCallback, useEffect, useRef, useState } from "react";
import { COMPARISONS, RIVAL_NAME, STAGE_ASPECT } from "../site";

type LeftSide = "original" | "rival";

/**
 * Places the source art inside a 16:9 stage so that `focus` sits dead centre,
 * scaled by `focus.zoom`. Returned as percentages of the stage box, which lets
 * both layers use the identical framing without measuring anything.
 */
function frame(aspect: number, focus: { x: number; y: number; zoom: number }) {
  const z = focus.zoom;
  return {
    width: `${z * 100}%`,
    left: `${50 - focus.x * z * 100}%`,
    top: `${50 - focus.y * z * (STAGE_ASPECT / aspect) * 100}%`,
  };
}

export default function Comparator() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pairIdx, setPairIdx] = useState(0);
  const [left, setLeft] = useState<LeftSide>("original");
  const [split, setSplit] = useState(48);

  // Warm the sides that are not on screen yet, so flipping a tab never flashes
  // an empty stage. Deferred to idle time — together these run to a few hundred
  // KB, and none of it should compete with the first paint.
  useEffect(() => {
    const warm = () => {
      for (const c of COMPARISONS) {
        for (const side of [c.original, c.vtracer, c.rival]) {
          new Image().src = side.src;
        }
      }
    };
    const idle = window.requestIdleCallback;
    if (idle) {
      const handle = idle(warm, { timeout: 4000 });
      return () => window.cancelIdleCallback?.(handle);
    }
    const t = setTimeout(warm, 1500);
    return () => clearTimeout(t);
  }, []);

  const pair = COMPARISONS[pairIdx];
  const leftImage = left === "original" ? pair.original : pair.rival;
  const leftLabel = left === "original" ? "Original" : RIVAL_NAME;
  const framing = frame(pair.aspect, pair.focus);

  const moveSplit = useCallback((clientX: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    setSplit(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    moveSplit(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) moveSplit(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setSplit((v) => Math.max(0, v - 4));
    if (e.key === "ArrowRight") setSplit((v) => Math.min(100, v + 4));
  };

  return (
    <div className="cmp">
      <div className="cmp-switches">
        <div className="seg" role="tablist" aria-label="Sample artwork">
          {COMPARISONS.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={i === pairIdx}
              onClick={() => setPairIdx(i)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="seg" role="tablist" aria-label="What to compare against">
          <button
            role="tab"
            aria-selected={left === "original"}
            onClick={() => setLeft("original")}
          >
            Original
          </button>
          <button role="tab" aria-selected={left === "rival"} onClick={() => setLeft("rival")}>
            {RIVAL_NAME}
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className="cmp-stage"
        style={{ aspectRatio: String(STAGE_ASPECT) }}
        role="slider"
        tabIndex={0}
        aria-label={`Comparison position between ${leftLabel} and VTracer 2`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
      >
        {/* Right of the divider: the genuine SVG the engine emitted. */}
        <div className="cmp-layer">
          <img src={pair.vtracer.src} alt={`${pair.label} traced by VTracer 2`} style={framing} />
        </div>
        <div className="cmp-layer" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
          <img
            className={left === "original" ? "raster" : undefined}
            src={leftImage.src}
            alt={`${pair.label}, ${leftLabel}`}
            style={framing}
          />
        </div>
        <span className="cmp-tag left">{leftLabel}</span>
        <span className="cmp-tag right">VTracer 2</span>
        <div className="cmp-handle" style={{ left: `${split}%` }}>
          <span className="cmp-knob" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
                 strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6 L5 12 L10 18" />
              <path d="M14 6 L19 12 L14 18" />
            </svg>
          </span>
        </div>
      </div>

      <dl className="cmp-stats">
        <div>
          <dt>{leftLabel}</dt>
          <dd>
            {left === "original"
              ? pair.original.note
              : `${pair.rival.paths.toLocaleString()} paths · ${pair.rival.kb} KB`}
          </dd>
        </div>
        <div>
          <dt>Drag to compare</dt>
          <dd className="cmp-hint">Both traces are the real SVG files</dd>
        </div>
        <div className="win">
          <dt>VTracer 2</dt>
          <dd>
            {pair.vtracer.paths.toLocaleString()} paths · {pair.vtracer.kb} KB
          </dd>
        </div>
      </dl>
    </div>
  );
}
