import { useCallback, useRef, useState } from "react";

type Focus = { x: number; y: number; zoom: number };

/**
 * Places the source art inside the stage so that `focus` sits dead centre,
 * scaled by `focus.zoom`. Returned as percentages of the stage box, which lets
 * both layers use the identical framing without measuring anything.
 *
 * Height is set rather than left to each image's own aspect, so a source and
 * its trace stay registered even if a future pair differs by a pixel or two.
 */
function frame(stageAspect: number, aspect: number, focus: Focus) {
  const w = focus.zoom * 100;
  const h = focus.zoom * (stageAspect / aspect) * 100;

  // Honour the focus point, but never so far that the art pulls away from an
  // edge and lets the stage show through. Only clamps on an axis the image is
  // actually big enough to cover.
  const pin = (offset: number, size: number) =>
    size >= 100 ? Math.min(0, Math.max(100 - size, offset)) : offset;

  return {
    width: `${w}%`,
    height: `${h}%`,
    left: `${pin(50 - focus.x * w, w)}%`,
    top: `${pin(50 - focus.y * h, h)}%`,
  };
}

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
