import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import PrivacyPolicy from "./components/PrivacyPolicy";
import "./index.css";

const root = document.getElementById("root")!;
const page = (
  <StrictMode>
    <PrivacyPolicy />
  </StrictMode>
);

// The production build prerenders this page (scripts/prerender.mjs), so the
// markup is already in the document; the dev server serves it empty.
if (root.hasChildNodes()) {
  hydrateRoot(root, page);
} else {
  createRoot(root).render(page);
}
