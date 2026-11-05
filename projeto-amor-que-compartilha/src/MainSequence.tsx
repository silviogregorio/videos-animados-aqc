import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Soundtrack } from "./audio/Soundtrack";
import { AnimatedCaptions } from "./components/AnimatedCaptions";
import { Background } from "./components/Background";
import { CameraController } from "./components/CameraController";
import { Lighting } from "./components/Lighting";
import { BadgeLayer } from "./components/TechnicalBadge";
import { World } from "./components/World";
import { scenes, track } from "./data/scenes";
import { CAMERA, FONT, PALETTE } from "./theme";

const FadeOut: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = track("fade", frame);
  if (fade <= 0.001) return null;
  return <AbsoluteFill style={{ background: "#050b14", opacity: fade, pointerEvents: "none" }} />;
};

// Marca d'água permanente e cabeçalho institucional em todas as cenas
const BrandOverlay: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Logotipo oficial como marca d'água no canto superior direito */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          width: 140,
          height: 140,
          borderRadius: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.45)",
          background: "rgba(15, 23, 42, 0.35)",
          backdropFilter: "blur(6px)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <Img
          src={staticFile("brand/logo.png")}
          style={{
            width: 120,
            height: 120,
            objectFit: "contain",
            opacity: 0.92,
          }}
        />
      </div>

      {/* Identificação institucional no canto superior esquerdo com pill premium */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: "14px 22px",
          borderRadius: 24,
          background: "rgba(15, 23, 42, 0.48)",
          backdropFilter: "blur(10px)",
          border: "1.5px solid rgba(255, 255, 255, 0.18)",
          fontFamily: FONT,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "0.02em",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          Projeto Social Amor Que Compartilha
        </span>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: PALETTE.accent,
              letterSpacing: "0.02em",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
            }}
          >
            🌐 www.amorquecompartilha.com.br
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#38bdf8",
              letterSpacing: "0.02em",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
            }}
          >
            📷 @amor.que.compartilha
          </span>
        </div>
      </div>

      {/* Rodapé sutil com os 4 pilares da sabedoria */}
      <div
        style={{
          position: "absolute",
          bottom: 45,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 16,
          fontWeight: 800,
          color: "rgba(255, 255, 255, 0.75)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          textShadow: "0 2px 6px rgba(0, 0, 0, 0.9)",
        }}
      >
        VIVA SEM FINGIR • AME SEM DEPENDER • ESCUTE SEM ATACAR • FALE SEM OFENDER
      </div>
    </AbsoluteFill>
  );
};

const InstituicaoCard: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = track("endCard.slideUp", frame, 300);
  if (slide > 280) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 220,
        left: "50%",
        transform: `translate(-50%, ${slide}px)`,
        width: 860,
        padding: "32px 40px",
        borderRadius: 36,
        background: "rgba(15, 23, 42, 0.94)",
        backdropFilter: "blur(18px)",
        border: "3px solid rgba(255, 183, 3, 0.85)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(255, 183, 3, 0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        fontFamily: FONT,
        textAlign: "center",
        zIndex: 10,
      }}
    >
      {/* Selo com Logotipo Oficial */}
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: 55,
          background: "rgba(255, 255, 255, 0.98)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 183, 3, 0.5)",
          marginTop: -75,
          marginBottom: 4,
          border: "3.5px solid #ffb703",
        }}
      >
        <Img
          src={staticFile("brand/logo-clean.png")}
          style={{ width: 90, height: 90, objectFit: "contain" }}
        />
      </div>

      <div style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", letterSpacing: "0.03em" }}>
        PROJETO SOCIAL AMOR QUE COMPARTILHA
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: PALETTE.accent }}>
          🌐 www.amorquecompartilha.com.br
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#38bdf8" }}>
          📱 Instagram: @amor.que.compartilha
        </div>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.9)", fontStyle: "italic", marginTop: 4 }}>
        "Viver bem é colocar o amor em ação todos os dias."
      </div>
    </div>
  );
};

const CaptionsWrapper: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = track("endCard.slideUp", frame, 300);
  if (slide < 260) return null;
  return <AnimatedCaptions />;
};

export const MainSequence: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0e1a2b" }}>
      <Background />
      <ThreeCanvas
        width={width}
        height={height}
        gl={{ antialias: true, alpha: true }}
        shadows="percentage"
        camera={{ fov: CAMERA.fov, near: CAMERA.near, far: CAMERA.far, position: [0, 0, 18] }}
      >
        <CameraController />
        <Lighting />
        <World />
      </ThreeCanvas>

      {/* Camada de Badges de cada cena */}
      {scenes.map((sc) => (
        <Sequence key={sc.id} name={sc.id} from={sc.startFrame} durationInFrames={sc.durationInFrames}>
          <BadgeLayer badges={sc.badges} />
        </Sequence>
      ))}

      {/* Marca d'água permanente */}
      <BrandOverlay />

      {/* Card Institucional no Encerramento */}
      <InstituicaoCard />

      {/* Legendas sincronizadas palavra a palavra */}
      <CaptionsWrapper />

      {/* Transição de fade suave no final */}
      <FadeOut />

      {/* Trilha Sonora com Ducking e Locução */}
      <Soundtrack />
    </AbsoluteFill>
  );
};
