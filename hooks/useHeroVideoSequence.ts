"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  HERO_BRAND_VIDEOS,
  HERO_CINEMATIC_VIDEOS,
  HERO_SKIP,
  type HeroVideoPhase,
} from "@/lib/constants/hero";

interface UseHeroVideoSequenceReturn {
  phase: HeroVideoPhase;
  hasEnded: boolean;
  hasError: boolean;
  isPlaying: boolean;
  needsInteraction: boolean;
  showSkip: boolean;
  isMuted: boolean;
  brandSrc: string;
  cinematicSrc: string;
  brandRef: React.RefObject<HTMLVideoElement | null>;
  cinematicRef: React.RefObject<HTMLVideoElement | null>;
  handleBrandPlaying: () => void;
  handleCinematicPlaying: () => void;
  handleBrandEnded: () => void;
  handleCinematicEnded: () => void;
  handleBrandError: () => void;
  handleCinematicError: () => void;
  handleUserPlay: () => void;
  enableSound: () => void;
  skipToCinematic: () => void;
}

function isMobileViewport(): boolean {
  return window.matchMedia("(max-width: 768px)").matches;
}

function pickBrandSrcForViewport(isMobile: boolean): string {
  return isMobile ? HERO_BRAND_VIDEOS.mobile : HERO_BRAND_VIDEOS.desktop;
}

function pickCinematicSrcForViewport(isMobile: boolean): string {
  return isMobile ? HERO_CINEMATIC_VIDEOS.mobile : HERO_CINEMATIC_VIDEOS.desktop;
}

const CINEMATIC_FALLBACKS = [
  HERO_CINEMATIC_VIDEOS.mobile,
  HERO_CINEMATIC_VIDEOS.desktop,
] as const;

