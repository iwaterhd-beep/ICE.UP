"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  HERO_POSTER,
  HERO_SKIP,
  HERO_Z_INDEX,
  type HeroVideoPhase,
} from "@/lib/constants/hero";
import { LUXURY_EASE } from "@/lib/constants/animation";

interface HeroVideoProps {
  phase: HeroVideoPhase;
  brandRef: React.RefObject<HTMLVideoElement | null>;
  cinematicRef: React.RefObject<HTMLVideoElement | null>;
  brandSrc: string;
  cinematicSrc: string;
  hasEnded: boolean;
  hasEntered: boolean;
  hasError: boolean;
  isPlaying: boolean;
  needsInteraction: boolean;
  showSkip: boolean;
  showEnterGate: boolean;
  onBrandPlaying: () => void;
  onCinematicPlaying: () => void;
  onBrandEnded: () => void;
  onCinematicEnded: () => void;
  onBrandError: () => void;
  onCinematicError: () => void;
  onUserPlay: () => void;
  onSkip: () => void;
}

const transitionClass = "transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

export function HeroVideo({
  phase,
  brandRef,
  cinematicRef,
  brandSrc,
  cinematicSrc,
  hasEnded,
  hasEntered,
  hasError,
  isPlaying,
  needsInteraction,
  showSkip,
  showEnterGate,
  onBrandPlaying,
  onCinematicPlaying,
  onBrandEnded,
  onCinematicEnded,
  onBrandError,
  onCinematicError,
  onUserPlay,
  onSkip,
}: HeroVideoProps) {
  const showPlayButton =
    (needsInteraction || hasError) && !hasEnded && !isPlaying && phase !== "transition";

  const brandOpacity =
    showEnterGate || phase === "cinematic"
      ? "opacity-0"
      : phase === "transition"
        ? "opacity-0"
        : "opacity-100";

  const cinematicOpacity =
    showEnterGate
      ? "opacity-0"
      : phase === "brand"
        ? "opacity-0"
        : "opacity-100";

  if (hasError && !isPlaying && phase === "brand") {
    return (
      <div className="absolute inset-0 bg-ice-black">
        <picture className="absolute inset-0 h-full w-full opacity-40">
          <source srcSet={HERO_POSTER.brand.webp} type="image/webp" />
          <img
            src={HERO_POSTER.brand.jpg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain object-center"
          />
        </picture>
        {showPlayButton && (
          <PlayOverlay label="Reproducir intro" onPlay={onUserPlay} />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-ice-black" aria-hidden="true" />

      <video
        ref={brandRef}
        src={brandSrc}
        className={`absolute inset-0 z-[1] h-full w-full object-contain object-center ${transitionClass} ${brandOpacity}`}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={HERO_POSTER.brand.jpg}
        aria-hidden="true"
        onPlaying={onBrandPlaying}
        onEnded={onBrandEnded}
        onError={onBrandError}
      />

      <video
        ref={cinematicRef}
        src={cinematicSrc}
        className={`absolute inset-0 z-[2] h-full w-full object-cover ${transitionClass} ${cinematicOpacity} ${
          hasEnded && !showEnterGate
            ? "brightness-[1.06] contrast-[1.08] saturate-[1.15]"
            : ""
        }`}
        muted
        playsInline
        preload="auto"
        poster={HERO_POSTER.cinematic.jpg}
        aria-hidden="true"
        onPlaying={onCinematicPlaying}
        onEnded={onCinematicEnded}
        onError={onCinematicError}
      />

      <AnimatePresence>
        {phase === "transition" && (
          <motion.div
            key="transition-flash"
            className="pointer-events-none absolute inset-0 z-[3] bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: HERO_SKIP.transitionMs / 1000, ease: LUXURY_EASE }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSkip && phase === "brand" && !showEnterGate && (
          <motion.button
            key="skip-btn"
            type="button"
            onClick={onSkip}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            className="absolute bottom-8 right-6 border border-ice-white/40 bg-black/45 px-5 py-2.5 font-condensed text-[11px] font-bold uppercase tracking-wide text-ice-white backdrop-blur-sm transition-colors hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-white md:bottom-10 md:right-10"
            style={{ zIndex: HERO_Z_INDEX.skip }}
            aria-label="Saltar al vídeo principal"
          >
            Saltar
          </motion.button>
        )}
      </AnimatePresence>

      {showPlayButton && <PlayOverlay label="Reproducir intro" onPlay={onUserPlay} />}
    </>
  );
}

function PlayOverlay({
  label,
  onPlay,
}: {
  label: string;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-4 bg-black/40"
      aria-label={label}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ice-white bg-ice-white/10 backdrop-blur-sm">
        <span className="ml-1 text-2xl text-ice-white">▶</span>
      </span>
      <span className="font-condensed text-sm font-bold uppercase tracking-wide text-ice-white">
        {label}
      </span>
    </button>
  );
}
