// Bakes the legal documents' full text into their built HTML, so
// /privacy-policy and /terms-of-service are readable without JavaScript —
// including by Google's OAuth reviewers. Runs after `vite build`; the client
// entries hydrate the markup instead of rendering from scratch.
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
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
const STATIC = new Set(["fact-sheet", "zh/fact-sheet"]);

/**
 * Finished pages served again at a second address. The app builds the fact
 * sheet's URL from its locale, /en/fact-sheet as much as /zh/fact-sheet, and
 * GitHub Pages cannot send a real redirect. The only redirect a static page
 * can do without script is a meta refresh, and that drops the #theme-dark or
 * #theme-light the app pins the theme with; a script redirect would keep it
 * but the app's CSP blocks scripts in the frame. So /en/ gets an identical
 * copy instead, whose canonical link still names /fact-sheet. Every URL in
 * these pages is root-relative, so a copy works from any directory.
 */
const ALIASES = { "en/fact-sheet": "fact-sheet" };

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
  for (const [alias, page] of Object.entries(ALIASES)) {
    const target = `dist/${alias}.html`;
    await mkdir(dirname(target), { recursive: true });
    await copyFile(`dist/${page}.html`, target);
    console.log(`copied dist/${page}.html to ${target}`);
  }
} finally {
  await server.close();
}
