import os
import json
import urllib.request
import base64

# Read env keys
env_vars = {}
with open(r"C:\BKP NVMe\DEVIAs\litellm-gateway\.env", "r", encoding="utf-8-sig") as f:
    for line in f:
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1)
            env_vars[k.strip()] = v.strip().strip('"').strip("'")

keys = [v for k, v in env_vars.items() if k.startswith("GEMINI_KEY_") and len(v) > 20]
print(f"Total available Gemini keys: {len(keys)}")

def generate_image(prompt, out_path):
    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": "9:16",
            "outputOptions": {"mimeType": "image/jpeg"}
        }
    }
    data = json.dumps(payload).encode("utf-8")
    
    for i, key in enumerate(keys):
        url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key={key}"
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"}
        )
        try:
            print(f"Tentando chave {i+1}...")
            with urllib.request.urlopen(req, timeout=45) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                preds = res.get("predictions", [])
                if preds and "bytesBase64Encoded" in preds[0]:
                    img_bytes = base64.b64decode(preds[0]["bytesBase64Encoded"])
                    with open(out_path, "wb") as out_f:
                        out_f.write(img_bytes)
                    print(f"✓ Sucesso! Imagem salva em: {out_path} ({len(img_bytes)/1024:.1f} KB)")
                    return True
        except Exception as e:
            err_msg = str(e)
            if hasattr(e, "read"):
                err_msg += " -> " + e.read().decode("utf-8", errors="ignore")[:200]
            print(f"Chave {i+1} falhou: {err_msg}")
    return False

# 1. Image 4: FALE SEM OFENDER (Vibrant Green Meadow / Spring)
prompt4 = (
    "Vertical 9:16 aspect ratio. Fine art digital painting style, cinematic lighting, warm spiritual atmosphere. "
    "A gentle, smiling adult person speaking warmly with kind, peaceful eyes and open palms, sitting peacefully beneath a majestic, lush green blooming oak tree in a sunlit meadow. "
    "Soft emerald green leaves, golden rays of sun filtering through branches, blooming spring wildflowers, sense of gentle words bringing life and peace. "
    "Realistic human anatomy, normal arms, normal legs, natural realistic hands and fingers, classical drapery clothing, high aesthetic emotional depth."
)
out4 = r"C:\Users\Silvio\.gemini\antigravity\brain\b094d84e-2e90-410f-bfad-5854413feb50\scene4_fale_sem_ofender.jpg"
print("\n--- Gerando Imagem 4: FALE SEM OFENDER ---")
generate_image(prompt4, out4)

# 2. Image 5: PROJETO SOCIAL AMOR QUE COMPARTILHA (Hands sharing bread and bowl)
prompt5 = (
    "Vertical 9:16 aspect ratio. Fine art digital painting, masterwork cinematic warm lighting. "
    "Realistic, compassionate human hands holding freshly baked crusty bread and offering a warm wooden bowl of nourishing soup to welcoming hands. "
    "Warm golden glowing backlight, soft atmospheric bokeh particles of light, theme of charitable love, dignified solidarity, nourishment, and community caring. "
    "Natural realistic hands and anatomy, emotional depth, warm spiritual amber and bronze color palette."
)
out5 = r"C:\Users\Silvio\.gemini\antigravity\brain\b094d84e-2e90-410f-bfad-5854413feb50\scene5_amor_que_compartilha.jpg"
print("\n--- Gerando Imagem 5: AMOR QUE COMPARTILHA ---")
generate_image(prompt5, out5)

