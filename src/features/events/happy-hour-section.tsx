"use client";

import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import Image from "next/image";

import { happyHourCopy } from "@/lib/content/events";

export function HappyHourSection() {
  return (
    <section
      id="happy-hour"
      className="relative overflow-hidden border-y border-white/10 py-20 sm:py-24"
    >
      <Image
        src={happyHourCopy.backgroundImage}
        alt={happyHourCopy.backgroundImageAlt}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#0a0a0a]/75 to-[#0a0a0a]/90"
        aria-hidden
      />
      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.08] p-3 backdrop-blur-sm">
          <PartyPopper className="h-8 w-8 text-neon-cyan" aria-hidden />
        </div>
        <h2 className="mb-4 font-paris2024 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {happyHourCopy.title}
        </h2>
        <p className="text-lg leading-relaxed text-white/80">{happyHourCopy.summary}</p>
        <details className="group mx-auto mt-6 max-w-2xl text-left">
          <summary className="cursor-pointer list-none text-center text-sm font-medium text-neon-cyan transition hover:text-neon-cyan/80 marker:content-none [&::-webkit-details-marker]:hidden">
            Đọc thêm về Happy Hour
          </summary>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{happyHourCopy.description}</p>
        </details>
      </motion.div>
    </section>
  );
}
