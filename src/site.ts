export const REPO = "https://github.com/visioncortex/vtracer";
export const RELEASES = `${REPO}/releases`;
export const DOCS = "https://www.visioncortex.org/vtracer-docs";
export const ORG = "https://www.visioncortex.org";

export const FEATURES = [
  {
    title: "Native speed",
    body: "A linear tracing pipeline with no expensive optimal-polygon search. Large images convert in a fraction of the time.",
  },
  {
    title: "A/B comparator",
    body: "Wipe between the trace and the original at any zoom level, so you can see exactly what the engine kept and what it dropped.",
  },
  {
    title: "Curve inspector",
    body: "Open up the fitted curves and look at the control points. No more guessing why an edge landed where it did.",
  },
  {
    title: "Curve simplification",
    body: "Fewer nodes for the same silhouette — often cutting the resulting file size in half.",
  },
  {
    title: "Seam-free cutout",
    body: "Shapes share their boundaries instead of stacking, producing a gapless tessellation with no hairline seams.",
  },
  {
    title: "Watershed clustering",
    body: "Edge-aware region forming that holds detail together, giving noticeably sharper traces on photographic input.",
  },
  {
    title: "Adaptive thresholding",
    body: "Cleaner black-and-white output from uneven scans and photographs, without hand-tuning a global threshold.",
  },
  {
    title: "Fixed color palettes",
    body: "Snap the output to a palette you supply, so traced artwork lands on-brand the first time.",
  },
];

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
      ["", ""],
      ["cmt", "# edge-aware regions, cut to taste"],
      ["cmd", "vtracer photo.jpg out.svg --clustering watershed \\"],
      ["cmd", "        --watershed-detail 192"],
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

export const PLATFORMS = [
  { os: "macOS", meta: "Universal · Apple silicon & Intel" },
  { os: "Windows", meta: "x64 · Installer" },
  { os: "Linux", meta: "x64 · AppImage" },
];
