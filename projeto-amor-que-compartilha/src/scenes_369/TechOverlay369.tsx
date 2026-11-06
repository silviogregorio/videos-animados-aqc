import React, { useMemo } from "react";
import { Img, random, staticFile, useCurrentFrame } from "remotion";
import { sceneAt369 } from "./data_369";

// Partículas Tecnológicas 2D/3D em SVG puro: zero WebGL, zero erro de shader, 100% confiável e levíssimo
const TechParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 55; i++) {
      list.push({
        x: random(`p-x-${i}`) * 1080,
        yStart: random(`p-y-${i}`) * 1920,
        speed: 1.2 + random(`p-spd-${i}`) * 2.2,
        swayAmp: 15 + random(`p-sway-${i}`) * 35,
        swayFreq: 0.02 + random(`p-freq-${i}`) * 0.03,
        r: 3 + random(`p-r-${i}`) * 5,
        isGold: i % 3 !== 0,
        opacity: 0.4 + random(`p-op-${i}`) * 0.5,
      });
    }
    return list;
  }, []);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <defs>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fcf6ba" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#0284c7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
      </defs>
      {particles.map((p, idx) => {
        const curY = ((p.yStart - frame * p.speed) % 1920 + 1920) % 1920;
        const curX = p.x + Math.sin(frame * p.swayFreq + idx) * p.swayAmp;
        const pulse = 1 + Math.sin(frame * 0.08 + idx) * 0.25;

        return (
          <circle
            key={idx}
            cx={curX}
            cy={curY}
            r={p.r * pulse}
            fill={p.isGold ? "url(#goldGlow)" : "url(#cyanGlow)"}
            opacity={p.opacity}
          />
        );
      })}
    </svg>
  );
};

// Emblema Metálico 3D em perspectiva pura (Cena 5)
const Emblem3D: React.FC = () => {
  const frame = useCurrentFrame();
  const rotY = Math.sin(frame * 0.03) * 12;
  const pulse = 1 + Math.sin(frame * 0.08) * 0.03;

  return (
    <div
      style={{
        position: "absolute",
        top: "42%",
        left: "50%",
        transform: `translate(-50%, -50%) perspective(1000px) rotateY(${rotY}deg) scale(${pulse})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 6,
        pointerEvents: "none",
      }}
    >
      {/* Halo de luz dourada */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(22, 27, 32, 0) 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Anel cibernético rotativo */}
      <div
        style={{
          position: "absolute",
          width: 440,
          height: 440,
          borderRadius: "50%",
          border: "2px dashed rgba(252, 246, 186, 0.45)",
          transform: `rotate(${frame * 0.5}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          borderRadius: "50%",
          border: "1.5px solid rgba(56, 189, 248, 0.35)",
          transform: `rotate(${-frame * 0.4}deg)`,
        }}
      />

      {/* Escultura do Logotipo 369APP */}
      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: 65,
          background: "linear-gradient(135deg, rgba(252, 246, 186, 0.95) 0%, rgba(179, 135, 40, 0.92) 50%, rgba(40, 32, 16, 0.95) 100%)",
          padding: 8,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(245, 158, 11, 0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid #fcf6ba",
        }}
      >
        <Img
          src={staticFile("brand_369/logo.png")}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 58,
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export const TechOverlay369: React.FC = () => {
  const frame = useCurrentFrame();
  const currentScene = sceneAt369(frame);
  const isScene5 = currentScene.voKey === "s5";

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      {/* 1. Partículas douradas e ciano contínuas */}
      <TechParticles />

      {/* 2. Emblema 3D monumental na cena 5 */}
      {isScene5 && <Emblem3D />}
    </div>
  );
};
