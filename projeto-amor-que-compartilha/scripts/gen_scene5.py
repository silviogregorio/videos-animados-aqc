import urllib.request
import json
import base64
import os

env_path = r"C:\BKP NVMe\DEVIAs\litellm-gateway\.env"
keys = []
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8-sig") as f:
        for line in f:
            if line.startswith("GEMINI_KEY_") and "=" in line:
                k = line.split("=", 1)[1].strip().strip('"').strip("'")
                if k:
                    keys.append(k)

print(f"Loaded {len(keys)} Gemini keys.")

prompt = (
    "Vertical 9:16 aspect ratio. Fine art digital painting, masterwork oil painting, warm golden atmospheric lighting. "
    "A heartwarming scene of generous, kind people in a community sharing warm bread and food together with joy and compassion. "
    "Gentle smiles, sincere connection, normal realistic human arms and legs, realistic natural human hands, soft golden glowing bokeh and rays of warm spiritual light. "
    "Deep emotional resonance, beautiful classical painterly composition, uplifting and hopeful."
)

out_file = r"C:\Users\Silvio\.gemini\antigravity\brain\b094d84e-2e90-410f-bfad-5854413feb50\scene5_amor_que_compartilha.jpg"

success = False
for idx, key in enumerate(keys):
    # Try Imagen 3 first
    url_imagen = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key={key}"
    payload_imagen = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "aspectRatio": "9:16",
            "sampleCount": 1
        }
    }
    req = urllib.request.Request(
        url_imagen,
        data=json.dumps(payload_imagen).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        print(f"Trying Imagen 3 with key #{idx+1} ({key[:8]}...)...")
        with urllib.request.urlopen(req, timeout=35) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            preds = data.get("predictions", [])
            if preds and "bytesBase64Encoded" in preds[0]:
                raw = base64.b64decode(preds[0]["bytesBase64Encoded"])
                with open(out_file, "wb") as f_out:
                    f_out.write(raw)
                print(f"✓ Imagen 3 SUCCESS! Saved to {out_file} ({len(raw)} bytes)")
                success = True
                break
    except Exception as e:
        print(f"  Imagen error: {e}")

    if not success:
        # Try Gemini flash image
        for mod in ["gemini-3.1-flash-image", "gemini-2.5-flash-image"]:
            url_gem = f"https://generativelanguage.googleapis.com/v1beta/models/{mod}:generateContent?key={key}"
            payload_gem = {
                "contents": [{"parts": [{"text": prompt}]}]
            }
            req = urllib.request.Request(
                url_gem,
                data=json.dumps(payload_gem).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            try:
                print(f"Trying {mod} with key #{idx+1}...")
                with urllib.request.urlopen(req, timeout=35) as resp:
                    data = json.loads(resp.read().decode("utf-8"))
                    cands = data.get("candidates", [])
                    for cand in cands:
                        for part in cand.get("content", {}).get("parts", []):
                            if "inlineData" in part:
                                raw = base64.b64decode(part["inlineData"]["data"])
                                with open(out_file, "wb") as f_out:
                                    f_out.write(raw)
                                print(f"✓ {mod} SUCCESS! Saved to {out_file} ({len(raw)} bytes)")
                                success = True
                                break
                    if success:
                        break
            except Exception as e:
                print(f"  {mod} error: {e}")
    if success:
        break

print("All done. Success:", success)

