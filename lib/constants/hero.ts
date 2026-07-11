export const HERO_VIDEOS = {
  desktop: "/videos/intro-desktop.mp4",
  mobile: "/videos/intro-mobile.mp4",
  fallback: "/videos/intro.mp4",
} as const;

export const HERO_POSTER = {
  jpg: "/images/hero-poster.jpg",
  webp: "/images/hero-poster.webp",
} as const;

export const HERO_CONTENT = {
  subtitle: "Nueva colección invierno",
  cta: "Descubrir la colección",
  ctaTarget: "#archivo",
} as const;

export const HERO_Z_INDEX = {
  video: 0,
  overlay: 10,
  content: 20,
  nav: 30,
} as const;
