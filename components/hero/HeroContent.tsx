"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { SITE } from "@/lib/constants/site";
import { useHeroStore } from "@/stores/hero-store";
import { HeroEnterGate } from "./HeroEnterGate";

interface HeroContentProps {
  hasEnded: boolean;
  contentOpacity: MotionValue<number>;
}

export function HeroContent({ hasEnded, contentOpacity }: HeroContentProps) {
  const hasEntered = useHeroStore((state) => state.hasEntered);
  const showEnterGate = hasEnded && !hasEntered;

  return (
    <motion.div
      className="relative z-20 flex h-full flex-col items-center justify-center"
      style={{ opacity: showEnterGate ? 1 : contentOpacity }}
    >
      <h1 className="sr-only">{SITE.name}</h1>

      <AnimatePresence mode="wait">
        {showEnterGate && <HeroEnterGate key="enter-gate" />}
      </AnimatePresence>
    </motion.div>
  );
}
