"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { HERO_CONTENT } from "@/lib/constants/hero";
import { LUXURY_EASE, STAGGER_CHILDREN } from "@/lib/constants/animation";
import { SITE } from "@/lib/constants/site";

interface HeroContentProps {
  hasEnded: boolean;
  contentOpacity: MotionValue<number>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: LUXURY_EASE,
    },
  },
};

export function HeroContent({ hasEnded, contentOpacity }: HeroContentProps) {
  return (
    <motion.div
      className="relative z-20 flex h-full flex-col items-center justify-end px-6 pb-16 md:pb-24"
      style={{ opacity: contentOpacity }}
    >
      <h1 className="sr-only">{SITE.name}</h1>

      <AnimatePresence>
        {hasEnded && (
          <motion.div
            className="flex w-full max-w-4xl flex-col items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-white md:text-sm"
            >
              {HERO_CONTENT.subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <a
                href={HERO_CONTENT.ctaTarget}
                aria-label={`${HERO_CONTENT.cta} — ir al archivo de la marca`}
                className="inline-block bg-ice-white px-10 py-4 font-condensed text-xs font-black uppercase tracking-wide text-ice-black transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ice-white"
              >
                {HERO_CONTENT.cta}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
