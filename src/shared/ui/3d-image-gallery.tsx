"use client";

import React, { Suspense, createContext, useContext, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Html, OrbitControls, Plane, Sphere, Stars } from "@react-three/drei";
import { X } from "lucide-react";
import type * as THREE from "three";

import { useReducedMotionPreference } from "@/hooks/use3d";
import { getSafeStarCount, getSafeStarSpeed, R3F_PERFORMANCE } from "@/lib/3d/performance";
import type { StellarGalleryCard } from "@/lib/content/events";
import { cn } from "@/shared/utils";

type Card = StellarGalleryCard;

type CardContextType = {
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  cards: Card[];
};

const CardContext = createContext<CardContextType | undefined>(undefined);

function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCard must be used within CardProvider");
  return ctx;
}

function CardProvider({ cards, children }: { cards: Card[]; children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  );
}

function GalleryStarfield() {
  const reducedMotion = useReducedMotionPreference();
  const starCount = getSafeStarCount(R3F_PERFORMANCE.stars.count.default, reducedMotion);
  const starSpeed = getSafeStarSpeed(R3F_PERFORMANCE.stars.speed.default, reducedMotion);

  return <Stars count={starCount} depth={50} factor={4} fade radius={100} speed={starSpeed} />;
}

function FloatingCard({
  card,
  position,
}: {
  card: Card;
  position: {
    x: number;
    y: number;
    z: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
  };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedCard } = useCard();

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setSelectedCard(card);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="h-52 w-40 select-none overflow-hidden rounded-lg bg-[#1F2121] p-3 shadow-2xl"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(49, 184, 198, 0.5), 0 0 30px rgba(49, 184, 198, 0.3)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered
              ? "2px solid rgba(49, 184, 198, 0.5)"
              : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.imageUrl}
            alt={card.alt}
            className="h-40 w-full rounded-md object-cover"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-1 text-center">
            <p className="truncate text-xs font-medium text-white">{card.title}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!selectedCard) return null;

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out";
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  const handleClose = () => setSelectedCard(null);

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={selectedCard.title}
    >
      <div className="relative mx-4 w-full max-w-md">
        <button
          type="button"
          onClick={handleClose}
          className="absolute -top-12 right-0 z-10 text-white transition-colors hover:text-gray-300"
          aria-label="Đóng"
        >
          <X className="h-8 w-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative w-full cursor-pointer rounded-[16px] bg-[#1F2121] p-4 transition-all duration-500 ease-out"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative mb-4 w-full" style={{ aspectRatio: "3 / 4" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[16px] bg-black object-cover"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl}
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px", opacity: 1 }}
              />
            </div>

            <h3 className="mb-4 text-center text-lg font-semibold text-[#31b8c6]">
              {selectedCard.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardGalaxy() {
  const { cards } = useCard();

  const cardPositions = useMemo(() => {
    const positions: {
      x: number;
      y: number;
      z: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
    }[] = [];
    const numCards = cards.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numCards; i++) {
      const y = numCards > 1 ? 1 - (i / (numCards - 1)) * 2 : 0;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const layerRadius = 12 + (i % 3) * 4;

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      });
    }
    return positions;
  }, [cards.length]);

  return (
    <>
      <GalleryStarfield />

      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.02} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  );
}

export type StellarCardGalleryProps = {
  cards: StellarGalleryCard[];
  hint?: string;
  className?: string;
};

export function StellarCardGallery({ cards, hint, className }: StellarCardGalleryProps) {
  return (
    <CardProvider cards={cards}>
      <div
        className={cn(
          "relative h-[800px] min-h-[85vh] w-full overflow-hidden rounded-3xl bg-black",
          className
        )}
      >
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto";
          }}
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#000000"]} />
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={40}
              autoRotate={false}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        {hint ? (
          <div className="pointer-events-none absolute bottom-4 left-4 z-20 text-white">
            <p className="text-sm opacity-70">{hint}</p>
          </div>
        ) : null}
      </div>
    </CardProvider>
  );
}

export default StellarCardGallery;
