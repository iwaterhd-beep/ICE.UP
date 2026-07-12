"use client";

import { HERO_POSTER } from "@/lib/constants/hero";

interface HeroVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  hasEnded: boolean;
  hasError: boolean;
  needsInteraction: boolean;
  isPlaying: boolean;
  onEnded: () => void;
  onError: () => void;
  onLoadedMetadata: () => void;
  onCanPlay: () => void;
  onPlaying: () => void;
  onUserPlay: () => void;
}

export function HeroVideo({
  videoRef,
  videoSrc,
  hasEnded,
  hasError,
  needsInteraction,
  isPlaying,
  onEnded,
  onError,
  onLoadedMetadata,
  onCanPlay,
  onPlaying,
  onUserPlay,
}: HeroVideoProps) {
  if (hasError) {
    return (
      <picture className="absolute inset-0 z-0 h-full w-full">
        <source srcSet={HERO_POSTER.webp} type="image/webp" />
        <img
          src={HERO_POSTER.jpg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </picture>
    );
  }

  return (
    <>
      <picture
        className={`absolute inset-0 z-0 h-full w-full transition-opacity duration-500 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <source srcSet={HERO_POSTER.webp} type="image/webp" />
        <img src={HERO_POSTER.jpg} alt="" className="h-full w-full object-cover" />
      </picture>

      <video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 h-full w-full origin-center object-cover transition-[filter,opacity] duration-500 [transform:translateZ(0)] [backface-visibility:hidden] ${
          isPlaying ? "opacity-100" : "opacity-0"
        } ${
          hasEnded
            ? "brightness-[1.08] contrast-[1.1] saturate-[1.2]"
            : "brightness-100 contrast-100 saturate-100"
        }`}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={onLoadedMetadata}
        onCanPlay={onCanPlay}
        onPlaying={onPlaying}
        onEnded={onEnded}
        onError={onError}
      />

      {needsInteraction && !hasEnded && (
        <button
          type="button"
          onClick={onUserPlay}
          className="absolute inset-0 z-[5] flex items-end justify-center bg-black/25 pb-24 md:pb-32"
          aria-label="Reproducir vídeo de introducción"
        >
          <span className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-white/90">
            Toca para reproducir
          </span>
        </button>
      )}
    </>
  );
}
