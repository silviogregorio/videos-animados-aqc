import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Background369 } from "./Background369";
import { scenes369, type SceneBadge369 } from "./data_369";
import { Soundtrack369 } from "./Soundtrack369";
import { TechOverlay369 } from "./TechOverlay369";
import { voWords369, type VoKey369 } from "./timing_369";

const FONT_FAMILY = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// Marca d'água permanente oficial da 369APP no topo direito e pill institucional no topo esquerdo
const BrandOverlay369: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 30 }}>
      {/* 1. Marca d'Água Oficial 369APP no Canto Superior Direito */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          width: 135,
          height: 135,
          borderRadius: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 35px rgba(0, 0, 0, 0.65), 0 0 25px rgba(191, 149, 63, 0.35)",
          background: "rgba(22, 27, 32, 0.65)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(252, 246, 186, 0.45)",
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("brand_369/logo.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.95,
          }}
        />
      </div>

      {/* 2. Identificação Institucional no Canto Superior Esquerdo */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          padding: "16px 24px",
          borderRadius: 24,
          background: "rgba(22, 27, 32, 0.72)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(252, 246, 186, 0.35)",
          boxShadow: "0 10px 35px rgba(0, 0, 0, 0.55), 0 0 20px rgba(191, 149, 63, 0.15)",
          fontFamily: FONT_FAMILY,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#fcf6ba",
              letterSpacing: "0.04em",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
            }}
          >
            369APP
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: 50,
              background: "rgba(179, 135, 40, 0.28)",
              border: "1px solid rgba(252, 246, 186, 0.5)",
              color: "#ffffff",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Software & IA
          </span>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "#f7df8b",
              letterSpacing: "0.02em",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
            }}
          >
            🌐 www.369app.com.br
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.75)",
              letterSpacing: "0.02em",
            }}
          >
            • Tecnologia que Transforma
          </span>
        </div>
      </div>

      {/* 3. Rodapé Sutil com os 4 Pilares de Serviços da 369APP */}
      <div
        style={{
          position: "absolute",
          bottom: 45,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 15,
          fontWeight: 800,
          color: "rgba(252, 246, 186, 0.8)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.95)",
        }}
      >
        APLICATIVOS SOB MEDIDA • SITES & PORTAIS • SISTEMAS CORPORATIVOS • INTELIGÊNCIA ARTIFICIAL
      </div>
    </AbsoluteFill>
  );
};

// Badges flutuantes de cada cena com estilo dourado e tecnológico
const BadgeItem369: React.FC<{ badge: SceneBadge369 }> = ({ badge }) => {
  const frame = useCurrentFrame();
  const appear = badge.appearAt;
  const disappear = badge.disappearAt ?? appear + 150;

  if (frame < appear || frame > disappear) return null;

  const opacity = interpolate(
    frame,
    [appear, appear + 12, disappear - 12, disappear],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = interpolate(frame, [appear, appear + 12], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isGold = badge.variant === "gold";
  const isTech = badge.variant === "tech";
  const isLarge = badge.size === "large";

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: isLarge ? "14px 32px" : "10px 24px",
        borderRadius: 50,
        background: isGold
          ? "linear-gradient(135deg, rgba(179, 135, 40, 0.85) 0%, rgba(22, 27, 32, 0.92) 100%)"
          : isTech
          ? "linear-gradient(135deg, rgba(14, 116, 144, 0.85) 0%, rgba(22, 27, 32, 0.92) 100%)"
          : "linear-gradient(135deg, rgba(16, 185, 129, 0.85) 0%, rgba(22, 27, 32, 0.92) 100%)",
        border: isGold ? "2px solid #fcf6ba" : "2px solid #38bdf8",
        boxShadow: isGold
          ? "0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(252, 246, 186, 0.35)"
          : "0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(56, 189, 248, 0.35)",
        backdropFilter: "blur(12px)",
        color: "#ffffff",
        fontFamily: FONT_FAMILY,
        fontSize: isLarge ? 26 : 20,
        fontWeight: 900,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        textAlign: "center",
      }}
    >
      {badge.text}
    </div>
  );
};

const BadgeLayer369: React.FC<{ badges: SceneBadge369[] }> = ({ badges }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 240,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        pointerEvents: "none",
        zIndex: 25,
      }}
    >
      {badges.map((b, idx) => (
        <BadgeItem369 key={idx} badge={b} />
      ))}
    </div>
  );
};

