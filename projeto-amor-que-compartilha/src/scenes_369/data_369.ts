import {
  SCENE_FRAMES_369,
  voLocal369,
  type VoKey369,
} from "./timing_369";

export type BadgeVariant = "gold" | "tech" | "success" | "accent";

export type SceneBadge369 = {
  text: string;
  variant: BadgeVariant;
  appearAt: number;
  disappearAt?: number;
  size?: "normal" | "large";
};

export type AudioCue369 = {
  kind: "narration" | "sfx";
  src: string;
  at: number;
  volume: number;
};

export type ScenePlan369 = {
  id: string;
  title: string;
  startFrame: number;
  durationInFrames: number;
  voKey: VoKey369;
  narration: string;
  badges: SceneBadge369[];
  highlights: string[];
  captions: { text: string; from: number; to: number }[];
  audioCues: AudioCue369[];
};

const sc = (i: number) => SCENE_FRAMES_369[i];
const end = (i: number) => SCENE_FRAMES_369[i].durationInFrames;
const narration = (k: VoKey369): AudioCue369 => ({
  kind: "narration",
  src: `audio_369/vo/${k}.wav`,
  at: voLocal369(k),
  volume: 1,
});

export const scenes369: ScenePlan369[] = [
  // CENA 1: APLICATIVOS MÓVEIS SOB MEDIDA (iOS, Android, Web)
  {
    id: "scene-01-apps-sob-medida",
    title: "Aplicativos Sob Medida",
    startFrame: sc(0).from,
    durationInFrames: sc(0).durationInFrames,
    voKey: "s1",
    narration:
      "Na era digital, a sua empresa precisa estar na palma das mãos dos seus clientes. Na 369APP, desenvolvemos aplicativos móveis sob medida para iOS, Android e Web. Soluções rápidas e intuitivas para você gerenciar sua operação em tempo real e de qualquer lugar.",
    badges: [
      { text: "1. APPS SOB MEDIDA", variant: "gold", appearAt: 20, disappearAt: Math.min(180, end(0) - 10) },
      { text: "iOS • ANDROID • WEB", variant: "tech", appearAt: 190, disappearAt: end(0) - 5 },
    ],
    highlights: ["ERA", "DIGITAL", "EMPRESA", "PALMA", "MÃOS", "369APP", "APLICATIVOS", "MEDIDA", "OPERAÇÃO", "TEMPO", "REAL"],
    captions: [
      { text: "Sua empresa na palma da mão com aplicativos sob medida.", from: voLocal369("s1"), to: end(0) },
    ],
    audioCues: [narration("s1")],
  },

  // CENA 2: SITES, PORTAIS & WEB APPS DE ALTA PERFORMANCE (SEO Top 1 Google)
  {
    id: "scene-02-sites-portais-seo",
    title: "Sites & Portais de Alta Performance",
    startFrame: sc(1).from,
    durationInFrames: sc(1).durationInFrames,
    voKey: "s2",
    narration:
      "Tenha uma presença digital de alto impacto que realmente vende. Criamos websites institucionais, portais corporativos e web apps com design premium e engenharia otimizada para colocar o seu negócio no topo das buscas do Google.",
    badges: [
      { text: "2. SITES & PORTAIS WEB", variant: "gold", appearAt: 20, disappearAt: Math.min(180, end(1) - 10) },
      { text: "SEO TOP 1 GOOGLE", variant: "success", appearAt: 190, disappearAt: end(1) - 5 },
    ],
    highlights: ["PRESENÇA", "DIGITAL", "IMPACTO", "VENDE", "WEBSITES", "PORTAIS", "DESIGN", "PREMIUM", "TOPO", "GOOGLE"],
    captions: [
      { text: "Presença digital de alta performance para o topo do Google.", from: voLocal369("s2"), to: end(1) },
    ],
    audioCues: [narration("s2")],
  },

  // CENA 3: SISTEMAS CORPORATIVOS, BI & AUTOMAÇÃO (Decisões Rápidas, Menos Custos)
  {
    id: "scene-03-sistemas-corporativos-bi",
    title: "Sistemas Corporativos & BI",
    startFrame: sc(2).from,
    durationInFrames: sc(2).durationInFrames,
    voKey: "s3",
    narration:
      "Chega de planilhas lentas e retrabalho manual. Desenvolvemos sistemas corporativos integrados com dashboards inteligentes de Business Intelligence. Centralize seus dados, tome decisões instantâneas e reduza custos operacionais.",
    badges: [
      { text: "3. SISTEMAS & BI 24/7", variant: "gold", appearAt: 20, disappearAt: Math.min(180, end(2) - 10) },
      { text: "DECISÕES RÁPIDAS & MENOS CUSTOS", variant: "tech", appearAt: 190, disappearAt: end(2) - 5 },
    ],
    highlights: ["PLANILHAS", "MANUAL", "SISTEMAS", "CORPORATIVOS", "DASHBOARDS", "BUSINESS", "INTELLIGENCE", "DECISÕES", "CUSTOS"],
    captions: [
      { text: "Substitua planilhas por sistemas inteligentes e painéis BI.", from: voLocal369("s3"), to: end(2) },
    ],
    audioCues: [narration("s3")],
  },

  // CENA 4: INTELIGÊNCIA ARTIFICIAL APLICADA AO NEGÓCIO (Automação & Produtividade)
  {
    id: "scene-04-inteligencia-artificial",
    title: "Inteligência Artificial Aplicada",
    startFrame: sc(3).from,
    durationInFrames: sc(3).durationInFrames,
    voKey: "s4",
    narration:
      "Potencialize seus resultados com Inteligência Artificial sob medida. Integramos assistentes inteligentes aos dados da sua empresa, reduzindo o tempo de atendimento em até noventa por cento e automatizando rotinas com precisão.",
    badges: [
      { text: "4. INTELIGÊNCIA ARTIFICIAL", variant: "gold", appearAt: 20, disappearAt: Math.min(180, end(3) - 10) },
      { text: "ATENDIMENTO VELOZ & AUTOMAÇÃO", variant: "accent", appearAt: 190, disappearAt: end(3) - 5 },
    ],
    highlights: ["INTELIGÊNCIA", "ARTIFICIAL", "ASSISTENTES", "DADOS", "ATENDIMENTO", "NOVENTA", "POR", "CENTO", "ROTINAS"],
    captions: [
      { text: "IAs sob medida conectadas aos dados estratégicos da sua empresa.", from: voLocal369("s4"), to: end(3) },
    ],
    audioCues: [narration("s4")],
  },

  // CENA 5: 369APP — TECNOLOGIA QUE TRANSFORMA (Encerramento & Consultoria)
  {
    id: "scene-05-369app-institucional",
    title: "369APP — Tecnologia que Transforma",
    startFrame: sc(4).from,
    durationInFrames: sc(4).durationInFrames,
    voKey: "s5",
    narration:
      "Tecnologia que transforma o seu negócio com engenharia sênior e atendimento direto, sem burocracia. Fale com quem desenvolve. Acesse o site da 369APP: www.369app.com.br, e solicite sua consultoria.",
    badges: [
      { text: "369APP", variant: "gold", size: "large", appearAt: 15, disappearAt: 140 },
      { text: "TECNOLOGIA QUE TRANSFORMA", variant: "success", size: "large", appearAt: 145, disappearAt: end(4) - 5 },
    ],
    highlights: ["TECNOLOGIA", "TRANSFORMA", "ENGENHARIA", "SÊNIOR", "ATENDIMENTO", "DIRETO", "369APP", "CONSULTORIA"],
    captions: [
      { text: "Fale direto com quem desenvolve: www.369app.com.br", from: voLocal369("s5"), to: end(4) },
    ],
    audioCues: [narration("s5")],
  },
];

export const sceneAt369 = (frame: number) => {
  for (let i = scenes369.length - 1; i >= 0; i--) {
    if (frame >= scenes369[i].startFrame) return scenes369[i];
  }
  return scenes369[0];
};

