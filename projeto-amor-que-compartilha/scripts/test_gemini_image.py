import urllib.request
import json
import base64

lines = open(r"C:\BKP NVMe\DEVIAs\litellm-gateway\.env", "r", encoding="utf-8-sig").readlines()
keys = [l.split("=")[1].strip().strip('"').strip("'") for l in lines if l.startswith("GEMINI_KEY_")]

models_to_try = [
    "gemini-2.5-flash-image",
    "gemini-3.1-flash-image",
    "gemini-3-pro-image",
    "gemini-3.1-flash-image-preview"
]

prompt = (
    "Vertical 9:16 aspect ratio. Fine art digital painting style, cinematic lighting, warm spiritual atmosphere. "
    "A gentle, smiling adult person speaking kindly with kind, peaceful eyes and open palms, sitting peacefully beneath a majestic, lush green blooming tree in a sunny meadow. "
    "Soft emerald green leaves, golden rays of sun filtering through branches, blooming spring wildflowers, sense of gentle words bringing life and peace. "
    "Realistic human anatomy, normal arms, normal legs, natural realistic hands and fingers, classical drapery clothing, high aesthetic emotional depth."
)

payload = {
    "contents": [{
        "parts": [{"text": prompt}]
    }]
}
data = json.dumps(payload).encode("utf-8")

for key in keys:
    for model in models_to_try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
        req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
        try:
            print(f"Trying {model} with key {key[:8]}...")
            with urllib.request.urlopen(req, timeout=45) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                # Check for inlineData
                cands = res.get("candidates", [])
                for cand in cands:
                    parts = cand.get("content", {}).get("parts", [])
                    for part in parts:
                        if "inlineData" in part:
                            mime = part["inlineData"].get("mimeType")
                            b64 = part["inlineData"].get("data")
                            print(f"✓ SUCCESS with {model}! Found image data of length {len(b64)} mime: {mime}")
                            with open(r"C:\Users\Silvio\.gemini\antigravity\brain\b094d84e-2e90-410f-bfad-5854413feb50\scene4_fale_sem_ofender.jpg", "wb") as f_out:
                                f_out.write(base64.b64decode(b64))
                            print("Saved scene4_fale_sem_ofender.jpg!")
                            exit(0)
                        elif "text" in part:
                            print(f"Text response: {part['text'][:100]}")
        except Exception as e:
            err = str(e)
            if hasattr(e, "read"):
                err += " -> " + e.read().decode("utf-8", errors="ignore")[:150]
            print(f"Failed {model}: {err}")

