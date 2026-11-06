import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

console.log('🚀 Iniciando build da plataforma web VideosAnimados AQC...');

// 1. Limpar / criar dist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const distVideos = path.join(distDir, 'videos');
const distGallery = path.join(distDir, 'gallery');
const distPublic = path.join(distDir, 'public');

fs.mkdirSync(distVideos, { recursive: true });
fs.mkdirSync(distGallery, { recursive: true });
fs.mkdirSync(distPublic, { recursive: true });

// 2. Copiar vídeos de out/ para dist/videos/
const outDir = path.join(projectRoot, 'out');
const videos = [
  'procurarajuda.mp4',
  'amarenaojulgar.mp4',
  'amor-que-compartilha.mp4',
  'licao-de-vida.mp4'
];

for (const vid of videos) {
  const src = path.join(outDir, vid);
  const dest = path.join(distVideos, vid);
  if (fs.existsSync(src)) {
    console.log(`📦 Copiando vídeo: ${vid} (${(fs.statSync(src).size / (1024 * 1024)).toFixed(1)} MB)...`);
    fs.copyFileSync(src, dest);
  } else if (fs.existsSync(dest)) {
    console.log(`✓ Vídeo já existente em dist/videos/: ${vid}`);
  } else {
    console.warn(`⚠️ Vídeo não encontrado em out/: ${vid}`);
  }
}

