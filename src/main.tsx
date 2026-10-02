import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CopyContext, en, zh } from "./site-copy";

// Each language has its own HTML shell, which declares it on <html lang>.
const copy = document.documentElement.lang.startsWith("zh") ? zh : en;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CopyContext.Provider value={copy}>
      <App />
    </CopyContext.Provider>
  </StrictMode>,
);
