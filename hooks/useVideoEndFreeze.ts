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
  handleCanPlay: () => void;
  handleUserPlay: () => void;
}

const VIDEO_SOURCES = [
  HERO_VIDEOS.mobile,
  HERO_VIDEOS.desktop,
  HERO_VIDEOS.fallback,
] as const;

function pickInitialSrc(): string {
  if (typeof window === "undefined") return HERO_VIDEOS.mobile;
  return window.matchMedia("(max-width: 768px)").matches
    ? HERO_VIDEOS.mobile
    : HERO_VIDEOS.desktop;
}

export function useVideoEndFreeze(
  options: UseVideoEndFreezeOptions = {},
): UseVideoEndFreezeReturn {
  const { onError } = options;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sourceIndexRef = useRef(0);
  const playAttemptedRef = useRef(false);

  const [videoSrc, setVideoSrc] = useState<string>(HERO_VIDEOS.mobile);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  const finishIntro = useCallback(() => {
    setHasEnded(true);
    setNeedsInteraction(false);
  }, []);

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasEnded || hasError) return;

    video.muted = true;
    video.playsInline = true;

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
      playAttemptedRef.current = true;
      setNeedsInteraction(false);
    } catch {
      playAttemptedRef.current = false;
      setNeedsInteraction(true);
    }
  }, [finishIntro, hasEnded, hasError]);

  useEffect(() => {
    sourceIndexRef.current = 0;
    playAttemptedRef.current = false;
    setVideoSrc(pickInitialSrc());
    setHasEnded(false);
    setHasError(false);
    setNeedsInteraction(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
  }, [videoSrc]);

  useEffect(() => {
    if (hasEnded || hasError) return;

    const unlockTimer = window.setTimeout(() => {
      if (!playAttemptedRef.current) {
        finishIntro();
        setNeedsInteraction(true);
      }
    }, 9000);

    return () => window.clearTimeout(unlockTimer);
  }, [videoSrc, hasEnded, hasError, finishIntro]);

  const handleEnded = useCallback(() => {
    finishIntro();
  }, [finishIntro]);

  const handleError = useCallback(() => {
    const nextIndex = sourceIndexRef.current + 1;
    if (nextIndex >= VIDEO_SOURCES.length) {
      setHasError(true);
      finishIntro();
      onError?.();
      return;
    }

    sourceIndexRef.current = nextIndex;
    playAttemptedRef.current = false;
    setVideoSrc(VIDEO_SOURCES[nextIndex]!);
  }, [finishIntro, onError]);

  const handleCanPlay = useCallback(() => {
    void tryPlay();
  }, [tryPlay]);

  const handleUserPlay = useCallback(() => {
    void tryPlay();
  }, [tryPlay]);

  useEffect(() => {
    if (!needsInteraction) return;

    const onInteract = () => {
      void tryPlay();
    };

    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, [needsInteraction, tryPlay]);

  return {
    hasEnded,
    hasError,
    needsInteraction,
    videoRef,
    videoSrc,
    handleEnded,
    handleError,
    handleCanPlay,
    handleUserPlay,
  };
}
