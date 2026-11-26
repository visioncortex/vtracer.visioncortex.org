/**
 * Every word the Graphic design use-case page shows, one object per language,
 * as site-copy.ts does for the landing page. The Chinese follows the same
 * glossary as the landing page and the fact sheet (描摹, 画风, 强度, 堆叠), and
 * the Japanese the app's ja terms (トレース, 画風, 強度, 線画, スタック), in
 * polite です/ます as the landing page is.
 * Their links go to the English knowledge base, and say so.
 *
 * A heading with an accented word is a [before, accent, after] triple, as on
 * the landing page.
 */
type Accented = [string, string, string];
type Text = { title: string; body: string };

export type UseCaseCopy = {
  /** This page's own address, for the language picker. */
  path: string;
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
  path: "/use-cases/graphic-design",
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

export const graphicDesignZh: UseCaseCopy = {
  path: "/zh/use-cases/graphic-design",
  eyebrow: "使用场景 · 平面设计",
  title: ["从创意到", "可编辑", "的矢量图"],
  subStrong: "画出来，或者说出来。",
  sub: "VTracer 把你的创意变成干净、分层的 SVG，画风由你选择，可以直接用于 Illustrator、Figma 或 Inkscape。生成和描摹都在你自己的设备上完成。",
  download: "下载应用",
  seeStyles: "查看画风",
  meta: "免费下载 · 在你的设备上运行",
  styles: {
    title: ["九种画风，", "一句", "提示词。"],
    note: "写下主体，选一种画风。VTracer 的结构化提示词专为发挥扩散模型的最佳表现而设计：一个主体、干净的边缘、平涂的色彩和纯色背景，因此每个结果都是可以直接使用的矢量素材。同一只狐狸，同一个随机种子，只有画风不同。",
    alt: "九只描摹好的红狐，标有编号和画风名称：无、墨线、扁平设计、剪贴画、卡通、镂版、低多边形、麻胶版画和线稿。",
    caption: "一只坐着的红狐，九种画风。每一只都是真实、可编辑的 SVG。",
    jobs: [
      {
        title: "标志和图标",
        body: "剪贴画和扁平设计。形状醒目，颜色少，路径寥寥：文件小巧，缩放到任何尺寸都清晰。",
      },
      {
        title: "贴纸和模切",
        body: "卡通和墨线。轮廓干净的可爱角色，它的剪影本身就是你的切割线。",
      },
      {
        title: "单色切割",
        body: "镂版。一个形状，一种颜色，直接交给刻字机、切割机或激光机。",
      },
      {
        title: "雕刻和印刷",
        body: "线稿和麻胶版画。均匀的线条和刻版般的形状，适合雕刻、丝网印刷和涂色画。",
      },
      {
        title: "插画",
        body: "“无”和卡通。你的主体以干净的扁平风格呈现，每个形状都可以随时改色。",
      },
      {
        title: "现代装饰",
        body: "低多边形。多面切割，几何感十足，一眼就看得出是矢量图。",
      },
    ],
  },
  sketch: {
    title: ["把你的草图", "画完", "。"],
    note: "给铅笔草图拍张照。VTracer 把你的线条从纸面上提取出来，去掉纸张、阴影和污渍，再以你的草图为基础生成，而不是另起炉灶。",
    points: [
      {
        title: "完整的彩色作品",
        body: "强度调高，VTracer 会替你把画画完：上色、明暗和干净的轮廓，同时保留你画的姿势和笑容。",
        src: "/kb/images/pencil-to-vector/steps.svg",
        alt: "手机拍下的一张铅笔草图，画的是一只坐着的狐狸；同一张草图被清理成清晰的黑色线条；以及上好颜色、描摹成 SVG 的完成版狐狸。",
      },
      {
        title: "干净的线稿",
        body: "强度调低，得到清晰、均匀的线条。每只猫都留在你画的位置，擦了一半的那只则留在了纸上。",
        src: "/kb/images/pencil-to-vector/cats.svg",
        alt: "一张照片，上面是用铅笔画的三只猫；同样的三只猫被清理成黑色墨线；以及描摹成 SVG 的干净线稿。",
      },
    ],
  },
  app: {
    title: ["为你的", "设计", "软件而生"],
    note: "每个结果都是标准 SVG，按设计师的方式构建。",
    points: [
      {
        title: "形状保持完整",
        body: "堆叠模式让形状层层叠放，而不是彼此切割。最底层就是剪影：只需一次偏移，就能做出贴纸白边。",
      },
      {
        title: "平滑依然平滑",
        body: "渐变以渐变输出，柔和的明暗以网格渐变输出，而不是上百条平涂色带。",
      },
      {
        title: "没有底板要删",
        body: "背景会自动去除。你的作品落在透明画布上，可以直接摆放。",
      },
      {
        title: "节点少，文件小",
        body: "曲线干净，节点刚好够描述形状。易于编辑，切割快，文件轻。",
      },
    ],
  },
  device: {
    title: ["你的创意，只属于", "你", ""],
    note: "图像模型在应用内、在你的设备上运行。你的提示词、草图和作品从不离开你的机器。",
    points: [
      {
        title: "选一个模型",
        body: "可以从 Z-Image、FLUX 和 Stable Diffusion 等开放模型中选择。下载一次，之后即可离线生成。",
      },
      {
        title: "用中文写提示词",
        body: "中文或日文提示词同样可用。模型需要英文时，应用会在你的机器上完成翻译。",
      },
      {
        title: "无需订阅，无需上传",
        body: "想生成多少次都行。除非你自己选择云端模型，否则不会发送任何内容。",
      },
    ],
  },
  cta: {
    title: ["开始", "设计", "吧。"],
    download: "下载 VTracer",
    guides: "阅读指南（英文）",
  },
  learn: "了解更多（英文）",
  links: [
    { href: "/kb/art-styles", label: "画风" },
    { href: "/kb/pencil-to-vector", label: "从铅笔草图到矢量图" },
    { href: "/kb/ai-models-for-vector-art", label: "选哪个 AI 模型？" },
  ],
};

export const graphicDesignJa: UseCaseCopy = {
  path: "/ja/use-cases/graphic-design",
  eyebrow: "活用例 · グラフィックデザイン",
  title: ["アイデアを", "編集できる", "ベクターに"],
  subStrong: "描いても、言葉にしても。",
  sub: "VTracer はアイデアを、選んだ画風のクリーンでレイヤー分けされた SVG に変えます。Illustrator、Figma、Inkscape でそのまま使えます。生成もトレースも、あなた自身のデバイス上で行われます。",
  download: "アプリをダウンロード",
  seeStyles: "画風を見る",
  meta: "無料ダウンロード · デバイス上で動作",
  styles: {
    title: ["9 つの画風、", "ひとつ", "のプロンプト。"],
    note: "主題を書いて、画風を選ぶだけ。VTracer の構造化プロンプトは、拡散モデルの力を最大限に引き出すように設計されています。主題はひとつ、エッジはクリーンに、色はフラットに、背景は無地に。だからどの結果も、すぐに使えるベクター素材になります。同じ狐、同じシード。変わるのは画風だけです。",
    alt: "番号と名前の付いた、トレース済みの 9 匹の赤い狐：なし、インク、フラットデザイン、クリップアート、カートゥーン、ステンシル、ローポリ、リノカット、線画。",
    caption: "座っている赤い狐を、9 つの画風すべてで。どれも本物の、編集できる SVG です。",
    jobs: [
      {
        title: "ロゴとアイコン",
        body: "クリップアートとフラットデザイン。大胆な形、少ない色、わずかなパス。どんなサイズにも拡大できる、小さなファイルです。",
      },
      {
        title: "ステッカーとダイカット",
        body: "カートゥーンとインク。輪郭のクリーンな親しみやすいキャラクター。シルエットがそのままカットラインになります。",
      },
      {
        title: "単色のカッティング",
        body: "ステンシル。ひとつの形、ひとつの色。カッティングシート、プロッター、レーザーにそのまま使えます。",
      },
      {
        title: "彫刻と印刷",
        body: "線画とリノカット。均一な線と彫ったような形で、彫刻、シルクスクリーン印刷、塗り絵に。",
      },
      {
        title: "イラスト",
        body: "「なし」とカートゥーン。主題をクリーンでフラットなスタイルで描き、どの形もすぐに色を変えられます。",
      },
      {
        title: "モダンな装飾",
        body: "ローポリ。多面的で幾何学的、ひと目でベクターと分かります。",
      },
    ],
  },
  sketch: {
    title: ["あなたのスケッチを、", "仕上げる", "。"],
    note: "鉛筆画を写真に撮るだけ。VTracer が紙面から線を拾い上げ、紙や影や汚れを置き去りにして、あなたの絵から生成します。あなたの絵の代わりに描くのではありません。",
    points: [
      {
        title: "仕上がったカラー作品",
        body: "強度を上げれば、VTracer が絵を仕上げてくれます。色、陰影、クリーンな輪郭。あなたが描いたポーズと笑顔はそのままに。",
        src: "/kb/images/pencil-to-vector/steps.svg",
        alt: "座っている狐を鉛筆で描いたスケッチを、スマートフォンで撮った写真。同じスケッチを、くっきりした黒い線にクリーンアップしたもの。そして色を付けて SVG にトレースした、完成した狐。",
      },
      {
        title: "クリーンな線画",
        body: "強度を抑えれば、くっきりと均一な線に。どの猫も描いた場所にそのまま。半分消した猫は、紙の上に残ります。",
        src: "/kb/images/pencil-to-vector/cats.svg",
        alt: "鉛筆で 3 匹の猫を描いたスケッチの写真、同じ猫を黒インクにクリーンアップしたもの、そして SVG にトレースしたクリーンな線画の猫。",
      },
    ],
  },
  app: {
    title: ["", "デザイン", "アプリのために"],
    note: "どの結果も標準の SVG。デザイナーが組み立てるのと同じやり方で作られています。",
    points: [
      {
        title: "形はひとつながりのまま",
        body: "スタックモードは形を互いに切り抜くのではなく、重ねて置きます。一番下のレイヤーがシルエットなので、ステッカーのフチはオフセットひとつで作れます。",
      },
      {
        title: "なめらかなものは、なめらかに",
        body: "グラデーションはグラデーションとして、やわらかな陰影はメッシュグラデーションとして出力されます。何百もの色の帯にはなりません。",
      },
      {
        title: "消すべき下地はなし",
        body: "背景は自動で除去されます。作品は透明なキャンバスの上に置かれ、すぐに配置できます。",
      },
      {
        title: "少ないノード、小さなファイル",
        body: "形に必要なだけのノードで描かれたクリーンな曲線。編集しやすく、カットは速く、ファイルは軽く。",
      },
    ],
  },
  device: {
    title: ["あなたのアイデアは、", "あなたのもの", ""],
    note: "画像モデルはアプリ内で、あなたのデバイス上で動きます。プロンプトもスケッチも作品も、あなたのマシンを離れることはありません。",
    points: [
      {
        title: "モデルを選ぶ",
        body: "Z-Image、FLUX、Stable Diffusion などのオープンモデルから選べます。一度ダウンロードすれば、あとはオフラインで生成できます。",
      },
      {
        title: "日本語で書ける",
        body: "日本語や中国語のプロンプトも使えます。英語が必要なモデルでは、アプリがあなたのマシン上で翻訳します。",
      },
      {
        title: "サブスクリプションもアップロードも不要",
        body: "好きなだけ生成できます。自分でクラウドモデルを選ばない限り、何も送信されません。",
      },
    ],
  },
  cta: {
    title: ["さあ、", "デザイン", "を始めましょう。"],
    download: "VTracer をダウンロード",
    guides: "ガイドを読む（英語）",
  },
  learn: "詳しく見る（英語）",
  links: [
    { href: "/kb/art-styles", label: "画風" },
    { href: "/kb/pencil-to-vector", label: "鉛筆スケッチからベクターへ" },
    { href: "/kb/ai-models-for-vector-art", label: "どの AI モデルを選ぶ？" },
  ],
};

/** The copy for the page being served; each language has its own HTML shell. */
export function useCaseCopyFor(lang: string): UseCaseCopy {
  if (lang.startsWith("zh")) return graphicDesignZh;
  if (lang.startsWith("ja")) return graphicDesignJa;
  return graphicDesign;
}
