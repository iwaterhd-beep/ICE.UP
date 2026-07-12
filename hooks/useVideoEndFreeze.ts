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
  const maxTimeRef = useRef(0);

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
    maxTimeRef.current = 0;
    setVideoSrc(initial);
    setHasEnded(false);
    setHasError(false);
    setIsPlaying(false);
    setNeedsInteraction(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    playStartedRef.current = false;
    maxTimeRef.current = 0;
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
  }, [videoSrc, tryPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      maxTimeRef.current = Math.max(maxTimeRef.current, video.currentTime);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [videoSrc]);

  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    const duration = video?.duration ?? 0;
    const watched = maxTimeRef.current;

    // Ignora "ended" espurio si casi no se reprodujo
    if (duration > 0 && watched < Math.min(3, duration * 0.75)) {
      if (video) {
        video.currentTime = 0;
        maxTimeRef.current = 0;
        playStartedRef.current = false;
        void video.play().catch(() => setNeedsInteraction(true));
      }
      return;
    }

    if (video) {
      video.pause();
    }
    setHasEnded(true);
    setNeedsInteraction(false);
  }, []);

  const handlePlaying = useCallback(() => {
    setIsPlaying(true);
    setNeedsInteraction(false);
  }, []);

  const handleError = useCallback(() => {
    const next = FALLBACK_SOURCES.find((src) => !triedSourcesRef.current.has(src));

    if (!next) {
      setHasError(true);
      setNeedsInteraction(true);
      return;
    }

    triedSourcesRef.current.add(next);
    playStartedRef.current = false;
    maxTimeRef.current = 0;
    setIsPlaying(false);
    setVideoSrc(next);
  }, []);

  const handleUserPlay = useCallback(() => {
    playStartedRef.current = false;
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      maxTimeRef.current = 0;
    }
    void tryPlay();
  }, [tryPlay]);

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
