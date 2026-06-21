import * as THREE from "three";

import {
  type CubieState,
  type Face,
  type GridCoord,
  type GridPosition,
  type Move,
  type MoveLayer,
  type Sticker,
  type VectorTuple,
  CUBIE_GAP,
  SCRAMBLE_LENGTH,
  axisIndex,
  axisVectors,
  faceConfigs,
  faces,
} from "./rubiks-types";

// ──────────────────────────────────────────────
// Coordinate helpers
// ──────────────────────────────────────────────

export function scalePosition(position: GridPosition): VectorTuple {
  return position.map((value) => value * CUBIE_GAP) as VectorTuple;
}

export function snapGridCoord(value: number): GridCoord {
  if (value > 0.5) return 1;
  if (value < -0.5) return -1;
  return 0;
}

export function tileCoord(value: number): 0 | 1 | 2 {
  return (value + 1) as 0 | 1 | 2;
}

export function roundCubiePosition(position: THREE.Vector3): GridPosition {
  return [snapGridCoord(position.x), snapGridCoord(position.y), snapGridCoord(position.z)];
}

// ──────────────────────────────────────────────
// Sticker / tile helpers
// ──────────────────────────────────────────────

export function getStickerTile(
  face: Face,
  position: GridPosition
): { tileCol: 0 | 1 | 2; tileRow: 0 | 1 | 2 } {
  const [x, y, z] = position;

  switch (face) {
    case "F":
      return { tileCol: tileCoord(x), tileRow: tileCoord(-y) };
    case "B":
      return { tileCol: tileCoord(-x), tileRow: tileCoord(-y) };
    case "R":
      return { tileCol: tileCoord(-z), tileRow: tileCoord(-y) };
    case "L":
      return { tileCol: tileCoord(z), tileRow: tileCoord(-y) };
    case "U":
      return { tileCol: tileCoord(x), tileRow: tileCoord(-z) };
    case "D":
      return { tileCol: tileCoord(x), tileRow: tileCoord(-z) };
  }
}

export function getStickerTextureKey(sticker: Sticker) {
  return `${sticker.face}-${sticker.tileCol}-${sticker.tileRow}`;
}

export function createFaceImageStickers(position: GridPosition): Sticker[] {
  return faceConfigs
    .filter((face) => position[axisIndex[face.axis]] === face.value)
    .map((face) => {
      const tile = getStickerTile(face.face, position);

      return {
        id: `${face.face}-${tile.tileCol}-${tile.tileRow}`,
        face: face.face,
        color: face.color,
        geometry: face.geometry,
        position: face.position,
        rotation: face.rotation,
        tileCol: tile.tileCol,
        tileRow: tile.tileRow,
      };
    });
}

// ──────────────────────────────────────────────
// Cube creation
// ──────────────────────────────────────────────

export function createSolvedCube(): CubieState[] {
  const cubies: CubieState[] = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const position = [x, y, z] as GridPosition;

        cubies.push({
          id: `${x}-${y}-${z}`,
          position,
          quaternion: [0, 0, 0, 1],
          stickers: createFaceImageStickers(position),
        });
      }
    }
  }

  return cubies;
}

// ──────────────────────────────────────────────
// Move mechanics
// ──────────────────────────────────────────────

export function getMoveLayer(move: Move): MoveLayer {
  const quarterTurn = Math.PI / 2;

  switch (move.face) {
    case "F":
      return { axis: "z", layer: 1, angle: -move.direction * quarterTurn };
    case "B":
      return { axis: "z", layer: -1, angle: move.direction * quarterTurn };
    case "R":
      return { axis: "x", layer: 1, angle: -move.direction * quarterTurn };
    case "L":
      return { axis: "x", layer: -1, angle: move.direction * quarterTurn };
    case "U":
      return { axis: "y", layer: 1, angle: -move.direction * quarterTurn };
    case "D":
      return { axis: "y", layer: -1, angle: move.direction * quarterTurn };
  }
}

export function applyMove(cubies: CubieState[], move: Move): CubieState[] {
  const layer = getMoveLayer(move);
  const vector = axisVectors[layer.axis];
  const turnQuaternion = new THREE.Quaternion().setFromAxisAngle(vector, layer.angle);
  const rotationMatrix = new THREE.Matrix4().makeRotationAxis(vector, layer.angle);

  return cubies.map((cubie) => {
    if (cubie.position[axisIndex[layer.axis]] !== layer.layer) {
      return cubie;
    }

    const nextPosition = new THREE.Vector3(...cubie.position).applyMatrix4(rotationMatrix);
    const currentQuaternion = new THREE.Quaternion(...cubie.quaternion);
    const nextQuaternion = turnQuaternion.clone().multiply(currentQuaternion).normalize();

    return {
      ...cubie,
      position: roundCubiePosition(nextPosition),
      quaternion: nextQuaternion.toArray() as [number, number, number, number],
    };
  });
}

// ──────────────────────────────────────────────
// Scramble / solve
// ──────────────────────────────────────────────

export function createScrambleSequence(length: number = SCRAMBLE_LENGTH): Move[] {
  const sequence: Move[] = [];
  let previousFace: Face | null = null;

  for (let index = 0; index < length; index++) {
    const availableFaces = faces.filter((face) => face !== previousFace);
    const face = availableFaces[Math.floor(Math.random() * availableFaces.length)];
    const direction = Math.random() > 0.5 ? 1 : -1;

    sequence.push({ face, direction });
    previousFace = face;
  }

  return sequence;
}

export function invertMove(move: Move): Move {
  return { face: move.face, direction: move.direction === 1 ? -1 : 1 };
}

export function invertSequence(moves: Move[]): Move[] {
  return [...moves].reverse().map(invertMove);
}

// ──────────────────────────────────────────────
// Animation easing
// ──────────────────────────────────────────────

export function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}
