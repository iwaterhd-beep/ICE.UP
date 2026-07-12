export const HERO_CINEMATIC_VIDEOS = {
  desktop: "/videos/intro-cinematic-desktop.mp4",
  mobile: "/videos/intro-cinematic-mobile.mp4",
  fallback: "/videos/intro-cinematic-mobile.mp4",
} as const;

export const HERO_POSTER = {
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
