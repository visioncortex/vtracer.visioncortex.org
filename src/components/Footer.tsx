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
          {/* Only the languages the reader is not already in. Nothing is
              remembered: English links to /en/, which / never redirects
              away from. The legal pages exist in English only, so from there
              简体中文 goes home. */}
          <nav className="footer-lang" aria-label={copy.footer.language}>
            {LANGS.filter(({ lang }) => lang !== copy.lang).map(({ lang, name, href }) => (
              <a
                key={lang}
                href={href}
                hrefLang={lang === "zh" ? "zh-Hans" : "en"}
                lang={lang === "zh" ? "zh-Hans" : "en"}
              >
                {name}
              </a>
            ))}
          </nav>
        </div>
      </footer>
      {/* Here because every page that loads analytics renders this footer,
          and the fact sheet, which must never load it, does not. */}
      <ConsentBanner />
    </>
  );
}
