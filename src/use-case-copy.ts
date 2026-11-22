/**
 * Every word the Graphic design use-case page shows. English only for now;
 * a translation would be a second object of the same type, as site-copy.ts
 * does for the landing page.
 *
 * A heading with an accented word is a [before, accent, after] triple, as on
 * the landing page.
 */
type Accented = [string, string, string];
type Text = { title: string; body: string };

export type UseCaseCopy = {
  eyebrow: string;
  title: Accented;
  subStrong: string;
  sub: string;
  download: string;
  seeStyles: string;
  meta: string;
  styles: { title: Accented; note: string; alt: string; caption: string; jobs: Text[] };
  sketch: {
    title: Accented;
    note: string;
    /** One full-width card each: a figure, then its title and text. */
    points: (Text & { src: string; alt: string })[];
  };
  app: { title: Accented; note: string; points: Text[] };
  device: { title: Accented; note: string; points: Text[] };
  cta: { title: Accented; download: string; guides: string };
  learn: string;
  links: { href: string; label: string }[];
};

export const graphicDesign: UseCaseCopy = {
  eyebrow: "Use case · Graphic design",
  title: ["From idea to ", "editable", " vector"],
  subStrong: "Sketch it, or say it.",
  sub: "VTracer turns an idea into clean, layered SVG in the look you choose, ready for Illustrator, Figma or Inkscape. Generated and traced on your own device.",
  download: "Download the app",
  seeStyles: "See the art styles",
  meta: "Free to download · Runs on your device",
  styles: {
    title: ["Nine looks. ", "One", " prompt."],
    note: "Name the subject, pick a style. VTracer’s structured prompt is designed to get the most out of diffusion models: one subject, clean edges, flat color and a plain background, so every result is a vector asset ready to use. Same fox, same seed. Only the style changes.",
    alt: "Nine traced red foxes, numbered and named: None, Inked, Flat design, Clip art, Cartoon, Stencil, Low poly, Linocut and Line art.",
    caption: "A red fox sitting, in all nine art styles. Every one is a real, editable SVG.",
    jobs: [
      {
        title: "Logos and icons",
        body: "Clip art and Flat design. Bold shapes, few colors, a handful of paths: small files that scale to anything.",
      },
      {
        title: "Stickers and die cuts",
        body: "Cartoon and Inked. Friendly characters with clean outlines, and a silhouette that is already your cut line.",
      },
      {
        title: "Single-color cutting",
        body: "Stencil. One shape, one color, straight to vinyl, plotter or laser.",
      },
      {
        title: "Engraving and print",
        body: "Line art and Linocut. Even strokes and carved shapes for engraving, screen printing and coloring pages.",
      },
      {
        title: "Illustration",
        body: "None and Cartoon. Your subject in a clean, flat style, with every shape ready to recolor.",
      },
      {
        title: "Modern decoration",
        body: "Low poly. Faceted, geometric, and unmistakably vector.",
      },
    ],
  },
  sketch: {
    title: ["Your sketch, ", "finished", "."],
    note: "Snap a photo of a pencil drawing. VTracer lifts your lines off the page, leaving paper, shadows and smudges behind, then generates from your drawing, not instead of it.",
    points: [
      {
        title: "Finished color artwork",
        body: "Push it further and VTracer finishes the drawing for you: color, shading and clean outlines, with your pose and your smile kept.",
        src: "/kb/images/pencil-to-vector/steps.svg",
        alt: "A phone photo of a pencil sketch of a sitting fox; the same sketch cleaned into crisp black lines on white; and the finished fox in color, traced to SVG.",
      },
      {
        title: "Clean line art",
        body: "Keep it close and get crisp, even lines. Every cat stays where you drew it; the half-erased one stays on the page.",
        src: "/kb/images/pencil-to-vector/cats.svg",
        alt: "A photo of three cats sketched in pencil, the same cats cleaned into black ink, and the cats as clean line art traced to SVG.",
      },
    ],
  },
  app: {
    title: ["Made for your ", "design", " app"],
    note: "Every result is standard SVG, built the way a designer would build it.",
    points: [
      {
        title: "Shapes stay whole",
        body: "Stacked mode layers shapes instead of cutting them apart. The bottom layer is the silhouette: a sticker border is one offset away.",
      },
      {
        title: "Smooth stays smooth",
        body: "Gradients come out as gradients, and soft shading as mesh gradients, not a hundred bands of flat color.",
      },
      {
        title: "No box to delete",
        body: "The background is removed for you. Your artwork lands on a transparent canvas, ready to place.",
      },
      {
        title: "Few nodes, small files",
        body: "Clean curves with as few nodes as the shape needs. Easy to edit, quick to cut, light to ship.",
      },
    ],
  },
  device: {
    title: ["Your ideas stay ", "yours", ""],
    note: "The image models run inside the app, on your device. Your prompts, sketches and artwork never leave your machine.",
    points: [
      {
        title: "Pick a model",
        body: "Choose from open models such as Z-Image, FLUX and Stable Diffusion. Download once, then generate offline.",
      },
      {
        title: "Write in your language",
        body: "Prompts in Chinese or Japanese work too. Where a model needs English, the app translates on your machine.",
      },
      {
        title: "No subscription, no upload",
        body: "Generate as often as you like. Nothing is sent anywhere unless you choose a cloud model yourself.",
      },
    ],
  },
  cta: {
    title: ["Start ", "designing", "."],
    download: "Download VTracer",
    guides: "Read the guides",
  },
  learn: "Learn more",
  links: [
    { href: "/kb/art-styles", label: "Art styles" },
    { href: "/kb/pencil-to-vector", label: "Pencil to vector" },
    { href: "/kb/ai-models-for-vector-art", label: "Which AI model?" },
  ],
};
