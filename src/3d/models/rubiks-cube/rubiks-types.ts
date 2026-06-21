import * as THREE from "three";

// ──────────────────────────────────────────────
// Primitive aliases
// ──────────────────────────────────────────────

export type Axis = "x" | "y" | "z";
export type Face = "F" | "B" | "L" | "R" | "U" | "D";
export type GridCoord = -1 | 0 | 1;
export type GridPosition = [GridCoord, GridCoord, GridCoord];
export type VectorTuple = [number, number, number];
export type QuaternionTuple = [number, number, number, number];
export type AutomationPhase = "solvedIdle" | "scrambling" | "scrambledIdle" | "solving";

// ──────────────────────────────────────────────
// Domain types
// ──────────────────────────────────────────────

export type Move = {
  face: Face;
  direction: 1 | -1;
};

export type MoveLayer = {
  axis: Axis;
  angle: number;
  layer: GridCoord;
};

export type ActiveTurn = {
  id: number;
  move: Move;
  layer: MoveLayer;
  cubieIds: Set<string>;
};

export type Sticker = {
  id: string;
  face: Face;
  color: string;
  geometry: VectorTuple;
  position: VectorTuple;
  rotation: VectorTuple;
  tileCol: 0 | 1 | 2;
  tileRow: 0 | 1 | 2;
};

export type CubieState = {
  id: string;
  position: GridPosition;
  quaternion: QuaternionTuple;
  stickers: Sticker[];
};

// ──────────────────────────────────────────────
// Face configuration
// ──────────────────────────────────────────────

export type FaceConfig = {
  face: Face;
  axis: Axis;
  value: GridCoord;
  color: string;
  position: VectorTuple;
  rotation: VectorTuple;
  geometry: VectorTuple;
};

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────

export const CUBIE_SIZE = 0.92;
export const CUBIE_GAP = 0.96;
export const STICKER_SIZE = 0.82;
export const STICKER_DEPTH = 0.022;
export const STICKER_OFFSET = CUBIE_SIZE / 2 + STICKER_DEPTH / 2 + 0.004;
export const TURN_DURATION = 0.22;
export const SOLVED_IDLE_DURATION = 20_000;
export const SCRAMBLED_IDLE_DURATION = 2_000;
export const SCRAMBLE_LENGTH = 14;

export const RUBIK_CAMERA = {
  position: [5, 4, 6] as [number, number, number],
  fov: 35,
};

export const faces: Face[] = ["F", "B", "L", "R", "U", "D"];

export const faceImageUrls: Record<Face, string> = {
  F: "/rubik-faces/front.jpg",
  B: "/rubik-faces/back.jpg",
  R: "/rubik-faces/right.jpg",
  L: "/rubik-faces/left.jpg",
  U: "/rubik-faces/top.jpg",
  D: "/rubik-faces/bottom.jpg",
};

export const axisIndex: Record<Axis, 0 | 1 | 2> = {
  x: 0,
  y: 1,
  z: 2,
};

export const axisVectors: Record<Axis, THREE.Vector3> = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
};

export const faceConfigs: FaceConfig[] = [
  {
    face: "F",
    axis: "z",
    value: 1,
    color: "#2563eb",
    position: [0, 0, STICKER_OFFSET],
    rotation: [0, 0, 0],
    geometry: [STICKER_SIZE, STICKER_SIZE, STICKER_DEPTH],
  },
  {
    face: "B",
    axis: "z",
    value: -1,
    color: "#dc2626",
    position: [0, 0, -STICKER_OFFSET],
    rotation: [0, 0, 0],
    geometry: [STICKER_SIZE, STICKER_SIZE, STICKER_DEPTH],
  },
  {
    face: "R",
    axis: "x",
    value: 1,
    color: "#f97316",
    position: [STICKER_OFFSET, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    geometry: [STICKER_SIZE, STICKER_SIZE, STICKER_DEPTH],
  },
  {
    face: "L",
    axis: "x",
    value: -1,
    color: "#f8fafc",
    position: [-STICKER_OFFSET, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    geometry: [STICKER_SIZE, STICKER_SIZE, STICKER_DEPTH],
  },
  {
    face: "U",
    axis: "y",
    value: 1,
    color: "#facc15",
    position: [0, STICKER_OFFSET, 0],
    rotation: [Math.PI / 2, 0, 0],
    geometry: [STICKER_SIZE, STICKER_SIZE, STICKER_DEPTH],
  },
  {
    face: "D",
    axis: "y",
    value: -1,
    color: "#16a34a",
    position: [0, -STICKER_OFFSET, 0],
    rotation: [Math.PI / 2, 0, 0],
    geometry: [STICKER_SIZE, STICKER_SIZE, STICKER_DEPTH],
  },
];
