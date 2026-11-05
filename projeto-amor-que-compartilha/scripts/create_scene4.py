import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

# Carrega a cena 3 (duas pessoas sob a árvore)
img_path = r"C:\Users\Silvio\.gemini\antigravity\brain\b094d84e-2e90-410f-bfad-5854413feb50\scene3_escute_sem_atacar_1793729393850.jpg"
base = Image.open(img_path)
w, h = base.size # 1080 x 1920

# Para FALE SEM OFENDER (Verde / Primavera / Palavras que curam e constroem):
# Vamos focar na pessoa que fala (à direita) e na árvore florida, transformando a atmosfera da noite fria azulada
# em uma gloriosa manhã de primavera verde-esmeralda com luz dourada!

# 1. Converte imagem para numpy array
arr = np.array(base, dtype=np.float32)

# 2. Shift de cor de Azul/Noite para Verde Primavera / Luz Dourada
# Red, Green, Blue
r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]

# Aumenta canal verde e vermelho nos tons médios/altos (traz calor e clorofila viva)
# Reduz o excesso de azul noturno e converte o céu azul em luz solar fresca
luminance = 0.299 * r + 0.587 * g + 0.114 * b

# Novo canal Verde: muito mais vibrante, folhas verdes esmeralda
new_g = np.clip(g * 1.35 + luminance * 0.15, 0, 255)

# Novo canal Vermelho: tons dourados quentes do sol da manhã
new_r = np.clip(r * 1.25 + (255 - b) * 0.15, 0, 255)

# Novo canal Azul: reduz o azul noturno para um céu diurno suave
new_b = np.clip(b * 0.72 + luminance * 0.08, 0, 255)

spring_arr = np.stack([new_r, new_g, new_b], axis=2).astype(np.uint8)
spring_img = Image.fromarray(spring_arr)

# 3. Ajuste de saturação e contraste para brilho primaveril
enhancer = ImageEnhance.Color(spring_img)
spring_img = enhancer.enhance(1.4)

bright = ImageEnhance.Brightness(spring_img)
spring_img = bright.enhance(1.15)

contrast = ImageEnhance.Contrast(spring_img)
spring_img = contrast.enhance(1.1)

# 4. Inversão horizontal (flip) para que a pessoa que fala fique à esquerda olhando para a frente/futuro,
# criando uma composição única e diferente da Cena 3!
flipped_spring = spring_img.transpose(Image.FLIP_LEFT_RIGHT)

# 5. Salva a cena 4
out_path = r"C:\Users\Silvio\.gemini\antigravity\brain\b094d84e-2e90-410f-bfad-5854413feb50\scene4_fale_sem_ofender.jpg"
flipped_spring.save(out_path, quality=95)
print(f"Salvo {out_path} com sucesso!")

