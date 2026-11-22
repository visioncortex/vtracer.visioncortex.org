"""Draws the knowledge base's diagrams into public/kb/images/<slug>/.

    python3 scripts/kb-diagrams.py

The diagrams carry no words, only numbers, file types and SVG code, so they
serve every language as they are; the captions in the Markdown explain them.
Colors are the site's dark theme. Most share one sample shape, the drop.

Only the figures go to public/kb/images/ and are served. What they are drawn
from (traces, photos, sketches, app samples) lives in scripts/kb-sources/,
outside the build.
"""
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public/kb/images")
# What the figures are drawn from: traces, photos and samples. Not served.
SRC = os.path.join(ROOT, "scripts/kb-sources/images")

BG = "#0a0a0a"
GRID = "#1f1f1f"
FG = "#f2f2ef"
MUTED = "#8b8b85"
DIM = "#5c5c58"
BRAND = "#0088f7"
BRAND_DARK = "#00508f"
GOLD = "#e0a63c"
MONO = "JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace"


def f(x):
    return f"{x:.2f}".rstrip("0").rstrip(".")


def svg(w, h, body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">\n'
        f'<rect width="{w}" height="{h}" fill="{BG}"/>\n{body}\n</svg>\n'
    )


def write(slug, name, content):
    d = os.path.join(OUT, slug)
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, name), "w") as fh:
        fh.write(content)
    print("wrote", os.path.join(d, name))


def text(x, y, s, size=18, fill=MUTED, anchor="middle", weight=500):
    return (
        f'<text x="{f(x)}" y="{f(y)}" font-family="{MONO}" font-size="{size}" '
        f'font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{s}</text>'
    )


def badge(x, y, n):
    return (
        f'<circle cx="{f(x)}" cy="{f(y)}" r="15" fill="none" stroke="{FG}" stroke-width="1.5"/>'
        + text(x, y + 6, str(n), 16, FG)
    )


def arrow(x1, y, x2, color=DIM):
    return (
        f'<path d="M{f(x1)} {f(y)} H{f(x2)}" stroke="{color}" stroke-width="2" fill="none"/>'
        f'<path d="M{f(x2 - 9)} {f(y - 7)} L{f(x2)} {f(y)} L{f(x2 - 9)} {f(y + 7)}" '
        f'stroke="{color}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    )


# ----------------------------------------------------------------- the drop
# A teardrop: a circle of radius r with a point d above its centre, joined by
# the two tangent lines. Used as the sample shape throughout.


class Drop:
    def __init__(self, cx, cy, r, d):
        self.cx, self.cy, self.r, self.d = cx, cy, r, d
        self.th = math.acos(r / d)
        s, c = math.sin(self.th), math.cos(self.th)
        self.tip = (cx, cy - d)
        self.tr = (cx + r * s, cy - r * c)
        self.tl = (cx - r * s, cy - r * c)

    def inside(self, x, y):
        if (x - self.cx) ** 2 + (y - self.cy) ** 2 <= self.r**2:
            return True
        # Triangle tip, tr, tl.
        (x1, y1), (x2, y2), (x3, y3) = self.tip, self.tr, self.tl

        def side(ax, ay, bx, by):
            return (bx - ax) * (y - ay) - (by - ay) * (x - ax)

        a, b, c = side(x1, y1, x2, y2), side(x2, y2, x3, y3), side(x3, y3, x1, y1)
        return (a >= 0 and b >= 0 and c >= 0) or (a <= 0 and b <= 0 and c <= 0)

    def beziers(self, n=3):
        """Anchors and cubic segments approximating the round part."""
        a0 = math.atan2(self.tr[1] - self.cy, self.tr[0] - self.cx)
        sweep = 2 * math.pi - 2 * self.th
        step = sweep / n
        k = 4 / 3 * math.tan(step / 4) * self.r
        segs = []
        for i in range(n):
            a, b = a0 + i * step, a0 + (i + 1) * step
            p0 = (self.cx + self.r * math.cos(a), self.cy + self.r * math.sin(a))
            p3 = (self.cx + self.r * math.cos(b), self.cy + self.r * math.sin(b))
            p1 = (p0[0] - k * math.sin(a), p0[1] + k * math.cos(a))
            p2 = (p3[0] + k * math.sin(b), p3[1] - k * math.cos(b))
            segs.append((p0, p1, p2, p3))
        return segs

    def path(self):
        d = f"M{f(self.tip[0])} {f(self.tip[1])} L{f(self.tr[0])} {f(self.tr[1])}"
        for _, p1, p2, p3 in self.beziers():
            d += f" C{f(p1[0])} {f(p1[1])} {f(p2[0])} {f(p2[1])} {f(p3[0])} {f(p3[1])}"
        return d + " Z"

    def offset_path(self, delta):
        """The outline pushed out by delta, with a rounded tip: a cut line."""
        s, c = math.sin(self.th), math.cos(self.th)
        R = self.r + delta
        tip_r = (self.tip[0] + delta * s, self.tip[1] - delta * c)
        tip_l = (self.tip[0] - delta * s, self.tip[1] - delta * c)
        tr = (self.cx + R * s, self.cy - R * c)
        tl = (self.cx - R * s, self.cy - R * c)
        return (
            f"M{f(tip_l[0])} {f(tip_l[1])} A{f(delta)} {f(delta)} 0 0 1 {f(tip_r[0])} {f(tip_r[1])} "
            f"L{f(tr[0])} {f(tr[1])} A{f(R)} {f(R)} 0 1 1 {f(tl[0])} {f(tl[1])} Z"
        )

    def highlight(self):
        r = self.r
        return (
            f'<ellipse cx="{f(self.cx - r * 0.38)}" cy="{f(self.cy - r * 0.2)}" rx="{f(r * 0.16)}" '
            f'ry="{f(r * 0.3)}" fill="{FG}" fill-opacity="0.85" transform="rotate(20 {f(self.cx - r * 0.38)} {f(self.cy - r * 0.2)})"/>'
        )


def pixels(drop, x0, y0, n, cell, color=BRAND, grid=True, ss=4):
    """The drop rasterised into an n×n grid, with anti-aliased coverage."""
    out = []
    for j in range(n):
        for i in range(n):
            hits = 0
            for sj in range(ss):
                for si in range(ss):
                    if drop.inside(i + (si + 0.5) / ss, j + (sj + 0.5) / ss):
                        hits += 1
            cov = hits / ss**2
            x, y = x0 + i * cell, y0 + j * cell
            if cov > 0:
                out.append(
                    f'<rect x="{f(x)}" y="{f(y)}" width="{f(cell)}" height="{f(cell)}" '
                    f'fill="{color}" fill-opacity="{f(cov)}"/>'
                )
            if grid:
                out.append(
                    f'<rect x="{f(x)}" y="{f(y)}" width="{f(cell)}" height="{f(cell)}" '
                    f'fill="none" stroke="{GRID}" stroke-width="1"/>'
                )
    return "\n".join(out)


def nodes(drop, handles=True):
    out = []
    segs = drop.beziers()
    if handles:
        for p0, p1, p2, p3 in segs:
            for a, b in ((p0, p1), (p3, p2)):
                out.append(
                    f'<line x1="{f(a[0])}" y1="{f(a[1])}" x2="{f(b[0])}" y2="{f(b[1])}" stroke="{MUTED}" stroke-width="1.5"/>'
                )
                out.append(f'<circle cx="{f(b[0])}" cy="{f(b[1])}" r="5" fill="{BG}" stroke="{MUTED}" stroke-width="1.5"/>')
    anchors = [drop.tip] + [s[0] for s in segs] + [segs[-1][3]]
    for x, y in anchors:
        out.append(f'<rect x="{f(x - 6)}" y="{f(y - 6)}" width="12" height="12" fill="{FG}"/>')
    return "\n".join(out)


# ------------------------------------------------- what-are-vector-graphics


def raster_vs_vector():
    n, cell = 16, 22
    size = n * cell
    lx, rx, y0 = 72, 536, 80
    unit = Drop(8, 9.6, 5, 8)
    vec = Drop(rx + 8 * cell, y0 + 9.6 * cell, 5 * cell, 8 * cell)
    body = [
        text(lx + size / 2, 52, "PNG", 20, MUTED),
        text(rx + size / 2, 52, "SVG", 20, MUTED),
        pixels(unit, lx, y0, n, cell),
        f'<rect x="{rx}" y="{y0}" width="{size}" height="{size}" fill="none" stroke="{GRID}"/>',
        f'<path d="{vec.path()}" fill="{BRAND}" fill-opacity="0.9" stroke="{FG}" stroke-width="2"/>',
        nodes(vec),
    ]
    write("what-are-vector-graphics", "raster-vs-vector.svg", svg(960, 480, "\n".join(body)))


# ------------------------------------------------ why-convert-images-to-vector


def sticker():
    art = Drop(250, 255, 92, 150)
    stk = Drop(710, 255, 92, 150)
    body = [
        # Left: the artwork alone.
        f'<path d="{art.path()}" fill="{BRAND}"/>',
        art.highlight(),
        arrow(410, 230, 520),
        # Right: on a sticker sheet, white border, cut line on its edge.
        f'<rect x="560" y="40" width="300" height="360" rx="14" fill="#1a1a1a"/>',
        f'<path d="{stk.offset_path(24)}" fill="{FG}"/>',
        f'<path d="{stk.path()}" fill="{BRAND}"/>',
        stk.highlight(),
        f'<path d="{stk.offset_path(24)}" fill="none" stroke="{GOLD}" stroke-width="3" stroke-dasharray="10 7"/>',
    ]
    write("why-convert-images-to-vector", "sticker-cut-line.svg", svg(960, 440, "\n".join(body)))


def file_size(path):
    n = os.path.getsize(path)
    return f"{n / 1e6:.1f} MB" if n >= 1e6 else f"{round(n / 1e3)} KB"


def webp_data(im, quality=82):
    import base64
    import io

    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=quality, method=6)
    return base64.b64encode(buf.getvalue()).decode()


def photo_vs_trace():
    """A photo beside its high-detail trace, each labelled with its file size.

    Reads the JPEG and its SVG trace from the article's image folder and
    renders the trace with resvg (cargo install resvg).
    """
    import subprocess
    import tempfile

    from PIL import Image

    name = "friendly-cat-and-dog-sitting-together-isolated-on-white-background-photo"
    d = os.path.join(SRC, "what-are-vector-graphics")
    jpg = os.path.join(d, name + ".jpg")
    trace = os.path.join(d, name + ".svg")
    m, gap, top, rw = 56, 64, 56, 800  # rw: raster width of each panel
    photo = Image.open(jpg).convert("RGB")
    pw = 640
    ph = round(pw * photo.height / photo.width)
    rh = round(rw * photo.height / photo.width)
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, "trace.png")
        subprocess.run(["resvg", "-w", str(rw), "--background", "white", trace, out], check=True)
        traced = Image.open(out).convert("RGB").resize((rw, rh), Image.LANCZOS)
    photo = photo.resize((rw, rh), Image.LANCZOS)

    left, right = m, m + pw + gap
    body = []
    for x, im, label in ((left, photo, f"JPEG · {file_size(jpg)}"), (right, traced, f"SVG · {file_size(trace)}")):
        body.append(f'<image x="{x}" y="{top}" width="{pw}" height="{ph}" href="data:image/webp;base64,{webp_data(im)}"/>')
        body.append(f'<rect x="{x}" y="{top}" width="{pw}" height="{ph}" fill="none" stroke="{GRID}" stroke-width="2"/>')
        body.append(text(x + pw / 2, top + ph + 62, label, 28, FG))
    w = right + pw + m
    write("what-are-vector-graphics", "photo-vs-trace.svg", svg(w, top + ph + 100, "\n".join(body)))


