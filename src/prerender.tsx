import { renderToStaticMarkup, renderToString } from "react-dom/server";
import FactSheet from "./components/FactSheet";
import { en, zhHans } from "./fact-sheet-copy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";

/**
 * Server entry for scripts/prerender.mjs, which bakes each legal document's
 * markup into its built HTML file. renderToString rather than
 * renderToStaticMarkup, because the client entries hydrate this output.
 */
export const PAGES: Record<string, () => string> = {
  "privacy-policy": () => renderToString(<PrivacyPolicy />),
  "terms-of-service": () => renderToString(<TermsOfService />),
  // Static markup, not renderToString: nothing hydrates these pages. One per
  // language, because a page with no script cannot pick one at load time.
  "fact-sheet": () => renderToStaticMarkup(<FactSheet copy={en} />),
  "zh/fact-sheet": () => renderToStaticMarkup(<FactSheet copy={zhHans} />),
};

