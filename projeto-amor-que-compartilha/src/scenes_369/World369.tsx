import React, { useMemo } from "react";
import { random, useCurrentFrame } from "remotion";
import { sceneAt369 } from "./data_369";

// Partículas 3D flutuantes com estética corporativa dourada & tecnológica
const TechParticles3D: React.FC = () => {
  const frame = useCurrentFrame();

  const particleData = useMemo(() => {
    const count = 75;
    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: (random(`p369-x-${i}`) - 0.5) * 16,
        y: (random(`p369-y-${i}`) - 0.5) * 22,
        z: (random(`p369-z-${i}`) - 0.5) * 8 + 1,
        speed: 0.02 + random(`p369-speed-${i}`) * 0.03,
        sway: 0.4 + random(`p369-sway-${i}`) * 1.2,
        freq: 0.03 + random(`p369-freq-${i}`) * 0.04,
        size: 0.06 + random(`p369-size-${i}`) * 0.12,
        isGold: i % 3 !== 0,
      });
    }
    return pts;
  }, []);

  return (
    <group>
      {particleData.map((p, i) => {
        const curY = ((p.y + frame * p.speed + 12) % 24) - 12;
        const curX = p.x + Math.sin(frame * p.freq + i) * p.sway;
        const pulseScale = 1 + Math.sin(frame * 0.1 + i) * 0.25;
        const color = p.isGold ? "#fcf6ba" : "#38bdf8";

        return (
          <mesh key={i} position={[curX, curY, p.z]} scale={p.size * pulseScale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.2}
              emissive={p.isGold ? "#b38728" : "#0284c7"}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Símbolo 3D do Logotipo 369APP (Bloco central em ouro com matriz de cubos flutuantes)
const Logo369Emblem3D: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.08) * 0.04;
  const rotY = Math.sin(frame * 0.025) * 0.3;

  // Posições dos cubos digitais que compõem a marca 369APP
  const miniCubes = useMemo(() => {
    return [
      { pos: [1.3, 1.3, 0] as [number, number, number], size: 0.35 },
      { pos: [1.8, 1.8, 0.1] as [number, number, number], size: 0.28 },
      { pos: [1.3, 1.9, -0.1] as [number, number, number], size: 0.25 },
      { pos: [1.9, 1.2, 0.05] as [number, number, number], size: 0.26 },
      { pos: [2.3, 1.7, 0.15] as [number, number, number], size: 0.22 },
      { pos: [1.7, 2.4, -0.05] as [number, number, number], size: 0.2 },
    ];
  }, []);

  return (
    <group position={[0, 0.4, 2.2]} scale={0.9 * pulse} rotation={[0.08, rotY, 0]}>
      {/* Moldura Externa Ouro Escovado */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 2.4, 0.35]} />
        <meshStandardMaterial
          color="#fcf6ba"
          metalness={0.92}
          roughness={0.18}
          emissive="#b38728"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Núcleo Central em Relevo Dourado */}
      <mesh position={[0, 0, 0.25]} castShadow>
        <boxGeometry args={[1.3, 1.3, 0.35]} />
        <meshStandardMaterial
          color="#f7df8b"
          metalness={0.95}
          roughness={0.12}
          emissive="#bf953f"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Matriz de Cubos Digitais Flutuantes da Marca 369APP */}
      {miniCubes.map((cb, idx) => (
        <mesh key={idx} position={cb.pos} castShadow>
          <boxGeometry args={[cb.size, cb.size, cb.size]} />
          <meshStandardMaterial
            color="#fcf6ba"
            metalness={0.9}
            roughness={0.15}
            emissive="#b38728"
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}

      {/* Anéis de Dados Tecnológicos em Órbita */}
      <group rotation={[Math.PI / 3, frame * 0.02, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.025, 16, 64]} />
          <meshBasicMaterial color="#fcf6ba" transparent opacity={0.6} />
        </mesh>
      </group>
      <group rotation={[-Math.PI / 4, -frame * 0.025, 0]}>
        <mesh>
          <torusGeometry args={[2.8, 0.02, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Luz Dourada Central emanando do símbolo */}
      <pointLight color="#f7df8b" intensity={3.8} distance={15} decay={2} />
    </group>
  );
};

export const World369: React.FC = () => {
  const frame = useCurrentFrame();
  const currentScene = sceneAt369(frame);
  const sceneIdx = Number(currentScene.voKey.replace("s", "")) - 1;

  return (
    <group>
      {/* 1. Partículas Tecnológicas 3D Contínuas */}
      <TechParticles3D />

      {/* 2. Emblema Metálico 3D Exclusivo na Cena 5 de Encerramento */}
      {sceneIdx === 4 && <Logo369Emblem3D />}

      {/* 3. Iluminação Global Corporativa de Alta Definição */}
      <ambientLight intensity={1.3} />
      <directionalLight position={[5, 9, 8]} color="#fcf6ba" intensity={2.4} />
      <directionalLight position={[-6, 6, 6]} color="#93c5fd" intensity={1.5} />
      <pointLight position={[0, -5, 5]} color="#b38728" intensity={1.8} />
    </group>
  );
};