export function useHeroVideoSequence(): UseHeroVideoSequenceReturn {
  const brandRef = useRef<HTMLVideoElement | null>(null);
  const cinematicRef = useRef<HTMLVideoElement | null>(null);
  const phaseRef = useRef<HeroVideoPhase>("brand");
  const transitioningRef = useRef(false);
  const triedCinematicRef = useRef<Set<string>>(new Set());

  const [phase, setPhase] = useState<HeroVideoPhase>("brand");
  const [brandSrc, setBrandSrc] = useState<string>(HERO_BRAND_VIDEOS.mobile);
  const [cinematicSrc, setCinematicSrc] = useState<string>(HERO_CINEMATIC_VIDEOS.mobile);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const soundEnabledRef = useRef(false);

  const setPhaseSafe = useCallback((next: HeroVideoPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const applySoundToVideos = useCallback((muted: boolean) => {
    for (const video of [brandRef.current, cinematicRef.current]) {
      if (!video) continue;
      video.muted = muted;
      video.volume = muted ? 0 : 1;
    }
    setIsMuted(muted);
    soundEnabledRef.current = !muted;
  }, []);

  const enableSound = useCallback(() => {
    applySoundToVideos(false);
  }, [applySoundToVideos]);

  const playCinematic = useCallback(
    async (withSound = false) => {
      const video = cinematicRef.current;
      if (!video || hasEnded) return false;

      const useSound = withSound || soundEnabledRef.current;
      video.muted = !useSound;
      video.volume = useSound ? 1 : 0;
      video.playsInline = true;
      video.loop = false;
      setIsMuted(!useSound);

      try {
        await video.play();
        setNeedsInteraction(false);
        setIsPlaying(true);
        return true;
      } catch {
        if (useSound) {
          video.muted = true;
          video.volume = 0;
          setIsMuted(true);
          try {
            await video.play();
            setNeedsInteraction(false);
            setIsPlaying(true);
            return true;
          } catch {
            setNeedsInteraction(true);
            return false;
          }
        }
        setNeedsInteraction(true);
        return false;
      }
    },
    [hasEnded],
  );

  const skipToCinematic = useCallback(() => {
    if (phaseRef.current !== "brand" || transitioningRef.current || hasEnded) return;

    enableSound();
    transitioningRef.current = true;
    setShowSkip(false);
    setPhaseSafe("transition");

    const brand = brandRef.current;
    if (brand) brand.pause();

    const cinematic = cinematicRef.current;
    if (cinematic) {
      cinematic.currentTime = 0;
      void playCinematic();
    }

    window.setTimeout(() => {
      setPhaseSafe("cinematic");
      transitioningRef.current = false;
      void playCinematic();
    }, HERO_SKIP.transitionMs);
  }, [hasEnded, playCinematic, setPhaseSafe, enableSound]);

  const tryPlayBrand = useCallback(async (withSound = false) => {
    const video = brandRef.current;
    if (!video || phaseRef.current !== "brand" || transitioningRef.current) return;

    const useSound = withSound || soundEnabledRef.current;
    video.muted = !useSound;
    video.volume = useSound ? 1 : 0;
    video.playsInline = true;
    video.loop = false;
    setIsMuted(!useSound);

    try {
      await video.play();
      setNeedsInteraction(false);
      setIsPlaying(true);
    } catch {
      if (useSound) {
        video.muted = true;
        video.volume = 0;
        setIsMuted(true);
        try {
          await video.play();
          setNeedsInteraction(false);
          setIsPlaying(true);
        } catch {
          setNeedsInteraction(true);
        }
      } else {
        setNeedsInteraction(true);
      }
    }
  }, []);

  useEffect(() => {
    const isMobile = isMobileViewport();
    const brand = pickBrandSrcForViewport(isMobile);
    const cinematic = pickCinematicSrcForViewport(isMobile);

    setBrandSrc(brand);
    setCinematicSrc(cinematic);
    triedCinematicRef.current = new Set([cinematic]);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (phaseRef.current === "brand") setShowSkip(true);
    }, HERO_SKIP.availableAfter * 1000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const brand = brandRef.current;
    if (!brand || phase !== "brand") return;

    const requestPlay = () => void tryPlayBrand();
    brand.addEventListener("canplay", requestPlay);
    if (brand.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) requestPlay();

    return () => brand.removeEventListener("canplay", requestPlay);
  }, [phase, brandSrc, tryPlayBrand]);

  useEffect(() => {
    const cinematic = cinematicRef.current;
    if (!cinematic || (phase !== "transition" && phase !== "cinematic") || hasEnded) return;

    const tryPlay = () => void playCinematic();
    cinematic.addEventListener("canplay", tryPlay);
    if (cinematic.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) tryPlay();

    return () => cinematic.removeEventListener("canplay", tryPlay);
  }, [phase, cinematicSrc, hasEnded, playCinematic]);

  useEffect(() => {
    const cinematic = cinematicRef.current;
    if (!cinematic || !hasEnded) return;

    cinematic.pause();
    cinematic.loop = false;

    const blockReplay = () => cinematic.pause();
    cinematic.addEventListener("play", blockReplay);
    return () => cinematic.removeEventListener("play", blockReplay);
  }, [hasEnded]);

  const handleBrandEnded = useCallback(() => {
    setIsPlaying(false);
    skipToCinematic();
  }, [skipToCinematic]);

  const handleCinematicEnded = useCallback(() => {
    const video = cinematicRef.current;
    if (video) {
      video.pause();
      video.loop = false;
    }
    setHasEnded(true);
    setShowSkip(false);
    setNeedsInteraction(false);
  }, []);

  const handleBrandPlaying = useCallback(() => {
    setIsPlaying(true);
    setNeedsInteraction(false);
  }, []);

  const handleCinematicPlaying = useCallback(() => {
    setIsPlaying(true);
    setNeedsInteraction(false);
  }, []);

  const handleBrandError = useCallback(() => {
    skipToCinematic();
  }, [skipToCinematic]);

  const handleCinematicError = useCallback(() => {
    const next = CINEMATIC_FALLBACKS.find((src) => !triedCinematicRef.current.has(src));
    if (!next) {
      setHasError(true);
      setHasEnded(true);
      return;
    }
    triedCinematicRef.current.add(next);
    setCinematicSrc(next);
    window.setTimeout(() => void playCinematic(), 100);
  }, [playCinematic]);

  const handleUserPlay = useCallback(() => {
    if (hasEnded) return;
    enableSound();
    if (phaseRef.current === "brand") void tryPlayBrand(true);
    else void playCinematic(true);
  }, [hasEnded, tryPlayBrand, playCinematic, enableSound]);

  return {
    phase,
    hasEnded,
    hasError,
    isPlaying,
    needsInteraction,
    showSkip,
    isMuted,
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
    enableSound,
    skipToCinematic,
  };
}
