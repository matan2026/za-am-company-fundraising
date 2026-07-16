"""Generate neutral campaign placeholders. Does not create or imitate real photos."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).parents[1] / "public" / "images"
CHARCOAL = "#171d19"
OLIVE = "#59624a"
SAND = "#d7c5a5"
RED = "#a63b32"


def draw_hebrew_right(
    draw: ImageDraw.ImageDraw,
    text: str,
    y: int,
    font: ImageFont.FreeTypeFont,
    fill: str,
    right: int = 1110,
) -> None:
    # Pillow in the bundled runtime has no libraqm. Hebrew glyphs are therefore
    # painted in visual order so the exported bitmap reads correctly RTL.
    visual = text[::-1]
    box = draw.textbbox((0, 0), visual, font=font)
    draw.text((right - (box[2] - box[0]), y), visual, font=font, fill=fill)


def make_og_cover() -> None:
    image = Image.new("RGB", (1200, 630), CHARCOAL)
    draw = ImageDraw.Draw(image)
    draw.polygon([(0, 0), (380, 0), (570, 630), (0, 630)], fill=OLIVE)
    draw.polygon([(0, 510), (220, 630), (0, 630)], fill=SAND)
    draw.rectangle((1050, 65, 1070, 175), fill=RED)

    title = ImageFont.truetype(r"C:\Windows\Fonts\gishabd.ttf", 62)
    subtitle = ImageFont.truetype(r"C:\Windows\Fonts\gisha.ttf", 31)
    draw_hebrew_right(draw, "פלוגת זעם צריכה אתכם", 190, title, SAND)
    draw_hebrew_right(draw, "איתה בקו", 275, title, SAND)
    draw.text((650, 410), "7421", font=subtitle, fill="#aeb69d")
    draw_hebrew_right(draw, "גדוד", 410, subtitle, "#aeb69d", right=835)
    draw.text((866, 410), "|", font=subtitle, fill=RED)
    draw.text((915, 410), "4", font=subtitle, fill="#aeb69d")
    draw_hebrew_right(draw, "חטיבה", 410, subtitle, "#aeb69d")
    image.save(ROOT / "og-cover.webp", "WEBP", quality=90, method=6)


if __name__ == "__main__":
    make_og_cover()
