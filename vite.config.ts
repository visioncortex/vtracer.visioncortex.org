import { readFile } from "node:fs/promises";
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
          if (
            clean === "/privacy-policy" ||
            clean === "/terms-of-service" ||
            clean === "/fact-sheet" ||
            clean === "/zh/fact-sheet" ||
            clean === "/ja/fact-sheet"
          ) {
            req.url = `${clean}.html${req.url!.slice(clean.length)}`;
          } else if (clean === "/en/fact-sheet") {
            // The build writes a copy of the English page here; in dev, alias it.
            req.url = `/fact-sheet.html${req.url!.slice(clean.length)}`;
          } else if (clean === "/en/") {
            req.url = `/index.html${req.url!.slice(clean.length)}`;
          }
          next();
        });
      },
    },
    {
      // The knowledge base has no HTML file per page: each is rendered from
      // content/kb/<lang>/*.md into kb/template.html, at build time by
      // scripts/prerender.mjs and here on request. Drafts show in dev only.
      name: "knowledge-base",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const clean = req.url?.replace(/[?#].*$/, "") ?? "";
          if (!/^\/(?:(?:zh|ja)\/)?kb(?:\/|$)/.test(clean)) return next();
          try {
            const { renderKbPage, fillTemplate } = await server.ssrLoadModule("/src/kb/render.tsx");
            const page = renderKbPage(clean, { drafts: true });
            // Not a page: an image under public/kb/, or a 404.
            if (!page) return next();
            const template = await readFile(resolve(import.meta.dirname, "kb/template.html"), "utf8");
            const html = await server.transformIndexHtml(req.url!, fillTemplate(template, page));
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
          } catch (error) {
            server.ssrFixStacktrace(error as Error);
            next(error);
          }
        });
        // Nothing in the browser imports the Markdown, so HMR never sees it
        // change; reload the page instead.
        const kbContent = resolve(import.meta.dirname, "content/kb");
        const reload = (file: string) => {
          if (file.startsWith(kbContent)) server.ws.send({ type: "full-reload" });
        };
        server.watcher.on("change", reload);
        server.watcher.on("add", reload);
        server.watcher.on("unlink", reload);
      },
    },
  ],
  build: {
    // Real HTML entries, one per page. The legal pages are root-level .html files
    // rather than directories, because GitHub Pages serves /privacy-policy
    // from privacy-policy.html directly — a 200 on the exact slashless URL
    // handed to Google's OAuth review, with no redirect in the way.
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        "zh/index": resolve(import.meta.dirname, "zh/index.html"),
        "ja/index": resolve(import.meta.dirname, "ja/index.html"),
        "privacy-policy": resolve(import.meta.dirname, "privacy-policy.html"),
        "terms-of-service": resolve(import.meta.dirname, "terms-of-service.html"),
        "fact-sheet": resolve(import.meta.dirname, "fact-sheet.html"),
        "use-cases/graphic-design": resolve(import.meta.dirname, "use-cases/graphic-design.html"),
        // Language versions live under a prefix: /zh/fact-sheet.
        "zh/fact-sheet": resolve(import.meta.dirname, "zh/fact-sheet.html"),
        "ja/fact-sheet": resolve(import.meta.dirname, "ja/fact-sheet.html"),
        // The knowledge base's page shell, which prerender fills once per
        // article and then deletes.
        "kb/template": resolve(import.meta.dirname, "kb/template.html"),
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
