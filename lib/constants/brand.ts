/** Rutas de marca ICE UP! */
export const BRAND = {
  isotipo: "/brand/isotipo.png",
  wordmark: "/brand/wordmark.png",
  /** Lettering con destello — pantalla de entrada post-intro */
  lettering: "/brand/lettering.png",
} as const;

export type LogoVariant = "isotipo" | "wordmark" | "lockup";
