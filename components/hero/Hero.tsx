"use client";

import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useHeroVideoSequence } from "@/hooks/useHeroVideoSequence";
import { LUXURY_EASE } from "@/lib/constants/animation";
import { HERO_Z_INDEX } from "@/lib/constants/hero";
import { useHeroStore } from "@/stores/hero-store";
import { HeroContent } from "./HeroContent";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const setVideoEnded = useHeroStore((state) => state.setVideoEnded);
  const hasEntered = useHeroStore((state) => state.hasEntered);
  const resetIntro = useHeroStore((state) => state.resetIntro);

  const {
    phase,
    hasEnded,
    hasError,
    isPlaying,
    needsInteraction,
    showSkip,
    brandSrc,
    cinematicSrc,
    brandRef,
    cinematicRef,
    handleBrandPlaying,
    handleCinematicPlaying,
    handleBrandEnded,
    handleCinematicEnded,
    handleBrandError,
    handleCinematicError,
    handleUserPlay,
    skipToCinematic,
  } = useHeroVideoSequence();

  const showEnterGate = hasEnded && !hasEntered;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  useEffect(() => {
    resetIntro();
    return () => resetIntro();
  }, [resetIntro]);

  useEffect(() => {
    setVideoEnded(hasEnded);
  }, [hasEnded, setVideoEnded]);

  useEffect(() => {
    if (hasEntered) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasEntered]);

  useMotionValueEvent(videoScale, "change", (scale) => {
    const video = cinematicRef.current;
    if (!video || !hasEntered) return;
    video.style.transform = `scale(${scale})`;
  });

  useMotionValueEvent(videoOpacity, "change", (opacity) => {
    const video = cinematicRef.current;
    if (!video || !hasEntered) return;
    video.style.opacity = String(opacity);
  });

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className={`relative w-full ${hasEntered ? "h-[200vh]" : "h-screen"}`}
      aria-label="Introducción ICE UP"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ zIndex: HERO_Z_INDEX.video }}
        >
          <HeroVideo
            phase={phase}
            brandRef={brandRef}
            cinematicRef={cinematicRef}
            brandSrc={brandSrc}
            cinematicSrc={cinematicSrc}
            hasEnded={hasEnded}
            hasEntered={hasEntered}
            hasError={hasError}
            isPlaying={isPlaying}
            needsInteraction={needsInteraction}
            showSkip={showSkip}
            showEnterGate={showEnterGate}
            onBrandPlaying={handleBrandPlaying}
            onCinematicPlaying={handleCinematicPlaying}
            onBrandEnded={handleBrandEnded}
            onCinematicEnded={handleCinematicEnded}
            onBrandError={handleBrandError}
            onCinematicError={handleCinematicError}
            onUserPlay={handleUserPlay}
            onSkip={skipToCinematic}
          />
        </div>

        <AnimatePresence>
          {showEnterGate && (
            <motion.div
              key="enter-overlay"
              className="absolute inset-0 bg-white/25"
              style={{ zIndex: HERO_Z_INDEX.overlay }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: LUXURY_EASE }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <motion.div
          className={`pointer-events-none absolute inset-0 ${
            showEnterGate
              ? ""
              : hasEnded
                ? "bg-gradient-to-t from-black/50 via-black/5 to-black/25"
                : phase === "cinematic"
                  ? "bg-gradient-to-t from-black/60 via-black/10 to-black/20"
                  : ""
          }`}
          style={{ zIndex: HERO_Z_INDEX.overlay }}
          initial={false}
          animate={{ opacity: showEnterGate ? 0 : 1 }}
          transition={{ duration: 0.9, ease: LUXURY_EASE, delay: showEnterGate ? 0 : 0.15 }}
          aria-hidden="true"
        />

        <HeroContent hasEnded={hasEnded} contentOpacity={contentOpacity} />
      </div>
    </section>
  );
}
