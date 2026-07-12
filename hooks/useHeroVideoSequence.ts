"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_CINEMATIC_VIDEOS } from "@/lib/constants/hero";

interface UseHeroVideoSequenceReturn {
  hasEnded: boolean;
  hasError: boolean;
  isPlaying: boolean;
  needsInteraction: boolean;
  isMuted: boolean;
  cinematicSrc: string;
  cinematicRef: React.RefObject<HTMLVideoElement | null>;
  handleCinematicPlaying: () => void;
  handleCinematicEnded: () => void;
  handleCinematicError: () => void;
  handleUserPlay: () => void;
  enableSound: () => void;
}

function isMobileViewport(): boolean {
  return window.matchMedia("(max-width: 768px)").matches;
}

function pickCinematicSrcForViewport(isMobile: boolean): string {
  return isMobile ? HERO_CINEMATIC_VIDEOS.mobile : HERO_CINEMATIC_VIDEOS.desktop;
}

const CINEMATIC_FALLBACKS = [
  HERO_CINEMATIC_VIDEOS.mobile,
  HERO_CINEMATIC_VIDEOS.desktop,
] as const;

export function useHeroVideoSequence(): UseHeroVideoSequenceReturn {
  const cinematicRef = useRef<HTMLVideoElement | null>(null);
  const triedCinematicRef = useRef<Set<string>>(new Set());

  const [cinematicSrc, setCinematicSrc] = useState<string>(HERO_CINEMATIC_VIDEOS.mobile);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const soundEnabledRef = useRef(false);

  const applySoundToVideo = useCallback((muted: boolean) => {
    const video = cinematicRef.current;
    if (video) {
      video.muted = muted;
      video.volume = muted ? 0 : 1;
    }
    setIsMuted(muted);
    soundEnabledRef.current = !muted;
  }, []);

  const enableSound = useCallback(() => {
    applySoundToVideo(false);
  }, [applySoundToVideo]);

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

  useEffect(() => {
    const cinematic = pickCinematicSrcForViewport(isMobileViewport());
    setCinematicSrc(cinematic);
    triedCinematicRef.current = new Set([cinematic]);
  }, []);

  useEffect(() => {
    const cinematic = cinematicRef.current;
    if (!cinematic || hasEnded) return;

    const tryPlay = () => void playCinematic();
    cinematic.addEventListener("canplay", tryPlay);
    if (cinematic.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) tryPlay();

    return () => cinematic.removeEventListener("canplay", tryPlay);
  }, [cinematicSrc, hasEnded, playCinematic]);

  useEffect(() => {
    const cinematic = cinematicRef.current;
    if (!cinematic || !hasEnded) return;

    cinematic.pause();
    cinematic.loop = false;

    const blockReplay = () => cinematic.pause();
    cinematic.addEventListener("play", blockReplay);
    return () => cinematic.removeEventListener("play", blockReplay);
  }, [hasEnded]);

  const handleCinematicEnded = useCallback(() => {
    const video = cinematicRef.current;
    if (video) {
      video.pause();
      video.loop = false;
    }
    setHasEnded(true);
    setNeedsInteraction(false);
  }, []);

  const handleCinematicPlaying = useCallback(() => {
    setIsPlaying(true);
    setNeedsInteraction(false);
  }, []);

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
    void playCinematic(true);
  }, [hasEnded, playCinematic, enableSound]);

  return {
    hasEnded,
    hasError,
    isPlaying,
    needsInteraction,
    isMuted,
    cinematicSrc,
    cinematicRef,
    handleCinematicPlaying,
    handleCinematicEnded,
    handleCinematicError,
    handleUserPlay,
    enableSound,
  };
}
