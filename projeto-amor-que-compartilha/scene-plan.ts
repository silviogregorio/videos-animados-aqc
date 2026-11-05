// Contrato de dados do vídeo — Projeto Social Amor Que Compartilha
// TEMA: Como ajudar pessoas com TDAH, TOD e TEA: Amar e Compreender
// Duração: 90 segundos = 2.700 frames a 30 fps (8 cenas contíguas)

export type Vec3 = [number, number, number];
export type EaseName = "linear" | "in" | "out" | "inOut" | "soft";

export type VideoConfig = {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  theme: string;
  language: string;
};

export const VIDEO: VideoConfig = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 2700,
  theme: "low-poly-3d",
  language: "pt-BR",
};

export type BadgeVariant = "positive" | "negative" | "info" | "warning";

export type CameraKey = {
  at: number;
  position: Vec3;
  target: Vec3;
  zoom?: number;
  easing?: EaseName;
};

export type CameraPlan = {
  projection: "perspective" | "orthographic";
  movement: "dolly-in" | "dolly-out" | "vertical" | "orbit" | "tracking" | "split" | "hold";
  keys: CameraKey[];
};

export type SceneObject = {
  id: string;
  type: string;
  visible: boolean;
  state?: { start: string; end: string };
};

export type TrackAnimation = {
  type: "interpolate" | "spring";
  target: string;
  startFrame: number;
  endFrame: number;
  from?: number;
  to?: number;
  easing?: EaseName;
  damping?: number;
  unit?: "u3d" | "px" | "deg" | "rad" | "0-1";
};

export type SceneBadge = {
  text: string;
  variant: BadgeVariant;
  appearAt: number;
  disappearAt?: number;
  subtitle?: string;
  slot?: "center" | "left" | "right";
  icon?: "?";
  size?: "normal" | "large";
};

export type CaptionBlock = { text: string; from: number; to: number };

export type AudioCue = {
  kind: "narration" | "sfx" | "music";
  src: string;
  at: number;
  volume: number;
  status: "planned" | "ready";
};

export type VoKey = "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8";

export type ScenePlan = {
  id: string;
  startFrame: number;
  durationInFrames: number;
  voKey: VoKey;
  narration: string;
  camera: CameraPlan;
  objects: SceneObject[];
  animations: TrackAnimation[];
  badges: SceneBadge[];
  highlights: string[];
  captions: CaptionBlock[];
  audioCues: AudioCue[];
};

// Poses de câmera orbitais pré-calculadas para continuidade
const orbitPose = (target: Vec3, distance: number, azimuthDeg: number, elevationDeg: number): { position: Vec3; target: Vec3 } => {
  const az = (azimuthDeg * Math.PI) / 180;
  const el = (elevationDeg * Math.PI) / 180;
  const x = target[0] + distance * Math.cos(el) * Math.sin(az);
  const y = target[1] + distance * Math.sin(el);
  const z = target[2] + distance * Math.cos(el) * Math.cos(az);
  return { position: [Number(x.toFixed(2)), Number(y.toFixed(2)), Number(z.toFixed(2))], target };
};

const P = {
  wideEntry: orbitPose([0, 1.2, 0], 24, 25, 20),
  slumpFocus: orbitPose([0, 1.0, 0.4], 14, 18, 14),
  brainRevealed: orbitPose([0, 1.5, 0], 16, 20, 18),
  tdahModule: orbitPose([-1.8, 1.2, 0], 12, 15, 12),
  todModule: orbitPose([0, 1.2, 0], 13, -10, 15),
  teaModule: orbitPose([1.8, 1.2, 0], 11, 35, 10),
  connectionWide: orbitPose([0, 1.2, 0], 24, 15, 22),
  threePillars: orbitPose([0, 1.0, 0], 19, 45, 18),
  pillarsEnd: orbitPose([0, 1.0, 0], 19, 75, 18),
  finalGrand: orbitPose([0, 1.4, 0], 30, 25, 20),
};

const key = (at: number, pose: { position: Vec3; target: Vec3 }, easing?: EaseName): CameraKey => ({ at, ...pose, easing });
const narration = (k: VoKey, at = 8): AudioCue => ({ kind: "narration", src: `audio/vo/${k}.wav`, at, volume: 1, status: "planned" });
const sfx = (name: string, at: number, volume = 0.3): AudioCue => ({ kind: "sfx", src: `audio/sfx/${name}.wav`, at, volume, status: "planned" });

