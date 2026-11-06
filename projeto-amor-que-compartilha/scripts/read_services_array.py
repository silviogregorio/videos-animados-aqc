import urllib.request

url = 'https://www.369app.com.br/assets/index-CSJ1rhUV.js'
with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})) as r:
    js = r.read().decode('utf-8', errors='ignore')

print(js[657000:660500])