// Card de encerramento institucional 369APP em relevo
const EndCard369: React.FC = () => {
  const frame = useCurrentFrame();
  const currentScene = scenes369[4];
  const localFrame = frame - currentScene.startFrame;

  if (localFrame < 50) return null;

  const slideUp = interpolate(localFrame, [50, 85], [300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 180,
        left: "50%",
        transform: `translate(-50%, ${slideUp}px)`,
        width: 880,
        padding: "36px 44px",
        borderRadius: 36,
        background: "rgba(18, 23, 29, 0.95)",
        backdropFilter: "blur(20px)",
        border: "3px solid #fcf6ba",
        boxShadow: "0 25px 65px rgba(0, 0, 0, 0.8), 0 0 45px rgba(252, 246, 186, 0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        fontFamily: FONT_FAMILY,
        textAlign: "center",
        zIndex: 35,
      }}
    >
      {/* Selo com Logotipo Oficial 369APP */}
      <div
        style={{
          width: 125,
          height: 125,
          borderRadius: 32,
          background: "rgba(255, 255, 255, 0.98)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(252, 246, 186, 0.5)",
          marginTop: -85,
          marginBottom: 4,
          border: "4px solid #b38728",
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("brand_369/logo.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ fontSize: 32, fontWeight: 900, color: "#fcf6ba", letterSpacing: "0.04em" }}>
        369APP SOLUÇÕES TECNOLÓGICAS
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0", letterSpacing: "0.02em" }}>
        Fale direto com quem desenvolve • Sem intermediários
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", marginTop: 4 }}>
        <div style={{ fontSize: 30, fontWeight: 900, color: "#f7df8b" }}>
          🌐 www.369app.com.br
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8" }}>
          📱 Aplicativos • Sistemas Web • Inteligência Artificial
        </div>
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "rgba(255,255,255,0.92)",
          fontStyle: "italic",
          marginTop: 6,
        }}
      >
        "Tecnologia que Transforma o seu Negócio."
      </div>
    </div>
  );
};

// Legendas sincronizadas palavra a palavra para a 369APP
const Captions369: React.FC = () => {
  const frame = useCurrentFrame();
  const currentScene = scenes369.find(
    (s) => frame >= s.startFrame && frame < s.startFrame + s.durationInFrames
  );

  if (!currentScene) return null;

  // Ocultar legendas na cena 5 quando o card final subir
  if (currentScene.voKey === "s5" && frame - currentScene.startFrame > 50) return null;

  const localTime = (frame - currentScene.startFrame) / 30;
  const words = voWords369(currentScene.voKey as VoKey369);
  if (!words || words.length === 0) return null;

  // Agrupar palavras em blocos de 6 para legendas limpas
  const chunkSize = 6;
  let activeChunk: typeof words = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize);
    const start = chunk[0].start;
    const end = chunk[chunk.length - 1].end + 0.35;
    if (localTime >= start && localTime <= end) {
      activeChunk = chunk;
      break;
    }
  }

  if (activeChunk.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 150,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "0 50px",
        zIndex: 28,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          padding: "16px 28px",
          borderRadius: 24,
          background: "rgba(18, 23, 29, 0.88)",
          backdropFilter: "blur(14px)",
          border: "2px solid rgba(252, 246, 186, 0.35)",
          boxShadow: "0 10px 35px rgba(0,0,0,0.6)",
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 950,
        }}
      >
        {activeChunk.map((w, idx) => {
          const isCurrent = localTime >= w.start && localTime <= w.end;
          return (
            <span
              key={idx}
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 27,
                fontWeight: isCurrent ? 900 : 700,
                color: isCurrent ? "#fcf6ba" : "#ffffff",
                transform: isCurrent ? "scale(1.08)" : "scale(1)",
                textShadow: isCurrent
                  ? "0 0 15px rgba(252, 246, 186, 0.8), 0 2px 8px rgba(0,0,0,0.9)"
                  : "0 2px 6px rgba(0,0,0,0.8)",
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const Sequence369: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f17" }}>
      {/* 1. Fundo com Artes Conceituais de Software 1080x1920 Ultra-Nítidas */}
      <Background369 />

      {/* 2. Camada Tecnológica 3D & Partículas de Dados */}
      <TechOverlay369 />

      {/* 3. Camada de Badges de Cada Serviço */}
      {scenes369.map((sc) => (
        <Sequence
          key={sc.id}
          name={sc.title}
          from={sc.startFrame}
          durationInFrames={sc.durationInFrames}
        >
          <BadgeLayer369 badges={sc.badges} />
        </Sequence>
      ))}

      {/* 4. Marca d'Água Permanente & Topo Institucional */}
      <BrandOverlay369 />

      {/* 5. Card de Encerramento */}
      <EndCard369 />

      {/* 6. Legendas Sincronizadas */}
      <Captions369 />

      {/* 7. Trilha Eye of the Tiger Suave + Locuções */}
      <Soundtrack369 />
    </AbsoluteFill>
  );
};
