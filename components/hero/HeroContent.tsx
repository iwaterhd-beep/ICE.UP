"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { SITE } from "@/lib/constants/site";
import { useHeroStore } from "@/stores/hero-store";
import { HeroEnterGate } from "./HeroEnterGate";
import { HeroLanding } from "./HeroLanding";

interface HeroContentProps {
  hasEnded: boolean;
  contentOpacity: MotionValue<number>;
}

export function HeroContent({ hasEnded, contentOpacity }: HeroContentProps) {
  const hasEntered = useHeroStore((state) => state.hasEntered);
  const showEnterGate = hasEnded && !hasEntered;
  const showLanding = hasEntered && hasEnded;

  return (
    <motion.div
      className="relative z-20 h-full w-full"
      style={{ opacity: showEnterGate ? 1 : contentOpacity }}
    >
      <h1 className="sr-only">{SITE.name}</h1>

      <AnimatePresence mode="wait">
        {showEnterGate && <HeroEnterGate key="enter-gate" />}
      </AnimatePresence>

      {showLanding && <HeroLanding />}
    </motion.div>
  );
}
