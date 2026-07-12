export const HERO_VIDEOS = {
  /** 1920p CRF 16 + faststart — alta calidad, carga fiable en CDN */
  desktop: "/videos/intro-desktop.mp4",
  /** 1080p CRF 17 — móvil */
  mobile: "/videos/intro-mobile.mp4",
  fallback: "/videos/intro-mobile.mp4",
} as const;

export const HERO_POSTER = {
  jpg: "/images/hero-poster.jpg",
  webp: "/images/hero-poster.webp",
} as const;

export const HERO_CONTENT = {
  subtitle: "Drop activo — Hood's Château + Logo Tees",
  cta: "Ver colección",
  ctaTarget: "/coleccion",
} as const;

export const HERO_Z_INDEX = {
  video: 0,
  overlay: 10,
  content: 20,
  nav: 30,
} as const;
