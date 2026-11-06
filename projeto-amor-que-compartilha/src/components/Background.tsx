import React, { useMemo } from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { sceneAt } from "../data/scenes";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const currentScene = sceneAt(frame);

  const sceneIdx = useMemo(() => {
    return Number(currentScene.voKey.replace("s", "")) || 1;
  }, [currentScene]);

  const localFrame = frame - currentScene.startFrame;
  const fadeIn = interpolate(localFrame, [0, 15], [0.15, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(localFrame, [0, currentScene.durationInFrames], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });
  const swayX = Math.sin(frame * 0.02) * 5;
  const swayY = Math.cos(frame * 0.025) * 4;

  return (
    <AbsoluteFill style={{ backgroundColor: "#060b14", overflow: "hidden" }}>
      {/* 1. Obra de Arte Realista de Cada Cena */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translate(${swayX}px, ${swayY}px)`,
          opacity: fadeIn,
        }}
      >
        <Img
          src={staticFile(`scenes/scene${sceneIdx}.jpg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 2. Vinheta Cinematográfica Suave para destacar tipografia e elementos 3D */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(0, 0, 0, 0.05) 45%, rgba(6, 11, 20, 0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
