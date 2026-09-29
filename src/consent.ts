/**
 * Google Analytics, loaded only with consent. Nothing is fetched from Google
 * and no cookie is set until the visitor chooses Accept, which is what lets the
 * privacy policy promise exactly that. The choice lives in localStorage on
 * this origin; withdrawing it stops collection on the spot and deletes the
 * cookies GA left behind.
 *
 * Only the pages that render the shared Footer load this. The fact sheet does
 * not: it is framed inside the app under a CSP that forbids scripts, and an
 * in-app view is not a website visit.
 */
export const GA_ID = "G-XPL1JGMDSC";

/** Dispatched on window to bring the banner back, from Cookie settings. */
export const OPEN_CONSENT = "vt:open-consent";

export type Consent = "granted" | "denied";

const KEY = "vt-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Storage can be blocked outright; treat that as no choice made yet.
    return null;
  }
}

let started = false;

/** The pasted gtag.js snippet, run on demand rather than from <head>. */
export function startAnalytics() {
  setDisabled(false);
  if (started) return;
  started = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads Arguments objects off the data layer, not arrays, so
    // this has to push `arguments` itself rather than a rest parameter.
    // oxlint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  // There is no advertising on this site, so the ad signals stay off even
  // for someone who allows analytics.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.append(script);
}

function stopAnalytics() {
  setDisabled(true);
  window.gtag?.("consent", "update", { analytics_storage: "denied" });

  // GA sets its cookies on the widest domain it can, .visioncortex.org, so
  // clear them there as well as on this host.
  const parts = location.hostname.split(".");
  const domains = parts.map((_, i) => parts.slice(i).join(".")).filter((d) => d.includes("."));
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  }
}

/** GA's documented off switch, which stops hits from a tag already loaded. */
function setDisabled(disabled: boolean) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = disabled;
}

export function setConsent(consent: Consent) {
  try {
    localStorage.setItem(KEY, consent);
  } catch {
    // Unstorable: the choice still holds for this page view.
  }
  if (consent === "granted") startAnalytics();
  else stopAnalytics();
}
