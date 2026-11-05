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
  // CENA 1: VIVA SEM FINGIR (Sol / Manhã Dourada / Autenticidade)
  {
    id: "scene-01-viva-sem-fingir",
    startFrame: sc(0).from,
    durationInFrames: sc(0).durationInFrames,
    voKey: "s1",
    narration: "Viver em paz é uma arte que começa dentro de nós: viva sem fingir. Deixe cair as máscaras da aprovação dos outros. A sua maior força está em acolher a sua essência com verdade e gratidão.",
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
      { text: "1. VIVA SEM FINGIR", variant: "warning", appearAt: 20, disappearAt: Math.min(160, end(0) - 10) },
      { text: "AUTENTICIDADE & GRATIDÃO", variant: "positive", appearAt: 170, disappearAt: end(0) - 5 },
    ],
    highlights: ["VIVER", "PAZ", "ARTE", "VIVA", "FINGIR", "MÁSCARAS", "FORÇA", "ESSÊNCIA", "GRATIDÃO"],
    captions: [{ text: "Viver em paz é uma arte que começa dentro de nós: viva sem fingir.", from: voLocal("s1"), to: end(0) }],
    audioCues: [narration("s1"), sfx("whoosh-soft", 0, 0.25), sfx("glow", 25, 0.35)],
  },

  // CENA 2: AME SEM DEPENDER (Crepúsculo / Outono / Liberdade)
  {
    id: "scene-02-ame-sem-depender",
    startFrame: sc(1).from,
    durationInFrames: sc(1).durationInFrames,
    voKey: "s2",
    narration: "Ame sem depender. O amor verdadeiro não é um apego que aprisiona, mas um encontro de liberdade. Amar é transbordar a própria paz e caminhar lado a lado, cuidando do coração de quem amamos.",
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
      { text: "2. AME SEM DEPENDER", variant: "warning", appearAt: 20, disappearAt: Math.min(160, end(1) - 10) },
      { text: "AMOR QUE LIBERTA", variant: "positive", appearAt: 170, disappearAt: end(1) - 5 },
    ],
    highlights: ["AME", "DEPENDER", "VERDADEIRO", "LIBERDADE", "AMAR", "PAZ", "CORAÇÃO"],
    captions: [{ text: "Ame sem depender. O amor verdadeiro floresce na liberdade.", from: voLocal("s2"), to: end(1) }],
    audioCues: [narration("s2"), sfx("whoosh-soft", 0, 0.25), sfx("ding", 20, 0.32)],
  },

  // CENA 3: ESCUTE SEM ATACAR (Noite Serena / Estrelas / Empatia)
  {
    id: "scene-03-escute-sem-atacar",
    startFrame: sc(2).from,
    durationInFrames: sc(2).durationInFrames,
    voKey: "s3",
    narration: "Escute sem atacar. Muitas vezes, quem desabafa só precisa de um porto seguro, e não de julgamentos. O silêncio acolhedor e a escuta compassiva têm o poder de confortar a alma humana.",
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
      { text: "3. ESCUTE SEM ATACAR", variant: "info", appearAt: 20, disappearAt: Math.min(160, end(2) - 10) },
      { text: "ESCUTA COMPASSIVA", variant: "positive", appearAt: 170, disappearAt: end(2) - 5 },
    ],
    highlights: ["ESCUTE", "ATACAR", "PORTO", "SEGURO", "JULGAMENTOS", "SILÊNCIO", "COMPASSIVA", "ALMA"],
    captions: [{ text: "Escute sem atacar. Quem desabafa só precisa de um porto seguro.", from: voLocal("s3"), to: end(2) }],
    audioCues: [narration("s3"), sfx("whoosh-soft", 0, 0.25), sfx("shimmer", 20, 0.35)],
  },

  // CENA 4: FALE SEM OFENDER (Primavera / Verde Esmeralda / Palavras que Edificam)
  {
    id: "scene-04-fale-sem-ofender",
    startFrame: sc(3).from,
    durationInFrames: sc(3).durationInFrames,
    voKey: "s4",
    narration: "Fale sem ofender. Suas palavras carregam a força de construir ou ferir. Escolha ser uma voz que semeia esperança, encoraja corações e ilumina a caminhada de quem cruza a sua vida.",
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
      { text: "4. FALE SEM OFENDER", variant: "positive", appearAt: 20, disappearAt: Math.min(160, end(3) - 10) },
      { text: "PALAVRAS QUE EDIFICAM", variant: "positive", appearAt: 170, disappearAt: end(3) - 5 },
    ],
    highlights: ["FALE", "OFENDER", "PALAVRAS", "CONSTRUIR", "ESPERANÇA", "ENCORAJA", "ILUMINA"],
    captions: [{ text: "Fale sem ofender. Suas palavras carregam a força de construir e curar.", from: voLocal("s4"), to: end(3) }],
    audioCues: [narration("s4"), sfx("whoosh-soft", 0, 0.25), sfx("glow", 20, 0.32)],
  },

  // CENA 5: PROJETO SOCIAL AMOR QUE COMPARTILHA (Conclusão & Chamada Sagrada)
  {
    id: "scene-05-amor-que-compartilha",
    startFrame: sc(4).from,
    durationInFrames: sc(4).durationInFrames,
    voKey: "s5",
    narration: "Viver bem é colocar o amor em ação todos os dias. Projeto Social Amor Que Compartilha. Acesse www ponto amorquecompartilha ponto com ponto br e siga no Instagram arroba amor ponto que ponto compartilha. Faça parte dessa missão.",
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
      { text: "LIÇÃO DA VIDA", variant: "warning", size: "large", appearAt: 15, disappearAt: 130 },
      { text: "AMOR EM AÇÃO", variant: "positive", size: "large", appearAt: 135, disappearAt: end(4) - 5 },
    ],
    highlights: ["VIVER", "BEM", "AMOR", "AÇÃO", "PROJETO", "SOCIAL", "COMPARTILHA", "MISSÃO"],
    captions: [{ text: "Viver bem é colocar o amor em ação todos os dias. Conheça e apoie:", from: voLocal("s5"), to: end(4) }],
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
