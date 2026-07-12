"use client";

import { HERO_POSTER } from "@/lib/constants/hero";

interface HeroVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  hasEnded: boolean;
  hasError: boolean;
  isPlaying: boolean;
  needsInteraction: boolean;
  showEnterGate: boolean;
  onEnded: () => void;
  onError: () => void;
  onPlaying: () => void;
  onUserPlay: () => void;
}

export function HeroVideo({
  videoRef,
  videoSrc,
  hasEnded,
  hasError,
  isPlaying,
  needsInteraction,
  showEnterGate,
  onEnded,
  onError,
  onPlaying,
  onUserPlay,
}: HeroVideoProps) {
  const showPlayButton = (needsInteraction || hasError) && !hasEnded && !isPlaying;

  if (hasError && !isPlaying) {
    return (
      <div className="absolute inset-0 bg-ice-black">
        <picture className="absolute inset-0 h-full w-full opacity-40">
          <source srcSet={HERO_POSTER.webp} type="image/webp" />
          <img
            src={HERO_POSTER.jpg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </picture>
        {showPlayButton && (
          <button
            type="button"
            onClick={onUserPlay}
            className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-4 bg-black/50"
            aria-label="Reproducir vídeo de introducción"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ice-white bg-ice-white/10">
              <span className="ml-1 text-2xl text-ice-white">▶</span>
            </span>
            <span className="font-condensed text-sm font-bold uppercase tracking-wide text-ice-white">
              Reproducir intro
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          showEnterGate ? "pointer-events-none opacity-0" : ""
        } ${
          hasEnded && !showEnterGate
            ? "brightness-[1.08] contrast-[1.1] saturate-[1.2]"
            : "brightness-100 contrast-100 saturate-100"
        }`}
        autoPlay={!hasEnded}
        muted
        playsInline
        preload="auto"
        poster={isPlaying || hasEnded ? undefined : HERO_POSTER.jpg}
        aria-hidden="true"
        onPlaying={onPlaying}
        onEnded={onEnded}
        onError={onError}
      />

      {showPlayButton && (
        <button
          type="button"
          onClick={onUserPlay}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-4 bg-black/40"
          aria-label="Reproducir vídeo de introducción"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ice-white bg-ice-white/10 backdrop-blur-sm">
            <span className="ml-1 text-2xl text-ice-white">▶</span>
          </span>
          <span className="font-condensed text-sm font-bold uppercase tracking-wide text-ice-white">
            Reproducir intro
          </span>
        </button>
      )}
    </>
  );
}