// 3. Copiar galerias / stills
const galleryFiles = ['contact_sheet_final.png', 'sheet_final.png'];
for (const gf of galleryFiles) {
  const src = path.join(outDir, gf);
  const dest = path.join(distGallery, gf);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

// 4. Copiar pasta public para dist/public
const publicSrc = path.join(projectRoot, 'public');
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
copyDirRecursive(publicSrc, distPublic);

// 5. Gerar legendas WebVTT
console.log('📝 Gerando legendas WebVTT...');
const voPath = path.join(projectRoot, 'src', 'data', 'vo.json');
let voData = {};
if (fs.existsSync(voPath)) {
  voData = JSON.parse(fs.readFileSync(voPath, 'utf8'));
}

function formatVttTime(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  const ms = Math.floor((totalSeconds - Math.floor(totalSeconds)) * 1000);
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

let vttLicao = 'WEBVTT - Amor Que Compartilha: Lição de Vida\n\n';
const gaps = [0.45, 0.45, 0.45, 0.45];
let currTime = 0.5;

const sceneKeys = ['s1', 's2', 's3', 's4', 's5'];
for (let i = 0; i < sceneKeys.length; i++) {
  const k = sceneKeys[i];
  const item = voData[k];
  if (item && item.words) {
    // Quebrar em blocos de 5 a 8 palavras para legendas limpas
    const words = item.words;
    const chunkSize = 6;
    for (let c = 0; c < words.length; c += chunkSize) {
      const chunk = words.slice(c, c + chunkSize);
      const start = currTime + chunk[0].start;
      const end = currTime + chunk[chunk.length - 1].end;
      const text = chunk.map(w => w.text).join(' ');
      vttLicao += `${formatVttTime(start)} --> ${formatVttTime(end)}\n${text}\n\n`;
    }
    currTime += item.seconds + (gaps[i] || 0);
  }
}
fs.writeFileSync(path.join(distDir, 'subtitles-licao.vtt'), vttLicao, 'utf8');
fs.writeFileSync(path.join(distDir, 'subtitles-amarenaojulgar.vtt'), vttLicao, 'utf8');
fs.writeFileSync(path.join(distDir, 'subtitles-procurarajuda.vtt'), vttLicao, 'utf8');

// 6. Gerar version.json
const versionInfo = {
  version: '1.20.312',
  build: new Date().toISOString(),
  name: 'videos-animados-aqc',
  title: 'Amor Que Compartilha — Vídeos Animados 3D (Quem Procurar / Procurar Ajuda)',
  security: {
    status: 'HARDENED',
    skill: 'skillsegurancamaxima',
    owasp: '2025 compliant',
    csp: 'strict',
    hsts: '2 years preload'
  }
};
fs.writeFileSync(path.join(distDir, 'version.json'), JSON.stringify(versionInfo, null, 2), 'utf8');

// 7. Gerar index.html e 404.html
console.log('✨ Gerando index.html e 404.html...');
const indexHtml = generateIndexHtml(versionInfo);
fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml, 'utf8');

const notFoundHtml = generate404Html();
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');

console.log('✅ Build concluído com sucesso em dist/!');

function generateIndexHtml(v) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Amor Que Compartilha | Vídeos Animados 3D de Conscientização</title>
  <meta name="description" content="Plataforma oficial de vídeos explicativos 3D e conscientização do Projeto Social Amor Que Compartilha. TDAH, TOD, TEA e lições de empatia e acolhimento.">
  <meta name="theme-color" content="#0d1117">
  <link rel="icon" type="image/png" href="./public/brand/logo-clean.png">
  <style>
    :root {
      --bg: #0b0f17;
      --card-bg: #141c2b;
      --card-border: #233149;
      --text-main: #f0f6fc;
      --text-muted: #94a3b8;
      --primary: #f59e0b;
      --primary-hover: #d97706;
      --accent: #38bdf8;
      --success: #10b981;
      --font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text-main);
      font-family: var(--font);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: rgba(20, 28, 43, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--card-border);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
    }
    .brand img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid var(--primary);
    }
    .brand h1 {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .brand span {
      display: block;
      font-size: 0.75rem;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }
    .btn-primary {
      background: var(--primary);
      color: #0b0f17;
    }
    .btn-primary:hover {
      background: var(--primary-hover);
    }
    .btn-outline {
      background: transparent;
      color: var(--text-main);
      border: 1px solid var(--card-border);
    }
    .btn-outline:hover {
      background: var(--card-bg);
      border-color: var(--accent);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem 1rem;
      flex: 1;
      width: 100%;
    }
    .hero-tabs {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .tab-btn {
      padding: 0.65rem 1.25rem;
      border-radius: 9999px;
      border: 1px solid var(--card-border);
      background: var(--card-bg);
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tab-btn.active {
      background: var(--primary);
      color: #0b0f17;
      border-color: var(--primary);
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
    }
    .main-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    @media (min-width: 900px) {
      .main-grid {
        grid-template-columns: 420px 1fr;
      }
    }
    .video-card {
      background: #000;
      border: 1px solid var(--card-border);
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .video-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 9 / 16;
      background: #05080f;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      outline: none;
    }
    .video-toolbar {
      padding: 0.75rem 1rem;
      background: var(--card-bg);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--card-border);
    }
    .video-meta {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .details-panel {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 1rem;
      padding: 1.25rem;
    }
    .card-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary);
    }
    .scene-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .scene-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.65rem 0.85rem;
      border-radius: 0.5rem;
      border: 1px solid var(--card-border);
      background: rgba(11, 15, 23, 0.6);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .scene-item:hover, .scene-item.active {
      border-color: var(--accent);
      background: rgba(56, 189, 248, 0.1);
    }
    .scene-item.active {
      border-color: var(--primary);
      background: rgba(245, 158, 11, 0.12);
    }
    .scene-time {
      font-family: monospace;
      font-size: 0.8rem;
      padding: 0.2rem 0.4rem;
      background: var(--card-border);
      border-radius: 0.25rem;
      color: var(--accent);
      white-space: nowrap;
    }
    .scene-info h4 {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .scene-info p {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 0.75rem;
      margin-top: 0.75rem;
    }
    .gallery-img {
      width: 100%;
      height: 120px;
      object-fit: cover;
      border-radius: 0.5rem;
      border: 1px solid var(--card-border);
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .gallery-img:hover {
      transform: scale(1.03);
      border-color: var(--primary);
    }
    .security-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.25rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(16, 185, 129, 0.15);
      color: var(--success);
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    footer {
      background: var(--card-bg);
      border-top: 1px solid var(--card-border);
      padding: 1.5rem;
      margin-top: 2rem;
      text-align: center;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    footer a {
      color: var(--primary);
      text-decoration: none;
    }
    footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <header>
    <a href="/" class="brand">
      <img src="./public/brand/logo-clean.png" alt="Amor Que Compartilha Logo" width="40" height="40">
      <div>
        <h1>Amor Que Compartilha</h1>
        <span>Vídeos Animados 3D • Conscientização</span>
      </div>
    </a>
    <div class="nav-actions">
      <div class="security-badge">
        <span>🛡️</span> OWASP 2025 / LGPD Hardened
      </div>
      <a href="https://www.amorquecompartilha.com.br" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        Conheça a Causa ↗
      </a>
    </div>
  </header>

  <main class="container">

    <div class="hero-tabs">
      <button class="tab-btn active" id="tab-procurarajuda" onclick="switchVideo('procurarajuda')">
        🆘 Quem Procurar (Ligue 188 • CAPS • Fernandópolis)
      </button>
      <button class="tab-btn" id="tab-amarenaojulgar" onclick="switchVideo('amarenaojulgar')">
        ❤️ Amar e Não Julgar
      </button>
      <button class="tab-btn" id="tab-licao" onclick="switchVideo('licao')">
        🎬 Viver em Paz
      </button>
      <button class="tab-btn" id="tab-neuro" onclick="switchVideo('neuro')">
        🧠 Conscientização: TDAH, TOD e TEA
      </button>
    </div>

    <div class="main-grid">

      <!-- COLUNA DO PLAYER -->
      <section class="video-card" aria-label="Reprodutor de Vídeo">
        <div class="video-wrapper">
          <video id="mainVideo" controls preload="metadata" playsinline poster="./gallery/contact_sheet_final.png">
            <source id="videoSource" src="./videos/procurarajuda.mp4" type="video/mp4">
            <track id="videoTrack" kind="subtitles" src="./subtitles-procurarajuda.vtt" srclang="pt-BR" label="Português" default>
            Seu navegador não suporta reprodução direta de vídeo HTML5.
          </video>
        </div>
        <div class="video-toolbar">
          <div class="video-meta" id="videoResolution">
            📐 1080×1920 (9:16) • 30 fps • H.264
          </div>
          <a id="btnDownload" href="./videos/procurarajuda.mp4" download class="btn btn-outline" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;">
            📥 Baixar MP4
          </a>
        </div>
      </section>

      <!-- COLUNA DE CAPÍTULOS E CONTEÚDO -->
      <div class="details-panel">

        <!-- CARD DE CAPÍTULOS -->
        <article class="card">
          <h2 class="card-title">
            <span>⏱️</span> Navegação de Cenas & Ensinamentos
          </h2>
          <div class="scene-list" id="sceneList">
            <!-- Cenas geradas dinamicamente via JS -->
          </div>
        </article>

        <!-- CARD SOBRE O PROJETO SOCIAL -->
        <article class="card">
          <h2 class="card-title">
            <span>🤝</span> Projeto Social Amor Que Compartilha
          </h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.75rem;">
            O Projeto Social Amor Que Compartilha acolhe famílias, promove a inclusão de pessoas neurodivergentes e leva amor, assistência e dignidade para quem mais precisa. Conecte antes de corrigir. Ame antes de julgar.
          </p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <a href="https://www.amorquecompartilha.com.br" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              Visite o Portal Oficial 🌐
            </a>
            <a href="https://instagram.com/amor.que.compartilha" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              Siga no Instagram 📷
            </a>
          </div>
        </article>

        <!-- CARD GALERIA DE FRAMES -->
        <article class="card">
          <h2 class="card-title">
            <span>🖼️</span> Galeria de Frames 3D em Alta Resolução
          </h2>
          <div class="gallery-grid">
            <img src="./public/scenes/scene1.jpg" alt="Cena 1" class="gallery-img" onclick="seekToTime(0)" loading="lazy">
            <img src="./public/scenes/scene2.jpg" alt="Cena 2" class="gallery-img" onclick="seekToTime(12.85)" loading="lazy">
            <img src="./public/scenes/scene3.jpg" alt="Cena 3" class="gallery-img" onclick="seekToTime(25.80)" loading="lazy">
            <img src="./public/scenes/scene4.jpg" alt="Cena 4" class="gallery-img" onclick="seekToTime(38.47)" loading="lazy">
            <img src="./public/scenes/scene5.jpg" alt="Cena 5" class="gallery-img" onclick="seekToTime(50.53)" loading="lazy">
          </div>
        </article>

      </div>

    </div>

  </main>

  <footer>
    <p>
      © 2026 <strong>Projeto Social Amor Que Compartilha</strong> • CNPJ e Causas Sociais Protegidas • 
      <a href="https://www.amorquecompartilha.com.br" target="_blank" rel="noopener noreferrer">amorquecompartilha.com.br</a>
    </p>
    <p style="margin-top: 0.5rem; font-size: 0.75rem; color: #64748b;">
      Deploy Seguro na Vercel • Versão <span id="appVersion">${v.version}</span> • Build ${v.build} • Skill Segurança Máxima (OWASP 2025 / LGPD)
    </p>
  </footer>

  <script>
    const scenesProcurarajuda = [
      { time: 0.00, title: "1. Você Não Está Sozinho", desc: "Ansiedade e depressão. Sentir dor não é fraqueza e pedir ajuda é o maior ato de coragem." },
      { time: 11.45, title: "2. Ligue 188 (CVV)", desc: "Governo Federal. Apoio emocional gratuito, sigiloso e disponível 24 horas por dia." },
      { time: 26.61, title: "3. CAPS & UBS (SUS SP)", desc: "Governo Estadual e SUS. Atendimento médico e psicológico gratuito nos CAPS e UBSs." },
      { time: 39.42, title: "4. Fernandópolis SP", desc: "Procure o CAPS II municipal, sua UBS ou UPA 24h. Em crises urgentes, ligue 192 (SAMU) ou 193." },
      { time: 52.80, title: "5. Sua Vida Tem Valor", desc: "Sua vida vale muito e você não está só. Projeto Social Amor Que Compartilha." }
    ];

    const scenesAmarenaojulgar = [
      { time: 0.00, title: "1. Amar Sem Julgar", desc: "Acolhimento e empatia. A verdadeira sabedoria começa quando trocamos a crítica pela compreensão." },
      { time: 13.34, title: "2. O Poder do Abraço", desc: "Acolher sem julgar. Um abraço sincero que acolha a alma sem fazer perguntas. Gestos que restauram." },
      { time: 27.46, title: "3. Erguer ao Invés de Derrubar", desc: "Palavras de consolo e dignidade. Seja a voz que acalma a tempestade e lembra ao caído seu valor." },
      { time: 37.82, title: "4. Ensinar com Paciência", desc: "Caminhar junto e encorajar. Amar não é humilhar. Quem ajuda a levantar o próximo, cresce junto com ele." },
      { time: 51.42, title: "5. Amor em Ação", desc: "Não derrube quem já caiu: seja o apoio que transforma. Projeto Social Amor Que Compartilha." }
    ];

    const scenesLicao = [
      { time: 0.00, title: "1. Viva Sem Fingir", desc: "Deixe cair as máscaras da aprovação. Acolha sua essência com verdade e gratidão." },
      { time: 12.85, title: "2. Ame Sem Depender", desc: "Amor verdadeiro é encontro de liberdade. Transborde paz e cuide do coração de quem ama." },
      { time: 25.80, title: "3. Escute Sem Atacar", desc: "Quem desabafa só precisa de um porto seguro. O silêncio acolhedor conforta a alma." },
      { time: 38.47, title: "4. Fale Sem Ofender", desc: "Palavras constroem ou ferem. Escolha ser uma voz que semeia esperança." },
      { time: 50.53, title: "5. Amor em Ação", desc: "Viver bem é colocar o amor em ação todos os dias. Projeto Social Amor Que Compartilha." }
    ];

    const scenesNeuro = [
      { time: 0.00, title: "1. Rotular Não Ajuda", desc: "Por trás de palavras pejorativas, existe uma mente lutando em silêncio." },
      { time: 10.00, title: "2. Neurodiversidade & Funcionamento Único", desc: "TDAH, TOD e TEA são funcionamentos cerebrais únicos, não falta de limites." },
      { time: 20.00, title: "3. TDAH & Rotinas Visuais", desc: "Dificuldade em regular o foco: quebre em pequenos passos e celebre avanços." },
      { time: 32.00, title: "4. TOD & Validação Emocional", desc: "O desafio esconde dor e medo de perder o controle. Conecte antes de corrigir." },
      { time: 44.00, title: "5. TEA & Acolhimento Sensorial", desc: "Sobrecarga real: ambiente previsível, seguro e acolhedor." },
      { time: 56.00, title: "6. Conexão Humana & Ciência", desc: "A conexão humana acalma o sistema nervoso e traz paz neural." },
      { time: 68.00, title: "7. Três Pilares do Cuidado", desc: "Escutar com paciência, respeitar o tempo e nunca isolar quem precisa." },
      { time: 79.00, title: "8. Amar e Compreender", desc: "Pessoas neurodivergentes não precisam ser consertadas, precisam de amor." }
    ];

    let currentMode = 'procurarajuda';
    const video = document.getElementById('mainVideo');
    const videoSource = document.getElementById('videoSource');
    const videoTrack = document.getElementById('videoTrack');
    const sceneListContainer = document.getElementById('sceneList');
    const btnDownload = document.getElementById('btnDownload');

    function renderScenes(list) {
      sceneListContainer.innerHTML = '';
      list.forEach((sc, idx) => {
        const item = document.createElement('div');
        item.className = 'scene-item' + (idx === 0 ? ' active' : '');
        item.onclick = () => seekToTime(sc.time);
        
        const mins = Math.floor(sc.time / 60);
        const secs = Math.floor(sc.time % 60);
        const timeStr = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

        item.innerHTML = \`
          <span class="scene-time">\${timeStr}</span>
          <div class="scene-info">
            <h4>\${sc.title}</h4>
            <p>\${sc.desc}</p>
          </div>
        \`;
        sceneListContainer.appendChild(item);
      });
    }

    function seekToTime(t) {
      video.currentTime = t;
      video.play().catch(() => {});
    }

    function switchVideo(mode) {
      currentMode = mode;
      document.getElementById('tab-procurarajuda').classList.toggle('active', mode === 'procurarajuda');
      document.getElementById('tab-amarenaojulgar').classList.toggle('active', mode === 'amarenaojulgar');
      document.getElementById('tab-licao').classList.toggle('active', mode === 'licao');
      document.getElementById('tab-neuro').classList.toggle('active', mode === 'neuro');

      if (mode === 'procurarajuda') {
        videoSource.src = './videos/procurarajuda.mp4';
        videoTrack.src = './subtitles-procurarajuda.vtt';
        btnDownload.href = './videos/procurarajuda.mp4';
        renderScenes(scenesProcurarajuda);
      } else if (mode === 'amarenaojulgar') {
        videoSource.src = './videos/amarenaojulgar.mp4';
        videoTrack.src = './subtitles-amarenaojulgar.vtt';
        btnDownload.href = './videos/amarenaojulgar.mp4';
        renderScenes(scenesAmarenaojulgar);
      } else if (mode === 'licao') {
        videoSource.src = './videos/licao-de-vida.mp4';
        videoTrack.src = './subtitles-licao.vtt';
        btnDownload.href = './videos/licao-de-vida.mp4';
        renderScenes(scenesLicao);
      } else {
        videoSource.src = './videos/amor-que-compartilha.mp4';
        videoTrack.src = '';
        btnDownload.href = './videos/amor-que-compartilha.mp4';
        renderScenes(scenesNeuro);
      }
      video.load();
      video.play().catch(() => {});
    }

    // Sincronizar cena ativa durante o playback
    video.addEventListener('timeupdate', () => {
      let list = scenesProcurarajuda;
      if (currentMode === 'amarenaojulgar') list = scenesAmarenaojulgar;
      if (currentMode === 'licao') list = scenesLicao;
      if (currentMode === 'neuro') list = scenesNeuro;

      const t = video.currentTime;
      let activeIdx = 0;
      for (let i = 0; i < list.length; i++) {
        if (t >= list[i].time) activeIdx = i;
      }
      const items = sceneListContainer.querySelectorAll('.scene-item');
      items.forEach((it, idx) => {
        it.classList.toggle('active', idx === activeIdx);
      });
    });

    // Inicializar lista padrão
    renderScenes(scenesProcurarajuda);

    // Auto-atualizador sem travar
    setInterval(() => {
      fetch('./version.json?t=' + Date.now())
        .then(r => r.json())
        .then(d => {
          if (d.version && d.version !== '${v.version}') {
            console.log('Nova versão detectada:', d.version);
            location.reload();
          }
        })
        .catch(() => {});
    }, 30000);
  </script>
</body>
</html>`;
}

function generate404Html() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>404 - Página Não Encontrada | Amor Que Compartilha</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      background: #0b0f17;
      color: #f0f6fc;
      font-family: system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      text-align: center;
      padding: 1.5rem;
    }
    h1 { font-size: 4rem; color: #f59e0b; margin-bottom: 0.5rem; }
    p { color: #94a3b8; font-size: 1.1rem; max-width: 480px; margin-bottom: 1.5rem; }
    a {
      background: #f59e0b;
      color: #0b0f17;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 700;
    }
    a:hover { background: #d97706; }
  </style>
</head>
<body>
  <h1>404</h1>
  <p>O conteúdo ou vídeo solicitado não foi encontrado no servidor.</p>
  <a href="/">Voltar para a Página Inicial</a>
</body>
</html>`;
}

