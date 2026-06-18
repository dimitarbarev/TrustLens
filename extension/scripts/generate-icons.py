#!/usr/bin/env python3
"""Generate TrustLens extension icons from custom artwork or a simple fallback."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ASSETS_DIR = Path(__file__).resolve().parent.parent / "assets"
OUTPUT_DIR = ASSETS_DIR / "icons"
SOURCE_IMAGE = ASSETS_DIR / "icon-source.png"
SIZES = (16, 32, 48, 128, 512)


def _scale(size: int, value: float) -> float:
    return value * size / 128


def draw_fallback_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = _scale(size, 8)
    radius = _scale(size, 24)
    draw.rounded_rectangle(
        (margin, margin, size - margin, size - margin),
        radius=radius,
        fill=(37, 99, 235, 255),
    )

    head_cx = _scale(size, 52)
    head_cy = _scale(size, 54)
    head_r = _scale(size, 22)
    draw.ellipse(
        (
            head_cx - head_r,
            head_cy - head_r,
            head_cx + head_r,
            head_cy + head_r,
        ),
        fill=(245, 203, 167, 255),
    )

    phone_w = _scale(size, 28)
    phone_h = _scale(size, 44)
    phone_x = head_cx + _scale(size, 8)
    phone_y = head_cy + _scale(size, 6)
    draw.rounded_rectangle(
        (phone_x, phone_y, phone_x + phone_w, phone_y + phone_h),
        radius=_scale(size, 6),
        fill=(31, 41, 55, 255),
    )

    return img


def resize_source_icon(size: int, source: Image.Image) -> Image.Image:
    return source.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    source = Image.open(SOURCE_IMAGE).convert("RGBA") if SOURCE_IMAGE.exists() else None

    for size in SIZES:
        icon = resize_source_icon(size, source) if source else draw_fallback_icon(size)

        if size == 512:
            icon.save(ASSETS_DIR / "icon.png", format="PNG", optimize=True)
        else:
            icon.save(OUTPUT_DIR / f"icon-{size}.png", format="PNG", optimize=True)
            icon.save(ASSETS_DIR / f"icon-{size}.png", format="PNG", optimize=True)

    if source:
        print(f"Generated icons from {SOURCE_IMAGE}")
    else:
        print("Generated fallback icons (no icon-source.png found)")

    print(f"Output: {OUTPUT_DIR} and {ASSETS_DIR}")


if __name__ == "__main__":
    main()
