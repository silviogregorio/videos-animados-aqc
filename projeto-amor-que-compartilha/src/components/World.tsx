import React, { useMemo } from "react";
import { random, useCurrentFrame } from "remotion";
import * as THREE from "three";
import { sceneAt } from "../data/scenes";

// Geometria 3D de Coração Dourado Extrudado para a Cena Final (Projeto Social)
const useHeartGeometry = () => {
  return useMemo(() => {
    const s = new THREE.Shape();
    // Curva matemática suave de coração sagrado
    s.moveTo(0, -0.6);
    s.bezierCurveTo(0.6, -0.1, 1.2, 0.5, 1.2, 1.1);
    s.bezierCurveTo(1.2, 1.7, 0.6, 2.1, 0, 1.6);
    s.bezierCurveTo(-0.6, 2.1, -1.2, 1.7, -1.2, 1.1);
    s.bezierCurveTo(-1.2, 0.5, -0.6, -0.1, 0, -0.6);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.45,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15,
    };
    const geom = new THREE.ExtrudeGeometry(s, extrudeSettings);
    geom.center();
    return geom;
  }, []);
};

// Partículas 3D flutuantes que mudam de cor e comportamento conforme a estação/cena
const FloatingParticles3D: React.FC<{ sceneIndex: number }> = ({ sceneIndex }) => {
  const frame = useCurrentFrame();

  const particleData = useMemo(() => {
    const count = 90;
    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: (random(`px-${i}`) - 0.5) * 16,
        y: (random(`py-${i}`) - 0.5) * 22,
        z: (random(`pz-${i}`) - 0.5) * 8 + 1,
        speed: 0.02 + random(`pspeed-${i}`) * 0.03,
        sway: 0.5 + random(`psway-${i}`) * 1.5,
        freq: 0.03 + random(`pfreq-${i}`) * 0.04,
        size: 0.07 + random(`psize-${i}`) * 0.12,
      });
    }
    return pts;
  }, []);

  // Cores por pilar da imagem
  const particleColor = useMemo(() => {
    switch (sceneIndex) {
      case 0:
        return "#fbbf24"; // Amarelo sol / fagulhas douradas (Viva sem fingir)
      case 1:
        return "#f97316"; // Âmbar outono / folhas crepúsculo (Ame sem depender)
      case 2:
        return "#38bdf8"; // Azul sereno / luz estelar (Escute sem atacar)
      case 3:
        return "#4ade80"; // Verde esmeralda / pólen primaveril (Fale sem ofender)
      default:
        return "#f59e0b"; // Dourado sagrado institucional
    }
  }, [sceneIndex]);

  return (
    <group>
      {particleData.map((p, i) => {
        const curY = ((p.y + frame * p.speed + 12) % 24) - 12;
        const curX = p.x + Math.sin(frame * p.freq + i) * p.sway;
        const pulseScale = 1 + Math.sin(frame * 0.1 + i) * 0.3;

        return (
          <mesh key={i} position={[curX, curY, p.z]} scale={p.size * pulseScale}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial color={particleColor} transparent opacity={0.65} />
          </mesh>
        );
      })}
    </group>
  );
};

export const World: React.FC = () => {
  const frame = useCurrentFrame();
  const currentScene = sceneAt(frame);
  const heartGeom = useHeartGeometry();

  const sceneIdx = useMemo(() => {
    return (Number(currentScene.voKey.replace("s", "")) || 1) - 1;
  }, [currentScene]);

  // Efeito de pulso para o coração na cena 5
  const heartPulse = 1 + Math.sin(frame * 0.12) * 0.08;
  const heartRotateY = Math.sin(frame * 0.03) * 0.35;

  return (
    <group>
      {/* 1. PARTÍCULAS VOLUMÉTRICAS 3D (Fagulhas, Folhas, Estrelas, Pétalas) */}
      <FloatingParticles3D sceneIndex={sceneIdx} />

      {/* 2. ELEMENTOS EXCLUSIVOS DA CENA 5 (Coração Sagrado 3D do Projeto Social) */}
      {sceneIdx === 4 && (
        <group position={[0, 0.35, 2.0]} scale={0.85 * heartPulse} rotation={[0, heartRotateY, 0]}>
          {/* Coração Central em Ouro Metálico Esculpido */}
          <mesh geometry={heartGeom} castShadow receiveShadow>
            <meshStandardMaterial
              color="#fbbf24"
              roughness={0.15}
              metalness={0.85}
              emissive="#b45309"
              emissiveIntensity={0.35}
            />
          </mesh>

          {/* Anéis de Luz Orbitantes */}
          <group rotation={[Math.PI / 4, frame * 0.02, 0]}>
            <mesh>
              <torusGeometry args={[1.7, 0.025, 16, 64]} />
              <meshBasicMaterial color="#fde047" transparent opacity={0.65} />
            </mesh>
          </group>
          <group rotation={[-Math.PI / 4, -frame * 0.025, 0]}>
            <mesh>
              <torusGeometry args={[2.0, 0.02, 16, 64]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
            </mesh>
          </group>

          {/* Luz Pontual Dourada emanando do coração */}
          <pointLight color="#f59e0b" intensity={3.5} distance={15} decay={2} />
        </group>
      )}

      {/* 3. ILUMINAÇÃO ATMOSFÉRICA DINÂMICA */}
      <ambientLight intensity={1.2} />
      {sceneIdx === 0 && <directionalLight position={[5, 8, 8]} color="#fef08a" intensity={2.2} />}
      {sceneIdx === 1 && <directionalLight position={[-6, 6, 8]} color="#fed7aa" intensity={2.0} />}
      {sceneIdx === 2 && <directionalLight position={[0, 8, 8]} color="#bae6fd" intensity={1.8} />}
      {sceneIdx === 3 && <directionalLight position={[6, 7, 8]} color="#bbf7d0" intensity={2.1} />}
      {sceneIdx === 4 && <directionalLight position={[0, 10, 8]} color="#fef08a" intensity={2.5} />}
    </group>
  );
};
