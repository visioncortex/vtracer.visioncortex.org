import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { CopyContext, copyFor, type Lang } from "./site-copy";
import "./index.css";
import "./kb.css";

// Knowledge base pages arrive fully rendered (src/kb/render.tsx); only the
// nav and footer need React. They are rendered afresh rather than hydrated:
// the download button names the visitor's platform, which the server cannot
// know, and a fresh render picks it up where hydration would keep the
// server's guess.
const copy = copyFor(document.documentElement.lang, location.pathname);

function mount(id: string, node: ReactNode) {
  const el = document.getElementById(id);
  if (!el) return;
  createRoot(el).render(
    <StrictMode>
      <CopyContext.Provider value={copy}>{node}</CopyContext.Provider>
    </StrictMode>,
  );
}

// Where the footer's language picker goes from this page, written by the
// server since only it knows which translations exist.
let langLinks: Partial<Record<Lang, string>> = {};
try {
  langLinks = JSON.parse(document.getElementById("kb-footer")?.dataset.langLinks ?? "{}");
} catch {
  // Malformed: the picker falls back to each language's landing page.
}

mount("kb-nav", <Nav />);
mount("kb-footer", <Footer langLinks={langLinks} />);
