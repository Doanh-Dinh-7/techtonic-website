import { cn } from "@/shared/utils";

const shapes = [
  {
    className: "about-hero-cube-cyan left-[10%] top-[15%] h-20 w-20 opacity-40",
    duration: "15s",
  },
  {
    className: "about-hero-cube-violet right-[12%] top-[60%] h-[60px] w-[60px]",
    duration: "25s",
  },
  {
    className: "about-hero-cube-cyan bottom-[10%] left-[15%] h-10 w-10",
    duration: "18s",
  },
] as const;

export function AboutHeroShapes() {
  return (
    <div className="about-hero-shapes pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {shapes.map((shape) => (
        <div
          key={shape.className}
          className={cn("about-hero-cube about-hero-shape-3d absolute", shape.className)}
          style={{ animationDuration: shape.duration }}
        />
      ))}
    </div>
  );
}
