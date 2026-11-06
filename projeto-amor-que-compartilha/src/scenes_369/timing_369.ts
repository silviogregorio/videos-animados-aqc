import vo from "../data/vo_369.json";

export const FPS_369 = 30;
export const WIDTH_369 = 1080;
export const HEIGHT_369 = 1920;
export const SECONDS_369 = 75;
export const DURATION_369 = SECONDS_369 * FPS_369; // 2250 frames

export const f369 = (seconds: number) => Math.round(seconds * FPS_369);

export const VO_KEYS_369 = ["s1", "s2", "s3", "s4", "s5"] as const;
export type VoKey369 = (typeof VO_KEYS_369)[number];

const FIRST_VO = 0.45;
const LEAD = 0.20;
const GAPS = [0.35, 0.35, 0.35, 0.35];

type VoWord = { text: string; start: number; end: number };
type VoLine = { text: string; seconds: number; words: VoWord[] };
const VO_DATA = vo as unknown as Record<VoKey369, VoLine>;

const voStart = {} as Record<VoKey369, number>;
{
  let t = FIRST_VO;
  VO_KEYS_369.forEach((key, i) => {
    voStart[key] = t;
    const dur = VO_DATA[key]?.seconds ?? 13.0;
    t += dur + (GAPS[i] ?? 0.35);
  });
}

export const VO_START_369: Readonly<Record<VoKey369, number>> = voStart;

export const VO_369 = VO_KEYS_369.map((id) => ({
  id,
  at: VO_START_369[id],
  seconds: VO_DATA[id].seconds,
  text: VO_DATA[id].text,
}));

export const SCENE_FRAMES_369 = VO_KEYS_369.map((key, i) => {
  const next = VO_KEYS_369[i + 1];
  const from = i === 0 ? 0 : f369(VO_START_369[key] - LEAD);
  const to = next ? f369(VO_START_369[next] - LEAD) : DURATION_369;
  return { from, durationInFrames: to - from };
});

export const voLocal369 = (key: VoKey369) =>
  f369(VO_START_369[key]) - SCENE_FRAMES_369[VO_KEYS_369.indexOf(key)].from;

export const voWords369 = (key: VoKey369): VoWord[] => VO_DATA[key]?.words ?? [];

