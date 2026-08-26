import { useState } from "react";
import type { OS } from "./site";

function detect(): OS | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  // Android also reports Linux, so it has to be ruled out first.
  if (/Android/i.test(ua)) return null;
  if (/Mac|iPhone|iPad|iPod/i.test(ua)) return "macOS";
  if (/Win/i.test(ua)) return "Windows";
  if (/Linux|X11|CrOS/i.test(ua)) return "Linux";
  return null;
}

/**
 * Best guess at the visitor's desktop platform, so the download button can name
 * it. Read once on first render; callers fall back to a plain "Download" when
 * it comes back null.
 */
export function useOS(): OS | null {
  const [os] = useState(detect);
  return os;
}
