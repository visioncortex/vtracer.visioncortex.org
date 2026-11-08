import { useState } from "react";
import type { LinuxPackage, OS } from "./site";

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

/**
 * Which package a Linux visitor's distribution installs, where the browser
 * says. Usually it does not: no browser API exposes the distribution, and
 * Chrome, Chromium, Edge and Brave all report a bare "Linux". The exception
 * is Firefox as Ubuntu and Fedora build it, which writes the distribution
 * into its user agent ("X11; Ubuntu; Linux x86_64"). Null means unknown, and
 * callers send the visitor to the release page to pick a package.
 */
function detectLinuxPackage(): LinuxPackage | null {
  if (typeof navigator === "undefined") return null;

  const ua = navigator.userAgent || "";
  if (/Ubuntu|Debian|Mint|Pop!?_OS|elementary|Zorin|Kali/i.test(ua)) return "deb";
  if (/Fedora|Red ?Hat|RHEL|CentOS|Rocky|Alma|SUSE/i.test(ua)) return "rpm";
  return null;
}

export function useLinuxPackage(): LinuxPackage | null {
  const [pkg] = useState(detectLinuxPackage);
  return pkg;
}
