"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselProps {
  images: {
    name: string;
    image: string;
    category?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  categoryName?: string;
}

function CarouselImage({ image, name }: { image: string; name: string }) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className={`absolute inset-0`}>
      <Image
        src={imgSrc}
        alt={name}
        fill
        className="object-cover"
        onError={() => setImgSrc("/placeholder.svg")}
      />
      <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-2 text-sm">
        {name}
      </div>
    </div>
  );
}

export default function Carousel({
  images,
  autoPlay = true,
  interval = 3000,
  categoryName,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  const isGridCategory =
    categoryName === "founders" || categoryName === "membership";

  return (
    <div
      className={`relative ${
        isGridCategory ? "w-full max-w-lg mx-auto" : "w-full max-w-4xl mx-auto"
      } `}
    >
      {/* Main carousel container */}
      <div
        className={`relative overflow-hidden rounded-lg shadow-lg ${
          isGridCategory ? "aspect-square" : "aspect-video"
        }`}
      >
        {images.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentIndex
                ? "translate-x-0"
                : index < currentIndex
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <CarouselImage image={item.image} name={item.name} />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-600 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
