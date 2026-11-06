import urllib.request
import re

url = 'https://www.369app.com.br/assets/index-CSJ1rhUV.js'
with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})) as r:
    js = r.read().decode('utf-8', errors='ignore')

# Procurar onde define os serviços
# Exemplo: title, description, icons, services
matches = re.findall(r'\{[^{}]*title:[^{}]*description:[^{}]*\}', js)
print(f'Matches com title e description: {len(matches)}')
for m in matches[:15]:
    print('---')
    print(m[:300])

# Procurar blocos de serviços específicos
for kw in ['Sistemas Web', 'Aplicativos Mobile', 'Inteligência Artificial', 'Consultoria', 'Automação', 'Produtos', 'Soluções']:
    idx = js.find(kw)
    if idx != -1:
        start = max(0, idx - 150)
        end = min(len(js), idx + 350)
        print(f'\n=== Contexto para {kw} ===')
        print(js[start:end])

