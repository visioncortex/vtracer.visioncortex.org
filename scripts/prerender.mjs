// Bakes the legal documents' full text into their built HTML, so
// /privacy-policy and /terms-of-service are readable without JavaScript —
// including by Google's OAuth reviewers. Runs after `vite build`; the client
// entries hydrate the markup instead of rendering from scratch.
import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

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
    await writeFile(file, html.replace(mount, `<div id="root">${render()}</div>`));
    console.log(`prerendered ${file}`);
  }
} finally {
  await server.close();
}
