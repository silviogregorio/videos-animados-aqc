import urllib.request
import urllib.parse
import os
import time

out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "scenes_369app")
os.makedirs(out_dir, exist_ok=True)

prompts = {
    "scene1": (
        "masterpiece commercial 3D render, luxury tech aesthetic, floating premium smartphone mockups showing elegant business mobile app UI, "
        "dark slate graphite background #161b20, glowing brushed gold accents, real-time analytics graphs on screen, iOS and Android custom apps, high-end software development"
    ),
    "scene2": (
        "masterpiece commercial 3D render, luxury corporate tech aesthetic, sleek floating ultrawide monitor displaying modern high-performance responsive web portal, "
        "dark titanium background, gold radiant gradients, SEO search engine top ranking visualization, clean typography, conversion analytics, SaaS website"
    ),
    "scene3": (
        "masterpiece commercial 3D render, futuristic business intelligence executive dashboard, holographic data charts, automated enterprise ERP system, "
        "dark elegant environment, brushed gold lines, glowing metrics and indicators, automated financial and operational flow"
    ),
    "scene4": (
        "masterpiece commercial 3D render, artificial intelligence neural network connecting corporate data nodes, glowing golden AI core, "
        "smart automated digital assistant interface, dark studio lighting, depth of field, high-tech enterprise productivity"
    ),
    "scene5": (
        "masterpiece commercial 3D render, luxury technology company headquarters, futuristic glass office overlooking glowing city skyline, "
        "in the center an elegant golden 3D emblem with floating cubes, golden light rays, premium corporate branding, technology that transforms"
    )
}

print("🎨 Gerando imagens de alta tecnologia para os serviços da 369APP...")

for name, p in prompts.items():
    dest = os.path.join(out_dir, f"{name}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 20000:
        print(f"✓ {name}.jpg já existe ({os.path.getsize(dest)//1024} KB), pulando.")
        continue

    print(f"\n⏳ Baixando/Gerando {name}...")
    encoded = urllib.parse.quote(p)
    urls = [
        f"https://image.pollinations.ai/prompt/{encoded}?width=800&height=1422&nologo=true&seed={500 + hash(name)%500}",
        f"https://image.pollinations.ai/prompt/{encoded}?width=1080&height=1920&nologo=true&seed={100 + hash(name)%500}",
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
                time.sleep(2)
        if success:
            break
        time.sleep(1)

print("\n🎉 Imagens da 369APP concluídas!")

