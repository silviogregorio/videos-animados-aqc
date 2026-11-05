import { loadFont } from "@remotion/google-fonts/Montserrat";

export const { fontFamily: FONT } = loadFont("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const PALETTE = {
  // Estados didáticos
  positive: "#20b85a",
  negative: "#e5383b",
  info: "#2f7df6",
  warning: "#f8c815",
  // Interface
  text: "#ffffff",
  outline: "#0a1420",
  accent: "#ffb703",
  heartPink: "#ff4d6d",
  skyBlue: "#4cc9f0",
  softTeal: "#06d6a0",
  // Cores do Diorama 3D
  ground: "#2d3748",
  groundSide: "#1a202c",
  pedestal: "#1e293b",
  woodDesk: "#b48c68",
  characterBody: "#38bdf8",
  characterHead: "#fed7aa",
  brainCore: "#c084fc",
  brainSynapse: "#38bdf8",
  stressSpikes: "#ef4444",
  calmAura: "#38bdf8",
  domeShield: "#2dd4bf",
  goldPillar: "#f59e0b",
} as const;

export const MATTE = { roughness: 0.82, metalness: 0.05, flatShading: true } as const;
export const METAL = { roughness: 0.35, metalness: 0.6, flatShading: true } as const;

export const LIGHTING = {
  ambient: 0.65,
  hemisphere: { sky: "#e0f2fe", ground: "#334155", intensity: 1.1 },
  key: { position: [10, 18, 14] as [number, number, number], intensity: 2.8, color: "#fffbeb" },
  fill: { position: [-14, 8, 10] as [number, number, number], intensity: 0.9, color: "#dbeafe" },
  rim: { position: [-6, 10, -14] as [number, number, number], intensity: 0.8, color: "#ffffff" },
  shadowMapSize: 2048,
} as const;

export const CAMERA = { fov: 24, near: 0.5, far: 400 } as const;

export const SAFE = {
  top: 250,
  bottom: 1540,
  side: 90,
  badgeTop: 262,
  captionCenterY: 1418,
} as const;

export const SKY = {
  surface: ["#1e293b", "#0f172a", "#090d16"],
  underground: ["#0f172a", "#0a0f1d", "#05070d"],
} as const;

export const KEYWORD_COLOR: Record<string, string> = {
  VIVA: "#ffd166",
  FINGIR: "#ef476f",
  AME: "#ff4d6d",
  DEPENDER: "#fb8500",
  ESCUTE: "#38bdf8",
  ATACAR: "#ef476f",
  FALE: "#06d6a0",
  OFENDER: "#ef476f",
  VERDADEIRO: "#ffd166",
  LIBERDADE: "#38bdf8",
  ESPERANÇA: "#06d6a0",
  ESSÊNCIA: "#ffd166",
  GRATIDÃO: "#ffd166",
  PAZ: "#4ade80",
  PACIÊNCIA: "#38bdf8",
  AMOR: "#ff4d6d",
  COMPARTILHA: "#ffd166",
  PROJETO: "#fb8500",
  SOCIAL: "#f59e0b",
  SILÊNCIO: "#38bdf8",
  COMPASSIVA: "#4ade80",
};

export const KEYWORD_DEFAULT = "#38bdf8";
