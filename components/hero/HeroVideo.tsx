"use client";

import { HERO_POSTER } from "@/lib/constants/hero";

interface HeroVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  hasEnded: boolean;
  hasError: boolean;
  needsInteraction: boolean;
  onEnded: () => void;
  onError: () => void;
  onCanPlay: () => void;
  onUserPlay: () => void;
}

export function HeroVideo({
  videoRef,
  videoSrc,
  hasEnded,
  hasError,
  needsInteraction,
  onEnded,
  onError,
  onCanPlay,
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
      <video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-1000 ${
          hasEnded
            ? "brightness-[1.08] contrast-[1.1] saturate-[1.2]"
            : "brightness-100 contrast-100 saturate-100"
        }`}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={HERO_POSTER.jpg}
        aria-hidden="true"
        onCanPlay={onCanPlay}
        onLoadedData={onCanPlay}
        onEnded={onEnded}
        onError={onError}
      />

      {needsInteraction && !hasEnded && (
        <button
          type="button"
          onClick={onUserPlay}
          className="absolute inset-0 z-[5] flex items-end justify-center bg-black/20 pb-24 md:pb-32"
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
