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
  const fadeIn = interpolate(localFrame, [0, 15], [0.2, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(localFrame, [0, currentScene.durationInFrames], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });
  const swayX = Math.sin(frame * 0.02) * 4;
  const swayY = Math.cos(frame * 0.025) * 3;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f141a", overflow: "hidden" }}>
      {/* 1. Imagem de Alta Resolução da Cena 369APP */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translate(${swayX}px, ${swayY}px)`,
          opacity: fadeIn,
        }}
      >
        <Img
          src={staticFile(`scenes_369app/scene${sceneIdx}.jpg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 2. Vinheta Cinematográfica Escura & Dourada Premium */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(15, 20, 26, 0.15) 35%, rgba(10, 14, 18, 0.75) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. Glow Dourado Ambiente no topo para realçar a marca */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(191, 149, 63, 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
