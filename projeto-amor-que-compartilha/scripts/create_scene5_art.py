import numpy as np
from PIL import Image, ImageDraw, ImageFilter

w, h = 1080, 1920

# 1. Base gradient: Deep celestial twilight transitioning to warm golden dawn
# Top: deep midnight blue (#0b1329), Center: radiant warm amber gold (#d97706), Bottom: warm dark earth (#1c1208)
img = Image.new("RGBA", (w, h), (0, 0, 0, 255))
draw = ImageDraw.Draw(img)

# Vertical gradient
for y in range(h):
    t = y / h
    if t < 0.45:
        # Midnight blue to warm amber transition
        sub_t = t / 0.45
        r = int(11 * (1 - sub_t) + 180 * sub_t)
        g = int(19 * (1 - sub_t) + 115 * sub_t)
        b = int(41 * (1 - sub_t) + 30 * sub_t)
    elif t < 0.75:
        # Radiant gold to deep warm amber
        sub_t = (t - 0.45) / 0.30
        r = int(180 * (1 - sub_t) + 120 * sub_t)
        g = int(115 * (1 - sub_t) + 55 * sub_t)
        b = int(30 * (1 - sub_t) + 12 * sub_t)
    else:
        # Deep warm amber to dark warm earth
        sub_t = (t - 0.75) / 0.25
        r = int(120 * (1 - sub_t) + 20 * sub_t)
        g = int(55 * (1 - sub_t) + 12 * sub_t)
        b = int(12 * (1 - sub_t) + 8 * sub_t)
    draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

# 2. Central Volumetric Sunburst / Sacred God Rays
cx, cy = w // 2, int(h * 0.38) # Center of the emblem
sunburst = Image.new("RGBA", (w, h), (0, 0, 0, 0))
sdraw = ImageDraw.Draw(sunburst)

num_rays = 28
for i in range(num_rays):
    angle = (i / num_rays) * 2 * np.pi
    ray_len = 1400
    x2 = cx + int(ray_len * np.cos(angle))
    y2 = cy + int(ray_len * np.sin(angle))
    width_angle = (0.5 / num_rays) * 2 * np.pi
    x1 = cx + int(ray_len * np.cos(angle - width_angle))
    y1 = cy + int(ray_len * np.sin(angle - width_angle))
    
    alpha = int(35 + 25 * np.sin(i * 1.5))
    sdraw.polygon([(cx, cy), (x1, y1), (x2, y2)], fill=(255, 230, 150, alpha))

sunburst = sunburst.filter(ImageFilter.GaussianBlur(radius=35))
img = Image.alpha_composite(img, sunburst)

# 3. Soft Central Glow
glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
for r_glow in range(450, 0, -25):
    alpha = int(45 * (1 - r_glow / 450))
    gdraw.ellipse([cx - r_glow, cy - r_glow, cx + r_glow, cy + r_glow], fill=(255, 215, 100, alpha))

glow = glow.filter(ImageFilter.GaussianBlur(radius=40))
img = Image.alpha_composite(img, glow)

# 4. Soft bokeh circles
np.random.seed(42)
bokeh = Image.new("RGBA", (w, h), (0, 0, 0, 0))
bdraw = ImageDraw.Draw(bokeh)
for _ in range(35):
    bx = np.random.randint(50, w - 50)
    by = np.random.randint(100, h - 100)
    br = np.random.randint(20, 80)
    alpha = np.random.randint(15, 45)
    bdraw.ellipse([bx - br, by - br, bx + br, by + br], fill=(255, 220, 140, alpha))

bokeh = bokeh.filter(ImageFilter.GaussianBlur(radius=15))
img = Image.alpha_composite(img, bokeh)

# Convert to RGB and save
final_rgb = img.convert("RGB")
out_proj = r"C:\BKP NVMe\DEVIAs\VideosAnimados\projeto-amor-que-compartilha\public\scenes\scene5.jpg"
out_brain = r"C:\Users\Silvio\.gemini\antigravity\brain\b094d84e-2e90-410f-bfad-5854413feb50\scene5_amor_que_compartilha.jpg"

final_rgb.save(out_proj, quality=95)
final_rgb.save(out_brain, quality=95)
print("Saved custom Scene 5 golden sacred art to both public/scenes and brain!")