export const scenes: ScenePlan[] = [
  // CENA 1: O Julgamento Invisível [0 - 300) = 10s
  {
    id: "scene-01-julgamento",
    startFrame: 0,
    durationInFrames: 300,
    voKey: "s1",
    narration: "Você já viu alguém ser chamado de preguiçoso, rebelde ou difícil? Muitas vezes, por trás dessas palavras, existe uma mente lutando em silêncio.",
    camera: {
      projection: "perspective",
      movement: "dolly-in",
      keys: [key(0, P.wideEntry), key(300, P.slumpFocus, "soft")],
    },
    objects: [
      { id: "room", type: "diorama-base", visible: true },
      { id: "character", type: "low-poly-human", visible: true, state: { start: "sentado-tenso", end: "desanimado" } },
      { id: "weightBlocks", type: "cubos-cinzas", visible: true, state: { start: "caindo", end: "pressionando" } },
      { id: "brandWatermark", type: "logo-watermark", visible: true },
    ],
    animations: [
      { type: "spring", target: "blocks.fall", startFrame: 15, endFrame: 60, from: 0, to: 1, damping: 9, unit: "0-1" },
      { type: "interpolate", target: "character.slump", startFrame: 45, endFrame: 110, from: 0, to: -0.2, easing: "soft", unit: "u3d" },
      { type: "interpolate", target: "light.ambient", startFrame: 0, endFrame: 90, from: 0.8, to: 0.45, easing: "out", unit: "0-1" },
    ],
    badges: [
      { text: "ROTULAR NÃO AJUDA", variant: "warning", icon: "?", appearAt: 25, disappearAt: 160 },
      { text: "JULGAMENTO PRECIPITADO", variant: "negative", appearAt: 170, disappearAt: 285 },
    ],
    highlights: ["PREGUIÇOSO", "REBELDE", "DIFÍCIL", "MENTE", "SILÊNCIO"],
    captions: [
      { text: "Você já viu alguém ser chamado de preguiçoso, rebelde ou difícil?", from: 8, to: 155 },
      { text: "Muitas vezes, por trás dessas palavras, existe uma mente lutando em silêncio.", from: 160, to: 295 },
    ],
    audioCues: [narration("s1", 8), sfx("whoosh-soft", 0, 0.25), sfx("thud-dull", 25, 0.35)],
  },

  // CENA 2: A Raiz Oculta — O Cérebro Neurodivergente [300 - 600) = 10s
  {
    id: "scene-02-cerebro-neurodivergente",
    startFrame: 300,
    durationInFrames: 300,
    voKey: "s2",
    narration: "TDAH, TOD e TEA não são birra nem falta de limites. São funcionamentos cerebrais únicos, que processam o mundo de uma forma totalmente diferente.",
    camera: {
      projection: "perspective",
      movement: "dolly-in",
      keys: [key(0, P.slumpFocus), key(300, P.brainRevealed, "soft")],
    },
    objects: [
      { id: "room", type: "diorama-base", visible: true },
      { id: "character", type: "low-poly-human", visible: true },
      { id: "brainCore", type: "cerebro-corte-3d", visible: true, state: { start: "oculto", end: "iluminado" } },
      { id: "synapseTracks", type: "vias-neurais", visible: true },
      { id: "brandWatermark", type: "logo-watermark", visible: true },
    ],
    animations: [
      { type: "interpolate", target: "diorama.cutaway", startFrame: 10, endFrame: 50, from: 0, to: 1, easing: "out", unit: "0-1" },
      { type: "spring", target: "brain.scale", startFrame: 30, endFrame: 75, from: 0, to: 1, damping: 10, unit: "0-1" },
      { type: "interpolate", target: "synapse.speed", startFrame: 90, endFrame: 260, from: 1, to: 2.5, easing: "inOut", unit: "0-1" },
    ],
    badges: [
      { text: "NEURODIVERSIDADE", variant: "info", appearAt: 25, disappearAt: 150 },
      { text: "PROCESSAMENTO ÚNICO", variant: "positive", appearAt: 160, disappearAt: 290 },
    ],
    highlights: ["TDAH", "TOD", "TEA", "BIRRA", "CEREBRAIS", "DIFERENTE"],
    captions: [
      { text: "TDAH, TOD e TEA não são birra nem falta de limites.", from: 8, to: 145 },
      { text: "São funcionamentos cerebrais únicos, que processam o mundo diferente.", from: 150, to: 295 },
    ],
    audioCues: [narration("s2", 8), sfx("chime-reveal", 30, 0.35)],
  },

  // CENA 3: TDAH — Filtro de Foco e Rotinas [600 - 960) = 12s
  {
    id: "scene-03-tdah",
    startFrame: 600,
    durationInFrames: 360,
    voKey: "s3",
    narration: "No TDAH, o cérebro tem dificuldade em regular o foco e os impulsos. Em vez de punir a inquietação, use rotinas visuais, quebre tarefas em pequenos passos e celebre cada avanço.",
    camera: {
      projection: "perspective",
      movement: "orbit",
      keys: [key(0, P.brainRevealed), key(360, P.tdahModule, "soft")],
    },
    objects: [
      { id: "room", type: "diorama-base", visible: true },
      { id: "tdahFunnel", type: "funil-dispersao", visible: true, state: { start: "desordenado", end: "filtrado" } },
      { id: "stimulusSpheres", type: "esferas-estimulo", visible: true },
      { id: "routineBoard", type: "quadro-rotinas-3d", visible: true, state: { start: "fora", end: "ativo" } },
      { id: "starReward", type: "estrela-recompensa", visible: true },
      { id: "brandWatermark", type: "logo-watermark", visible: true },
    ],
    animations: [
      { type: "interpolate", target: "stimulus.scatter", startFrame: 0, endFrame: 85, from: 0.5, to: 3.0, easing: "out", unit: "u3d" },
      { type: "spring", target: "routineBoard.enter", startFrame: 95, endFrame: 145, from: -2, to: 0, damping: 10, unit: "u3d" },
      { type: "interpolate", target: "blocks.snap", startFrame: 150, endFrame: 220, from: 0, to: 1, easing: "soft", unit: "0-1" },
      { type: "spring", target: "star.pop", startFrame: 240, endFrame: 290, from: 0, to: 1, damping: 8, unit: "0-1" },
    ],
    badges: [
      { text: "REGULAÇÃO DO FOCO", variant: "negative", appearAt: 15, disappearAt: 110 },
      { text: "ROTINAS VISUAIS", variant: "positive", appearAt: 115, disappearAt: 220 },
      { text: "PEQUENOS PASSOS", variant: "positive", appearAt: 225, disappearAt: 350 },
    ],
    highlights: ["TDAH", "FOCO", "IMPULSOS", "ROTINAS", "PASSOS", "AVANÇO"],
    captions: [
      { text: "No TDAH, o cérebro tem dificuldade em regular o foco e os impulsos.", from: 8, to: 150 },
      { text: "Use rotinas visuais, quebre tarefas em pequenos passos e celebre cada avanço.", from: 155, to: 350 },
    ],
    audioCues: [narration("s3", 8), sfx("scatter-drop", 15, 0.25), sfx("badge-snap", 115, 0.3), sfx("success-bell", 240, 0.35)],
  },

  // CENA 4: TOD — Frustração, Conflito e Escolhas [960 - 1320) = 12s
  {
    id: "scene-04-tod",
    startFrame: 960,
    durationInFrames: 360,
    voKey: "s4",
    narration: "No TOD, a reação de desafio esconde uma dor e o medo de perder o controle. Em vez de responder com gritos, mantenha a calma, valide o sentimento e dê escolhas direcionadas.",
    camera: {
      projection: "perspective",
      movement: "orbit",
      keys: [key(0, P.tdahModule), key(360, P.todModule, "soft")],
    },
    objects: [
      { id: "room", type: "diorama-base", visible: true },
      { id: "adultChar", type: "figura-adulta", visible: true },
      { id: "youthChar", type: "figura-jovem", visible: true },
      { id: "spikeWall", type: "muro-espinhos-vermelhos", visible: true, state: { start: "erguido", end: "dissolvido" } },
      { id: "calmAura", type: "campo-sereno-azul", visible: true },
      { id: "choiceCards", type: "cartas-escolha-3d", visible: true },
      { id: "brandWatermark", type: "logo-watermark", visible: true },
    ],
    animations: [
      { type: "spring", target: "spikeWall.grow", startFrame: 10, endFrame: 70, from: 0, to: 1, damping: 9, unit: "0-1" },
      { type: "interpolate", target: "calmField.expand", startFrame: 80, endFrame: 155, from: 0, to: 1.8, easing: "out", unit: "u3d" },
      { type: "interpolate", target: "spikeWall.soften", startFrame: 155, endFrame: 210, from: 1, to: 0, easing: "soft", unit: "0-1" },
      { type: "spring", target: "choiceDoors.flip", startFrame: 215, endFrame: 275, from: 0, to: 1, damping: 10, unit: "0-1" },
    ],
    badges: [
      { text: "MEDO DE PERDER CONTROLE", variant: "negative", appearAt: 15, disappearAt: 110 },
      { text: "VALIDAÇÃO EMOCIONAL", variant: "positive", appearAt: 115, disappearAt: 225 },
      { text: "ESCOLHAS DIRECIONADAS", variant: "positive", appearAt: 230, disappearAt: 350 },
    ],
    highlights: ["TOD", "DESAFIO", "DOR", "CALMA", "SENTIMENTO", "ESCOLHAS"],
    captions: [
      { text: "No TOD, a reação de desafio esconde uma dor e o medo de perder o controle.", from: 8, to: 155 },
      { text: "Mantenha a calma, valide o sentimento e ofereça escolhas direcionadas.", from: 160, to: 350 },
    ],
    audioCues: [narration("s4", 8), sfx("tension-hum", 15, 0.25), sfx("calm-harmonic", 90, 0.35)],
  },

  // CENA 5: TEA — Sobrecarga Sensorial e Acomodação [1320 - 1680) = 12s
  {
    id: "scene-05-tea",
    startFrame: 1320,
    durationInFrames: 360,
    voKey: "s5",
    narration: "E no TEA, o autismo, o excesso de luzes, barulhos e mudanças repentinas gera sobrecarga real. A solução não é forçar o encaixe, mas oferecer um ambiente previsível, seguro e acolhedor.",
    camera: {
      projection: "perspective",
      movement: "orbit",
      keys: [key(0, P.todModule), key(360, P.teaModule, "soft")],
    },
    objects: [
      { id: "room", type: "diorama-base", visible: true },
      { id: "sensoryWaves", type: "ondas-luz-som", visible: true, state: { start: "agressivas", end: "atenuadas" } },
      { id: "protectiveDome", type: "cupula-translúcida", visible: true, state: { start: "descendo", end: "protegendo" } },
      { id: "visualPlanner", type: "cronograma-visual-3d", visible: true },
      { id: "brandWatermark", type: "logo-watermark", visible: true },
    ],
    animations: [
      { type: "interpolate", target: "sensoryChaos.amp", startFrame: 0, endFrame: 75, from: 0, to: 1, easing: "out", unit: "0-1" },
      { type: "spring", target: "domeShield.drop", startFrame: 80, endFrame: 140, from: 4, to: 0, damping: 10, unit: "u3d" },
      { type: "interpolate", target: "soundDamping.fade", startFrame: 140, endFrame: 210, from: 1, to: 0.15, easing: "soft", unit: "0-1" },
      { type: "spring", target: "softGlow.intensity", startFrame: 215, endFrame: 280, from: 0, to: 1, damping: 9, unit: "0-1" },
    ],
    badges: [
      { text: "SOBRECARGA SENSORIAL", variant: "negative", appearAt: 15, disappearAt: 120 },
      { text: "AMBIENTE PREVISÍVEL", variant: "positive", appearAt: 125, disappearAt: 230 },
      { text: "ACOLHIMENTO SENSORIAL", variant: "positive", appearAt: 235, disappearAt: 350 },
    ],
    highlights: ["TEA", "AUTISMO", "LUZES", "SOBRECARGA", "PREVISÍVEL", "SEGURO", "ACOLHEDOR"],
    captions: [
      { text: "No TEA, o autismo, excesso de estímulos gera uma sobrecarga real.", from: 8, to: 150 },
      { text: "A solução é oferecer um ambiente previsível, seguro e acolhedor.", from: 155, to: 350 },
    ],
    audioCues: [narration("s5", 8), sfx("buzz-static", 15, 0.2), sfx("gentle-dome-shield", 85, 0.35)],
  },

  // CENA 6: Conexão e Neurociência do Afeto [1680 - 2040) = 12s
  {
    id: "scene-06-conexao-humana",
    startFrame: 1680,
    durationInFrames: 360,
    voKey: "s6",
    narration: "A ciência comprova: a conexão humana acalma o sistema nervoso. Quando substituímos o julgamento pelo acolhimento, o cérebro neurodivergente se reorganiza e encontra paz.",
    camera: {
      projection: "perspective",
      movement: "dolly-out",
      keys: [key(0, P.teaModule), key(360, P.connectionWide, "soft")],
    },
    objects: [
      { id: "room", type: "diorama-base", visible: true },
      { id: "integratedBrain", type: "cerebro-sincronizado", visible: true, state: { start: "harmonizando", end: "pleno" } },
      { id: "lightBridge", type: "ponte-dourada-luz", visible: true },
      { id: "stressGraph", type: "grafico-cortisol", visible: true },
      { id: "brandWatermark", type: "logo-watermark", visible: true },
    ],
    animations: [
      { type: "interpolate", target: "neuralSync.phase", startFrame: 0, endFrame: 180, from: 0, to: 360, easing: "linear", unit: "deg" },
      { type: "spring", target: "connectionBridge.grow", startFrame: 30, endFrame: 90, from: 0, to: 1, damping: 10, unit: "0-1" },
      { type: "interpolate", target: "stressGraph.descend", startFrame: 90, endFrame: 210, from: 1, to: 0.1, easing: "soft", unit: "0-1" },
    ],
    badges: [
      { text: "CONEXÃO ANTES DE CORREÇÃO", variant: "info", appearAt: 20, disappearAt: 160 },
      { text: "NEUROPLASTICIDADE & PAZ", variant: "positive", appearAt: 165, disappearAt: 340 },
    ],
    highlights: ["CIÊNCIA", "CONEXÃO", "NERVOSO", "ACOLHIMENTO", "PAZ"],
    captions: [
      { text: "A ciência comprova: a conexão humana acalma o sistema nervoso.", from: 8, to: 155 },
      { text: "Com acolhimento no lugar de julgamento, a mente encontra paz.", from: 160, to: 350 },
    ],
    audioCues: [narration("s6", 8), sfx("warm-pad-swell", 20, 0.35)],
  },

  // CENA 7: Pilares de Acolhimento no Dia a Dia [2040 - 2370) = 11s
  {
    id: "scene-07-tres-pilares",
    startFrame: 2040,
    durationInFrames: 330,
    voKey: "s7",
    narration: "Ajudar de verdade é simples: escutar com paciência, respeitar o tempo de cada um e nunca isolar quem mais precisa de apoio e inclusão.",
    camera: {
      projection: "perspective",
      movement: "orbit",
      keys: [key(0, P.threePillars), key(330, P.pillarsEnd, "soft")],
    },
    objects: [
      { id: "room", type: "diorama-base", visible: true },
      { id: "pillar1", type: "pilar-escuta-ativa", visible: true, state: { start: "subindo", end: "brilhando" } },
      { id: "pillar2", type: "pilar-respeitar-tempo", visible: true, state: { start: "subindo", end: "brilhando" } },
      { id: "pillar3", type: "pilar-inclusao-social", visible: true, state: { start: "subindo", end: "brilhando" } },
      { id: "brandWatermark", type: "logo-watermark", visible: true },
    ],
    animations: [
      { type: "spring", target: "pillar1.rise", startFrame: 15, endFrame: 65, from: -3, to: 0, damping: 9, unit: "u3d" },
      { type: "spring", target: "pillar2.rise", startFrame: 55, endFrame: 105, from: -3, to: 0, damping: 9, unit: "u3d" },
      { type: "spring", target: "pillar3.rise", startFrame: 95, endFrame: 145, from: -3, to: 0, damping: 9, unit: "u3d" },
    ],
    badges: [
      { text: "ESCUTAR COM PACIÊNCIA", variant: "positive", appearAt: 15, disappearAt: 105 },
      { text: "RESPEITAR O TEMPO", variant: "positive", appearAt: 110, disappearAt: 195 },
      { text: "NUNCA ISOLAR", variant: "positive", appearAt: 200, disappearAt: 320 },
    ],
    highlights: ["SIMPLES", "PACIÊNCIA", "TEMPO", "ISOLAR", "APOIO", "INCLUSÃO"],
    captions: [
      { text: "Ajudar de verdade é simples: escutar com paciência,", from: 8, to: 125 },
      { text: "respeitar o tempo de cada um e nunca isolar quem precisa de apoio.", from: 130, to: 320 },
    ],
    audioCues: [narration("s7", 8), sfx("pillar-rise-1", 15, 0.25), sfx("pillar-rise-2", 55, 0.25), sfx("pillar-rise-3", 95, 0.25)],
  },

  // CENA 8: Conclusão & Projeto Social Amor Que Compartilha [2370 - 2700) = 11s
  {
    id: "scene-08-projeto-social",
    startFrame: 2370,
    durationInFrames: 330,
    voKey: "s8",
    narration: "Pessoas neurodivergentes não precisam ser consertadas; elas precisam ser amadas e compreendidas. Apoie essa causa: Projeto Social Amor Que Compartilha. Acesse www.amorquecompartilha.",
    camera: {
      projection: "perspective",
      movement: "dolly-out",
      keys: [key(0, P.pillarsEnd), key(330, P.finalGrand, "soft")],
    },
    objects: [
      { id: "room", type: "diorama-base", visible: true },
      { id: "heart3D", type: "coracao-emblema-3d", visible: true, state: { start: "pulsando", end: "glorioso" } },
      { id: "handsEmbrace", type: "maos-acolhimento-3d", visible: true },
      { id: "outroCard", type: "card-final-institucional", visible: true },
      { id: "brandWatermark", type: "logo-watermark", visible: true },
    ],
    animations: [
      { type: "interpolate", target: "heart.pulse", startFrame: 0, endFrame: 150, from: 1.0, to: 1.12, easing: "inOut", unit: "0-1" },
      { type: "spring", target: "embraceHands.close", startFrame: 30, endFrame: 90, from: 0, to: 1, damping: 10, unit: "0-1" },
      { type: "spring", target: "endCard.slideUp", startFrame: 70, endFrame: 140, from: 300, to: 0, damping: 9, unit: "px" },
      { type: "interpolate", target: "fadeToBlack", startFrame: 305, endFrame: 330, from: 0, to: 1, easing: "in", unit: "0-1" },
    ],
    badges: [
      { text: "AMAR E COMPREENDER", variant: "info", size: "large", appearAt: 15, disappearAt: 155 },
      { text: "PROJETO SOCIAL AMOR QUE COMPARTILHA", variant: "positive", size: "large", appearAt: 160, disappearAt: 320 },
    ],
    highlights: ["AMADAS", "COMPREENDIDAS", "PROJETO", "SOCIAL", "AMOR", "COMPARTILHA"],
    captions: [
      { text: "Elas não precisam ser consertadas; precisam ser amadas e compreendidas.", from: 8, to: 155 },
      { text: "Projeto Social Amor Que Compartilha: acesse www.amorquecompartilha", from: 160, to: 320 },
    ],
    audioCues: [narration("s8", 8), sfx("uplifting-final-chord", 20, 0.35)],
  },
];

// Verificação de integridade da timeline em tempo de carregamento
scenes.forEach((cur, i) => {
  const prev = scenes[i - 1];
  if (prev && prev.startFrame + prev.durationInFrames !== cur.startFrame) {
    throw new Error(`Descontinuidade detectada entre cenas ${prev.id} e ${cur.id}`);
  }
});

const totalFrames = scenes.reduce((acc, s) => acc + s.durationInFrames, 0);
if (totalFrames !== VIDEO.durationInFrames || scenes[0].startFrame !== 0) {
  throw new Error(`As cenas somam ${totalFrames} frames (esperado ${VIDEO.durationInFrames})`);
}
