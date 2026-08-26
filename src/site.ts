export const REPO = "https://github.com/visioncortex/vtracer";
export const DOCS = "https://www.visioncortex.org/vtracer-docs";
export const ORG = "https://www.visioncortex.org";

/** Fallback when the manifest cannot be reached, or the platform is unknown. */
export const DOWNLOAD_URL = `${REPO}/releases/latest`;

/** Tauri update manifest, which carries the current per-platform artifacts. */
export const MANIFEST_URL =
  "https://raw.githubusercontent.com/visioncortex/vtracer/desktop-updates/latest.json";

/** The trace we benchmark against. Shown by name on the comparator. */
export const RIVAL_NAME = "Affinity Designer";

/**
 * Each side is served as what it actually is: the source stays a raster, and
 * both traces are the real SVG files, so the vector side is genuinely vector.
 *
 * `aspect` is the natural aspect of the source art. `focus` frames the crop:
 * x/y are the point of the source art to centre on (0-1), and zoom is how far
 * in to push relative to the stage width.
 */
export const COMPARISONS = [
  {
    id: "illustration",
    label: "Illustration",
    aspect: 384 / 512,
    focus: { x: 0.485, y: 0.215, zoom: 1.4 },
    original: { src: "/compare/indian-girl.webp", note: "384 × 512 WebP" },
    vtracer: { src: "/compare/indian-girl_vtracer.svg", paths: 593, kb: 341 },
    rival: { src: "/compare/indian-girl_affinity.svg", paths: 2361, kb: 764 },
  },
  {
    id: "mascot",
    label: "Mascot",
    aspect: 1,
    focus: { x: 0.51, y: 0.5, zoom: 1 },
    original: { src: "/compare/tiger-woman.webp", note: "512 × 512 WebP" },
    vtracer: { src: "/compare/tiger-woman_vtracer.svg", paths: 161, kb: 43 },
    rival: { src: "/compare/tiger-woman-affinity.svg", paths: 114, kb: 75 },
  },
];

/** Every stage is framed 16:9, whatever shape the source art is. */
export const STAGE_ASPECT = 16 / 9;

export const FEATURES = [
  {
    title: "Upscale, then trace",
    body: "The engine reconstructs your image at up to 8× before it fits a single curve. Detail that a conventional tracer would flatten into a jagged step comes through as clean geometry.",
  },
  {
    title: "No hallucination",
    body: "Upscaling models love to invent. Ours does not. Every detail in the output traces back to something that was genuinely in your input — that constraint is engineered in, not hoped for.",
  },
  {
    title: "Runs on your device",
    body: "A 4.5M-parameter model: small enough to be quick and entirely local, Metal-accelerated on macOS. Nothing is uploaded, and there is no queue to wait in.",
  },
  {
    title: "Survives real JPEGs",
    body: "Ringing, banding, blocking, a file that has been re-saved a dozen times. The engine is built to trace through compression damage rather than faithfully tracing the damage itself.",
  },
  {
    title: "Gradients, natively",
    body: "Linear, radial and true mesh gradients come out as gradients — not as a hundred stacked slivers doing an impression of one.",
  },
  {
    title: "Stacked mode",
    body: "VTracer's signature output: shapes layered rather than cut against one another. Fewer nodes, smaller files, and a document that is actually pleasant to open and edit.",
  },
];

export const MARQUEE = [
  "8× upscale",
  "On-device inference",
  "Metal accelerated",
  "Mesh gradients",
  "Stacked SVG",
  "JPEG-resilient",
  "macOS · Windows · Linux",
];

export const PLATFORMS = [
  { os: "macOS", meta: "Universal · Metal accelerated" },
  { os: "Windows", meta: "x64 · Installer" },
  { os: "Linux", meta: "x64 · AppImage" },
] as const;

export type OS = (typeof PLATFORMS)[number]["os"];

type Snippet = { id: string; label: string; file: string; lines: [string, string][] };

// [kind, text] — "cmt" renders muted, "cmd" renders in gold, "" is plain.
export const SNIPPETS: Snippet[] = [
  {
    id: "cli",
    label: "CLI",
    file: "terminal",
    lines: [
      ["cmt", "# install"],
      ["cmd", "cargo install vtracer-cli"],
      ["", ""],
      ["cmt", "# simplest form"],
      ["cmd", "vtracer input.jpg output.svg"],
      ["", ""],
      ["cmt", "# black & white line art"],
      ["cmd", "vtracer input.jpg output.svg --preset bw"],
      ["", ""],
      ["cmt", "# scans with uneven lighting"],
      ["cmd", "vtracer scan.jpg out.svg --clustering bw --adaptive"],
    ],
  },
  {
    id: "rust",
    label: "Rust",
    file: "main.rs",
    lines: [
      ["cmt", "// cargo add vtracer"],
      ["", ""],
      ["", "use vtracer::{convert_image_to_svg, Config};"],
      ["", ""],
      ["", "let config = Config::default();"],
      ["", 'convert_image_to_svg("input.jpg".into(),'],
      ["", '                     "output.svg".into(),'],
      ["", "                     config)?;"],
    ],
  },
  {
    id: "python",
    label: "Python",
    file: "trace.py",
    lines: [
      ["cmt", "# pip install vtracer"],
      ["", ""],
      ["", "import vtracer"],
      ["", ""],
      ["", 'vtracer.convert_image_to_svg_py("input.jpg",'],
      ["", '                                "output.svg",'],
      ["", '                                colormode="color")'],
    ],
  },
  {
    id: "node",
    label: "Node",
    file: "trace.mjs",
    lines: [
      ["cmt", "// npm i @visioncortex/vtracer"],
      ["", ""],
      ["", 'import { convert } from "@visioncortex/vtracer";'],
      ["", ""],
      ["", 'const svg = await convert("input.jpg");'],
      ["", 'await writeFile("output.svg", svg);'],
    ],
  },
];
