import React, { useMemo } from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { sceneAt369 } from "./data_369";

export const Background369: React.FC = () => {
  const frame = useCurrentFrame();
  const currentScene = sceneAt369(frame);

  const sceneIdx = useMemo(() => {
    return Number(currentScene.voKey.replace("s", "")) || 1;
  }, [currentScene]);

  const localFrame = frame - currentScene.startFrame;
  const fadeIn = interpolate(localFrame, [0, 10], [0.35, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(localFrame, [0, currentScene.durationInFrames], [1.0, 1.04], {
    extrapolateRight: "clamp",
  });
  const swayX = Math.sin(frame * 0.02) * 4;
  const swayY = Math.cos(frame * 0.025) * 3;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f17", overflow: "hidden" }}>
      {/* 1. Base com gradiente escuro de tecnologia para garantir fundo 100% preenchido */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #090d13 0%, #121822 45%, #090d13 100%)",
        }}
      />

      {/* 2. Imagens de Alta Resolução 1080x1920 pré-carregadas para cada cena */}
      {[1, 2, 3, 4, 5].map((idx) => {
        const isCurrent = sceneIdx === idx;
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: isCurrent ? fadeIn : 0,
              transform: isCurrent ? `scale(${scale}) translate(${swayX}px, ${swayY}px)` : "scale(1)",
              pointerEvents: "none",
            }}
          >
            <Img
              src={staticFile(`scenes_369app/scene${idx}.jpg`)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        );
      })}

      {/* 3. Vinheta Cinematográfica Escura & Dourada Premium */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(11, 15, 23, 0.12) 35%, rgba(9, 12, 18, 0.82) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 4. Glow Dourado Ambiente no topo para realçar a marca 369APP */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(191, 149, 63, 0.14) 0%, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

