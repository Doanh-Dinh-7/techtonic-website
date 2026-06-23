"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import * as THREE from "three";

import { useReducedMotionPreference } from "@/hooks/use3d";

import {
  type ActiveTurn,
  type AutomationPhase,
  type CubieState,
  type Move,
  CUBIE_SIZE,
  TURN_DURATION,
} from "./rubiks-types";
import { easeInOutCubic, getStickerTextureKey, scalePosition } from "./rubiks-utils";

// ──────────────────────────────────────────────
// StickerMaterial — texture or flat color fallback
// ──────────────────────────────────────────────

function StickerMaterial({
  sticker,
  texture,
}: {
  sticker: { color: string };
  texture?: THREE.Texture;
}) {
  if (!texture) {
    return (
      <meshStandardMaterial
        color={sticker.color}
        emissive={sticker.color}
        emissiveIntensity={0.08}
        metalness={0.05}
        roughness={0.32}
      />
    );
  }

  return <meshStandardMaterial color="#ffffff" map={texture} metalness={0.03} roughness={0.42} />;
}

// ──────────────────────────────────────────────
// Cubie — a single 1×1×1 piece with stickers
// ──────────────────────────────────────────────

function Cubie({
  cubie,
  textures,
}: {
  cubie: CubieState;
  textures: Partial<Record<string, THREE.Texture>>;
}) {
  const quaternion = useMemo(() => new THREE.Quaternion(...cubie.quaternion), [cubie.quaternion]);

  return (
    <group position={scalePosition(cubie.position)} quaternion={quaternion}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]} />
        <meshStandardMaterial color="#0b1020" metalness={0.16} roughness={0.48} />
      </mesh>

      {cubie.stickers.map((sticker) => (
        <mesh
          key={sticker.id}
          position={sticker.position}
          rotation={sticker.rotation}
          castShadow
          receiveShadow
        >
          <boxGeometry args={sticker.geometry} />
          <StickerMaterial sticker={sticker} texture={textures[getStickerTextureKey(sticker)]} />
        </mesh>
      ))}
    </group>
  );
}

// ──────────────────────────────────────────────
// AnimatedLayer — the cubies being twisted
// ──────────────────────────────────────────────

function AnimatedLayer({
  activeTurn,
  cubies,
  textures,
  onTurnComplete,
}: {
  activeTurn: ActiveTurn;
  cubies: CubieState[];
  textures: Partial<Record<string, THREE.Texture>>;
  onTurnComplete: (move: Move) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
    progressRef.current = 0;

    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
    }
  }, [activeTurn.id]);

  useFrame((_, delta) => {
    if (!groupRef.current || completedRef.current) {
      return;
    }

    progressRef.current = Math.min(1, progressRef.current + delta / TURN_DURATION);

    const nextAngle = easeInOutCubic(progressRef.current) * activeTurn.layer.angle;
    groupRef.current.rotation[activeTurn.layer.axis] = nextAngle;

    if (progressRef.current >= 1) {
      completedRef.current = true;
      groupRef.current.rotation[activeTurn.layer.axis] = activeTurn.layer.angle;
      onTurnComplete(activeTurn.move);
    }
  });

  return (
    <group ref={groupRef}>
      {cubies.map((cubie) => (
        <Cubie key={cubie.id} cubie={cubie} textures={textures} />
      ))}
    </group>
  );
}

// ──────────────────────────────────────────────
// RubiksCubeModel — the full 3×3 cube assembly
// ──────────────────────────────────────────────

export function RubiksCubeModel({
  activeTurn,
  cubies,
  isUserRotating,
  phase,
  textures,
  onTurnComplete,
}: {
  activeTurn: ActiveTurn | null;
  cubies: CubieState[];
  isUserRotating: boolean;
  phase: AutomationPhase;
  textures: Partial<Record<string, THREE.Texture>>;
  onTurnComplete: (move: Move) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotionPreference();

  const activeCubies = useMemo(
    () => cubies.filter((cubie) => activeTurn?.cubieIds.has(cubie.id)),
    [activeTurn, cubies]
  );

  const idleCubies = useMemo(
    () => cubies.filter((cubie) => !activeTurn?.cubieIds.has(cubie.id)),
    [activeTurn, cubies]
  );

  useFrame((_, delta) => {
    if (!groupRef.current || isUserRotating || reducedMotion) {
      return;
    }

    const speed = phase === "solvedIdle" || phase === "scrambledIdle" ? 0.18 : 0.08;
    groupRef.current.rotation.y += delta * speed;
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, -0.22, delta * 1.4);
    groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, 0.08, delta * 1.4);
  });

  return (
    <group ref={groupRef} rotation={[-0.22, 0.58, 0.08]}>
      <group>
        {idleCubies.map((cubie) => (
          <Cubie key={cubie.id} cubie={cubie} textures={textures} />
        ))}
      </group>

      {activeTurn && (
        <AnimatedLayer
          activeTurn={activeTurn}
          cubies={activeCubies}
          textures={textures}
          onTurnComplete={onTurnComplete}
        />
      )}
    </group>
  );
}
