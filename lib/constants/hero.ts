export const HERO_BRAND_VIDEOS = {
  desktop: "/videos/intro-brand-desktop.mp4",
  mobile: "/videos/intro-brand-mobile.mp4",
} as const;

export const HERO_CINEMATIC_VIDEOS = {
  desktop: "/videos/intro-cinematic-desktop.mp4",
  mobile: "/videos/intro-cinematic-mobile.mp4",
  fallback: "/videos/intro-cinematic-mobile.mp4",
} as const;

/** Segundos antes de mostrar el botón Saltar (solo manual, sin auto-skip) */
export const HERO_SKIP = {
  availableAfter: 4,
  transitionMs: 900,
} as const;

export const HERO_POSTER = {
  brand: {
    jpg: "/images/hero-poster-brand.jpg",
    webp: "/images/hero-poster-brand.webp",
  },
  cinematic: {
    jpg: "/images/hero-poster-cinematic.jpg",
    webp: "/images/hero-poster-cinematic.webp",
  },
} as const;

export const HERO_CONTENT = {
  cta: "Ver colección",
  ctaTarget: "/coleccion",
} as const;

export const HERO_Z_INDEX = {
  video: 0,
  overlay: 10,
  content: 20,
  nav: 30,
  skip: 25,
} as const;

export type HeroVideoPhase = "brand" | "transition" | "cinematic";
