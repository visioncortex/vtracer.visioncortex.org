import { useEffect, useState } from "react";
import { DOWNLOAD_URL, MANIFEST_URL } from "./site";
import type { OS } from "./site";

/** Manifest keys to try per platform, most specific first. */
const KEYS: Record<OS, string[]> = {
  Windows: ["windows-x86_64"],
  macOS: ["macos-universal", "darwin-universal", "darwin-aarch64", "darwin-x86_64"],
  Linux: ["linux-x86_64"],
};

type Manifest = { platforms?: Record<string, { url?: string } | undefined> };

function artifact(manifest: Manifest | null, os: OS): string | null {
  const platforms = manifest?.platforms;
  if (!platforms) return null;

  for (const key of KEYS[os]) {
    const url = platforms[key]?.url;
    if (!url) continue;
    // On macOS the manifest points at Tauri's updater bundle. A person wants
    // the disk image sitting beside it in the same release.
    //
    // Derived from the updater URL rather than from manifest.version, because
    // the version carries a build suffix the release tag does not: version
    // "1.0.0-alpha.3.app.59" lives under the tag "1.0.0-alpha.3". Rewriting
    // only the filename keeps the real tag from the URL we were handed.
    return os === "macOS" ? url.replace(/\.app\.tar\.gz$/i, ".dmg") : url;
  }
  return null;
}

/**
 * Resolves the direct download for a platform from the update manifest, so the
 * buttons hand over the installer rather than dropping people on a release
 * page to pick through the assets. Falls back to that page while the manifest
 * is in flight, and permanently if it cannot be read.
 */
export function useDownloads(): (os: OS | null) => string {
  const [manifest, setManifest] = useState<Manifest | null>(null);

  useEffect(() => {
    const abort = new AbortController();
    fetch(MANIFEST_URL, { signal: abort.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Manifest | null) => setManifest(data))
      .catch(() => {
        // Offline, blocked, or the branch moved: DOWNLOAD_URL still works.
      });
    return () => abort.abort();
  }, []);

  return (os) => (os && artifact(manifest, os)) || DOWNLOAD_URL;
}
