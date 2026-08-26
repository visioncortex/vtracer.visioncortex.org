import { useState } from "react";
import type { OS } from "./site";

function detect(): OS | null {
  if (typeof navigator === "undefined") return null;

  const ua = navigator.userAgent || "";
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } })
    .userAgentData;
  const haystack = `${uaData?.platform ?? navigator.platform ?? ""} ${ua}`;

  if (/Windows/i.test(haystack)) return "Windows";
  // Both of the remaining checks have a mobile cousin that has to be ruled out:
  // iPadOS reports as Mac, and Android reports as Linux.
  if (/Mac|Darwin/i.test(haystack) && !/iPhone|iPad|iPod/i.test(ua)) return "macOS";
  if (/Linux|X11/i.test(haystack) && !/Android/i.test(ua)) return "Linux";
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
