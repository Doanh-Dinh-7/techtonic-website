"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { aboutCultureCopy } from "@/lib/content/about";
import { cn } from "@/shared/utils";

export function AboutCulture() {
  return (
    <section
      id="about-culture"
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden border-t border-white/10 py-20"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206576/CSLT7_1_e6mce3.webp"
          alt=""
          fill
          className="object-cover opacity-30 blur-sm"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>
      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-4 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className={cn(
            "mb-8 font-paris2024 text-4xl font-extrabold md:text-5xl",
            "bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent"
          )}
        >
          {aboutCultureCopy.title}
        </h2>
        <p className="text-lg leading-loose text-white/80">{aboutCultureCopy.lead}</p>
        <p className="mt-4 text-lg leading-loose text-white/68">{aboutCultureCopy.body}</p>
        <p className="mt-6 text-base leading-relaxed text-white/55">
          {aboutCultureCopy.moreThanClub}
        </p>
        <div className="mt-12 flex justify-center gap-4" aria-hidden>
          <div className="h-1 w-16 bg-neon-cyan" />
          <div className="h-1 w-16 bg-neon-purple" />
          <div className="h-1 w-16 bg-neon-cyan" />
        </div>
      </motion.div>
    </section>
  );
}
