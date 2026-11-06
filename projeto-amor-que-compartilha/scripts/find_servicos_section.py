import urllib.request
import re

url = 'https://www.369app.com.br/assets/index-CSJ1rhUV.js'
with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})) as r:
    js = r.read().decode('utf-8', errors='ignore')

idx = js.find('id:"servicos"')
if idx == -1:
    idx = js.find('servicos')
print('Index:', idx)
if idx != -1:
    print(js[idx:idx+2500])
