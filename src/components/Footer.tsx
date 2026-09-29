import ConsentBanner from "./ConsentBanner";
import { OPEN_CONSENT } from "../consent";
import { ORG } from "../site";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="shell footer-inner">
          <span>
            © {new Date().getFullYear()} <a href={ORG}>Vision Cortex</a>
          </span>
          <nav className="footer-links">
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms-of-service">Terms</a>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT))}
            >
              Cookie settings
            </button>
          </nav>
        </div>
      </footer>
      {/* Here because every page that loads analytics renders this footer,
          and the fact sheet, which must never load it, does not. */}
      <ConsentBanner />
    </>
  );
}
