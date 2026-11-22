"""Traces the knowledge base's sample images with VTracer 1, the open-source engine.

    python3 -m venv .venv && .venv/bin/pip install --pre vtracer pillow numpy
    .venv/bin/python scripts/kb-traces.py

Draws small sample rasters, traces them with the `vtracer` Python package
(1.0 or later), and writes both into scripts/kb-sources/images/<slug>/. Then
scripts/kb-diagrams.py draws the figures from them. The numbers quoted in
the articles (file sizes, node counts) come from these runs; it prints them.
"""
import math
import os
import re

import numpy as np
import vtracer
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "scripts/kb-sources/images")  # sources, not served

BRAND = (0, 136, 247)
BRAND_DARK = (0, 80, 143)
PAPER = (250, 250, 247)
WHITE = (255, 255, 255)


def drop_mask(size, cx, cy, r, d, ss=8):
    """Anti-aliased coverage of the site's drop: a circle with a point above it."""
    n = size * ss
    ys, xs = np.mgrid[0:n, 0:n]
    x = (xs + 0.5) / ss
    y = (ys + 0.5) / ss
    circle = (x - cx) ** 2 + (y - cy) ** 2 <= r * r
    # The cone from the tip down to the tangent points.
    th = math.acos(r / d)
    tipx, tipy = cx, cy - d
    dx, dy = x - tipx, y - tipy
    ang = np.abs(np.arctan2(dx, dy))  # angle from straight down
    half = math.pi / 2 - th
    # Only down to the tangent points, where the sides meet the circle.
    cone = (ang <= half) & (dy >= 0) & (dy <= (d * d - r * r) / d)
    inside = circle | cone
    return inside.reshape(size, ss, size, ss).mean(axis=(1, 3))


def blend(base, color, cov):
    c = np.array(color, float)
    return base * (1 - cov[..., None]) + c * cov[..., None]


def write_png(slug, name, arr):
    d = os.path.join(OUT, slug)
    os.makedirs(d, exist_ok=True)
    path = os.path.join(d, name)
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(path)
    return path


def trace(src, slug, name, **cfg):
    out = os.path.join(OUT, slug, name)
    vtracer.Config(**cfg).convert_file(src, out)
    svg = open(out).read()
    d = " ".join(re.findall(r' d="([^"]+)"', svg))
    cmds = len(re.findall(r"[A-Za-z]", d))
    print(f"{slug}/{name}: {os.path.getsize(out)} bytes, {svg.count('<path')} paths, {cmds} commands")
    return out


def curve_fitting():
    """One small drop traced in each curve-fitting mode."""
    slug = "curve-fitting"
    s = 40
    img = np.full((s, s, 3), PAPER, float)
    img = blend(img, BRAND, drop_mask(s, 20, 25, 11, 19))
    src = write_png(slug, "drop.png", img)
    trace(src, slug, "drop-pixel.svg", mode="pixel")
    trace(src, slug, "drop-polygon.svg", mode="polygon")
    trace(src, slug, "drop-spline.svg", mode="spline")


def struggles():
    """A smooth gradient and a JPEG-damaged drawing, each traced by VTracer 1."""
    slug = "color-clustering"
    w, h = 240, 160
    # A sunset sky over a dark hill: smooth color everywhere but the hill.
    t = np.linspace(0, 1, h)[:, None, None]
    top, bottom = np.array((24, 42, 84), float), np.array((240, 150, 80), float)
    sky = top * (1 - t) + bottom * t
    img = np.broadcast_to(sky, (h, w, 3)).copy()
    yy, xx = np.mgrid[0:h, 0:w]
    hill = yy > 122 + 14 * np.sin(xx / 38.0)
    img[hill] = (18, 22, 30)
    src = write_png(slug, "gradient.png", img)
    trace(src, slug, "gradient-vt1.svg")
    # The drop with a highlight, saved as a heavily compressed JPEG.
    s = 120
    img = np.full((s, s, 3), PAPER, float)
    img = blend(img, BRAND, drop_mask(s, 60, 74, 34, 58))
    hx, hy = np.mgrid[0:s, 0:s][1], np.mgrid[0:s, 0:s][0]
    shine = ((hx - 48) ** 2 / 9**2 + (hy - 70) ** 2 / 15**2) <= 1
    img[shine] = WHITE
    png = os.path.join(OUT, slug, "drop-jpeg.png")
    Image.fromarray(img.astype(np.uint8)).save(png)
    jpg = os.path.join(OUT, slug, "drop.jpg")
    Image.open(png).save(jpg, quality=12)
    os.remove(png)
    trace(jpg, slug, "drop-jpeg-vt1.svg")


def stacked_vs_cutout():
    """The drop with a highlight, traced stacked and cutout."""
    slug = "stacked-vs-cutout"
    s = 120
    img = np.full((s, s, 3), PAPER, float)
    img = blend(img, BRAND, drop_mask(s, 60, 74, 34, 58))
    yy, xx = np.mgrid[0:s, 0:s]
    shine = ((xx - 48) ** 2 / 9**2 + (yy - 70) ** 2 / 15**2) <= 1
    img[shine] = WHITE
    src = write_png(slug, "drop.png", img)
    trace(src, slug, "drop-stacked.svg")
    trace(src, slug, "drop-cutout.svg", hierarchical="cutout")


def measure():
    """File sizes quoted in the articles, for images already in the knowledge base."""
    import tempfile

    images = {
        "lion badge": os.path.join(OUT, "why-convert-images-to-vector", "lion-badge.png"),
        "photo": os.path.join(
            OUT,
            "what-are-vector-graphics",
            "friendly-cat-and-dog-sitting-together-isolated-on-white-background-photo.jpg",
        ),
    }
    runs = {
        "stacked": {},
        "cutout": {"hierarchical": "cutout"},
        "pixel": {"mode": "pixel"},
        "polygon": {"mode": "polygon"},
        "spline + simplify 1.5": {"simplify": 1.5},
    }
    with tempfile.TemporaryDirectory() as tmp:
        for name, path in images.items():
            im = Image.open(path).convert("RGB")
            if im.width > 800:  # the photo, traced at 800 pixels wide
                im = im.resize((800, round(800 * im.height / im.width)), Image.LANCZOS)
            src = os.path.join(tmp, "in.png")
            im.save(src)
            for run, cfg in runs.items():
                out = os.path.join(tmp, "out.svg")
                vtracer.Config(**cfg).convert_file(src, out)
                svg = open(out).read()
                d = " ".join(re.findall(r' d="([^"]+)"', svg))
                cmds = len(re.findall(r"[A-Za-z]", d))
                print(f"{name} {im.width}x{im.height}, {run}: {os.path.getsize(out)} bytes, {cmds} commands")


def vt1_vs_vt2():
    """VTracer 1 traces of the images the landing page shows traced by VTracer 2."""
    import tempfile

    slug = "vtracer-1-vs-vtracer-2"
    os.makedirs(os.path.join(OUT, slug), exist_ok=True)
    sources = {
        "corgi-noise": os.path.join(ROOT, "public/compare/corgi-noise.webp"),
        "lion-badge": os.path.join(OUT, "why-convert-images-to-vector/lion-badge.png"),
        "cityscape-sunset": os.path.join(ROOT, "public/compare/cityscape-sunset.jpg"),
    }
    with tempfile.TemporaryDirectory() as tmp:
        for name, path in sources.items():
            src = os.path.join(tmp, name + ".png")
            Image.open(path).convert("RGB").save(src)
            trace(src, slug, f"{name}-vt1.svg")


curve_fitting()
struggles()
vt1_vs_vt2()
stacked_vs_cutout()
measure()
