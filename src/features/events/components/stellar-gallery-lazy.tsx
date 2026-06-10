"use client";

import dynamic from "next/dynamic";

import { WebGLFallback } from "@/3d/canvas/webgl-fallback";

export const StellarGalleryLazy = dynamic(
  () =>
    import("@/shared/ui/3d-image-gallery").then((module) => ({
      default: module.StellarCardGallery,
    })),
  { ssr: false, loading: () => <WebGLFallback className="min-h-[85vh]" /> }
);
