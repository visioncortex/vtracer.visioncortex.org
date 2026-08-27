import { useEffect, useState } from "react";
import Wipe from "./Wipe";
import { COMPARISONS, RIVAL_NAME, RIVAL_VERSION, STAGE_ASPECT } from "../site";

type LeftSide = "original" | "rival";

export default function Comparator() {
  const [pairIdx, setPairIdx] = useState(0);
  const [left, setLeft] = useState<LeftSide>("original");

  // Warm the sides that are not on screen yet, so flipping a tab never flashes
  // an empty stage. Deferred to idle time — together these run to a few hundred
  // KB, and none of it should compete with the first paint.
  useEffect(() => {
    const warm = () => {
      for (const c of COMPARISONS) {
        for (const each of [c.original, c.vtracer, c.rival]) {
          if (each) new Image().src = each.src;
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
  const rival = pair.rival;
  const leftImage = left === "original" ? pair.original : rival;
  const leftLabel = left === "original" ? "Original" : RIVAL_NAME;

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

      <Wipe
        key={pair.id}
        leftSrc={leftImage.src}
        rightSrc={pair.vtracer.src}
        leftLabel={leftLabel}
        rightLabel="VTracer 2"
        leftAlt={`${pair.label}, ${leftLabel}`}
        rightAlt={`${pair.label} traced by VTracer 2`}
        stageAspect={STAGE_ASPECT}
        aspect={pair.aspect}
        focus={pair.focus}
        pixelatedLeft={left === "original"}
      />

      <dl className="cmp-stats">
        <div>
          <dt>{leftLabel}</dt>
          <dd>
            {left === "original"
              ? pair.original.note
              : `${rival.paths.toLocaleString()} paths · ${rival.kb} KB`}
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

      {/* Provenance, so the comparison can be checked rather than taken on
          trust. Settings differ per sample because each was tuned rather than
          left at whatever the default happened to be. */}
      <p className="cmp-note">
        {left === "rival" && (
          <>
            {RIVAL_NAME} {RIVAL_VERSION} — {rival.settings}.{" "}
          </>
        )}
        Compare the traces yourself: <a href={pair.vtracer.src}>VTracer 2 SVG</a>,{" "}
        <a href={rival.src}>{RIVAL_NAME} SVG</a>.
      </p>
    </div>
  );
}
