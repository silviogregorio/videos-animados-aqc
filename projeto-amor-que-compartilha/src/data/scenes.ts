import { evaluateTrack, orbit, type EaseName, type TrackAnimation, type Vec3 } from "../utils/animation";
import { DURATION, FPS, HEIGHT, SCENE_FRAMES, voLocal, WIDTH, type VoKey } from "../utils/timing";

export type VideoConfig = {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  theme: string;
  language: string;
};

export const VIDEO: VideoConfig = {
  width: WIDTH,
  height: HEIGHT,
  fps: FPS,
  durationInFrames: DURATION,
  theme: "licao-de-vida-3d",
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

export type SceneObject = { id: string; type: string; visible: boolean; state?: { start: string; end: string } };

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
  kind: "narration" | "sfx";
  src: string;
  at: number;
  volume: number;
  status: "planned" | "ready";
};

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

const sc = (i: number) => SCENE_FRAMES[i];
const end = (i: number) => SCENE_FRAMES[i].durationInFrames;
const key = (at: number, pose: { position: Vec3; target: Vec3 }, easing?: EaseName): CameraKey => ({ at, ...pose, easing });
const narration = (k: VoKey): AudioCue => ({ kind: "narration", src: `audio/vo/${k}.wav`, at: voLocal(k), volume: 1, status: "ready" });
const sfx = (name: string, at: number, volume: number): AudioCue => ({ kind: "sfx", src: `audio/sfx/${name}.wav`, at, volume, status: "ready" });

// Posições da câmera 3D para um suave efeito parallax cinematográfico de imersão
const P = {
  s1Start: orbit([0, 0.4, 0], 19, 0, 0),
  s1End: orbit([0, 0.2, 0], 16.5, 3, 2),

  s2Start: orbit([0, 0.4, 0], 18.5, -3, 0),
  s2End: orbit([0, 0.2, 0], 16, 2, 2),

  s3Start: orbit([0, 0.4, 0], 19, 2, 0),
  s3End: orbit([0, 0.2, 0], 16.5, -2, 2),

  s4Start: orbit([0, 0.4, 0], 18.5, -2, 0),
  s4End: orbit([0, 0.2, 0], 16, 3, 2),

  s5Start: orbit([0, 0.5, 0], 21, 0, 0),
  s5End: orbit([0, 0.3, 0], 17.5, 4, 3),
};

