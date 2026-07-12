"use client";

import { usePathname } from "next/navigation";
import { useHeroStore } from "@/stores/hero-store";
import { Footer } from "./Footer";

export function FooterShell() {
  const pathname = usePathname();
  const hasEntered = useHeroStore((state) => state.hasEntered);

  if (pathname === "/" && !hasEntered) return null;

  return <Footer />;
}
