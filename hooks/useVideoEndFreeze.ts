"use client";

import { useCallback, useRef, useState } from "react";
import { HERO_VIDEOS } from "@/lib/constants/hero";

interface UseVideoEndFreezeOptions {
  onError?: () => void;
}

interface UseVideoEndFreezeReturn {
  hasEnded: boolean;
  hasError: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  handleEnded: () => void;
  handleError: () => void;
  handleLoadedMetadata: () => void;
}

function pickVideoSrc(): string {
  if (typeof window === "undefined") return HERO_VIDEOS.desktop;
  return window.matchMedia("(max-width: 768px)").matches
    ? HERO_VIDEOS.mobile
    : HERO_VIDEOS.desktop;
}

export function useVideoEndFreeze(
  options: UseVideoEndFreezeOptions = {},
): UseVideoEndFreezeReturn {
  const { onError } = options;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);
  const [videoSrc] = useState(pickVideoSrc);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleEnded = useCallback(() => {
    setHasEnded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video || startedRef.current || hasError) return;

    startedRef.current = true;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      video.pause();
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = Math.max(video.duration - 0.05, 0);
      }
      setHasEnded(true);
      return;
    }

    void video.play().catch(() => {
      startedRef.current = false;
      handleError();
    });
  }, [hasError, handleError]);

  return {
    hasEnded,
    hasError,
    videoRef,
    videoSrc,
    handleEnded,
    handleError,
    handleLoadedMetadata,
  };
}
