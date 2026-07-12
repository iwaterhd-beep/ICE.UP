"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HERO_POSTER, HERO_Z_INDEX } from "@/lib/constants/hero";
import { LUXURY_EASE } from "@/lib/constants/animation";

interface HeroVideoProps {
  cinematicRef: React.RefObject<HTMLVideoElement | null>;
  cinematicSrc: string;
  hasEnded: boolean;
  hasError: boolean;
  isPlaying: boolean;
  needsInteraction: boolean;
  showEnterGate: boolean;
  isMuted: boolean;
  onCinematicPlaying: () => void;
  onCinematicEnded: () => void;
  onCinematicError: () => void;
  onUserPlay: () => void;
  onEnableSound: () => void;
}

export function HeroVideo({
  cinematicRef,
  cinematicSrc,
  hasEnded,
  hasError,
  isPlaying,
  needsInteraction,
  showEnterGate,
  isMuted,
  onCinematicPlaying,
  onCinematicEnded,
  onCinematicError,
  onUserPlay,
  onEnableSound,
}: HeroVideoProps) {
  const showPlayButton = (needsInteraction || hasError) && !hasEnded && !isPlaying;

  const showSoundButton =
    isMuted && !hasEnded && !showEnterGate && (isPlaying || needsInteraction);

  if (hasError && !isPlaying) {
    return (
      <div className="absolute inset-0 bg-ice-black">
        <picture className="absolute inset-0 h-full w-full opacity-40">
          <source srcSet={HERO_POSTER.cinematic.webp} type="image/webp" />
          <img
            src={HERO_POSTER.cinematic.jpg}
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

      <div
        className={`absolute inset-0 z-[1] flex items-center justify-center transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showEnterGate ? "opacity-0" : "opacity-100"
        }`}
      >
        <video
          ref={cinematicRef}
          src={cinematicSrc}
          className={`max-h-full max-w-full object-contain ${
            hasEnded && !showEnterGate
              ? "brightness-[1.06] contrast-[1.08] saturate-[1.15]"
              : ""
          }`}
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          poster={HERO_POSTER.cinematic.jpg}
          aria-hidden="true"
          onPlaying={onCinematicPlaying}
          onEnded={onCinematicEnded}
          onError={onCinematicError}
        />
      </div>

      <AnimatePresence>
        {showSoundButton && (
          <motion.button
            key="sound-btn"
            type="button"
            onClick={onEnableSound}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            className="absolute bottom-8 left-6 flex items-center gap-2 border border-ice-white/40 bg-black/45 px-4 py-2.5 font-condensed text-[11px] font-bold uppercase tracking-wide text-ice-white backdrop-blur-sm transition-colors hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-white md:bottom-10 md:left-10"
            style={{ zIndex: HERO_Z_INDEX.skip }}
            aria-label="Activar sonido del vídeo"
          >
            <span aria-hidden="true">🔊</span>
            Sonido
          </motion.button>
        )}
      </AnimatePresence>

      {showPlayButton && <PlayOverlay label="Reproducir con sonido" onPlay={onUserPlay} />}
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
