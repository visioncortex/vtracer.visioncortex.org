import { renderToString } from "react-dom/server";
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
};
