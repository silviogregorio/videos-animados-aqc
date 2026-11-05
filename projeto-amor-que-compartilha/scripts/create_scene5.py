import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

# Base: Scene 1 (golden spiritual dawn)
img_path = r"C:\Users\Silvio\.gemini\antigravity\brain\b094d84e-2e90-410f-bfad-5854413feb50\scene1_viva_sem_fingir_1793729347700.jpg"
base = Image.open(img_path)
w, h = base.size # 1080 x 1920

arr = np.array(base, dtype=np.float32)

# Create a warm sacred golden-amber ethereal atmosphere for the closing of Projeto Social Amor Que Compartilha
# Soft radial glow in center, warm vignetting, deep rich tones
r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]

# Add extra warm amber & golden glow
new_r = np.clip(r * 1.15 + 15, 0, 255)
new_g = np.clip(g * 1.05 + 8, 0, 255)
new_b = np.clip(b * 0.9, 0, 255)

sacred_arr = np.stack([new_r, new_g, new_b], axis=2).astype(np.uint8)
sacred_img = Image.fromarray(sacred_arr)

# Apply a gentle artistic soft-focus blur (dreamy bokeh) to make foreground 3D UI & Logo pop vividly
# We do a blend between original sharp details and a smooth gaussian blur (radius 12)
blurred = sacred_img.filter(ImageFilter.GaussianBlur(radius=8))
blended = Image.blend(sacred_img, blurred, alpha=0.55)

# Enhance contrast and warmth
enhancer = ImageEnhance.Color(blended)
blended = enhancer.enhance(1.25)

contrast = ImageEnhance.Contrast(blended)
blended = contrast.enhance(1.08)

out_path = r"C:\Users\Silvio\.gemini\antigravity\brain\b094d84e-2e90-410f-bfad-5854413feb50\scene5_amor_que_compartilha.jpg"
blended.save(out_path, quality=95)
print(f"Salvo {out_path} com sucesso!")

