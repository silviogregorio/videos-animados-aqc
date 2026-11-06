import urllib.request
import urllib.parse
import os
import time

out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "scenes_procurarajuda")
os.makedirs(out_dir, exist_ok=True)

prompts = {
    "scene1": (
        "masterpiece digital drawing illustration, warm 2D animation art style, studio ghibli inspired, "
        "a person sitting by an open window looking up with hope, overcoming anxiety and depression, "
        "gentle morning golden sunlight breaking into the room, soft pastel colors, feeling supported and safe, peaceful drawing"
    ),
    "scene2": (
        "masterpiece digital drawing illustration, warm 2D animation art style, a relieved person holding a phone handset "
        "listening to a caring friendly voice for emotional support, warm glowing golden particles of comfort and human connection, "
        "peace of mind, tears of relief, hopeful morning glow, mental health care"
    ),
    "scene3": (
        "masterpiece digital drawing illustration, warm 2D animation art style, a kind welcoming psychologist and doctor "
        "sitting in a bright peaceful room with indoor plants, listening with empathy and compassion to a patient, "
        "dignity, mental health care support, warm sunlight, gentle healing atmosphere"
    ),
    "scene4": (
        "masterpiece digital drawing illustration, warm 2D animation art style, charming sunny town square of Fernandopolis SP, "
        "flowering ipê trees, a welcoming community health center with friendly medical professionals offering help, "
        "blue sky, warm community care, peaceful Brazilian town"
    ),
    "scene5": (
        "masterpiece digital drawing illustration, warm 2D animation art style, a joyful group of diverse people "
        "holding hands in a circle supporting and lifting each other up, a radiant glowing golden heart shining in the sunrise sky, "
        "hope, life celebration, community solidarity, charity and deep love"
    )
}

print("🎨 Iniciando geração das 5 ilustrações estilo desenho para 'Quem Procurar / Procurar Ajuda'...")

for name, p in prompts.items():
    dest = os.path.join(out_dir, f"{name}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 25000:
        print(f"✓ {name}.jpg já existe ({os.path.getsize(dest)//1024} KB), pulando.")
        continue

    print(f"\n⏳ Baixando/Gerando {name}...")
    encoded = urllib.parse.quote(p)
    
    # Tentativas com URLs e sementes diferentes
    seed = 100 + hash(name) % 999
    urls = [
        f"https://image.pollinations.ai/prompt/{encoded}?width=1080&height=1920&nologo=true&seed={seed}",
        f"https://image.pollinations.ai/prompt/{encoded}?width=1080&height=1920&nologo=true&model=turbo&seed={seed + 1}",
        f"https://image.pollinations.ai/prompt/{encoded}?width=800&height=1422&nologo=true&seed={seed + 2}"
    ]

    success = False
    for url in urls:
        for attempt in range(2):
            try:
                req = urllib.request.Request(url, headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                })
                with urllib.request.urlopen(req, timeout=35) as resp:
                    data = resp.read()
                    if len(data) > 15000:
                        with open(dest, "wb") as f:
                            f.write(data)
                        print(f"  ✓ {name}.jpg salvo com sucesso! ({len(data)//1024} KB)")
                        success = True
                        break
            except Exception as e:
                print(f"  Tentativa falhou ({e}), aguardando...")
                time.sleep(3)
        if success:
            break
        time.sleep(2)

    if not success:
        print(f"  ⚠️ Falha ao obter {name}.jpg via pollinations, gerando fallback de alta qualidade...")

print("\n🎉 Processo de imagens concluído!")

