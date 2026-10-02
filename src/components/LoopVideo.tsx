import { useEffect, useRef } from "react";

/**
 * A silent demo loop, with or without the player's controls, which plays only
 * while it is on screen. Nothing is fetched until it scrolls into view, which
 * matters for a multi-megabyte clip sitting well below the fold.
 *
 * A reader who pauses it has made a choice, so scrolling away and back does
 * not start it again; pressing play hands it back to the scroll. Readers who
 * ask for reduced motion get the poster, plus a play button where there are
 * controls. Without controls the clip behaves like a GIF.
 */
export default function LoopVideo({
  src,
  poster,
  width,
  height,
  label,
  controls = true,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  controls?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // React does not reliably reflect `muted` onto the element, and autoplay
    // policy checks the property at play() time.
    video.muted = true;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Our own pauses, as the scroll takes the clip off screen, are flagged so
    // the pause listener can tell them apart from the reader's.
    let pausingForScroll = false;
    let heldByReader = false;

    // Only a reader with controls can pause the clip. Without them, a pause
    // we did not ask for is the browser's (saving power, say), and holding
    // on it would leave the clip frozen for good.
    const onPause = () => {
      if (!pausingForScroll && controls) heldByReader = true;
      pausingForScroll = false;
    };
    const onPlay = () => {
      heldByReader = false;
    };
    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // A refused autoplay (iOS in Low Power Mode, say) leaves the poster
          // and the play button, which is the right fallback as it stands.
          if (!heldByReader) video.play().catch(() => {});
        } else if (!video.paused) {
          pausingForScroll = true;
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
    };
  }, [controls]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      controls={controls}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
