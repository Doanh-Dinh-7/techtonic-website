"use client";

import dynamic from "next/dynamic";

import { use3d } from "@/hooks/use3d";
import { GradientOrb } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const RecruitmentPageCanvas = dynamic(
  () =>
    import("@/3d/recruitment-page-canvas").then((m) => ({
      default: m.RecruitmentPageCanvas,
    })),
  { ssr: false }
);

export function RecruitmentPageBackdrop() {
  const { shouldRenderMotion } = use3d();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1] h-full w-full">
      {shouldRenderMotion ? (
        <RecruitmentPageCanvas className="absolute inset-0 h-full w-full opacity-40" />
      ) : (
        <>
          <GradientOrb color="cyan" className={cn("left-[10%] top-[15%] h-64 w-64 opacity-60")} />
          <GradientOrb color="purple" className={cn("right-[8%] top-[35%] h-72 w-72 opacity-50")} />
          <GradientOrb
            color="magenta"
            className={cn("left-[30%] bottom-[20%] h-56 w-56 opacity-40")}
          />
        </>
      )}
    </div>
  );
}
