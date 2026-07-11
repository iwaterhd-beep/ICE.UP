"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useVideoEndFreeze } from "@/hooks/useVideoEndFreeze";
import { HERO_Z_INDEX } from "@/lib/constants/hero";
import { useHeroStore } from "@/stores/hero-store";
import { HeroContent } from "./HeroContent";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const setIntroFinished = useHeroStore((state) => state.setIntroFinished);
  const resetIntro = useHeroStore((state) => state.resetIntro);

  const {
    hasEnded,
    hasError,
    videoRef,
    videoSrc,
    handleEnded,
    handleError,
    handleLoadedMetadata,
  } = useVideoEndFreeze();

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
    setIntroFinished(hasEnded);
  }, [hasEnded, setIntroFinished]);

  useMotionValueEvent(videoScale, "change", (scale) => {
    const video = videoRef.current;
    if (!video || !hasEnded) return;
    video.style.transform = `scale(${scale})`;
  });

  useMotionValueEvent(videoOpacity, "change", (opacity) => {
    const video = videoRef.current;
    if (!video || !hasEnded) return;
    video.style.opacity = String(opacity);
  });

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-[200vh] w-full"
      aria-label="Introducción ICE UP"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ zIndex: HERO_Z_INDEX.video }}
        >
          <HeroVideo
            videoRef={videoRef}
            videoSrc={videoSrc}
            hasEnded={hasEnded}
            hasError={hasError}
            onEnded={handleEnded}
            onError={handleError}
            onLoadedMetadata={handleLoadedMetadata}
          />
        </div>

        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
            hasEnded
              ? "bg-gradient-to-t from-black/35 via-transparent to-transparent"
              : "bg-gradient-to-t from-black/60 via-black/10 to-black/20"
          }`}
          style={{ zIndex: HERO_Z_INDEX.overlay }}
          aria-hidden="true"
        />

        <HeroContent hasEnded={hasEnded} contentOpacity={contentOpacity} />
      </div>
    </section>
  );
}
