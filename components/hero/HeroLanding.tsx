"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT } from "@/lib/constants/hero";
import { LUXURY_EASE, STAGGER_CHILDREN } from "@/lib/constants/animation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: 0.55,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: LUXURY_EASE,
    },
  },
};

export function HeroLanding() {
  return (
    <motion.div
      className="pointer-events-auto absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-14 text-center md:pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <a
          href={HERO_CONTENT.ctaTarget}
          aria-label={`${HERO_CONTENT.cta} — ir a la tienda`}
          className="inline-block bg-ice-white px-10 py-4 font-condensed text-xs font-black uppercase tracking-wide text-ice-black transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ice-white"
        >
          {HERO_CONTENT.cta}
        </a>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-10 flex flex-col items-center gap-2 md:mt-14"
        aria-hidden="true"
      >
        <span className="font-condensed text-[10px] font-bold uppercase tracking-wide text-ice-white/50">
          Scroll
        </span>
        <motion.span
          className="block h-10 w-px origin-top bg-gradient-to-b from-ice-white/70 to-transparent"
          animate={{ scaleY: [1, 0.45, 1], opacity: [0.7, 0.35, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