def zoom_800():
    """The lion badge's face at 800%: the PNG's pixels beside the traced SVG.

    Reads lion-badge.png and lion-badge.svg from the article's image folder;
    the two are aligned pixel for pixel (the SVG's units are the PNG's pixels).
    """
    import base64
    import io
    import re

    from PIL import Image

    slug = "why-convert-images-to-vector"
    d = os.path.join(SRC, slug)
    # The crop, in source pixels: the face and the mane around it.
    x0, y0, cw, ch, k = 32, 40, 80, 64, 8
    pw, ph = cw * k, ch * k
    png = Image.open(os.path.join(d, "lion-badge.png")).convert("RGB")
    crop = png.crop((x0, y0, x0 + cw, y0 + ch)).resize((pw, ph), Image.NEAREST)
    buf = io.BytesIO()
    crop.save(buf, "PNG", optimize=True)
    data = base64.b64encode(buf.getvalue()).decode()
    src = open(os.path.join(d, "lion-badge.svg")).read()
    paths = "\n".join(re.findall(r"<path [^>]*/>", src))

    m, gap, top = 56, 64, 56
    left, right = m, m + pw + gap
    body = [
        f'<image x="{left}" y="{top}" width="{pw}" height="{ph}" style="image-rendering:pixelated" '
        f'href="data:image/png;base64,{data}"/>',
        f'<svg x="{right}" y="{top}" width="{pw}" height="{ph}" viewBox="{x0} {y0} {cw} {ch}">\n{paths}\n</svg>',
    ]
    for x in (left, right):
        body.append(f'<rect x="{x}" y="{top}" width="{pw}" height="{ph}" fill="none" stroke="{GRID}" stroke-width="2"/>')
    body.append(text(left + pw / 2, top + ph + 62, "PNG · 800%", 28, FG))
    body.append(text(right + pw / 2, top + ph + 62, "SVG · 800%", 28, FG))
    w = right + pw + m
    write(slug, "logo-png-vs-svg-800.svg", svg(w, top + ph + 100, "\n".join(body)))


SUN = '<circle cx="140" cy="84" r="34" fill="{c}"/>'
BACK_HILL = '<path d="M0 150 C50 100 100 100 140 130 C170 150 190 140 200 128 L200 200 L0 200 Z" fill="{c}"/>'
FRONT_HILL = '<path d="M0 178 C60 140 120 160 200 186 L200 200 L0 200 Z" fill="{c}"/>'


def separations():
    shirt = "#16181d"
    panel = 180
    s = panel / 200

    def frame(x, y, inner, dashed=False):
        dash = ' stroke-dasharray="6 6"' if dashed else ""
        return (
            f'<g transform="translate({f(x)} {f(y)})"><rect width="{panel}" height="{panel}" rx="8" fill="{shirt}"/>'
            f'<g transform="scale({f(s)})">{inner}</g>'
            f'<rect width="{panel}" height="{panel}" rx="8" fill="none" stroke="{DIM}"{dash}/></g>'
        )

    full = SUN.format(c=GOLD) + BACK_HILL.format(c=BRAND) + FRONT_HILL.format(c=FG)
    y = 60
    body = [
        frame(40, y, full),
        text(262, y + panel / 2 + 10, "=", 30, MUTED),
        frame(300, y, SUN.format(c=GOLD), True),
        text(518, y + panel / 2 + 10, "+", 30, MUTED),
        frame(556, y, BACK_HILL.format(c=BRAND), True),
        text(774, y + panel / 2 + 10, "+", 30, MUTED),
        frame(812, y, FRONT_HILL.format(c=FG), True),
    ]
    for i, x in enumerate((300, 556, 812)):
        body.append(badge(x + panel / 2, y + panel + 36, i + 1))
    write("why-convert-images-to-vector", "color-separations.svg", svg(1032, 320, "\n".join(body)))


def laser():
    left = Drop(250, 250, 100, 160)
    right = Drop(710, 250, 100, 160)
    body = []
    # Left: the laser follows the outline once.
    body.append(f'<path d="{left.path()}" fill="#141414"/>')
    body.append(
        f'<path d="{left.path()}" fill="none" stroke="{GOLD}" stroke-width="3" stroke-dasharray="14 8"/>'
    )
    bx, by = left.beziers()[1][0]
    body.append(f'<circle cx="{f(bx)}" cy="{f(by)}" r="16" fill="{GOLD}" fill-opacity="0.25"/>')
    body.append(f'<circle cx="{f(bx)}" cy="{f(by)}" r="6" fill="{FG}"/>')
    # Right: raster engraving scans line by line across the whole shape.
    body.append(f'<clipPath id="shape"><path d="{right.path()}"/></clipPath>')
    body.append(f'<path d="{right.path()}" fill="#141414"/>')
    lines = []
    top, bottom = right.tip[1], right.cy + right.r
    yy = top + 4
    while yy < bottom:
        lines.append(f'<line x1="560" y1="{f(yy)}" x2="860" y2="{f(yy)}" stroke="{GOLD}" stroke-width="3"/>')
        yy += 9
    body.append(f'<g clip-path="url(#shape)">{"".join(lines)}</g>')
    # The head, partway along a line.
    body.append(f'<circle cx="760" cy="{f(top + 4 + 9 * 20)}" r="16" fill="{GOLD}" fill-opacity="0.25"/>')
    body.append(f'<circle cx="760" cy="{f(top + 4 + 9 * 20)}" r="6" fill="{FG}"/>')
    body.append(badge(250, 420, 1))
    body.append(badge(710, 420, 2))
    write("why-convert-images-to-vector", "laser-cut-vs-engrave.svg", svg(960, 460, "\n".join(body)))


def extrude():
    flat = Drop(220, 250, 85, 136)
    body = [f'<path d="{flat.path()}" fill="{BRAND}"/>', arrow(360, 240, 470)]
    # Laid flat and seen from above at an angle, with thickness: a printed
    # part on the bed. Squashing vertically keeps the tip pointing back.
    solid = Drop(0, 0, 85, 136)
    flatten = "scale(1 0.55)"
    thickness = 44
    for i in range(thickness, 0, -1):
        body.append(
            f'<g transform="translate(700 {f(268 + i)}) {flatten}"><path d="{solid.path()}" fill="{BRAND_DARK}"/></g>'
        )
    body.append(
        f'<g transform="translate(700 268) {flatten}"><path d="{solid.path()}" fill="{BRAND}" stroke="#7cc4ff" stroke-width="2"/></g>'
    )
    write("why-convert-images-to-vector", "extrude-3d.svg", svg(960, 440, "\n".join(body)))


# ------------------------------------------------------------- what-is-svg

# The example file, verbatim: the article shows this code and this picture.
EXAMPLE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160">
  <rect width="240" height="160" fill="#1b2a3a"/>
  <circle cx="160" cy="84" r="36" fill="#e0a63c"/>
  <path d="M0 120 C60 80 120 90 160 110 C190 125 215 120 240 105 L240 160 L0 160 Z" fill="#0088f7"/>
