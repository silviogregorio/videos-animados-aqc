import urllib.request
import json
import base64
import os
import sys
import time

env_path = r"C:\BKP NVMe\DEVIAs\litellm-gateway\.env"
keys = []
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8-sig") as f:
        for line in f:
            if line.startswith("GEMINI_KEY_") and "=" in line:
                k = line.split("=", 1)[1].strip().strip('"').strip("'")
                if k:
                    keys.append(k)

print(f"Carregadas {len(keys)} chaves do Gemini/Imagen.")

out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "scenes_amarenaojulgar")
os.makedirs(out_dir, exist_ok=True)

prompts = {
    "scene1": (
        "Vertical 9:16 aspect ratio. Beautiful stylized 2D animation storybook illustration, studio Ghibli and Makoto Shinkai inspired hand-drawn digital art style. "
        "A gentle person sitting on a wooden bench looking down, feeling the heavy burden of judgment from shadowy silhouette figures in the background. "
        "Approaching in the foreground, a compassionate person comes near with gentle kind eyes and a warm posture to offer comfort. "
        "Soft pastel colors, warm glowing light beginning to pierce the clouds, heartfelt emotional drawing."
    ),
    "scene2": (
        "Vertical 9:16 aspect ratio. Beautiful stylized 2D animation storybook illustration, warm animated digital art style. "
        "A deeply emotional and heartwarming tight sincere hug, a warm embrace between two friends. "
        "Gentle smiles and peaceful eyes, warm golden peach aura and soft glowing bokeh surrounding them, "
        "floating little warm embers and gentle petals around their embrace. Healing, soothing and safe feeling."
    ),
    "scene3": (
        "Vertical 9:16 aspect ratio. Beautiful stylized 2D animation storybook illustration, warm painterly animation style. "
        "A kind, encouraging person with a warm gentle smile bending down and offering both hands to lift up someone who had fallen. "
        "Lifting someone up instead of pushing them down. Golden rays of morning sunlight illuminating their hands, inspiring hope, dignity and rebirth."
    ),
    "scene4": (
        "Vertical 9:16 aspect ratio. Beautiful stylized 2D animation storybook illustration, peaceful animated art style. "
        "Two caring friends walking side by side along a sunny scenic grassy trail, talking warmly with patience and mutual respect. "
        "One friend listening with an open heart while the other shares, beautiful green blooming trees and gentle hills, peaceful journey."
    ),
    "scene5": (
        "Vertical 9:16 aspect ratio. Beautiful stylized 2D animation storybook illustration, heartwarming community art style. "
        "A diverse and smiling group of stylized people holding hands and sharing bread, love and kindness together in the golden morning sunrise. "
        "A soft glowing warm golden heart symbol in the soft sky, radiant atmosphere of solidarity, compassion and social impact."
    )
}

def generate_with_key(prompt, out_path, key):
    # Try Imagen 3 first
    url_imagen = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key={key}"
    payload_imagen = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "aspectRatio": "9:16",
            "sampleCount": 1,
            "outputOptions": {"mimeType": "image/jpeg"}
        }
    }
    req = urllib.request.Request(
        url_imagen,
        data=json.dumps(payload_imagen).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=40) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            preds = data.get("predictions", [])
            if preds and "bytesBase64Encoded" in preds[0]:
                raw = base64.b64decode(preds[0]["bytesBase64Encoded"])
                with open(out_path, "wb") as f_out:
                    f_out.write(raw)
                return True
    except Exception as e:
        # Fallback to Gemini 3.1 / 2.5 Flash image
        pass

    for mod in ["gemini-3.1-flash-image", "gemini-2.5-flash-image"]:
        url_gemini = f"https://generativelanguage.googleapis.com/v1beta/models/{mod}:generateContent?key={key}"
        payload_gemini = {
            "contents": [{"parts": [{"text": prompt}]}]
        }
        req_gem = urllib.request.Request(
            url_gemini,
            data=json.dumps(payload_gemini).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        try:
            with urllib.request.urlopen(req_gem, timeout=40) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                cands = data.get("candidates", [])
                for cand in cands:
                    parts = cand.get("content", {}).get("parts", [])
                    for part in parts:
                        if "inlineData" in part:
                            b64 = part["inlineData"].get("data")
                            raw = base64.b64decode(b64)
                            with open(out_path, "wb") as f_out:
                                f_out.write(raw)
                            return True
        except Exception as e:
            pass
    return False

for name, p in prompts.items():
    dest = os.path.join(out_dir, f"{name}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 10000:
        print(f"✓ {name}.jpg já existe ({os.path.getsize(dest)//1024} KB), pulando.")
        continue

    print(f"\n🎨 Gerando imagem para {name} (estilo desenho)...")
    done = False
    for k_idx, key in enumerate(keys):
        print(f"  Tentando chave #{k_idx+1}...")
        if generate_with_key(p, dest, key):
            print(f"  ✓ Sucesso gerando {name}.jpg ({os.path.getsize(dest)//1024} KB)!")
            done = True
            break
        time.sleep(1)
    
    if not done:
        print(f"  ⚠️ Não foi possível gerar {name}.jpg com as chaves disponíveis.")

print("\n🎉 Processo de geração de imagens concluído!")
