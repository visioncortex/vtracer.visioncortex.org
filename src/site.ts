export const REPO = "https://github.com/visioncortex/vtracer";
export const DOCS = "https://www.visioncortex.org/vtracer-docs";
export const ORG = "https://www.visioncortex.org";

/** Fallback when the manifest cannot be reached, or the platform is unknown. */
export const DOWNLOAD_URL = `${REPO}/releases/latest`;

/** Tauri update manifest, which carries the current per-platform artifacts. */
export const MANIFEST_URL =
  "https://raw.githubusercontent.com/visioncortex/vtracer/desktop-updates/latest.json";

/**
 * The trace we benchmark against. Canva merged Designer, Photo and Publisher
 * into one app, so "Affinity Designer" is a retired product name — the build
 * below is the unified app.
 */
export const RIVAL_NAME = "Affinity";

/**
 * Stated on the page so the comparison is reproducible. Settings were tuned
 * per image rather than left at defaults, which is the first thing anyone
 * doubting a competitor comparison will ask about.
 */
export const RIVAL_VERSION = "mid-June '26 (build 4557)";

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
    rival: {
      src: "/compare/indian-girl_affinity.svg",
      paths: 2361,
      kb: 764,
      settings: "Edge Threshold 0%, Curve Fitting Tolerance 50%",
    },
  },
  {
    id: "graphic",
    label: "Graphic",
    aspect: 1,
    focus: { x: 0.51, y: 0.5, zoom: 1 },
    original: { src: "/compare/tiger-woman.webp", note: "512 × 512 WebP" },
    vtracer: { src: "/compare/tiger-woman_vtracer.svg", paths: 161, kb: 43 },
    rival: {
      src: "/compare/tiger-woman_affinity.svg",
      paths: 112,
      kb: 45,
      settings: "Edge Threshold 25%, Curve Fitting Tolerance 25%",
    },
  },
];

/** The three capabilities that are new in 2, one column each. */
export const SHOWCASE = [
  {
    id: "gradients",
    title: "Gradients, not bands",
    blurb:
      "A sky that fades stays smooth — emitted as a gradient rather than sliced into a hundred pieces.",
    aspect: 1400 / 976,
    // Landscape art in a 4:3 stage barely covers it; the extra zoom gives the
    // vertical crop something to work with.
    focus: { x: 0.5, y: 0.48, zoom: 1.2 },
    // Re-encoded from the 1400x976 source VTracer actually traced, at 4:4:4 so
    // JPEG banding does not spoil the very gradient this sample is showing.
    original: "/compare/cityscape-sunset.jpg",
    vtracer: "/compare/cityscape-sunset.svg",
  },
  {
    id: "denoise",
    title: "JPEG compression? No problem",
    blurb:
      "Got only heavily degraded JPEG? VTracer 2 removes noises and recovers detail, leaving artifacts behind.",
    aspect: 496 / 512,
    focus: { x: 0.465, y: 0.19, zoom: 1.9 },
    original: "/compare/corgi-noise.webp",
    vtracer: "/compare/corgi-noise_vtracer.svg",
  },
  {
    id: "background",
    title: "Backgrounds, gone",
    blurb:
      "Clip art arrives on a solid plate. One checkbox and the trace lands on transparency instead.",
    aspect: 1,
    focus: { x: 0.5, y: 0.5, zoom: 1 },
    original: "/compare/ginger-cat.jpg",
    vtracer: "/compare/ginger-cat_vtracer.svg",
    /** Right of the divider is genuinely transparent, so show the checker. */
    transparent: true,
  },
];

/** Showcase stages are 4:3; the hero comparator is 16:9. */
export const SHOWCASE_ASPECT = 4 / 3;

/** Every stage is framed 16:9, whatever shape the source art is. */
export const STAGE_ASPECT = 16 / 9;

export const FEATURES = [
  {
    title: "Upscale, then trace",
    body: "The engine reconstructs your image at up to 8× before it fits a single curve. Detail that a conventional tracer would flatten into a jagged step comes through as clean geometry.",
  },
  {
    title: "No hallucination",
    body: "Upscaling models love to invent. Ours does not imagine objects, textures or detail into your artwork — it recovers what is there. That constraint is part of the engine's design.",
  },
  {
    title: "Runs on your device",
    body: "A 4.5M-parameter model: small enough to be quick and entirely local, Metal-accelerated on macOS. Your artwork never leaves the machine — there is no server in the tracing loop.",
  },
  {
    title: "Survives real JPEGs",
    body: "Ringing, banding, blocking, a file that has been re-saved a dozen times. The engine is built to trace through compression damage rather than faithfully tracing the damage itself.",
  },
  {
    title: "Gradients, natively",
    body: "Smooth gradients come out as gradients — not as a hundred segmented pieces doing an impression of one.",
  },
  {
    title: "Stacked mode",
    body: "VTracer's unique feature: shapes layered rather than cut against one another. Fewer nodes, smaller files, and a document that is actually pleasant to open and edit.",
  },
];

export const GENAI = {
  /** The first model on the menu; the copy names it as the first, not the one. */
  first: "SD-Turbo",
  shot: {
    light: "/gen-ai/sd-corgi-light.png",
    dark: "/gen-ai/sd-corgi-dark.png",
    width: 1552,
    height: 922,
    alt: "The Gen AI lab of the VTracer app. A prompt panel on the right reads corgi, sitting, smiling; a traced cartoon corgi sits on a transparent canvas in the middle; a column of earlier rounds with their seeds runs down the left.",
  },
  points: [
    {
      title: "Prompt to vector",
      body: "Type a prompt, get an SVG. The app generates the image on your device and traces it in the same pipeline, so what you get is clean geometry on a transparent background, ready to drop into your design work.",
    },
    {
      title: "Your model, your machine",
      body: "Pick a model, download it from inside the app, and it lives on your disk. Supports a range of diffusion models, with more to follow. The prompt never leaves the machine. No subscription, no upload.",
    },
  ],
};

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

/**
 * The facts in the legal documents that are about the company rather than
 * about the product, kept here so they are corrected in one place.
 *
 * `address` is still blank: a company registered in England has to show its
 * registered office alongside its number, and the contact block prints it as
 * soon as it is filled in.
 */
export const LEGAL: {
  entity: string;
  registeredIn: string;
  companyNumber: string;
  address: string;
  contact: string;
  law: string;
  courts: string;
  updated: string;
} = {
  entity: "Seafire Software Limited",
  registeredIn: "England and Wales",
  companyNumber: "15102818",
  address: "",
  contact: "support@visioncortex.org",
  law: "England and Wales",
  courts: "the courts of England and Wales",
  updated: "27 August 2026",
};

/**
 * The free trial's two limits, whichever is reached first. Stated in the Terms
 * and in the Privacy Policy's explanation of why the app counts traces at all.
 */
export const TRIAL = { traces: 1000, days: 30 } as const;
