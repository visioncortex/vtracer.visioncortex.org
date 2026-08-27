// Bakes the legal documents' full text into their built HTML, so
// /privacy-policy and /terms-of-service are readable without JavaScript —
// including by Google's OAuth reviewers. Runs after `vite build`; the client
// entries hydrate the markup instead of rendering from scratch.
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createServer } from "vite";

/**
 * Pages with no interactivity at all, which are also the ones framed inside
 * the desktop app. Everything the browser would have to fetch is removed or
 * folded in after prerendering: the module script and its preloads go, and
 * the stylesheet is inlined. What is left is one document that needs nothing
 * from this origin but its images — which matters because the app's content
 * security policy is written for the app's own origin, not ours, and a
 * blocked stylesheet would leave the panel blank.
 *
 * The client entry stays for dev, which serves these pages unprerendered.
 */
const STATIC = new Set(["fact-sheet"]);

/** Folds <link rel="stylesheet"> into a <style> block, and drops the JS. */
async function selfContain(html) {
  const sheets = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)];
  let out = html;

  for (const [tag] of sheets) {
    const href = tag.match(/href="([^"]+)"/)?.[1];
    if (!href?.startsWith("/")) continue;
    const css = await readFile(join("dist", href), "utf8");
    out = out.replace(tag, `<style>${css}</style>`);
  }

  return out
    .replace(/\s*<script type="module"[^>]*><\/script>/g, "")
    .replace(/\s*<link[^>]*rel="modulepreload"[^>]*>/g, "");
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { PAGES } = await server.ssrLoadModule("/src/prerender.tsx");
  for (const [name, render] of Object.entries(PAGES)) {
    const file = `dist/${name}.html`;
    const html = await readFile(file, "utf8");
    const mount = '<div id="root"></div>';
    if (!html.includes(mount)) throw new Error(`no mount point in ${file}`);
    let out = html.replace(mount, `<div id="root">${render()}</div>`);
    let note = "";
    if (STATIC.has(name)) {
      out = await selfContain(out);
      note = " (self-contained: no script, styles inlined)";
    }
    await writeFile(file, out);
    console.log(`prerendered ${file}${note}`);
  }
} finally {
  await server.close();
}
