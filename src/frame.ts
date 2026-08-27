export type Focus = { x: number; y: number; zoom: number };

/**
 * Places source art inside a comparison stage so that `focus` sits dead
 * centre, scaled by `focus.zoom`. Returned as percentages of the stage box,
 * which lets every layer use identical framing without measuring anything.
 *
 * Height is set rather than left to each image's own aspect, so a source and
 * its trace stay registered even if a future pair differs by a pixel or two.
 */
export function frame(stageAspect: number, aspect: number, focus: Focus) {
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
