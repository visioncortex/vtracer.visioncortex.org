import { useCallback, useRef, useState } from "react";
import { frame, type Focus } from "../frame";

type Props = {
  leftSrc: string;
  rightSrc: string;
  leftLabel: string;
  rightLabel: string;
  leftAlt: string;
  rightAlt: string;
  stageAspect: number;
  aspect: number;
  focus: Focus;
  /** Paint a transparency checker behind the stage. */
  transparent?: boolean;
  /** Render the left image without smoothing, to show its real resolution. */
  pixelatedLeft?: boolean;
  initialSplit?: number;
};

export default function Wipe({
  leftSrc,
  rightSrc,
  leftLabel,
  rightLabel,
  leftAlt,
  rightAlt,
  stageAspect,
  aspect,
  focus,
  transparent,
  pixelatedLeft,
  initialSplit = 48,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(initialSplit);
  const framing = frame(stageAspect, aspect, focus);

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
    <div
      ref={stageRef}
      className={transparent ? "cmp-stage checker" : "cmp-stage"}
      style={{ aspectRatio: String(stageAspect) }}
      role="slider"
      tabIndex={0}
      aria-label={`Comparison position between ${leftLabel} and ${rightLabel}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(split)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onKeyDown={onKeyDown}
    >
      {/* Right of the divider: the genuine SVG the engine emitted. */}
      <div className="cmp-layer">
        <img src={rightSrc} alt={rightAlt} style={framing} />
      </div>
      <div className="cmp-layer" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <img
          className={pixelatedLeft ? "raster" : undefined}
          src={leftSrc}
          alt={leftAlt}
          style={framing}
        />
      </div>
      <span className="cmp-tag left">{leftLabel}</span>
      <span className="cmp-tag right">{rightLabel}</span>
      <div className="cmp-handle" style={{ left: `${split}%` }}>
        <span className="cmp-knob" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 6 L5 12 L10 18" />
            <path d="M14 6 L19 12 L14 18" />
          </svg>
        </span>
      </div>
    </div>
  );
}
