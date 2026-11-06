import urllib.request
import urllib.parse
import os
import time

out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "scenes_amarenaojulgar")
os.makedirs(out_dir, exist_ok=True)

prompts = {
    "scene1": (
        "masterpiece digital drawing illustration, warm 2D animation art style, studio ghibli inspired, "
        "a person sitting on a park bench looking down feeling sad and judged by distant dark silhouettes, "
        "while a compassionate kind friend approaches with a gentle warm smile and open hands to comfort them, "
        "soft pastel colors, morning golden sunlight breaking through clouds, heartwarming emotional drawing"
    ),
    "scene2": (
        "masterpiece digital drawing illustration, warm 2D animation art style, deeply emotional tender close hug between two friends, "
        "tight sincere embrace, tears of relief and comfort, beautiful expressive animated faces with peaceful smiles, "
        "warm peach and golden glowing aura surrounding them, soft glowing particles and gentle petals floating, healing moment"
    ),
    "scene3": (
        "masterpiece digital drawing illustration, warm 2D animation art style, inspiring moment of an encouraging person "
        "kneeling down with a compassionate smile offering both hands to help lift up a fallen person from the ground, "
        "lifting someone up with dignity instead of knocking them down, warm rays of morning sunlight streaming down, uplifting"
    ),
    "scene4": (
        "masterpiece digital drawing illustration, warm 2D animation art style, two caring friends walking side by side "
        "along a scenic green grassy path with blooming trees, speaking gentle words of comfort and wisdom with patience and kind smiles, "
        "listening with open hearts, peaceful journey, serene sky"
    ),
    "scene5": (
        "masterpiece digital drawing illustration, warm 2D animation art style, a joyful diverse group of friendly stylized people "
        "standing in a warm circle holding hands and sharing bread, love and smiles together, "
        "a radiant glowing golden heart symbol shining softly in the morning sunrise, hopeful community solidarity, charity and love"
    )
}

print(f"🎨 Iniciando geração das 5 ilustrações estilo desenho para 'Amar e Não Julgar'...")

for name, p in prompts.items():
    dest = os.path.join(out_dir, f"{name}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 30000 and name == "scene1":
        print(f"✓ {name}.jpg já existe ({os.path.getsize(dest)//1024} KB), pulando.")
        continue

    print(f"\n⏳ Gerando {name} (estilo desenho)...")
    
    # Montar URL com encoding seguro e modelo turbo ultra-rápido gratuito
    encoded_prompt = urllib.parse.quote(p)
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1080&height=1920&nologo=true&model=turbo&seed={100 + hash(name)%1000}"
    
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    })
    
    success = False
    for attempt in range(3):
        try:
            print(f"  Tentativa {attempt + 1}...")
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
                if len(data) > 15000:
                    with open(dest, "wb") as f:
                        f.write(data)
                    print(f"  ✓ {name}.jpg salvo com sucesso! ({len(data) // 1024} KB)")
                    success = True
                    break
        except Exception as e:
            print(f"  Aviso: {e}")
            time.sleep(2)
            
    if not success:
        print(f"  ❌ Falha ao gerar {name}.jpg")
    time.sleep(1)

print("\n🎉 Todas as ilustrações foram geradas com sucesso!")
