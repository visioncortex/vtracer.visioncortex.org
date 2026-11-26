import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import GraphicDesign from "./components/GraphicDesign";
import "./index.css";
import { CopyContext, copyFor } from "./site-copy";
import { useCaseCopyFor } from "./use-case-copy";

const root = document.getElementById("root")!;
// Each language has its own HTML shell, which declares it on <html lang>.
// The site copy is for the Nav and Footer this page shares with the landing page.
const lang = document.documentElement.lang;
const page = (
  <StrictMode>
    <CopyContext.Provider value={copyFor(lang, location.pathname)}>
      <GraphicDesign copy={useCaseCopyFor(lang)} />
    </CopyContext.Provider>
  </StrictMode>
);

// The production build prerenders this page (scripts/prerender.mjs), so the
// markup is already in the document; the dev server serves it empty.
if (root.hasChildNodes()) {
  hydrateRoot(root, page);
} else {
  createRoot(root).render(page);
}
