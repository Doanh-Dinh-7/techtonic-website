"use client";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { type ActiveTurn, type AutomationPhase, type CubieState, type Move } from "./rubiks-types";
import { RubiksCubeModel } from "./rubiks-model";

type RubiksCubeSceneProps = {
  activeTurn: ActiveTurn | null;
  cubies: CubieState[];
  isUserRotating: boolean;
  phase: AutomationPhase;
  textures: Partial<Record<string, THREE.Texture>>;
  onUserRotateEnd: () => void;
  onUserRotateStart: () => void;
  onTurnComplete: (move: Move) => void;
};

/**
 * Scene content rendered inside CanvasShell:
 * lighting, environment, shadows, orbit controls, and the Rubik model.
 */
export function RubiksCubeScene({
  activeTurn,
  cubies,
  isUserRotating,
  phase,
  textures,
  onUserRotateEnd,
  onUserRotateStart,
  onTurnComplete,
}: RubiksCubeSceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, -3, -4]} intensity={1.1} color="#38bdf8" />

      <Environment preset="city" />
      <RubiksCubeModel
        activeTurn={activeTurn}
        cubies={cubies}
        isUserRotating={isUserRotating}
        phase={phase}
        textures={textures}
        onTurnComplete={onTurnComplete}
      />
      <ContactShadows position={[0, -2.05, 0]} opacity={0.38} scale={7} blur={2.8} far={4} />
      <OrbitControls
        enabled={!activeTurn}
        enableDamping
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={(Math.PI * 4) / 5}
        onEnd={onUserRotateEnd}
        onStart={onUserRotateStart}
      />
    </>
  );
}
