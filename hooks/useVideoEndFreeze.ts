"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_VIDEOS } from "@/lib/constants/hero";

interface UseVideoEndFreezeReturn {
  hasEnded: boolean;
  hasError: boolean;
  isPlaying: boolean;
  needsInteraction: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  handleEnded: () => void;
  handleError: () => void;
  handlePlaying: () => void;
  handleUserPlay: () => void;
}

/** Mobile first — carga ~2.7 MB vs ~8 MB desktop en Vercel */
function pickInitialSrc(): string {
  return HERO_VIDEOS.mobile;
}

const FALLBACK_SOURCES = [HERO_VIDEOS.mobile, HERO_VIDEOS.desktop] as const;

export function useVideoEndFreeze(): UseVideoEndFreezeReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const triedSourcesRef = useRef<Set<string>>(new Set());
  const playStartedRef = useRef(false);

  const [videoSrc, setVideoSrc] = useState<string>(HERO_VIDEOS.mobile);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasEnded || playStartedRef.current) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = false;

    if (video.currentTime < 0.1) {
      video.currentTime = 0;
    }

    try {
      await video.play();
      playStartedRef.current = true;
      setNeedsInteraction(false);
    } catch {
      setNeedsInteraction(true);
    }
  }, [hasEnded]);

  useEffect(() => {
    const initial = pickInitialSrc();
    triedSourcesRef.current = new Set([initial]);
    playStartedRef.current = false;
    setVideoSrc(initial);
    setHasEnded(false);
    setHasError(false);
    setIsPlaying(false);
    setNeedsInteraction(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasEnded) return;

    playStartedRef.current = false;
    video.load();

    const requestPlay = () => {
      void tryPlay();
    };

    video.addEventListener("canplay", requestPlay);
    video.addEventListener("canplaythrough", requestPlay);
    video.addEventListener("loadeddata", requestPlay);

    return () => {
      video.removeEventListener("canplay", requestPlay);
      video.removeEventListener("canplaythrough", requestPlay);
      video.removeEventListener("loadeddata", requestPlay);
    };
  }, [videoSrc, tryPlay, hasEnded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasEnded) return;

    video.pause();
    video.loop = false;

    const blockReplay = () => {
      video.pause();
    };

    video.addEventListener("play", blockReplay);
    return () => video.removeEventListener("play", blockReplay);
  }, [hasEnded]);

  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.loop = false;
    }
    playStartedRef.current = true;
    setHasEnded(true);
    setNeedsInteraction(false);
  }, []);

  const handlePlaying = useCallback(() => {
    if (hasEnded) return;
    setIsPlaying(true);
    setNeedsInteraction(false);
  }, [hasEnded]);

  const handleError = useCallback(() => {
    if (hasEnded) return;

    const next = FALLBACK_SOURCES.find((src) => !triedSourcesRef.current.has(src));

    if (!next) {
      setHasError(true);
      setNeedsInteraction(true);
      return;
    }

    triedSourcesRef.current.add(next);
    playStartedRef.current = false;
    setIsPlaying(false);
    setVideoSrc(next);
  }, [hasEnded]);

  const handleUserPlay = useCallback(() => {
    if (hasEnded) return;

    playStartedRef.current = false;
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
    }
    void tryPlay();
  }, [hasEnded, tryPlay]);

  return {
    hasEnded,
    hasError,
    isPlaying,
    needsInteraction,
    videoRef,
    videoSrc,
    handleEnded,
    handleError,
    handlePlaying,
    handleUserPlay,
  };
}
