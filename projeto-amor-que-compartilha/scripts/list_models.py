import urllib.request
import json

lines = open(r"C:\BKP NVMe\DEVIAs\litellm-gateway\.env", "r", encoding="utf-8-sig").readlines()
key = [l.split("=")[1].strip().strip('"').strip("'") for l in lines if l.startswith("GEMINI_KEY_1")][0]
r = urllib.request.urlopen(f"https://generativelanguage.googleapis.com/v1beta/models?key={key}")
data = json.loads(r.read())
print("All models matching image or imagen:")
for m in data.get("models", []):
    if "image" in m["name"] or "imagen" in m["name"]:
        print(m["name"])

