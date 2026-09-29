import { useEffect, useState } from "react";
import { OPEN_CONSENT, readConsent, setConsent, startAnalytics, type Consent } from "../consent";

/**
 * Asks once, remembers the answer, and comes back from Cookie settings in the
 * footer. The two buttons are deliberately the same weight: declining has to
 * be as easy as allowing.
 *
 * Renders nothing until mounted. The legal pages are prerendered, and the
 * server cannot know what this visitor chose, so deciding in an effect keeps
 * hydration from disagreeing with the markup.
 */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (consent === "granted") startAnalytics();
    // oxlint-disable-next-line react-hooks/set-state-in-effect -- see above
    else if (consent === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (consent: Consent) => {
    setConsent(consent);
    setOpen(false);
  };

  return (
    <div className="consent" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <p>
        We use cookies to understand how our site is used and to improve it.{" "}
        <a href="/privacy-policy#this-website">Learn more</a>
      </p>
      <div className="consent-actions">
        <button className="btn btn-ghost btn-sm" onClick={() => choose("denied")}>
          Decline
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
