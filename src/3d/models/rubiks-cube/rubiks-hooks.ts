"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

import { type Face, faceImageUrls, faces } from "./rubiks-types";

/**
 * Loads the 6 face textures for the Rubik's cube from `/rubik-faces/`.
 */
export function useFaceTextures() {
  const [textures, setTextures] = useState<Partial<Record<Face, THREE.Texture>>>({});

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    faces.forEach((face) => {
      loader.load(
        faceImageUrls[face],
        (texture) => {
          if (cancelled) {
            texture.dispose();
            return;
          }

          texture.colorSpace = THREE.SRGBColorSpace;
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.needsUpdate = true;

          setTextures((currentTextures) => ({
            ...currentTextures,
            [face]: texture,
          }));
        },
        undefined,
        () => {
          setTextures((currentTextures) => ({
            ...currentTextures,
            [face]: undefined,
          }));
        }
      );
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return textures;
}

/**
 * Crops each face texture into 9 sticker sub-textures (3×3 grid).
 */
export function useStickerTextures(textures: Partial<Record<Face, THREE.Texture>>) {
  const stickerTextures = useMemo(() => {
    const nextStickerTextures: Partial<Record<string, THREE.Texture>> = {};

    faces.forEach((face) => {
      const texture = textures[face];

      if (!texture) {
        return;
      }

      for (let tileCol = 0; tileCol < 3; tileCol++) {
        for (let tileRow = 0; tileRow < 3; tileRow++) {
          const croppedTexture = texture.clone();
          croppedTexture.repeat.set(1 / 3, 1 / 3);
          croppedTexture.offset.set(tileCol / 3, (2 - tileRow) / 3);
          croppedTexture.needsUpdate = true;
          nextStickerTextures[`${face}-${tileCol}-${tileRow}`] = croppedTexture;
        }
      }
    });

    return nextStickerTextures;
  }, [textures]);

  useEffect(() => {
    return () => {
      Object.values(stickerTextures).forEach((texture) => texture?.dispose());
    };
  }, [stickerTextures]);

  return stickerTextures;
}
