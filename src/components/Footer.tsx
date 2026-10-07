import ConsentBanner from "./ConsentBanner";
import { OPEN_CONSENT } from "../consent";
import { ORG } from "../site";
import { LANGS, useCopy } from "../site-copy";

export default function Footer() {
  const copy = useCopy();

  return (
    <>
      <footer className="footer">
        <div className="shell footer-inner">
          <span>
            © {new Date().getFullYear()} <a href={ORG}>Vision Cortex</a>
          </span>
          <nav className="footer-links">
            <a href="/privacy-policy">{copy.footer.privacy}</a>
            <a href="/terms-of-service">{copy.footer.terms}</a>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT))}
            >
              {copy.footer.cookies}
            </button>
          </nav>
          {/* A native select: the system picker on phones, arrow keys on a
              keyboard, and the current language shown as its value. Nothing
              is remembered: English goes to /en/, which / never redirects
              away from. The legal pages exist in English only, so from there
              another language goes to its landing page. */}
          <span className="footer-lang">
            <select
              aria-label={copy.footer.language}
              value={copy.lang}
              onChange={(e) => {
                const target = LANGS.find(({ lang }) => lang === e.target.value);
                if (target) location.assign(target.href);
              }}
            >
              {LANGS.map(({ lang, tag, name }) => (
                <option key={lang} value={lang} lang={tag}>
                  {name}
                </option>
              ))}
            </select>
          </span>
        </div>
      </footer>
      {/* Here because every page that loads analytics renders this footer,
          and the fact sheet, which must never load it, does not. */}
      <ConsentBanner />
    </>
  );
}
