"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ATELIER_INTRO } from "@/lib/constants/atelier";
import { LUXURY_EASE } from "@/lib/constants/animation";

export function AtelierIntro() {
  return (
    <div className="grid grid-cols-12 gap-8 md:gap-12">
      <motion.div
        className="col-span-12 md:col-span-7"
        initial={{ opacity: 0, x: -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: LUXURY_EASE }}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-ice-gray-800 md:aspect-[3/4]">
          <Image
            src={ATELIER_INTRO.portrait}
            alt={`Retrato editorial de ${ATELIER_INTRO.designerName}`}
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        className="col-span-12 flex flex-col justify-end md:col-span-5 md:pb-8"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: LUXURY_EASE, delay: 0.15 }}
      >
        <p className="font-display text-[10px] uppercase tracking-[0.4em] text-ice-beige/80">
          {ATELIER_INTRO.designerName}
        </p>
        <h2 className="mt-6 font-display text-3xl font-light leading-tight tracking-tight text-ice-cream md:text-4xl">
          {ATELIER_INTRO.headline}
        </h2>
        <div className="mt-8 space-y-6 border-l border-ice-beige/20 pl-6">
          {ATELIER_INTRO.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-sm leading-relaxed text-ice-gray-200 md:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
