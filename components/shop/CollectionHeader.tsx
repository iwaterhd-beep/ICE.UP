"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LUXURY_EASE } from "@/lib/constants/animation";

export function CollectionHeader() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.header ref={ref} style={{ y, opacity }} className="mb-20 md:mb-28">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className="font-display text-[10px] uppercase tracking-[0.45em] text-ice-gray-400"
      >
        Tienda
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.08 }}
        className="mt-5 font-display text-4xl font-light tracking-tight md:text-6xl lg:text-7xl"
      >
        Colección
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.16 }}
        className="mt-8 max-w-lg text-sm leading-relaxed text-ice-gray-300 md:text-base"
      >
        Prendas disponibles para compra. Cada pieza es confeccionada a mano en
        ediciones limitadas — no reproducción en masa.
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: LUXURY_EASE, delay: 0.3 }}
        className="mt-12 h-px w-full max-w-md origin-left bg-gradient-to-r from-ice-white/50 to-transparent"
      />
    </motion.header>
  );
}
