import { useEffect, useState } from "react";
import Wipe from "./Wipe";
import { COMPARISONS, RIVAL_NAME, RIVAL_VERSION, STAGE_ASPECT } from "../site";
import { useCopy } from "../site-copy";

type LeftSide = "original" | "rival";

export default function Comparator() {
  const [pairIdx, setPairIdx] = useState(0);
  const [left, setLeft] = useState<LeftSide>("original");
  const { cmp } = useCopy();

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
  const leftLabel = left === "original" ? cmp.original : RIVAL_NAME;
  const sample = cmp.samples[pair.id] ?? pair.label;

  return (
    <div className="cmp">
      <div className="cmp-switches">
        {/* This picks what sits LEFT of the divider, so it sits left too —
            directly above the tag naming whatever it selected. */}
        <div className="seg" role="tablist" aria-label={cmp.againstAria}>
          <button
            role="tab"
            aria-selected={left === "original"}
            onClick={() => setLeft("original")}
          >
            {cmp.original}
          </button>
          <button role="tab" aria-selected={left === "rival"} onClick={() => setLeft("rival")}>
            {RIVAL_NAME}
          </button>
        </div>
        {/* Changes both halves at once, so it is not tied to either side. */}
        <div className="seg" role="tablist" aria-label={cmp.samplesAria}>
          {COMPARISONS.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={i === pairIdx}
              onClick={() => setPairIdx(i)}
            >
              {cmp.samples[c.id] ?? c.label}
            </button>
          ))}
        </div>
      </div>

      <Wipe
        key={pair.id}
        leftSrc={leftImage.src}
        rightSrc={pair.vtracer.src}
        leftLabel={leftLabel}
        rightLabel="VTracer 2"
        leftAlt={cmp.leftAlt(sample, leftLabel)}
        rightAlt={cmp.rightAlt(sample)}
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
              : cmp.stats(rival.paths, rival.kb)}
          </dd>
        </div>
        <div>
          <dt>{cmp.drag}</dt>
          <dd className="cmp-hint">{cmp.real}</dd>
        </div>
        <div className="win">
          <dt>VTracer 2</dt>
          <dd>{cmp.stats(pair.vtracer.paths, pair.vtracer.kb)}</dd>
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
        {cmp.yourself}
        <a href={pair.vtracer.src}>{cmp.svg("VTracer 2")}</a>
        {cmp.listJoin}
        <a href={rival.src}>{cmp.svg(RIVAL_NAME)}</a>
        {cmp.end}
      </p>
    </div>
  );
}
