import { useCallback, useEffect, useRef, useState } from "react";

const ART_W = 800;
const ART_H = 500;

/**
 * The sample artwork, drawn in a fixed 800×500 space and scaled to fit
 * whatever surface it is handed. Both sides of the comparator draw the very
 * same geometry — the only difference is the resolution they draw it at.
 */
function paintArtwork(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0, 0, w, h);

  const s = Math.min(w / ART_W, h / ART_H);
  ctx.save();
  ctx.translate((w - ART_W * s) / 2, (h - ART_H * s) / 2);
  ctx.scale(s, s);

  // Gold disc — a circle is the least forgiving shape at low resolution.
  ctx.fillStyle = "#e0a63c";
  ctx.beginPath();
  ctx.arc(566, 172, 104, 0, Math.PI * 2);
  ctx.fill();

  // Blue petal.
  ctx.fillStyle = "#0088f7";
  ctx.beginPath();
  ctx.moveTo(126, 424);
  ctx.bezierCurveTo(126, 214, 268, 84, 478, 84);
  ctx.bezierCurveTo(478, 296, 342, 428, 150, 432);
  ctx.closePath();
  ctx.fill();

  // Off-white sweep across both — a thin stroke is the first thing pixels lose.
  ctx.strokeStyle = "#f2f2ef";
  ctx.lineWidth = 11;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(72, 452);
  ctx.bezierCurveTo(300, 452, 372, 138, 640, 348);
  ctx.stroke();

  // Hairline ring.
  ctx.strokeStyle = "rgba(242, 242, 239, 0.55)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(566, 172, 148, 0, Math.PI * 2);
  ctx.stroke();

  // Punctuation.
  ctx.fillStyle = "#e0a63c";
  ctx.beginPath();
  ctx.arc(212, 128, 17, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function TraceDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rasterRef = useRef<HTMLCanvasElement>(null);
  const vectorRef = useRef<HTMLCanvasElement>(null);

  const [split, setSplit] = useState(50);
  const [res, setRes] = useState(48);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Track the stage's CSS size so both canvases stay pixel-accurate.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  // Right side: the artwork drawn at full device resolution — what a vector
  // description gives you at any zoom.
  useEffect(() => {
    const canvas = vectorRef.current;
    if (!canvas || !size.w || !size.h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size.w * dpr);
    canvas.height = Math.round(size.h * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) paintArtwork(ctx, canvas.width, canvas.height);
  }, [size]);

  // Left side: the same artwork rendered into a small buffer, then blown back
  // up with smoothing off — pixels, and only pixels.
  useEffect(() => {
    const canvas = rasterRef.current;
    if (!canvas || !size.w || !size.h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size.w * dpr);
    canvas.height = Math.round(size.h * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buffer = document.createElement("canvas");
    buffer.width = res;
    buffer.height = Math.max(1, Math.round((res * size.h) / size.w));
    const bctx = buffer.getContext("2d");
    if (!bctx) return;
    paintArtwork(bctx, buffer.width, buffer.height);

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
  }, [size, res]);

  const moveSplit = useCallback((clientX: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(100, Math.max(0, pct)));
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

  const bufferH = size.w ? Math.max(1, Math.round((res * size.h) / size.w)) : 0;

  return (
    <div className="demo-layout">
      <div
        ref={stageRef}
        className="demo-stage"
        role="slider"
        tabIndex={0}
        aria-label="Comparison position between the raster source and the vector trace"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
      >
        <canvas ref={rasterRef} />
        <canvas ref={vectorRef} style={{ clipPath: `inset(0 0 0 ${split}%)` }} />
        <span className="demo-tag left">Raster source</span>
        <span className="demo-tag right">Vector trace</span>
        <div className="demo-handle" style={{ left: `${split}%` }}>
          <span className="demo-knob">◂▸</span>
        </div>
      </div>

      <div className="demo-panel">
        <h3>Drag the divider</h3>
        <p>
          Left is a raster image at the resolution you choose. Right is the same artwork described as
          curves — sharp at any zoom, at a fraction of the size.
        </p>

        <div className="field">
          <label className="field-row" htmlFor="res">
            <span>Source resolution</span>
            <b>{res}px</b>
          </label>
          <input
            id="res"
            type="range"
            min={16}
            max={320}
            step={4}
            value={res}
            onChange={(e) => setRes(Number(e.target.value))}
          />
        </div>

        <dl className="stat-grid">
          <div className="stat">
            <dt>Raster</dt>
            <dd>
              {res}×{bufferH}
            </dd>
          </div>
          <div className="stat">
            <dt>Vector</dt>
            <dd>∞ dpi</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
