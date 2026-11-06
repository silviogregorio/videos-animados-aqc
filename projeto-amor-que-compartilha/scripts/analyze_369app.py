import urllib.request
import re
import json

url = 'https://www.369app.com.br'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as r:
    html = r.read().decode('utf-8', errors='ignore')

print('HTML length:', len(html))
scripts = re.findall(r'src=["\'](/assets/[^"\']+\.js)["\']', html)
print('Scripts:', scripts)

for s in scripts:
    s_url = 'https://www.369app.com.br' + s
    print(f'Fetching {s_url}...')
    with urllib.request.urlopen(urllib.request.Request(s_url, headers={'User-Agent': 'Mozilla/5.0'})) as r_s:
        js = r_s.read().decode('utf-8', errors='ignore')
        print(f'JS length: {len(js)}')
        
        # Buscar strings de texto
        strings = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', js)
        relevant = [t for t in strings if len(t) > 25 and any(k in t.lower() for k in ['sistema', 'aplicativ', 'desenvolv', 'ia', 'inteligência', 'gestão', 'automaç', 'cliente', 'tecnologia', '369', 'empresa', 'transform'])]
        
        print('\n--- TEXTOS RELEVANTES ENCONTRADOS ---')
        seen = set()
        for t in relevant:
            t_clean = t.replace('\\"', '"').replace('\\n', ' ').strip()
            if t_clean not in seen and len(t_clean) < 200:
                seen.add(t_clean)
                print('•', t_clean)
