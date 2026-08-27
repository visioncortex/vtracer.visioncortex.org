import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      // GitHub Pages serves /privacy-policy from privacy-policy.html; teach
      // the dev server the same trick so the footer links work locally.
      name: "clean-urls",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const clean = req.url?.replace(/[?#].*$/, "");
          if (clean === "/privacy-policy" || clean === "/terms-of-service") {
            req.url = `${clean}.html${req.url!.slice(clean.length)}`;
          }
          next();
        });
      },
    },
  ],
  build: {
    // Three real HTML entries. The legal pages are root-level .html files
    // rather than directories, because GitHub Pages serves /privacy-policy
    // from privacy-policy.html directly — a 200 on the exact slashless URL
    // handed to Google's OAuth review, with no redirect in the way.
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        "privacy-policy": resolve(import.meta.dirname, "privacy-policy.html"),
        "terms-of-service": resolve(import.meta.dirname, "terms-of-service.html"),
      },
    },
  },
  server: {
    // Honour the port the launcher hands us, so a stray process on 5173
    // doesn't quietly steal the preview.
    port: Number(process.env.PORT) || 5173,
    strictPort: Boolean(process.env.PORT),
  },
})