</svg>
"""
SKY = '<rect width="240" height="160" fill="#1b2a3a"/>'
EX_SUN = '<circle cx="160" cy="84" r="36" fill="#e0a63c"/>'
HILL_D = "M0 120 C60 80 120 90 160 110 C190 125 215 120 240 105 L240 160 L0 160 Z"
EX_HILL = f'<path d="{HILL_D}" fill="#0088f7"/>'


def example():
    with open(os.path.join(SRC, "what-is-svg", "example.svg"), "w") as fh:  # shown inline, not served
        fh.write(EXAMPLE)
    inner = SKY + EX_SUN + EX_HILL
    body = f'<g transform="translate(240 30) scale(2)">{inner}</g>'
    write("what-is-svg", "example-rendered.svg", svg(960, 380, body))


def path_anatomy():
    # The canvas above y 60 is empty sky; start the view there.
    s, ox, oy = 3, 80, -150
    P = lambda x, y: (ox + x * s, oy + y * s)
    body = [
        f'<rect x="{ox}" y="{oy}" width="{240 * s}" height="{160 * s}" fill="none" stroke="{GRID}"/>',
        f'<g transform="translate({ox} {oy}) scale({s})"><path d="{HILL_D}" fill="{BRAND}" fill-opacity="0.22" '
        f'stroke="{BRAND}" stroke-width="{f(2.5 / s)}"/></g>',
    ]
    handles = [((0, 120), (60, 80)), ((160, 110), (120, 90)), ((160, 110), (190, 125)), ((240, 105), (215, 120))]
    below = {(190, 125), (215, 120)}
    for a, b in handles:
        (x1, y1), (x2, y2) = P(*a), P(*b)
        body.append(f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}" stroke="{MUTED}" stroke-width="1.5" stroke-dasharray="5 4"/>')
        body.append(f'<circle cx="{f(x2)}" cy="{f(y2)}" r="6" fill="{BG}" stroke="{MUTED}" stroke-width="1.5"/>')
        body.append(text(x2, y2 + (26 if b in below else -14), f"{b[0]} {b[1]}", 15, MUTED))
    anchors = [
        ((0, 120), "M 0 120", "start", 14, -16),
        ((160, 110), "160 110", "middle", 0, 34),
        ((240, 105), "240 105", "end", -14, -16),
        ((240, 160), "L 240 160", "end", -14, -14),
        ((0, 160), "L 0 160", "start", 14, -14),
    ]
    for (x, y), label, anchor, dx, dy in anchors:
        px, py = P(x, y)
        body.append(f'<rect x="{f(px - 7)}" y="{f(py - 7)}" width="14" height="14" fill="{FG}"/>')
        body.append(text(px + dx, py + dy, label, 16, FG, anchor))
    # The two C commands, named beside the segments they draw.
    body.append(text(*P(84, 76), "C", 20, GOLD))
    body.append(text(*P(204, 140), "C", 20, GOLD))
    body.append(text(*P(120, 152), "Z", 20, GOLD))
    write("what-is-svg", "path-anatomy.svg", svg(880, 380, "\n".join(body)))


def painting_order():
    iso = "matrix(0.866 0.5 -0.866 0.5 0 0)"
    layers = [SKY, EX_SUN, EX_HILL]
    body = []
    base_x, base_y, gap = 250, 400, 130
    for i, layer in enumerate(layers):
        y = base_y - i * gap
        frame = f'<rect width="240" height="160" fill="none" stroke="{DIM}" stroke-width="1.5" stroke-dasharray="6 5"/>'
        body.append(
            f'<g transform="translate({base_x} {y}) {iso} translate(-120 -80)">'
            f'<g opacity="{1 if i == 0 else 0.95}">{layer}</g>{frame}</g>'
        )
        body.append(badge(base_x - 200, y + 6, i + 1))
    body.append(arrow(500, 270, 600))
    body.append(f'<g transform="translate(640 190)">{SKY}{EX_SUN}{EX_HILL}</g>')
    write("what-is-svg", "painting-order.svg", svg(960, 530, "\n".join(body)))


# ---------------------------------------------------------- what-is-vtracer


def pencil_to_vector():
    """A photographed pencil sketch and the vector the app made from it.

    fox-sketch.webp is the photo (downscaled from the app's pencil input);
    fox.svg is the Gen AI lab's traced output for that sketch.
    """
    import re

    from PIL import Image

    slug = "what-is-vtracer"
    d = os.path.join(SRC, slug)
    h, top = 520, 40
    ah = h - 2 * top
    # The sketch, cropped to the drawing.
    sx, sy, sw, sh = 220, 370, 830, 1050
    photo = Image.open(os.path.join(d, "fox-sketch.webp")).convert("RGB").crop((sx, sy, sx + sw, sy + sh))
    pw = ah * sw / sh
    photo = photo.resize((round(pw * 2), ah * 2), Image.LANCZOS)
    left = 60
    body = [
        f'<image x="{left}" y="{top}" width="{f(pw)}" height="{ah}" href="data:image/webp;base64,{webp_data(photo)}"/>',
        f'<rect x="{left}" y="{top}" width="{f(pw)}" height="{ah}" fill="none" stroke="{GRID}" stroke-width="2"/>',
    ]
    # The vector, cropped to the fox on its 512 canvas.
    src = open(os.path.join(d, "fox.svg")).read()
    inner = re.search(r"<svg[^>]*>(.*)</svg>", src, re.S).group(1)
    bx, by, bw, bh = 138, 120, 251, 320
    vw = ah * bw / bh
    # The prompt that went with the sketch, as chips stacked over the arrow.
    chips = ["fox", "sitting", "smiling"]
    size, cw, pad, chh, cgap = 24, 14.4, 20, 48, 12
    col = max(len(c) for c in chips) * cw + 2 * pad
    gap = col + 2 * 56
    right = left + pw + gap
    mid = left + pw + gap / 2
    stack = len(chips) * chh + (len(chips) - 1) * cgap
    cy = h / 2 - stack / 2 - 28
    for c in chips:
        wdt = len(c) * cw + 2 * pad
        first = c == chips[0]
        body.append(
            f'<rect x="{f(mid - wdt / 2)}" y="{f(cy)}" width="{f(wdt)}" height="{chh}" rx="{chh / 2}" '
            f'fill="{BRAND if first else "#1f1f1f"}" fill-opacity="{0.18 if first else 1}" '
            f'stroke="{BRAND if first else DIM}" stroke-width="1.5"/>'
        )
        body.append(text(mid, cy + chh / 2 + size * 0.36, c, size, FG))
        cy += chh + cgap
    body.append(f'<svg x="{f(right)}" y="{top}" width="{f(vw)}" height="{ah}" viewBox="{bx} {by} {bw} {bh}">{inner}</svg>')
    body.append(arrow(mid - col / 2, cy + 28, mid + col / 2))
    write(slug, "pencil-to-vector.svg", svg(round(right + vw + 60), h, "\n".join(body)))


def prompt_to_vector():
    """A Gen AI lab result on the left, the prompt that made it on the right.

    corgi.svg is the app's traced output for the structured prompt
    subject "corgi", details "sitting", "smiling".
    """
    import re

    slug = "what-is-vtracer"
    src = open(os.path.join(SRC, slug, "corgi.svg")).read()
    inner = re.search(r"<svg[^>]*>(.*)</svg>", src, re.S).group(1)
    # The artwork's bounds on its 512 canvas, with a little room around it.
    bx, by, bw, bh = 136, 46, 302, 440
    h, top = 520, 40
    ah = h - 2 * top
    aw = ah * bw / bh
    ax = 60
    body = [f'<svg x="{f(ax)}" y="{top}" width="{f(aw)}" height="{ah}" viewBox="{bx} {by} {bw} {bh}">{inner}</svg>']

    # The prompt card: the subject and details as chips, like the app's prompt.
    chips = ["corgi", "sitting", "smiling"]
    size, cw, pad, cgap, chh = 26, 15.6, 22, 16, 56
    widths = [len(c) * cw + 2 * pad for c in chips]
    card_pad = 28
    card_w = sum(widths) + cgap * (len(chips) - 1) + 2 * card_pad
    card_h = chh + 2 * card_pad + 64
    card_x = ax + aw + 120
    card_y = h / 2 - card_h / 2
    body.append(
        f'<rect x="{f(card_x)}" y="{f(card_y)}" width="{f(card_w)}" height="{f(card_h)}" rx="18" '
        f'fill="#141414" stroke="{GRID}" stroke-width="2"/>'
    )
    x = card_x + card_pad
    cy = card_y + card_pad
    for c, wdt in zip(chips, widths):
        first = c == chips[0]
        body.append(
            f'<rect x="{f(x)}" y="{f(cy)}" width="{f(wdt)}" height="{chh}" rx="{chh / 2}" '
            f'fill="{BRAND if first else "#1f1f1f"}" fill-opacity="{0.18 if first else 1}" '
            f'stroke="{BRAND if first else DIM}" stroke-width="1.5"/>'
        )
        body.append(text(x + wdt / 2, cy + chh / 2 + size * 0.36, c, size, FG))
        x += wdt + cgap
    # A generate button under the chips.
    bx2 = card_x + card_w - card_pad - 56
    by2 = cy + chh + 20
    body.append(f'<rect x="{f(bx2)}" y="{f(by2)}" width="56" height="44" rx="22" fill="{GOLD}"/>')
    body.append(
        f'<path d="M{f(bx2 + 18)} {f(by2 + 22)} H{f(bx2 + 38)} M{f(bx2 + 30)} {f(by2 + 14)} L{f(bx2 + 38)} {f(by2 + 22)} '
        f'L{f(bx2 + 30)} {f(by2 + 30)}" stroke="{BG}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    )
    # Arrow from the prompt back to the result.
    y = h / 2
    x1, x2 = card_x - 24, ax + aw + 24
    body.append(f'<path d="M{f(x1)} {f(y)} H{f(x2)}" stroke="{DIM}" stroke-width="2" fill="none"/>')
    body.append(
        f'<path d="M{f(x2 + 9)} {f(y - 7)} L{f(x2)} {f(y)} L{f(x2 + 9)} {f(y + 7)}" stroke="{DIM}" '
        f'stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    )
    w = card_x + card_w + 60
    write(slug, "prompt-to-vector.svg", svg(round(w), h, "\n".join(body)))


def workflow():
    xs = [130, 380, 630, 880]
    cy = 150
    body = []
    # 1: idea — a prompt card above a sketch sheet.
    x = xs[0]
    body.append(f'<rect x="{x - 80}" y="{cy - 92}" width="160" height="72" rx="10" fill="#141414" stroke="{DIM}" stroke-width="1.5"/>')
    for i, w in enumerate((110, 80)):
        body.append(f'<rect x="{x - 62}" y="{cy - 74 + i * 20}" width="{w}" height="8" rx="4" fill="{MUTED}"/>')
    body.append(f'<rect x="{x - 62 + 84}" y="{cy - 74 + 18}" width="3" height="14" fill="{BRAND}"/>')
    body.append(f'<rect x="{x - 80}" y="{cy - 6}" width="160" height="96" rx="6" fill="#e9e6df"/>')
    body.append(
        f'<path d="M{x - 30} {cy + 70} C{x - 50} {cy + 40} {x - 20} {cy + 4} {x} {cy + 12} C{x + 26} {cy + 22} {x + 40} {cy + 50} {x + 22} {cy + 72} '
        f'M{x - 26} {cy + 66} C{x - 40} {cy + 44} {x - 18} {cy + 12} {x + 2} {cy + 18}" fill="none" stroke="#55524c" stroke-width="2" stroke-linecap="round"/>'
    )
    # 2: image — the drop in pixels.
    unit = Drop(4, 5, 2.6, 4.2)
    body.append(pixels(unit, xs[1] - 90, cy - 90, 9, 20, grid=True))
    # 3: trace — the drop as a vector with its nodes.
    vec = Drop(xs[2], cy + 22, 52, 84)
    body.append(f'<path d="{vec.path()}" fill="{BRAND}" fill-opacity="0.9" stroke="{FG}" stroke-width="2"/>')
    body.append(nodes(vec, handles=False))
    # 4: edit — the shape pulled apart and recoloured, with a pointer.
    ed = Drop(xs[3] - 14, cy + 30, 50, 80)
    body.append(f'<path d="{ed.path()}" fill="{GOLD}"/>')
    hl = Drop(xs[3] + 24, cy + 4, 50, 80)
    body.append(f'<path d="{hl.path()}" fill="{BRAND}" stroke="{FG}" stroke-width="1.5" stroke-dasharray="5 4"/>')
    body.append(
        f'<path d="M{xs[3] + 50} {cy + 40} l0 34 l9 -8 l7 15 l6 -3 l-7 -15 l12 -1 Z" fill="{FG}" stroke="{BG}" stroke-width="1.5" stroke-linejoin="round"/>'
    )
    for i in range(3):
        body.append(arrow(xs[i] + 100, cy, xs[i + 1] - 100))
    for i, x in enumerate(xs):
        body.append(badge(x, 280, i + 1))
    write("what-is-vtracer", "workflow.svg", svg(1010, 320, "\n".join(body)))


# ---------------------------------------------------------- how tracing works
# The sample traces these figures read are made by scripts/kb-traces.py with
# VTracer 1; run that first when the samples change.

HL = "#f2f2ef"  # the highlight inside the drop
EMPTY = "#1a1a1a"  # background pixels


def hl_geom(drop):
    """The drop's highlight: centre, radii and rotation, as Drop.highlight draws it."""
    r = drop.r
    return drop.cx - r * 0.38, drop.cy - r * 0.2, r * 0.16, r * 0.3, 20


def in_ellipse(x, y, cx, cy, rx, ry, rot):
    a = math.radians(rot)
    dx, dy = x - cx, y - cy
    u = dx * math.cos(a) + dy * math.sin(a)
    v = -dx * math.sin(a) + dy * math.cos(a)
    return (u / rx) ** 2 + (v / ry) ** 2 <= 1


def ellipse_path(cx, cy, rx, ry, rot):
    a = math.radians(rot)
    # Two half-ellipse arcs between the ends of the rotated major axis.
    x1, y1 = cx - ry * math.sin(a) * -1, cy - ry * math.cos(a)
    x2, y2 = cx + ry * math.sin(a) * -1, cy + ry * math.cos(a)
    return (
        f"M{f(x1)} {f(y1)} A{f(ry)} {f(rx)} {f(rot + 90)} 1 1 {f(x2)} {f(y2)} "
        f"A{f(ry)} {f(rx)} {f(rot + 90)} 1 1 {f(x1)} {f(y1)} Z"
    )


def classify(drop, x, y):
    """0 background, 1 drop, 2 highlight."""
    if in_ellipse(x, y, *hl_geom(drop)):
        return 2
    return 1 if drop.inside(x, y) else 0


def cells(drop, n, ss=4):
    """Per cell: coverage of each class, by supersampling."""
    out = []
    for j in range(n):
        row = []
        for i in range(n):
            cov = [0, 0, 0]
            for sj in range(ss):
                for si in range(ss):
                    cov[classify(drop, i + (si + 0.5) / ss, j + (sj + 0.5) / ss)] += 1
            row.append([c / ss**2 for c in cov])
        out.append(row)
    return out


def hex_mix(weights, colors):
    rgb = [0.0, 0.0, 0.0]
    for w, c in zip(weights, colors):
        for k in range(3):
            rgb[k] += w * int(c[1 + 2 * k : 3 + 2 * k], 16)
    return "#" + "".join(f"{round(v):02x}" for v in rgb)


def cell_rects(grid, x0, y0, cell, pick, pad=1):
    """Rects for the cells where pick(cov) returns a color, run-length merged by row."""
    out = []
    for j, row in enumerate(grid):
        i = 0
        while i < len(row):
            c = pick(row[i])
            k = i + 1
            while c and k < len(row) and pick(row[k]) == c:
                k += 1
            if c:
                out.append(
                    f'<rect x="{f(x0 + i * cell)}" y="{f(y0 + j * cell)}" width="{f((k - i) * cell + pad)}" '
                    f'height="{f(cell + pad)}" fill="{c}"/>'
                )
            i = k
    return "\n".join(out)


def stages():
    """Image, then the three stages: clusters, layers, curves."""
    n, cell = 16, 12
    size = n * cell
    unit = Drop(8, 9.6, 5, 8)
    grid = cells(unit, n)
    colors = (EMPTY, BRAND, HL)
    top, gap = 48, 84
    # The layers panel is an exploded view: three sheets seen at an angle,
    # squashed and sheared, so it is wider than the others.
    squash, shear = 0.6, math.tan(math.radians(34))
    lean = shear * squash * size
    widths = [size, size, size + lean, size]
    xs = [40.0]
    for w_ in widths[:-1]:
        xs.append(xs[-1] + w_ + gap)
    body = []
    # The image: anti-aliased pixels.
    body.append(cell_rects(grid, xs[0], top, cell, lambda cov: hex_mix(cov, colors)))
    # 1 clusters: each pixel takes its region's flat color.
    body.append(cell_rects(grid, xs[1], top, cell, lambda cov: colors[cov.index(max(cov))]))
    for x in xs[:2]:
        body.append(f'<rect x="{f(x)}" y="{top}" width="{size}" height="{size}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
    # 2 layers: each region on its own sheet, the sheets pulled apart
    # vertically. Every shape keeps its place on its sheet, and the drop's
    # sheet holds the whole drop: it carries on under the highlight.
    sheets = (
        (EMPTY, 1, lambda cov: None),
        ("#ffffff", 0.04, lambda cov: BRAND if cov.index(max(cov)) >= 1 else None),
        ("#ffffff", 0.04, lambda cov: HL if cov.index(max(cov)) == 2 else None),
    )
    sh = squash * size
    step = 62
    base = top + size + 22 - sh  # the bottom sheet; the stack is taller than the panels
    for k, (fill, op, pick) in enumerate(sheets):
        y = base - k * step
        body.append(
            f'<g transform="translate({f(xs[2] + lean)} {f(y)}) skewX(-34) scale(1 {squash})">'
            f'<rect width="{size}" height="{size}" fill="{fill}" fill-opacity="{op}" stroke="{DIM}" '
            f'stroke-width="1.5" vector-effect="non-scaling-stroke"/>'
            f"{cell_rects(grid, 0, 0, cell, pick, pad=1)}</g>"
        )
    # 3 curves: the drop as smooth paths, with its nodes.
    big = Drop(xs[3] + 8 * cell, top + 9.6 * cell, 5 * cell, 8 * cell)
    body.append(f'<rect x="{f(xs[3])}" y="{top}" width="{size}" height="{size}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
    body.append(f'<path d="{big.path()}" fill="{BRAND}"/>')
    body.append(f'<path d="{ellipse_path(*hl_geom(big))}" fill="{HL}"/>')
    body.append(nodes(big, handles=False).replace('width="12" height="12"', 'width="10" height="10"').replace("- 6)", "- 5)"))
    cy = top + size / 2
    for i in range(3):
        body.append(arrow(xs[i] + widths[i] + 18, cy, xs[i + 1] - 18))
    for i in range(1, 4):
        body.append(badge(xs[i] + widths[i] / 2, top + size + 48, i))
    write("how-vector-tracing-works", "stages.svg", svg(round(xs[3] + size + 40), top + size + 80, "\n".join(body)))


def image_tree():
    """Hierarchical clustering run on a small image, cut at four levels.

    Stage 1 joins neighbouring pixels of the same color (6 significant bits)
    into clusters. Stage 2 merges clusters bottom up, smallest first, each
    into the neighbour with the closest average color, as the Impression
    write-up describes. Each panel replays the merges down to a cluster count.
    """
    import heapq

    import numpy as np
    from PIL import Image

    n = 40
    yy, xx = np.mgrid[0:n, 0:n]
    img = np.zeros((n, n, 3))
    # A dark background with a slight vertical gradient.
    t = (yy / n)[..., None]
    img[:] = np.array((16, 22, 34)) * (1 - t) + np.array((40, 48, 64)) * t
    drop = Drop(20, 24.5, 12.5, 20)
    hx, hy, hrx, hry, hrot = hl_geom(drop)
    for j in range(n):
        for i in range(n):
            c = classify(drop, i + 0.5, j + 0.5)
            if c == 1:
                # Shaded from light blue at the top left to deep blue below.
                s = min(1, max(0, (j - 6) / 30 + (i - 10) / 60))
                img[j, i] = np.array((90, 180, 255)) * (1 - s) + np.array((0, 70, 150)) * s
            elif c == 2:
                img[j, i] = (242, 242, 239)
    q = img.astype(int) >> 2
    # Stage 1: connected components of identical quantized color.
    label = -np.ones((n, n), int)
    count = 0
    for j in range(n):
        for i in range(n):
            if label[j, i] >= 0:
                continue
            stack = [(j, i)]
            label[j, i] = count
            while stack:
                a, b = stack.pop()
                for c, d in ((a + 1, b), (a - 1, b), (a, b + 1), (a, b - 1)):
                    if 0 <= c < n and 0 <= d < n and label[c, d] < 0 and (q[c, d] == q[a, b]).all():
                        label[c, d] = count
                        stack.append((c, d))
            count += 1
    size = np.bincount(label.ravel(), minlength=count).astype(float)
    total = np.zeros((count, 3))
    np.add.at(total, label.ravel(), img.reshape(-1, 3))
    nbrs = [set() for _ in range(count)]
    for a, b in ((label[:, :-1], label[:, 1:]), (label[:-1, :], label[1:, :])):
        for u, v in zip(a.ravel(), b.ravel()):
            if u != v:
                nbrs[u].add(v)
                nbrs[v].add(u)
    # Stage 2: merge the smallest cluster into its closest neighbour, repeatedly.
    alive = set(range(count))
    parent = list(range(count))
    merges = []
    heap = [(size[c], c) for c in range(count)]
    heapq.heapify(heap)
    while len(alive) > 1:
        s, c = heapq.heappop(heap)
        if c not in alive or s != size[c]:
            continue
        mean = total[c] / size[c]
        into = min(nbrs[c], key=lambda o: np.abs(total[o] / size[o] - mean).sum())
        merges.append((c, into))
        alive.discard(c)
        parent[c] = into
        size[into] += size[c]
        total[into] += total[c]
        for o in nbrs[c]:
            if o != into:
                nbrs[o].discard(c)
                nbrs[o].add(into)
                nbrs[into].add(o)
        nbrs[into].discard(c)
        heapq.heappush(heap, (size[into], into))
    print(f"image tree: {count} clusters after stage 1")

    def cut(k):
        """Replay merges until k clusters remain; color each by its mean."""
        sz = np.bincount(label.ravel(), minlength=count).astype(float)
        tot = np.zeros((count, 3))
        np.add.at(tot, label.ravel(), img.reshape(-1, 3))
        root = list(range(count))

        def find(c):
            while root[c] != c:
                c = root[c]
            return c

        for c, into in merges[: count - k]:
            a, b = find(c), find(into)
            root[a] = b
            sz[b] += sz[a]
            tot[b] += tot[a]
        out = np.zeros_like(img)
        for j in range(n):
            for i in range(n):
                r = find(label[j, i])
                out[j, i] = tot[r] / sz[r]
        return out

    levels = [2, 4, 12, count]
    k, pw, gap, top = 6, 240, 56, 40
    body = []
    for idx, lv in enumerate(levels):
        x = 40 + idx * (pw + gap)
        im = Image.fromarray(np.clip(cut(lv), 0, 255).astype(np.uint8)).resize((n * k, n * k), Image.NEAREST)
        body.append(
            f'<image x="{x}" y="{top}" width="{pw}" height="{pw}" style="image-rendering:pixelated" '
            f'href="data:image/png;base64,{png_data(im)}"/>'
        )
        body.append(f'<rect x="{x}" y="{top}" width="{pw}" height="{pw}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        body.append(text(x + pw / 2, top + pw + 44, str(lv), 24, FG))
        if idx:
            body.append(arrow(x - gap + 12, top + pw / 2, x - 12))
    w = 40 + len(levels) * pw + (len(levels) - 1) * gap + 40
    write("color-clustering", "image-tree.svg", svg(w, top + pw + 72, "\n".join(body)))


def png_data(im):
    import base64
    import io

    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    return base64.b64encode(buf.getvalue()).decode()


def nested_svg(path, x, y, w, h):
    """Place a traced SVG file (VTracer writes width and height, no viewBox)."""
    import re

    src = open(path).read()
    vw = float(re.search(r'<svg[^>]*\swidth="([\d.]+)', src).group(1))
    vh = float(re.search(r'<svg[^>]*\sheight="([\d.]+)', src).group(1))
    inner = re.search(r"<svg[^>]*>(.*)</svg>", src, re.S).group(1)
    return f'<svg x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" viewBox="0 0 {f(vw)} {f(vh)}">{inner}</svg>'


def raster(path, x, y, w, h, nearest=False):
    from PIL import Image

    im = Image.open(path).convert("RGB")
    scale = 2
    im = im.resize((round(w * scale), round(h * scale)), Image.NEAREST if nearest else Image.LANCZOS)
    return (
        f'<image x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" '
        f'href="data:image/png;base64,{png_data(im)}"/>'
    )


def watershed():
    """A watershed in one dimension, at three water levels.

    Top: one row of an image. Middle: the strength of its edges as a
    landscape, flooded to a level; each basin is a region, and a boundary
    stands on every ridge above the water. Bottom: the regions. As the water
    rises, the weakest ridges go under and their regions merge.
    """
    W, step = 380, 2
    # The image row: five colors, with soft (anti-aliased) changes between them.
    stops = [0, 86, 168, 252, 318, W]
    tones = [(22, 32, 62), (0, 112, 222), (52, 158, 248), (224, 166, 60), (44, 44, 48)]
    edges = [(86, 0.78), (168, 0.32), (252, 1.0), (318, 0.56)]  # position, strength

    def color_at(x):
        for k in range(len(edges)):
            e = stops[k + 1]
            if x < e - 10:
                return tones[k]
            if x <= e + 10:
                t = (x - (e - 10)) / 20
                return tuple(a * (1 - t) + b * t for a, b in zip(tones[k], tones[k + 1]))
        return tones[-1]

    def height(x):
        h = 0.06 + 0.02 * math.sin(x / 9) + 0.015 * math.sin(x / 4.3)
        for e, s in edges:
            h += s * math.exp(-((x - e) ** 2) / (2 * 11**2))
        return h

    def rgb(c):
        return "#" + "".join(f"{round(v):02x}" for v in c)

    xs_ = list(range(0, W + 1, step))
    levels = [0.2, 0.45, 0.66]
    top, strip, land_h, gap = 40, 34, 150, 64
    body = []
    for idx, level in enumerate(levels):
        x0 = 40 + idx * (W + gap)
        y_strip = top
        y_land = top + strip + 22  # top of the landscape area
        base = y_land + land_h  # height 0
        y_reg = base + 22
        Y = lambda h: base - h * land_h / 1.12  # noqa: E731
        # The image row.
        body.append(f'<rect x="{x0}" y="{y_strip}" width="{W}" height="{strip}" fill="url(#ws-row)"/>')
        # Regions: split at every ridge still above the water.
        cuts = [e for e, s in edges if height(e) > level]
        bounds = [0] + cuts + [W]
        regions = list(zip(bounds[:-1], bounds[1:]))
        # The ground: the landscape, filled below the curve.
        curve = " ".join(f"{f(x0 + x)},{f(Y(height(x)))}" for x in xs_)
        body.append(f'<polygon points="{f(x0)},{f(base)} {curve} {f(x0 + W)},{f(base)}" fill="#1c1c1c"/>')
        # The water in each region, colored by the region's average color.
        for a, b in regions:
            cs = [color_at(x) for x in range(a, b)]
            mean = tuple(sum(c[k] for c in cs) / len(cs) for k in range(3))
            wet = [x for x in xs_ if a <= x <= b and height(x) < level]
            if not wet:
                continue
            pts = [f"{f(x0 + wet[0])},{f(Y(level))}", f"{f(x0 + wet[-1])},{f(Y(level))}"]
            pts += [f"{f(x0 + x)},{f(Y(height(x)))}" for x in reversed(wet)]
            body.append(f'<polygon points="{" ".join(pts)}" fill="{rgb(mean)}" fill-opacity="0.85"/>')
            body.append(f'<rect x="{f(x0 + a)}" y="{y_reg}" width="{f(b - a)}" height="{strip}" fill="{rgb(mean)}"/>')
        body.append(f'<polyline points="{curve}" fill="none" stroke="{FG}" stroke-width="2"/>')
        # The water line, and a boundary on every ridge above it.
        body.append(
            f'<line x1="{x0}" y1="{f(Y(level))}" x2="{x0 + W}" y2="{f(Y(level))}" stroke="{FG}" '
            f'stroke-opacity="0.35" stroke-width="1" stroke-dasharray="3 4"/>'
        )
        for e in cuts:
            body.append(
                f'<line x1="{x0 + e}" y1="{y_strip - 6}" x2="{x0 + e}" y2="{y_reg + strip + 6}" '
                f'stroke="{GOLD}" stroke-width="1.5" stroke-dasharray="5 4"/>'
            )
        for y in (y_strip, y_reg):
            body.append(f'<rect x="{x0}" y="{y}" width="{W}" height="{strip}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        body.append(text(x0 + W / 2, y_reg + strip + 46, str(len(regions)), 24, FG))
    # One gradient for the image row, with a stop either side of each soft edge.
    gstops = []
    for x in [0] + [v for e in stops[1:-1] for v in (e - 10, e + 10)] + [W]:
        gstops.append(f'<stop offset="{f(x / W)}" stop-color="{rgb(color_at(x))}"/>')
    body.insert(0, f'<defs><linearGradient id="ws-row">{"".join(gstops)}</linearGradient></defs>')
    w = 40 + len(levels) * W + (len(levels) - 1) * gap + 40
    write("color-clustering", "watershed.svg", svg(w, top + strip + 22 + land_h + 22 + strip + 72, "\n".join(body)))


def vt1_vs_vt2():
    """Three close-ups, each as the source, the VTracer 1 trace and the VTracer 2 trace.

    The VTracer 1 traces come from scripts/kb-traces.py; the VTracer 2 traces
    are the app's, from the landing page and the lion badge figure.
    """
    import subprocess
    import tempfile

    from PIL import Image

    slug = "vtracer-1-vs-vtracer-2"
    d = os.path.join(SRC, slug)
    rows = [
        # source, VTracer 1, VTracer 2, crop (x, y, w, h) in source pixels, pixelated source
        (
            os.path.join(ROOT, "public/compare/corgi-noise.webp"),
            os.path.join(d, "corgi-noise-vt1.svg"),
            os.path.join(ROOT, "public/compare/corgi-noise_vtracer.svg"),
            (131, 22, 200, 150),
            False,
        ),
        (
            os.path.join(SRC, "why-convert-images-to-vector/lion-badge.png"),
            os.path.join(d, "lion-badge-vt1.svg"),
            os.path.join(SRC, "why-convert-images-to-vector/lion-badge.svg"),
            (32, 42, 80, 60),
            True,
        ),
        (
            os.path.join(ROOT, "public/compare/cityscape-sunset.jpg"),
            os.path.join(d, "cityscape-sunset-vt1.svg"),
            os.path.join(ROOT, "public/compare/cityscape-sunset.svg"),
            (700, 0, 700, 525),
            False,
        ),
    ]
    cw, ch, gap, top, left = 300, 225, 16, 72, 40
    res = 1.6  # raster pixels per figure unit
    body = [
        text(left + cw + gap + cw / 2, top - 24, "VTracer 1", 22, FG),
        text(left + 2 * (cw + gap) + cw / 2, top - 24, "VTracer 2", 22, FG),
    ]
    with tempfile.TemporaryDirectory() as tmp:
        for r, (src, v1, v2, (cx, cy, cwid, chei), pixelated) in enumerate(rows):
            y = top + r * (ch + gap)
            im = Image.open(src).convert("RGB")
            scale = cw * res / cwid
            cells = [
                im.crop((cx, cy, cx + cwid, cy + chei)).resize(
                    (round(cw * res), round(ch * res)), Image.NEAREST if pixelated else Image.LANCZOS
                )
            ]
            for k, vec in enumerate((v1, v2)):
                out = os.path.join(tmp, f"{r}-{k}.png")
                subprocess.run(
                    ["resvg", "-w", str(round(im.width * scale)), "--background", "white", vec, out], check=True
                )
                full = Image.open(out).convert("RGB")
                x0, y0 = round(cx * scale), round(cy * scale)
                cells.append(full.crop((x0, y0, x0 + round(cw * res), y0 + round(ch * res))))
            for k, cell in enumerate(cells):
                x = left + k * (cw + gap)
                body.append(f'<image x="{x}" y="{y}" width="{cw}" height="{ch}" href="data:image/webp;base64,{webp_data(cell, 80)}"/>')
                body.append(f'<rect x="{x}" y="{y}" width="{cw}" height="{ch}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
    w = left + 3 * cw + 2 * gap + 40
    write(slug, "comparison.svg", svg(w, top + 3 * ch + 2 * gap + 40, "\n".join(body)))


def mesh_gradient():
    """Linear, radial and mesh gradients filling the same drop.

    The mesh is a 3 × 2 grid of patches with a color at each corner,
    blended bilinearly, and drawn as an image clipped to the drop; its grid
    and corner colors are drawn on top.
    """
    import numpy as np
    from PIL import Image

    slug = "mesh-gradients"
    s, top, gap, left = 260, 40, 56, 40
    body = []
    corners = [
        ["#1b2a6b", "#3d6fd9", "#7fd0ff", "#c9f0ff"],
        ["#5b2a86", "#e0a63c", "#ff8a5b", "#7fd0ff"],
        ["#2a1b4b", "#7a2d6b", "#e0a63c", "#3d6fd9"],
    ]
    rows, cols = len(corners) - 1, len(corners[0]) - 1

    def rgbv(h):
        return np.array([int(h[i : i + 2], 16) for i in (1, 3, 5)], float)

    grid = np.array([[rgbv(c) for c in row] for row in corners])
    for idx in range(3):
        x = left + idx * (s + gap)
        drop = Drop(x + s / 2, top + s * 0.62, s * 0.3, s * 0.5)
        cid = f"mg-clip-{idx}"
        body.append(f'<clipPath id="{cid}"><path d="{drop.path()}"/></clipPath>')
        x0, y0 = x + s * 0.18, top + s * 0.1  # the gradient box around the drop
        bw, bh = s * 0.64, s * 0.86
        if idx == 0:
            body.append(
                f'<linearGradient id="mg-lin" x1="0" y1="0" x2="0" y2="1">'
                f'<stop offset="0" stop-color="#7fd0ff"/><stop offset="1" stop-color="#1b2a6b"/></linearGradient>'
            )
            body.append(f'<path d="{drop.path()}" fill="url(#mg-lin)"/>')
        elif idx == 1:
            body.append(
                f'<radialGradient id="mg-rad" cx="0.38" cy="0.62" r="0.7">'
                f'<stop offset="0" stop-color="#ffe2a8"/><stop offset="0.5" stop-color="#e0a63c"/>'
                f'<stop offset="1" stop-color="#5b2a86"/></radialGradient>'
            )
            body.append(f'<path d="{drop.path()}" fill="url(#mg-rad)"/>')
        else:
            n = 240
            img = np.zeros((n, n, 3))
            for j in range(n):
                v = j / (n - 1) * rows
                r0 = min(int(v), rows - 1)
                tv = v - r0
                for i in range(n):
                    u = i / (n - 1) * cols
                    c0 = min(int(u), cols - 1)
                    tu = u - c0
                    a = grid[r0, c0] * (1 - tu) + grid[r0, c0 + 1] * tu
                    b = grid[r0 + 1, c0] * (1 - tu) + grid[r0 + 1, c0 + 1] * tu
                    img[j, i] = a * (1 - tv) + b * tv
            im = Image.fromarray(img.astype(np.uint8))
            body.append(
                f'<image x="{f(x0)}" y="{f(y0)}" width="{f(bw)}" height="{f(bh)}" preserveAspectRatio="none" '
                f'clip-path="url(#{cid})" href="data:image/webp;base64,{webp_data(im, 90)}"/>'
            )
            # The mesh: its grid lines and a dot of each corner's color.
            for rr in range(rows + 1):
                yy = y0 + bh * rr / rows
                body.append(f'<line x1="{f(x0)}" y1="{f(yy)}" x2="{f(x0 + bw)}" y2="{f(yy)}" stroke="{FG}" stroke-opacity="0.5" stroke-width="1"/>')
            for cc in range(cols + 1):
                xx = x0 + bw * cc / cols
                body.append(f'<line x1="{f(xx)}" y1="{f(y0)}" x2="{f(xx)}" y2="{f(y0 + bh)}" stroke="{FG}" stroke-opacity="0.5" stroke-width="1"/>')
            for rr in range(rows + 1):
                for cc in range(cols + 1):
                    body.append(
                        f'<circle cx="{f(x0 + bw * cc / cols)}" cy="{f(y0 + bh * rr / rows)}" r="7" '
                        f'fill="{corners[rr][cc]}" stroke="{FG}" stroke-width="2"/>'
                    )
        if idx < 2:
            body.append(f'<path d="{drop.path()}" fill="none" stroke="{FG}" stroke-opacity="0.15" stroke-width="1"/>')
        label = ("&lt;linearGradient&gt;", "&lt;radialGradient&gt;", "&lt;meshgradient&gt;")[idx]
        body.append(text(x + s / 2, top + s + 36, label, 20, FG))
    w = left + 3 * s + 2 * gap + 40
    write(slug, "linear-radial-mesh.svg", svg(w, top + s + 64, "\n".join(body)))


def mesh_blush():
    """How VTracer 2 shades a face, blush included, with one mesh.

    The trace's face is one mesh region: a 16 × 16 grid with a color at each
    of its 17 × 17 corners, which XSVG writes as a 17 × 17-pixel PNG placed
    so each pixel sits on a corner. Panels: the source; the corner colors;
    that PNG as any viewer draws it, smoothly scaled; the finished trace.
    """
    import base64
    import io
    import re
    import subprocess
    import tempfile

    from PIL import Image

    slug = "mesh-gradients"
    d = os.path.join(SRC, slug)
    trace = os.path.join(d, "anime-girl-smiling.svg")
    src = open(trace).read()
    # The face's mesh: the one image whose box spans the face.
    m = re.search(
        r'<image x="(121\.\d+)" y="([\d.-]+)" width="([\d.]+)" height="([\d.]+)"[^>]*href="data:image/png;base64,([^"]+)"',
        src,
    )
    ix, iy, iw, ih = (float(v) for v in m.groups()[:4])
    b64 = m.group(5)
    tex = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGB")
    n_x, n_y = tex.size
    sx, sy = iw / n_x, ih / n_y  # one pixel per corner
    vx0, vy0 = ix + sx / 2, iy + sy / 2  # the first corner
    # Every panel shows the whole picture, so the full face stays in view and
    # the four line up: source and trace on top, the mesh below, in place.
    P, gap, top, left, lab = 400, 24, 40, 40, 52
    k = P / 512  # panel units per picture pixel
    res = 2
    cells = [(left, top), (left + P + gap, top), (left, top + P + gap), (left + P + gap, top + P + gap)]
    body = []
    # Top left: the source.
    im = Image.open(os.path.join(d, "anime-girl-smiling.webp")).convert("RGB").resize((P * res, P * res), Image.LANCZOS)
    x, y = cells[0]
    body.append(f'<image x="{x}" y="{y}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(im, 82)}"/>')
    # Top right: the finished trace.
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, "trace.png")
        subprocess.run(["resvg", "-w", str(P * res), "--background", "white", trace, out], check=True)
        full = Image.open(out).convert("RGB")
    x, y = cells[1]
    body.append(f'<image x="{x}" y="{y}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(full, 82)}"/>')
    # Bottom left: the corners, each a dot of its color, on the grid, in place.
    ghost = webp_data(full.resize((P, P), Image.LANCZOS), 70)  # the trace, faint, for orientation
    x, y = cells[2]
    g = [
        f'<rect x="{x}" y="{y}" width="{P}" height="{P}" fill="#141414"/>',
        f'<image x="{x}" y="{y}" width="{P}" height="{P}" opacity="0.14" href="data:image/webp;base64,{ghost}"/>',
    ]
    gx0, gy0 = x + vx0 * k, y + vy0 * k
    qx, qy = sx * k, sy * k
    for i in range(n_x):
        xx = gx0 + i * qx
        g.append(f'<line x1="{f(xx)}" y1="{f(gy0)}" x2="{f(xx)}" y2="{f(gy0 + (n_y - 1) * qy)}" stroke="{GRID}" stroke-width="1"/>')
    for j in range(n_y):
        yy = gy0 + j * qy
        g.append(f'<line x1="{f(gx0)}" y1="{f(yy)}" x2="{f(gx0 + (n_x - 1) * qx)}" y2="{f(yy)}" stroke="{GRID}" stroke-width="1"/>')
    for j in range(n_y):
        for i in range(n_x):
            r, gg, b = tex.getpixel((i, j))
            g.append(f'<circle cx="{f(gx0 + i * qx)}" cy="{f(gy0 + j * qy)}" r="4.6" fill="#{r:02x}{gg:02x}{b:02x}"/>')
    body.append("\n".join(g))
    # Bottom right: the same PNG, drawn the way any viewer draws it, in place.
    x, y = cells[3]
    body.append(f'<rect x="{x}" y="{y}" width="{P}" height="{P}" fill="#141414"/>')
    body.append(f'<image x="{x}" y="{y}" width="{P}" height="{P}" opacity="0.14" href="data:image/webp;base64,{ghost}"/>')
    body.append(
        f'<svg x="{x}" y="{y}" width="{P}" height="{P}" viewBox="0 0 512 512">'
        f'<image x="{f(ix)}" y="{f(iy)}" width="{f(iw)}" height="{f(ih)}" preserveAspectRatio="none" '
        f'href="data:image/png;base64,{b64}"/></svg>'
    )
    for x, y in cells:
        body.append(f'<rect x="{x}" y="{y}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
    png_bytes = len(base64.b64decode(b64))
    yl = top + 2 * P + gap + 38
    body.append(text(cells[2][0] + P / 2, yl, f"{n_x} × {n_y}", 22, FG))
    body.append(text(cells[3][0] + P / 2, yl, f"PNG · {png_bytes} B", 22, FG))
    print(f"mesh blush: {n_x}x{n_y} corners, {png_bytes} bytes")
    write(slug, "blush.svg", svg(left + 2 * P + gap + 40, top + 2 * P + gap + lab + 16, "\n".join(body)))


# ------------------------------------------------------------------ gen ai

STYLES = ["plain", "inked", "flat-design", "clipart", "cartoon", "stencil", "low-poly", "linocut", "line-art"]
CANVAS = "#f4f4f1"  # a light canvas, so dark outlines show
STYLE_NAMES = {
    "plain": "None",
    "inked": "Inked",
    "flat-design": "Flat design",
    "clipart": "Clip art",
    "cartoon": "Cartoon",
    "stencil": "Stencil",
    "low-poly": "Low poly",
    "linocut": "Linocut",
    "line-art": "Line art",
}


def numbered(cx, y, n, name, size=20):
    """A numbered badge followed by a name, centered on cx."""
    w = 30 + 10 + len(name) * size * 0.6
    x0 = cx - w / 2
    return badge(x0 + 15, y, n) + text(x0 + 40, y + size * 0.35, name, size, FG, anchor="start")


def render_svg(path, width, background=None):
    """Render an SVG file to a PIL image with resvg."""
    import subprocess
    import tempfile

    from PIL import Image

    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, "out.png")
        cmd = ["resvg", "-w", str(width)]
        if background:
            cmd += ["--background", background]
        subprocess.run(cmd + [path, out], check=True)
        return Image.open(out).convert("RGBA" if background is None else "RGB")


def art_styles():
    """The nine art styles: one prompt, one seed, one model; numbered as in the article's table."""
    slug = "art-styles"
    P, gap, top, left, lab = 240, 20, 32, 40, 48
    body = []
    for k, style in enumerate(STYLES):
        r, c = divmod(k, 3)
        x = left + c * (P + gap)
        y = top + r * (P + lab + gap)
        im = render_svg(os.path.join(SRC, slug, f"fox-{style}.svg"), P * 2, CANVAS)
        body.append(f'<image x="{x}" y="{y}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(im, 82)}"/>')
        body.append(f'<rect x="{x}" y="{y}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        body.append(numbered(x + P / 2, y + P + 26, k + 1, STYLE_NAMES[style]))
    w = left + 3 * P + 2 * gap + 40
    write(slug, "styles.svg", svg(w, top + 3 * (P + lab) + 2 * gap + 8, "\n".join(body)))


def gen_round():
    """One Gen AI round: the generated image, then its trace on a transparent canvas."""
    slug = "gen-ai-lab"
    d = os.path.join(SRC, slug)
    from PIL import Image

    P, gap, top, left = 340, 110, 40, 40
    gen0 = Image.open(os.path.join(d, "fox-cartoon-generated.webp")).convert("RGB")
    gen = gen0.resize((P * 2, P * 2), Image.LANCZOS)
    tr = render_svg(os.path.join(d, "fox-cartoon.svg"), P * 2)
    x2 = left + P + gap
    cell = 16
    body = [
        f'<defs><pattern id="gr-checker" width="{cell * 2}" height="{cell * 2}" patternUnits="userSpaceOnUse" x="{x2}" y="{top}">'
        f'<rect width="{cell * 2}" height="{cell * 2}" fill="#2a2a2a"/>'
        f'<rect width="{cell}" height="{cell}" fill="#333"/><rect x="{cell}" y="{cell}" width="{cell}" height="{cell}" fill="#333"/>'
        f"</pattern></defs>",
        f'<image x="{left}" y="{top}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(gen, 82)}"/>',
        f'<rect x="{x2}" y="{top}" width="{P}" height="{P}" fill="url(#gr-checker)"/>',
        f'<image x="{x2}" y="{top}" width="{P}" height="{P}" href="data:image/png;base64,{png_data(tr)}"/>',
        arrow(left + P + 24, top + P / 2, x2 - 24),
    ]
    for x, label in ((left, f"{gen0.width} × {gen0.height}"), (x2, "SVG")):
        body.append(f'<rect x="{x}" y="{top}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        body.append(text(x + P / 2, top + P + 40, label, 22, FG))
    write(slug, "round.svg", svg(x2 + P + 40, top + P + 64, "\n".join(body)))


GEN = os.path.join(ROOT, "scripts/kb-sources/gen-ai")  # from scripts/kb-gen-samples.py
MODEL_NAMES = {
    "sd-turbo-q8": "SD-Turbo",
    "sdxl-turbo-q8": "SDXL-Turbo",
    "flux-schnell-q4": "FLUX.1 schnell",
    "flux2-klein-4b-q4": "FLUX.2 klein",
    "z-image-turbo-q4": "Z-Image Turbo",
}
MODEL_SLUGS = {  # one article per model family; one gallery per model
    "sd-turbo-q8": ("stable-diffusion-vector-art", "sd-turbo"),
    "sdxl-turbo-q8": None,  # no gallery
    "flux-schnell-q4": ("flux-vector-art", "flux-1-schnell"),
    "flux2-klein-4b-q4": ("flux-vector-art", "flux-2-klein"),
    "z-image-turbo-q4": ("z-image-vector-art", "z-image-turbo"),
}


def kb_size(n):
    return f"{n / 1e6:.1f} MB" if n >= 1e6 else f"{round(n / 1e3)} KB"


def gen_cell(sample, x, y, P, label=True, tight=False):
    """One traced round on the light canvas, with its path count and size below.

    tight crops to the drawing itself (its opaque pixels), with a small margin,
    to match panels that are cropped the same way.
    """
    from PIL import Image

    im = Image.open(os.path.join(GEN, sample["preview"])).convert("RGBA")
    if tight:
        l, t, r, b = im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
        side = max(r - l, b - t) * 1.08
        cx, cy = (l + r) / 2, (t + b) / 2
        im = im.crop(tuple(round(v) for v in (cx - side / 2, cy - side / 2, cx + side / 2, cy + side / 2)))
    side = max(im.size)  # not every model returns a square image: center it
    canvas = Image.new("RGBA", (side, side), CANVAS)
    canvas.alpha_composite(im, ((side - im.width) // 2, (side - im.height) // 2))
    out = [
        f'<image x="{f(x)}" y="{f(y)}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(canvas.convert("RGB"), 80)}"/>',
        f'<rect x="{f(x)}" y="{f(y)}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>',
    ]
    if label:
        out.append(text(x + P / 2, y + P + 28, f"{sample['paths']} paths · {kb_size(sample['svg_bytes'])}", 17, MUTED))
    return "\n".join(out)


def models_compared():
    """Three prompts across the five local models."""
    import json

    samples = json.load(open(os.path.join(GEN, "samples.json")))["compare"]
    rows = ["chibi-sticker", "comic-1950s", "manga-ink"]
    models = list(MODEL_NAMES)
    P, gap, top, left, lab = 220, 14, 64, 40, 44
    body = []
    for c, m in enumerate(models):
        body.append(text(left + c * (P + gap) + P / 2, top - 22, MODEL_NAMES[m], 20, FG))
    for r, name in enumerate(rows):
        for c, m in enumerate(models):
            body.append(gen_cell(samples[name][m], left + c * (P + gap), top + r * (P + lab + gap), P))
    w = left + 5 * P + 4 * gap + 40
    write("ai-models-for-vector-art", "compared.svg", svg(w, top + 3 * (P + lab) + 2 * gap + 12, "\n".join(body)))


def model_gallery(model):
    """One model's six results from the comparison set."""
    import json

    data = json.load(open(os.path.join(GEN, "samples.json")))
    # A gallery of chosen rounds where there is one, else the comparison set.
    cells = data.get("gallery", {}).get(model) or [data["compare"][name][model] for name in data["compare"]]
    P, gap, top, left, lab = 240, 16, 32, 40, 44
    cols = 2 if len(cells) == 4 else min(3, len(cells))
    rows = (len(cells) + cols - 1) // cols
    if len(cells) == 1:
        P = 360  # a single example, shown larger
    body = []
    for k, sample in enumerate(cells):
        r, c = divmod(k, cols)
        body.append(gen_cell(sample, left + c * (P + gap), top + r * (P + lab + gap), P))
    w = left + cols * P + (cols - 1) * gap + 40
    slug, name = MODEL_SLUGS[model]
    write(slug, f"{name}.svg", svg(w, top + rows * (P + lab) + (rows - 1) * gap + 12, "\n".join(body)))


SKETCHES = {
    # photo, clean ink, the drawing's own width, and the square around it in those units
    "fox": ("what-is-vtracer/fox-sketch.webp", "pencil-to-vector/fox-ink.webp", 768, (102, 211, 640)),
    "cats": ("pencil-to-vector/cats-photo.webp", "pencil-to-vector/cats-ink.webp", 808, (24, 130, 760)),
    # The same drawing, photographed again: the sketch behind the line art round.
    "cats2": ("pencil-to-vector/cats2-photo.webp", "pencil-to-vector/cats2-ink.webp", 792, (16, 130, 760)),
}


def sketch_and_ink(body, x, top, P, which="fox"):
    """A photographed sketch, then the clean ink VTracer lifts from it.

    Both are cropped to the same square around the drawing. Returns the x
    where the next panel can start, after an arrow.
    """
    from PIL import Image

    photo_path, ink_path, width, (cx, cy, side) = SKETCHES[which]
    for k, path in enumerate((photo_path, ink_path)):
        im = Image.open(os.path.join(SRC, path)).convert("RGB")
        s = im.width / width
        cell = im.crop(tuple(round(v * s) for v in (cx, cy, cx + side, cy + side))).resize((P * 2, P * 2), Image.LANCZOS)
        xx = x + k * (P + 64)
        body.append(f'<image x="{f(xx)}" y="{top}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(cell, 80)}"/>')
        body.append(f'<rect x="{f(xx)}" y="{top}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        body.append(arrow(xx + P + 12, top + P / 2, xx + P + 52))
    return x + 2 * (P + 64)


def pencil_cats():
    """The three cats: the photo, the clean ink, and the line art generated from it."""
    import json

    sample = json.load(open(os.path.join(GEN, "samples.json")))["pencil_cats"]
    P, top, left = 260, 32, 40
    body = []
    x = sketch_and_ink(body, left, top, P, "cats2")
    body.append(gen_cell(sample, x, top, P, label=False, tight=True))
    write("pencil-to-vector", "cats.svg", svg(x + P + 40, top + P + 32, "\n".join(body)))


def strength_series():
    """The fox sketch, its clean ink, then Z-Image Turbo at rising image-to-image strength."""
    import json

    # Two strengths, labelled as shown in the article: 0.6 behaves like 0.5 here.
    show = {0.6: "0.5", 0.75: "0.75"}
    series = [s for s in json.load(open(os.path.join(GEN, "samples.json")))["strength"] if s["strength"] in show]
    P, gap, top, left = 200, 14, 32, 40
    body = []
    x = sketch_and_ink(body, left, top, P)
    for k, s in enumerate(series):
        xx = x + k * (P + gap)
        body.append(gen_cell(s, xx, top, P, label=False))
        body.append(text(xx + P / 2, top + P + 32, show[s["strength"]], 22, FG))
    w = x + len(series) * (P + gap) - gap + 40
    write("text-to-image-and-image-to-image", "strength.svg", svg(w, top + P + 60, "\n".join(body)))


def pencil_steps():
    """Pencil to vector in three steps: the photo, the clean ink, the finished trace."""
    import re

    P, top, left = 260, 32, 40
    body = []
    x = sketch_and_ink(body, left, top, P)
    src = open(os.path.join(SRC, "what-is-vtracer", "fox.svg")).read()
    inner = re.search(r"<svg[^>]*>(.*)</svg>", src, re.S).group(1)
    body.append(f'<rect x="{x}" y="{top}" width="{P}" height="{P}" fill="{CANVAS}"/>')
    body.append(f'<svg x="{x}" y="{top}" width="{P}" height="{P}" viewBox="96 104 336 336">{inner}</svg>')
    body.append(f'<rect x="{x}" y="{top}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
    write("pencil-to-vector", "steps.svg", svg(x + P + 40, top + P + 32, "\n".join(body)))


def codex_figures():
    """OpenAI Codex: eight art styles, one round before and after tracing, and the fox sketch."""
    import json

    from PIL import Image

    slug = "chatgpt-codex-vector-art"
    codex = json.load(open(os.path.join(GEN, "samples.json")))["codex"]
    # Eight styles, numbered as in the article's table.
    P, gap, top, left, lab = 220, 14, 32, 40, 80
    body = []
    for k, (style, sample) in enumerate(codex["styles"].items()):
        r, c = divmod(k, 4)
        x = left + c * (P + gap)
        y = top + r * (P + lab + gap)
        body.append(gen_cell(sample, x, y, P))
        body.append(numbered(x + P / 2, y + P + 58, k + 1, STYLE_NAMES[style]))
    write(slug, "styles.svg", svg(left + 4 * P + 3 * gap + 40, top + 2 * (P + lab) + gap + 8, "\n".join(body)))
    # One round: the image Codex returned, then its trace.
    P, top, left, gap = 320, 32, 40, 110
    gen = Image.open(os.path.join(GEN, "codex-round-generated.webp")).convert("RGB").resize((P * 2, P * 2), Image.LANCZOS)
    x2 = left + P + gap
    r = codex["round"]
    body = [
        f'<image x="{left}" y="{top}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(gen, 82)}"/>',
        f'<rect x="{left}" y="{top}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>',
        gen_cell(r, x2, top, P, label=False),
        arrow(left + P + 24, top + P / 2, x2 - 24),
        text(left + P / 2, top + P + 36, f"{r['image'][0]} × {r['image'][1]}", 20, FG),
        text(x2 + P / 2, top + P + 36, f"SVG · {r['paths']} paths · {kb_size(r['svg_bytes'])}", 20, FG),
    ]
    write(slug, "round.svg", svg(x2 + P + 40, top + P + 64, "\n".join(body)))
    # From the three cats sketch: photo, clean ink, then the color result.
    P, top, left = 240, 32, 40
    body = []
    x = sketch_and_ink(body, left, top, P, "cats")
    body.append(gen_cell(codex["sketch"]["plain"], x, top, P))
    write(slug, "sketch.svg", svg(x + P + 40, top + P + 56, "\n".join(body)))


def reference_edit():
    """Editing with a reference image: the earlier fox, the prompt's new words, the result.

    FLUX.2 klein in reference mode: the reference is an earlier round's
    image; the prompt asks for a new expression; the character, colors
    and pose carry over.
    """
    from PIL import Image

    slug = "text-to-image-and-image-to-image"
    d = os.path.join(SRC, slug)
    P, top, left = 300, 40, 40
    crop = (80, 104, 432, 456)  # the fox, in the 512 × 512 images
    ref = Image.open(os.path.join(d, "fox-reference.webp")).convert("RGB").crop(crop).resize((P * 2, P * 2), Image.LANCZOS)
    k = P * 2 / (crop[2] - crop[0])
    res = render_svg(os.path.join(d, "fox-reference-edit.svg"), round(512 * k), "white")
    res = res.crop(tuple(round(v * k) for v in crop)).resize((P * 2, P * 2), Image.LANCZOS)
    chips = ["smiling", "mouth open", "open eyes"]
    size, cw, pad, chh, cgap = 22, 13.2, 18, 44, 12
    col = max(len(c) for c in chips) * cw + 2 * pad
    gap = col + 2 * 48
    x2 = left + P + gap
    mid = left + P + gap / 2
    body = [
        f'<image x="{left}" y="{top}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(ref, 82)}"/>',
        f'<image x="{x2}" y="{top}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(res, 82)}"/>',
    ]
    stack = len(chips) * chh + (len(chips) - 1) * cgap
    cy = top + P / 2 - stack / 2 - 26
    for c in chips:
        wdt = len(c) * cw + 2 * pad
        body.append(
            f'<rect x="{f(mid - wdt / 2)}" y="{f(cy)}" width="{f(wdt)}" height="{chh}" rx="{chh / 2}" '
            f'fill="#1f1f1f" stroke="{DIM}" stroke-width="1.5"/>'
        )
        body.append(text(mid, cy + chh / 2 + size * 0.36, c, size, FG))
        cy += chh + cgap
    body.append(arrow(mid - col / 2, cy + 26, mid + col / 2))
    for x in (left, x2):
        body.append(f'<rect x="{x}" y="{top}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
    write(slug, "reference.svg", svg(x2 + P + 40, top + P + 40, "\n".join(body)))


def denoising():
    """An illustration of diffusion: an image emerging from noise over a few steps."""
    import numpy as np
    from PIL import Image

    im = Image.open(os.path.join(SRC, "gen-ai-lab", "fox-cartoon-generated.webp")).convert("RGB").resize((360, 360), Image.LANCZOS)
    a = np.asarray(im).astype(float) / 255
    rng = np.random.default_rng(42)
    noise = rng.standard_normal(a.shape) * 0.5 + 0.5
    levels = [1.0, 0.8, 0.55, 0.3, 0.0]  # share of noise left, step by step
    P, gap, top, left = 180, 44, 32, 40
    body = []
    for k, t in enumerate(levels):
        mix = np.clip(a * (1 - t) + noise * t, 0, 1)
        cell = Image.fromarray((mix * 255).astype(np.uint8))
        x = left + k * (P + gap)
        body.append(f'<image x="{x}" y="{top}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(cell, 80)}"/>')
        body.append(f'<rect x="{x}" y="{top}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        body.append(text(x + P / 2, top + P + 32, str(k), 22, FG))
        if k:
            body.append(arrow(x - gap + 8, top + P / 2, x - 8))
    w = left + len(levels) * (P + gap) - gap + 40
    write("diffusion-models", "denoising.svg", svg(w, top + P + 60, "\n".join(body)))


def gradient_steps():
    """One image traced by VTracer 2 at gradient step 0, 16 and 32, and 32 with mesh gradients.

    The first panel is the whole source with the close-up marked; the rest
    are that close-up, from the source and from each trace, labelled with
    the gradient step and the file size.
    """
    import subprocess
    import tempfile

    from PIL import Image

    slug = "gradient-step"
    d = os.path.join(SRC, slug)
    src = os.path.join(d, "girl.webp")
    traces = [
        ("girl-step-0.svg", "0"),
        ("girl-step-16.svg", "16"),
        ("girl-step-32.svg", "32"),
        ("girl-step-32-mesh.svg", "32 + mesh"),
    ]
    cx, cy, cw_, ch_ = 100, 160, 240, 180  # the close-up, in source pixels
    pw, ph, gap, top, left, lab = 300, 225, 20, 40, 40, 76
    res = 2
    im = Image.open(src).convert("RGB")
    scale = pw * res / cw_

    def crop(full):
        x0, y0 = round(cx * scale), round(cy * scale)
        return full.crop((x0, y0, x0 + round(pw * res), y0 + round(ph * res)))

    cells = []
    # 1: the whole source, letterboxed, with the close-up marked.
    whole = Image.new("RGB", (pw * res, ph * res), "white")
    side = ph * res
    whole.paste(im.resize((side, side), Image.LANCZOS), ((pw * res - side) // 2, 0))
    cells.append((whole, None))
    big = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    cells.append((crop(big), None))
    with tempfile.TemporaryDirectory() as tmp:
        for name, label in traces:
            out = os.path.join(tmp, name + ".png")
            path = os.path.join(d, name)
            subprocess.run(["resvg", "-w", str(round(im.width * scale)), "--background", "white", path, out], check=True)
            paths = open(path).read().count("<path")
            cells.append((crop(Image.open(out).convert("RGB")), (label, f"{paths} paths · {file_size(path)}")))
    body = []
    for k, (cell, label) in enumerate(cells):
        r, c = divmod(k, 3)
        x = left + c * (pw + gap)
        y = top + r * (ph + lab + gap)
        body.append(f'<image x="{x}" y="{y}" width="{pw}" height="{ph}" href="data:image/webp;base64,{webp_data(cell, 82)}"/>')
        body.append(f'<rect x="{x}" y="{y}" width="{pw}" height="{ph}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        if k == 0:
            s = ph / im.height
            ox = x + (pw - ph) / 2
            body.append(
                f'<rect x="{f(ox + cx * s)}" y="{f(y + cy * s)}" width="{f(cw_ * s)}" height="{f(ch_ * s)}" '
                f'fill="none" stroke="{GOLD}" stroke-width="2.5"/>'
            )
        if label:
            body.append(text(x + pw / 2, y + ph + 34, label[0], 22, FG))
            body.append(text(x + pw / 2, y + ph + 62, label[1], 18, MUTED))
    w = left + 3 * pw + 2 * gap + 40
    write(slug, "steps.svg", svg(w, top + 2 * (ph + lab) + gap + 24, "\n".join(body)))


def gradient_mesh():
    """The clay-like girl whole: the source, step 32, and step 32 with mesh gradients.

    Used by both gradient-step and mesh-gradients. Each trace is labelled
    with its path count and file size.
    """
    from PIL import Image

    d = os.path.join(SRC, "gradient-step")
    P, gap, top, left, res = 300, 20, 40, 40, 2
    im = Image.open(os.path.join(d, "girl.webp")).convert("RGB")
    cells = [(im.resize((P * res, P * res), Image.LANCZOS), (f"{im.width} × {im.height}", file_size(os.path.join(d, "girl.webp"))))]
    for name, label in [("girl-step-32.svg", "32"), ("girl-step-32-mesh.svg", "32 + mesh")]:
        path = os.path.join(d, name)
        paths = open(path).read().count("<path")
        cells.append((render_svg(path, P * res, "white"), (label, f"{paths} paths · {file_size(path)}")))
    body = []
    for k, (cell, (l1, l2)) in enumerate(cells):
        x = left + k * (P + gap)
        body.append(f'<image x="{x}" y="{top}" width="{P}" height="{P}" href="data:image/webp;base64,{webp_data(cell, 82)}"/>')
        body.append(f'<rect x="{x}" y="{top}" width="{P}" height="{P}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        body.append(text(x + P / 2, top + P + 34, l1, 22, FG))
        body.append(text(x + P / 2, top + P + 62, l2, 18, MUTED))
    write("gradient-step", "mesh.svg", svg(left + 3 * P + 2 * gap + 40, top + P + 88, "\n".join(body)))


def struggles():
    """A smooth gradient and a JPEG-damaged drawing, beside their VTracer 1 traces."""
    slug = "color-clustering"
    d = os.path.join(SRC, slug)
    top, pair_gap, gap = 40, 20, 72
    gw, gh = 300, 200
    dw = 200
    x = 40
    body = []
    items = [
        ("gradient.png", "gradient-vt1.svg", gw, "PNG"),
        ("drop.jpg", "drop-jpeg-vt1.svg", dw, "JPEG"),
    ]
    for src, trace, w, label in items:
        body.append(raster(os.path.join(d, src), x, top, w, gh, nearest=label == "JPEG"))
        body.append(text(x + w / 2, top + gh + 40, label, 22, FG))
        x2 = x + w + pair_gap
        body.append(nested_svg(os.path.join(d, trace), x2, top, w, gh))
        body.append(text(x2 + w / 2, top + gh + 40, "SVG", 22, FG))
        for bx in (x, x2):
            body.append(f'<rect x="{bx}" y="{top}" width="{w}" height="{gh}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        x = x2 + w + gap
    write(slug, "where-clustering-struggles.svg", svg(x - gap + 40, top + gh + 64, "\n".join(body)))


def stacked_cutout():
    """The drop with its highlight, pulled into pieces both ways.

    Gold marks every outline the file has to describe: in stacked mode the
    drop's edge and the highlight's edge appear once; in cutout, twice.
    """
    slug = "stacked-vs-cutout"
    s, top, gap = 200, 40, 56
    rowh = s + 64
    left = 190
    body = []
    for row, mode in enumerate(("stacked", "cutout")):
        y = top + row * rowh
        body.append(text(left - 36, y + s / 2 + 8, mode, 24, FG, anchor="end"))
        xs = [left + i * (s + gap) for i in range(3)]
        dr = [Drop(x + s / 2, y + s * 0.6, s * 0.28, s * 0.46) for x in xs]
        hl = [ellipse_path(*hl_geom(dd)) for dd in dr]
        edge = f'fill="none" stroke="{GOLD}" stroke-width="3"'
        # 1: the background.
        if mode == "stacked":
            body.append(f'<rect x="{xs[0]}" y="{y}" width="{s}" height="{s}" fill="{EMPTY}" stroke="{DIM}" stroke-width="1.5"/>')
        else:
            body.append(
                f'<path d="M{xs[0]} {y} h{s} v{s} h-{s} Z {dr[0].path()}" fill="{EMPTY}" fill-rule="evenodd" '
                f'stroke="{DIM}" stroke-width="1.5"/>'
            )
            body.append(f'<path d="{dr[0].path()}" {edge}/>')
        # 2: the drop.
        if mode == "stacked":
            body.append(f'<path d="{dr[1].path()}" fill="{BRAND}"/>')
        else:
            body.append(f'<path d="{dr[1].path()} {hl[1]}" fill="{BRAND}" fill-rule="evenodd"/>')
            body.append(f'<path d="{hl[1]}" {edge}/>')
        body.append(f'<path d="{dr[1].path()}" {edge}/>')
        # 3: the highlight.
        body.append(f'<path d="{hl[2]}" fill="{HL}"/>')
        body.append(f'<path d="{hl[2]}" {edge}/>')
    w = left + 3 * s + 2 * gap + 40
    write(slug, "stacked-vs-cutout.svg", svg(w, top + 2 * rowh - 24, "\n".join(body)))


def silhouette():
    """The fox, its bottom layer alone, and that layer used as a sticker border."""
    import re

    slug = "stacked-vs-cutout"
    src = open(os.path.join(SRC, "what-is-vtracer", "fox.svg")).read()
    paths = re.findall(r"<path [^>]*/>", src)
    base = re.search(r' d="([^"]+)"', paths[0]).group(1)
    allp = "\n".join(paths)
    bx, by, bw, bh = 128, 110, 271, 340
    h, top, gap = 440, 40, 72
    w = h * bw / bh
    vb = f'viewBox="{bx} {by} {bw} {bh}"'
    xs = [60 + i * (w + gap) for i in range(3)]
    body = [
        f'<svg x="{f(xs[0])}" y="{top}" width="{f(w)}" height="{h}" {vb}>{allp}</svg>',
        f'<svg x="{f(xs[1])}" y="{top}" width="{f(w)}" height="{h}" {vb}><path d="{base}" fill="{BRAND}"/></svg>',
        f'<svg x="{f(xs[2])}" y="{top}" width="{f(w)}" height="{h}" {vb}>'
        f'<path d="{base}" fill="#ffffff" stroke="#ffffff" stroke-width="18" stroke-linejoin="round"/>'
        f'<path d="{base}" fill="none" stroke="{MUTED}" stroke-width="2" stroke-dasharray="6 5" '
        f'transform="translate(0 0)" style="display:none"/>{allp}</svg>',
    ]
    for i in range(2):
        body.append(arrow(xs[i] + w + 16, top + h / 2, xs[i + 1] - 16))
    write(slug, "silhouette.svg", svg(round(xs[2] + w + 60), h + 2 * top, "\n".join(body)))


def parse_anchors(d):
    """End points of each command in a path, absolute; enough to mark nodes."""
    import re

    toks = re.findall(r"[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?", d)
    pts, i, cmd = [], 0, None
    x = y = sx = sy = 0.0
    argc = {"M": 2, "L": 2, "C": 6, "H": 1, "V": 1, "Z": 0, "Q": 4, "S": 4}
    while i < len(toks):
        if toks[i].isalpha():
            cmd = toks[i]
            i += 1
            if cmd in "Zz":
                x, y = sx, sy
                continue
        up = cmd.upper()
        args = [float(t) for t in toks[i : i + argc[up]]]
        i += argc[up]
        rel = cmd.islower()
        if up == "H":
            x = x + args[0] if rel else args[0]
        elif up == "V":
            y = y + args[0] if rel else args[0]
        else:
            ex, ey = args[-2], args[-1]
            x, y = (x + ex, y + ey) if rel else (ex, ey)
        if up == "M":
            sx, sy = x, y
            cmd = "l" if rel else "L"
        pts.append((x, y))
    return pts


def curve_modes():
    """One small drop traced as pixel, polygon and spline, with its nodes."""
    import re

    slug = "curve-fitting"
    d = os.path.join(SRC, slug)
    from PIL import Image

    src = Image.open(os.path.join(d, "drop.png"))
    n = src.width
    s, top, gap = 280, 40, 56
    body = []
    for idx, mode in enumerate(("pixel", "polygon", "spline")):
        x = 40 + idx * (s + gap)
        body.append(raster(os.path.join(d, "drop.png"), x, top, s, s, nearest=True).replace("<image ", '<image opacity="0.28" '))
        svgsrc = open(os.path.join(d, f"drop-{mode}.svg")).read()
        dpath = re.findall(r' d="([^"]+)"', svgsrc)[-1]
        k = s / n
        body.append(
            f'<g transform="translate({x} {top}) scale({f(k)})">'
            f'<path d="{dpath}" fill="none" stroke="{FG}" stroke-width="{f(2 / k)}" stroke-linejoin="round"/></g>'
        )
        anchors = parse_anchors(dpath)
        # The closing point repeats the start; count each node once.
        uniq = []
        for p in anchors:
            if not uniq or abs(p[0] - uniq[-1][0]) + abs(p[1] - uniq[-1][1]) > 1e-6:
                uniq.append(p)
        if len(uniq) > 1 and abs(uniq[0][0] - uniq[-1][0]) + abs(uniq[0][1] - uniq[-1][1]) < 1e-6:
            uniq.pop()
        for px, py in uniq:
            body.append(f'<rect x="{f(x + px * k - 4)}" y="{f(top + py * k - 4)}" width="8" height="8" fill="{GOLD}"/>')
        body.append(f'<rect x="{x}" y="{top}" width="{s}" height="{s}" fill="none" stroke="{GRID}" stroke-width="1.5"/>')
        body.append(text(x + s / 2, top + s + 44, f"{mode} · {len(uniq)}", 22, FG))
        print(f"curve modes: {mode} has {len(uniq)} nodes")
    write(slug, "modes.svg", svg(40 + 3 * s + 2 * gap + 40, top + s + 72, "\n".join(body)))


def ui_badge(x, y, n):
    """A filled step number, for marking a screenshot."""
    return (
        f'<circle cx="{f(x)}" cy="{f(y)}" r="17" fill="{BRAND}" stroke="{BG}" stroke-width="3"/>'
        + text(x, y + 6.5, str(n), 18, "#ffffff", weight=700)
    )


def ui_box(x0, y0, x1, y1, r=8):
    return (
        f'<rect x="{f(x0)}" y="{f(y0)}" width="{f(x1 - x0)}" height="{f(y1 - y0)}" rx="{r}" '
        f'fill="none" stroke="{BRAND}" stroke-width="3"/>'
    )


APP_CROP = (56, 38, 1496, 848)  # the app window in a 1552 × 922 macOS screenshot


def app_shot(slug, name, marks, blur=()):
    """An app screenshot cropped to its window (no macOS shadow), marked with steps.

    Screenshots live in scripts/kb-sources/images/<slug>/ and are kept out
    of git (.gitignore): the figure embeds them. marks and blur are in the
    screenshot's own pixels; blur hides personal details, such as an email.
    Returns False, keeping the figure as it is, if the screenshot is missing.
    """
    from PIL import Image, ImageFilter

    src = os.path.join(SRC, slug, name + ".png")
    if not os.path.exists(src):
        print("skipped", slug, name, "(screenshot not present)")
        return False
    im = Image.open(src).convert("RGBA")
    for box in blur:
        im.paste(im.crop(box).filter(ImageFilter.GaussianBlur(7)), box[:2])
    ox, oy = APP_CROP[0], APP_CROP[1]
    im = im.crop(APP_CROP)
    w, h = im.size
    body = [f'<image width="{w}" height="{h}" href="data:image/webp;base64,{webp_data(im, 90)}"/>']
    for kind, *v in marks:
        if kind == "box":
            x0, y0, x1, y1 = v
            body.append(ui_box(x0 - ox, y0 - oy, x1 - ox, y1 - oy))
        else:
            x, y, n = v
            body.append(ui_badge(x - ox, y - oy, n))
    write(slug, name + ".svg", svg(w, h, "\n".join(body)))
    return True


def reference_steps():
    """The two app screenshots for the reference-image tutorial, marked with its steps."""
    slug = "edit-with-a-reference-image"
    # 1. The round's ⋯ menu, and its Use as reference image item; and the
    # Generate button, for step 3.
    app_shot(slug, "round-menu", [
        ("box", 210, 212, 238, 236),
        ("box", 80, 245, 233, 275),
        ("badge", 262, 260, 1),
        ("box", 1185, 697, 1461, 733),
        ("badge", 1160, 715, 3),
    ])
    # 2. The new Pending round; the image in the Sketch panel, in Reference mode.
    # 3. The prompt to edit.
    app_shot(slug, "pending-round", [
        ("box", 64, 117, 243, 203),
        ("badge", 262, 160, 2),
        ("box", 1185, 174, 1461, 448),
        ("box", 1187, 457, 1314, 490),
        ("badge", 1160, 194, 2),
        ("box", 1183, 606, 1463, 770),
        ("badge", 1160, 626, 3),
    ])


def codex_setup():
    """Setting up Codex: the Model section's settings button, the Vendor tab, the model menu."""
    slug = "chatgpt-codex-vector-art"
    # 1. The settings button beside the model menu. 3. OpenAI Codex, signed in.
    app_shot(slug, "model-menu", [
        ("box", 1433, 142, 1460, 169),
        ("badge", 1446, 112, 1),
        ("box", 1190, 446, 1426, 477),
        ("badge", 1160, 462, 3),
    ])
    # 2. The Vendor tab, and Codex signed in, with its install path. The
    # account's email is blurred.
    app_shot(slug, "codex-settings", [
        ("box", 618, 160, 676, 194),
        ("badge", 700, 145, 2),
        ("box", 517, 309, 1035, 407),
        ("badge", 497, 358, 2),
    ], blur=[(634, 324, 768, 348)])

raster_vs_vector()
photo_vs_trace()
sticker()
zoom_800()
separations()
laser()
extrude()
example()
path_anatomy()
painting_order()
prompt_to_vector()
pencil_to_vector()
workflow()
stages()
image_tree()
watershed()
vt1_vs_vt2()
mesh_gradient()
gradient_steps()
gradient_mesh()
mesh_blush()
art_styles()
gen_round()
models_compared()
for _m in MODEL_NAMES:
    if MODEL_SLUGS[_m]:
        model_gallery(_m)
strength_series()
denoising()
reference_edit()
pencil_steps()
pencil_cats()
codex_figures()
struggles()
stacked_cutout()
silhouette()
curve_modes()
reference_steps()
codex_setup()
