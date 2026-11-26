import { renderToStaticMarkup, renderToString } from "react-dom/server";
import FactSheet from "./components/FactSheet";
import { en, ja, zhHans } from "./fact-sheet-copy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import GraphicDesign from "./components/GraphicDesign";
import { CopyContext, en as siteEn, ja as siteJa, zh as siteZh } from "./site-copy";
import { graphicDesign, graphicDesignJa, graphicDesignZh } from "./use-case-copy";

/**
 * Server entry for scripts/prerender.mjs, which bakes each legal document's
 * markup into its built HTML file. renderToString rather than
 * renderToStaticMarkup, because the client entries hydrate this output.
 */
export const PAGES: Record<string, () => string> = {
  "privacy-policy": () => renderToString(<PrivacyPolicy />),
  "terms-of-service": () => renderToString(<TermsOfService />),
  "use-cases/graphic-design": () =>
    renderToString(
      <CopyContext.Provider value={siteEn}>
        <GraphicDesign copy={graphicDesign} />
      </CopyContext.Provider>,
    ),
  "zh/use-cases/graphic-design": () =>
    renderToString(
      <CopyContext.Provider value={siteZh}>
        <GraphicDesign copy={graphicDesignZh} />
      </CopyContext.Provider>,
    ),
  "ja/use-cases/graphic-design": () =>
    renderToString(
      <CopyContext.Provider value={siteJa}>
        <GraphicDesign copy={graphicDesignJa} />
      </CopyContext.Provider>,
    ),
  // Static markup, not renderToString: nothing hydrates these pages. One per
  // language, because a page with no script cannot pick one at load time.
  "fact-sheet": () => renderToStaticMarkup(<FactSheet copy={en} />),
  "zh/fact-sheet": () => renderToStaticMarkup(<FactSheet copy={zhHans} />),
  "ja/fact-sheet": () => renderToStaticMarkup(<FactSheet copy={ja} />),
};

