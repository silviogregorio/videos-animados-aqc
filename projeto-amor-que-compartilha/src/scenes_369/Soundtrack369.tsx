import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";
import { scenes369 } from "./data_369";
import { DURATION_369, f369, VO_369 } from "./timing_369";

// Trilha Eye of the Tiger bem suave com ducking natural sob a locução
const MUSIC = { base: 0.18, ducked: 0.07, ramp: 14 };

const musicVolume = (frame: number) => {
  let duck = 0;
  for (const seg of VO_369) {
    const start = f369(seg.at);
    const end = f369(seg.at + seg.seconds);
    const d = Math.min(
      Math.max(0, (frame - (start - MUSIC.ramp)) / MUSIC.ramp),
      Math.max(0, (end + MUSIC.ramp * 2 - frame) / (MUSIC.ramp * 2)),
      1
    );
    duck = Math.max(duck, d);
  }
  const fadeOut = Math.min(1, Math.max(0, (DURATION_369 - frame) / 45));
  return (MUSIC.base - (MUSIC.base - MUSIC.ducked) * duck) * fadeOut;
};

export const Soundtrack369: React.FC = () => {
  return (
    <>
      {/* 1. Trilha Instrumental Suave 'Eye of the Tiger' */}
      <Audio
        name="Eye of the Tiger (Versão Suave)"
        src={staticFile("audio_369/eye_of_the_tiger_soft.wav")}
        volume={musicVolume}
      />

      {/* 2. Narrações de Cada Cena da 369APP */}
      {scenes369.map((sc) => (
        <Sequence
          key={sc.id}
          name={`Áudio · ${sc.title}`}
          from={sc.startFrame}
          durationInFrames={sc.durationInFrames + 90}
          layout="none"
        >
          {sc.audioCues.map((cue, i) => (
            <Audio
              key={`${cue.src}-${i}`}
              name={`${cue.kind} · ${cue.src}`}
              src={staticFile(cue.src)}
              from={Math.max(0, cue.at)}
              volume={cue.volume}
            />
          ))}
        </Sequence>
      ))}
    </>
  );
};
