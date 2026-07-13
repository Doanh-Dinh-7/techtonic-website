"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CanvasShell } from "@/3d/canvas/canvas-shell";
import { useReducedMotionPreference } from "@/hooks/use3d";

import {
  type ActiveTurn,
  type AutomationPhase,
  type CubieState,
  type Move,
  SOLVED_IDLE_DURATION,
  SCRAMBLED_IDLE_DURATION,
  RUBIK_CAMERA,
  SCRAMBLE_LENGTH,
  axisIndex,
} from "./rubiks-types";
import {
  applyMove,
  createScrambleSequence,
  createSolvedCube,
  getMoveLayer,
  invertSequence,
} from "./rubiks-utils";
import { useFaceTextures, useStickerTextures } from "./rubiks-hooks";
import { RubiksCubeScene } from "./rubiks-scene";

type RubiksCubeControllerProps = {
  className?: string;
  fallbackClassName?: string;
  onLoaded?: () => void;
};

function Reporter({ onLoaded }: { onLoaded?: () => void }) {
  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);
  return null;
}

/**
 * Top-level controller for the Rubik's cube.
 * Manages state machine (idle → scramble → idle → solve → loop),
 * move queue, and renders via CanvasShell + RubiksCubeScene.
 */
export function RubiksCubeController({
  className,
  fallbackClassName,
  onLoaded,
}: RubiksCubeControllerProps) {
  const reducedMotion = useReducedMotionPreference();
  const textures = useFaceTextures();
  const stickerTextures = useStickerTextures(textures);

  const [cubies, setCubies] = useState<CubieState[]>(() => createSolvedCube());
  const [activeTurn, setActiveTurn] = useState<ActiveTurn | null>(null);
  const [isUserRotating, setIsUserRotating] = useState(false);
  const [moveQueue, setMoveQueue] = useState<Move[]>([]);
  const [phase, setPhase] = useState<AutomationPhase>("solvedIdle");
  const [scrambleSequence, setScrambleSequence] = useState<Move[]>([]);
  const turnIdRef = useRef(0);

  // ── Start a single move ────────────────────
  const startMove = useCallback(
    (move: Move) => {
      if (activeTurn) return false;

      const layer = getMoveLayer(move);
      const cubieIds = new Set(
        cubies
          .filter((cubie) => cubie.position[axisIndex[layer.axis]] === layer.layer)
          .map((cubie) => cubie.id)
      );

      turnIdRef.current += 1;
      setActiveTurn({ id: turnIdRef.current, move, layer, cubieIds });

      return true;
    },
    [activeTurn, cubies]
  );

  // ── Commit completed move to state ─────────
  const handleTurnComplete = useCallback((move: Move) => {
    setCubies((currentCubies) => applyMove(currentCubies, move));
    setActiveTurn(null);
  }, []);

  // ── Process move queue ─────────────────────
  useEffect(() => {
    if (activeTurn || moveQueue.length === 0) return;

    const [nextMove, ...remainingMoves] = moveQueue;

    if (startMove(nextMove)) {
      setMoveQueue(remainingMoves);
    }
  }, [activeTurn, moveQueue, startMove]);

  // ── Phase: solvedIdle → scrambling ─────────
  useEffect(() => {
    if (phase !== "solvedIdle" || reducedMotion) return;

    const timeoutId = window.setTimeout(() => {
      const sequence = createScrambleSequence(SCRAMBLE_LENGTH);
      setScrambleSequence(sequence);
      setMoveQueue(sequence);
      setPhase("scrambling");
    }, SOLVED_IDLE_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, [phase, reducedMotion]);

  // ── Phase transitions after queue drains ───
  useEffect(() => {
    if (phase === "scrambling" && !activeTurn && moveQueue.length === 0) {
      setPhase("scrambledIdle");
    }

    if (phase === "solving" && !activeTurn && moveQueue.length === 0) {
      setScrambleSequence([]);
      setPhase("solvedIdle");
    }
  }, [activeTurn, moveQueue.length, phase]);

  // ── Phase: scrambledIdle → solving ─────────
  useEffect(() => {
    if (phase !== "scrambledIdle" || reducedMotion) return;

    const timeoutId = window.setTimeout(() => {
      setMoveQueue(invertSequence(scrambleSequence));
      setPhase("solving");
    }, SCRAMBLED_IDLE_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, [phase, scrambleSequence, reducedMotion]);

  return (
    <CanvasShell
      className={className}
      fallbackClassName={fallbackClassName}
      camera={RUBIK_CAMERA}
      shadows="percentage"
    >
      <RubiksCubeScene
        activeTurn={activeTurn}
        cubies={cubies}
        isUserRotating={isUserRotating}
        phase={phase}
        textures={stickerTextures}
        onUserRotateEnd={() => setIsUserRotating(false)}
        onUserRotateStart={() => setIsUserRotating(true)}
        onTurnComplete={handleTurnComplete}
      />
      <Reporter onLoaded={onLoaded} />
    </CanvasShell>
  );
}
