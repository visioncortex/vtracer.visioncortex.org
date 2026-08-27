import { useEffect, useState } from "react";

const API = "https://api.github.com/repos/visioncortex/vtracer";

/**
 * Live star count for the badge. Unauthenticated GitHub allows 60 requests an
 * hour per IP, which is per-visitor rather than shared, and the badge simply
 * renders without a number if the call does not land.
 */
export function useStars(): number | null {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const abort = new AbortController();
    fetch(API, { signal: abort.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { stargazers_count?: number } | null) => {
        if (typeof data?.stargazers_count === "number") setStars(data.stargazers_count);
      })
      .catch(() => {
        // Rate limited or offline: the badge stands on its own.
      });
    return () => abort.abort();
  }, []);

  return stars;
}
