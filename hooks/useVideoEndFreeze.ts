"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_VIDEOS } from "@/lib/constants/hero";

interface UseVideoEndFreezeOptions {
  onError?: () => void;
}

interface UseVideoEndFreezeReturn {
  hasEnded: boolean;
  hasError: boolean;
  needsInteraction: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  handleEnded: () => void;
  handleError: () => void;
  handleLoadedMetadata: () => void;
  handleUserPlay: () => void;
}

function pickInitialSrc(): string {
  if (typeof window === "undefined") return HERO_VIDEOS.desktop;
  return window.matchMedia("(max-width: 768px)").matches
    ? HERO_VIDEOS.mobile
    : HERO_VIDEOS.desktop;
}

function buildFallbackChain(preferred: string): string[] {
  const ordered = [
    preferred,
    HERO_VIDEOS.desktop,
    HERO_VIDEOS.mobile,
    HERO_VIDEOS.fallback,
  ];
  return [...new Set(ordered)];
}

export function useVideoEndFreeze(
  options: UseVideoEndFreezeOptions = {},
): UseVideoEndFreezeReturn {
  const { onError } = options;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);
  const fallbackIndexRef = useRef(0);

  const [videoSrc, setVideoSrc] = useState<string>(HERO_VIDEOS.desktop);
  const [fallbackChain, setFallbackChain] = useState<string[]>(() =>
    buildFallbackChain(HERO_VIDEOS.desktop),
  );
  const [hasEnded, setHasEnded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const preferred = pickInitialSrc();
    setVideoSrc(preferred);
    setFallbackChain(buildFallbackChain(preferred));
    fallbackIndexRef.current = 0;
    startedRef.current = false;
  }, []);

  const finishIntro = useCallback(() => {
    setHasEnded(true);
    setNeedsInteraction(false);
  }, []);

  const tryAutoplay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || startedRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      video.pause();
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = Math.max(video.duration - 0.05, 0);
      }
      finishIntro();
      return;
    }

    try {
      await video.play();
      startedRef.current = true;
      setNeedsInteraction(false);
    } catch {
      startedRef.current = false;
      setNeedsInteraction(true);
    }
  }, [finishIntro]);

  const handleEnded = useCallback(() => {
    finishIntro();
  }, [finishIntro]);

  const advanceFallback = useCallback(() => {
    const nextIndex = fallbackIndexRef.current + 1;
    if (nextIndex >= fallbackChain.length) {
      setHasError(true);
      finishIntro();
      onError?.();
      return false;
    }

    fallbackIndexRef.current = nextIndex;
    startedRef.current = false;
    setVideoSrc(fallbackChain[nextIndex]!);
    return true;
  }, [fallbackChain, finishIntro, onError]);

  const handleError = useCallback(() => {
    if (advanceFallback()) return;
  }, [advanceFallback]);

  const handleLoadedMetadata = useCallback(() => {
    void tryAutoplay();
  }, [tryAutoplay]);

  const handleUserPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    void video
      .play()
      .then(() => {
        startedRef.current = true;
        setNeedsInteraction(false);
      })
      .catch(() => {
        setNeedsInteraction(true);
      });
  }, []);

  useEffect(() => {
    if (!needsInteraction) return;

    const onFirstInteraction = () => {
      handleUserPlay();
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, [needsInteraction, handleUserPlay]);

  return {
    hasEnded,
    hasError,
    needsInteraction,
    videoRef,
    videoSrc,
    handleEnded,
    handleError,
    handleLoadedMetadata,
    handleUserPlay,
  };
}
