export const HERO_VIDEOS = {
  /** Fuente nativa 2560×1440 — máxima calidad en desktop */
  desktop: "/videos/ice-source.mp4",
  /** 1080p CRF 17 — alta calidad en móvil sin el peso del master */
  mobile: "/videos/intro-mobile.mp4",
  fallback: "/videos/ice-source.mp4",
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
