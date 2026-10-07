import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import FactSheet from "./components/FactSheet";
import { factSheetCopyFor } from "./fact-sheet-copy";
import "./fact-sheet.css";

const root = document.getElementById("root")!;
// Each language has its own HTML shell, which declares it on <html lang>.
const copy = factSheetCopyFor(document.documentElement.lang);
const page = (
  <StrictMode>
    <FactSheet copy={copy} />
  </StrictMode>
);

// Prerendered by scripts/prerender.mjs, so the panel has content before any
// script runs — which matters more here than on the marketing page, since this
// is framed inside the app.
if (root.hasChildNodes()) {
  hydrateRoot(root, page);
} else {
  createRoot(root).render(page);
}
