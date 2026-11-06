import urllib.request
import re

url = 'https://www.369app.com.br/assets/index-CSJ1rhUV.js'
with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})) as r:
    js = r.read().decode('utf-8', errors='ignore')

# Procurar onde define a lista de serviços principais
for pattern in [r'serviços', r'O Que Fazemos', r'Nossos Serviços', r'Soluções', r'Tecnologia que Transforma']:
    matches = [m.start() for m in re.finditer(pattern, js, re.IGNORECASE)]
    print(f'Pattern "{pattern}": {len(matches)} ocorrências')
    for idx in matches[:3]:
        snippet = js[max(0, idx - 100):min(len(js), idx + 400)]
        print(f'[{idx}]: {snippet}\n')