export const scenes: ScenePlan[] = [
  // CENA 1: VOCÊ NÃO ESTÁ SOZINHO (Ansiedade / Depressão / Coragem de Pedir Ajuda)
  {
    id: "scene-01-voce-nao-esta-sozinho",
    startFrame: sc(0).from,
    durationInFrames: sc(0).durationInFrames,
    voKey: "s1",
    narration: "A ansiedade e a depressão podem fazer parecer que você está sozinho em uma noite escura. Mas saiba: sentir dor não é fraqueza, e pedir ajuda é o maior ato de coragem que existe.",
    camera: {
      projection: "perspective",
      movement: "dolly-in",
      keys: [key(0, P.s1Start), key(end(0), P.s1End, "soft")],
    },
    objects: [
      { id: "artPlane1", type: "fine-art-realism", visible: true },
      { id: "goldenEmbers", type: "glowing-particles-3d", visible: true },
      { id: "sunRays", type: "volumetric-godrays", visible: true },
    ],
    animations: [
      { type: "spring", target: "pillar1.enter", startFrame: 5, endFrame: 45, from: -300, to: 0, damping: 9, unit: "px" },
      { type: "interpolate", target: "embers.rise", startFrame: 0, endFrame: end(0), from: 0, to: 4.5, easing: "linear", unit: "u3d" },
      { type: "interpolate", target: "light.warmth", startFrame: 0, endFrame: 60, from: 0.6, to: 1.0, easing: "out", unit: "0-1" },
    ],
    badges: [
      { text: "1. VOCÊ NÃO ESTÁ SOZINHO", variant: "warning", appearAt: 20, disappearAt: Math.min(160, end(0) - 10) },
      { text: "PEDIR AJUDA É CORAGEM", variant: "positive", appearAt: 170, disappearAt: end(0) - 5 },
    ],
    highlights: ["ANSIEDADE", "DEPRESSÃO", "SOZINHO", "NOITE", "DOR", "FRAQUEZA", "AJUDA", "CORAGEM"],
    captions: [{ text: "Sentir dor não é fraqueza. Pedir ajuda é um ato de coragem.", from: voLocal("s1"), to: end(0) }],
    audioCues: [narration("s1"), sfx("whoosh-soft", 0, 0.25), sfx("glow", 25, 0.35)],
  },

  // CENA 2: GOVERNO FEDERAL — LIGUE 188 (CVV / Apoio Emocional 24h Gratuito)
  {
    id: "scene-02-cvv-ligue-188",
    startFrame: sc(1).from,
    durationInFrames: sc(1).durationInFrames,
    voKey: "s2",
    narration: "Em qualquer momento de angústia ou pensamentos difíceis, ligue 188. O CVV, Centro de Valorização da Vida, oferece apoio emocional gratuito, sigiloso e disponível vinte e quatro horas por dia, todos os dias.",
    camera: {
      projection: "perspective",
      movement: "dolly-in",
      keys: [key(0, P.s2Start), key(end(1), P.s2End, "soft")],
    },
    objects: [
      { id: "artPlane2", type: "fine-art-realism", visible: true },
      { id: "autumnLeaves", type: "floating-leaves-3d", visible: true },
      { id: "warmGlow", type: "twilight-atmosphere", visible: true },
    ],
    animations: [
      { type: "spring", target: "pillar2.enter", startFrame: 5, endFrame: 45, from: -300, to: 0, damping: 9, unit: "px" },
      { type: "interpolate", target: "leaves.drift", startFrame: 0, endFrame: end(1), from: 0, to: 3.5, easing: "linear", unit: "u3d" },
    ],
    badges: [
      { text: "2. LIGUE 188 • CVV", variant: "warning", appearAt: 20, disappearAt: Math.min(160, end(1) - 10) },
      { text: "24 HORAS & GRATUITO", variant: "positive", appearAt: 170, disappearAt: end(1) - 5 },
    ],
    highlights: ["ANGÚSTIA", "DIFÍCEIS", "188", "CVV", "APOIO", "EMOCIONAL", "GRATUITO", "SIGILOSO", "HORAS"],
    captions: [{ text: "Ligue 188. Apoio emocional gratuito, sigiloso e 24 horas por dia.", from: voLocal("s2"), to: end(1) }],
    audioCues: [narration("s2"), sfx("whoosh-soft", 0, 0.25), sfx("ding", 20, 0.32)],
  },

  // CENA 3: GOVERNO ESTADUAL & SUS — CAPS E UBS (Atendimento Médico e Psicológico)
  {
    id: "scene-03-rede-sus-caps-ubs",
    startFrame: sc(2).from,
    durationInFrames: sc(2).durationInFrames,
    voKey: "s3",
    narration: "Pelo SUS, no Estado de São Paulo e em todo o país, você tem direito a atendimento médico e psicológico gratuito nos CAPS, Centros de Atenção Psicossocial, e nas Unidades Básicas de Saúde perto de você.",
    camera: {
      projection: "perspective",
      movement: "dolly-in",
      keys: [key(0, P.s3Start), key(end(2), P.s3End, "soft")],
    },
    objects: [
      { id: "artPlane3", type: "fine-art-realism", visible: true },
      { id: "blueStars", type: "starlight-particles-3d", visible: true },
      { id: "nightAura", type: "serene-night-atmosphere", visible: true },
    ],
    animations: [
      { type: "spring", target: "pillar3.enter", startFrame: 5, endFrame: 45, from: -300, to: 0, damping: 9, unit: "px" },
      { type: "interpolate", target: "stars.twinkle", startFrame: 0, endFrame: end(2), from: 0, to: 2.5, easing: "linear", unit: "u3d" },
    ],
    badges: [
      { text: "3. CAPS & UBS • SUS", variant: "info", appearAt: 20, disappearAt: Math.min(160, end(2) - 10) },
      { text: "CUIDADO MÉDICO & PSICOLÓGICO", variant: "positive", appearAt: 170, disappearAt: end(2) - 5 },
    ],
    highlights: ["SUS", "SÃO PAULO", "MÉDICO", "PSICOLÓGICO", "GRATUITO", "CAPS", "UBS", "SAÚDE"],
    captions: [{ text: "Atendimento médico e psicológico gratuito nos CAPS e UBSs perto de você.", from: voLocal("s3"), to: end(2) }],
    audioCues: [narration("s3"), sfx("whoosh-soft", 0, 0.25), sfx("shimmer", 20, 0.35)],
  },

  // CENA 4: CIDADE DE FERNANDÓPOLIS SP — CAPS II, UPA 24H E SAMU 192
  {
    id: "scene-04-fernandopolis-caps-upa-samu",
    startFrame: sc(3).from,
    durationInFrames: sc(3).durationInFrames,
    voKey: "s4",
    narration: "Se você está em Fernandópolis, procure o CAPS II municipal, a sua UBS de bairro ou a UPA vinte e quatro horas. Em momentos de crise urgente, ligue cento e noventa e dois para o SAMU ou cento e noventa e três.",
    camera: {
      projection: "perspective",
      movement: "dolly-in",
      keys: [key(0, P.s4Start), key(end(3), P.s4End, "soft")],
    },
    objects: [
      { id: "artPlane4", type: "fine-art-realism", visible: true },
      { id: "springPetals", type: "pollen-blossom-particles-3d", visible: true },
      { id: "emeraldLight", type: "spring-meadow-atmosphere", visible: true },
    ],
    animations: [
      { type: "spring", target: "pillar4.enter", startFrame: 5, endFrame: 45, from: -300, to: 0, damping: 9, unit: "px" },
      { type: "interpolate", target: "petals.drift", startFrame: 0, endFrame: end(3), from: 0, to: 3.0, easing: "linear", unit: "u3d" },
    ],
    badges: [
      { text: "4. FERNANDÓPOLIS: CAPS II & UPA", variant: "positive", appearAt: 20, disappearAt: Math.min(160, end(3) - 10) },
      { text: "SAMU 192 • BOMBEIROS 193", variant: "positive", appearAt: 170, disappearAt: end(3) - 5 },
    ],
    highlights: ["FERNANDÓPOLIS", "CAPS", "II", "UBS", "UPA", "HORAS", "CRISE", "192", "SAMU", "193"],
    captions: [{ text: "Em Fernandópolis: CAPS II, sua UBS ou UPA 24h. Emergência: 192 SAMU.", from: voLocal("s4"), to: end(3) }],
    audioCues: [narration("s4"), sfx("whoosh-soft", 0, 0.25), sfx("glow", 20, 0.32)],
  },

  // CENA 5: PROJETO SOCIAL AMOR QUE COMPARTILHA — SUA VIDA TEM VALOR
  {
    id: "scene-05-sua-vida-tem-valor",
    startFrame: sc(4).from,
    durationInFrames: sc(4).durationInFrames,
    voKey: "s5",
    narration: "A sua vida tem um valor imenso e há pessoas prontas para caminhar ao seu lado. Projeto Social Amor Que Compartilha. Acesse www ponto amorquecompartilha ponto com ponto br e siga no Instagram arroba amor ponto que ponto compartilha.",
    camera: {
      projection: "perspective",
      movement: "dolly-out",
      keys: [key(0, P.s5Start), key(end(4), P.s5End, "soft")],
    },
    objects: [
      { id: "artPlane5", type: "fine-art-realism", visible: true },
      { id: "goldenHeart3D", type: "sacred-heart-3d", visible: true },
      { id: "sacredRays", type: "divine-radiance-3d", visible: true },
      { id: "endCard", type: "card-final-institucional", visible: true },
    ],
    animations: [
      { type: "interpolate", target: "heart.pulse", startFrame: 0, endFrame: end(4), from: 1.0, to: 1.15, easing: "inOut", unit: "0-1" },
      { type: "spring", target: "endCard.slideUp", startFrame: 60, endFrame: 120, from: 320, to: 0, damping: 9, unit: "px" },
      { type: "interpolate", target: "fade", startFrame: end(4) - 25, endFrame: end(4), from: 0, to: 1, easing: "in", unit: "0-1" },
    ],
    badges: [
      { text: "SUA VIDA VALE MUITO", variant: "warning", size: "large", appearAt: 15, disappearAt: 130 },
      { text: "PROCURAR AJUDA SALVA", variant: "positive", size: "large", appearAt: 135, disappearAt: end(4) - 5 },
    ],
    highlights: ["VIDA", "VALOR", "IMENSO", "CAMINHAR", "LADO", "PROJETO", "SOCIAL", "COMPARTILHA"],
    captions: [{ text: "Sua vida tem um valor imenso. Não desista: há apoio para você.", from: voLocal("s5"), to: end(4) }],
    audioCues: [narration("s5"), sfx("final", 15, 0.38), sfx("whoosh", end(4) - 25, 0.25)],
  },
];

export const track = (target: string, frame: number, fallback = 0) => evaluateTrack(scenes, target, frame, FPS, fallback);

export const sceneAt = (frame: number) => {
  for (let i = scenes.length - 1; i >= 0; i--) {
    if (frame >= scenes[i].startFrame) return scenes[i];
  }
  return scenes[0];
};

export const isVisible = (id: string, frame: number) => sceneAt(frame).objects.some((o) => o.id === id && o.visible);

// Verificação de integridade da timeline
scenes.forEach((cur, i) => {
  const prev = scenes[i - 1];
  if (prev && prev.startFrame + prev.durationInFrames !== cur.startFrame) {
    throw new Error(`Buraco ou sobreposição detectado entre ${prev.id} e ${cur.id}`);
  }
});
const total = scenes.reduce((acc, cur) => acc + cur.durationInFrames, 0);
if (total !== DURATION || scenes[0].startFrame !== 0) {
  throw new Error(`As cenas somam ${total} frames (esperado ${DURATION})`);
}
