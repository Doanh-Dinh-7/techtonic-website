"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  pause?: boolean;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  delay = 50,
  pause = false,
  onComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (pause || currentIndex >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, delay);
    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, pause]);

  // Call onComplete when typewriter finishes
  useEffect(() => {
    if (currentIndex >= text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text.length, onComplete]);

  return <span>{displayText}</span>;
}
