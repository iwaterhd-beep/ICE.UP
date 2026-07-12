"use client";

import { Archive } from "@/components/archive";
import { Atelier } from "@/components/atelier";
import { CollectionTeaser } from "@/components/shop";
import { useHeroStore } from "@/stores/hero-store";

export function HomeSections() {
  const hasEntered = useHeroStore((state) => state.hasEntered);

  if (!hasEntered) return null;

  return (
    <>
      <Archive />
      <Atelier />
      <CollectionTeaser />
    </>
  );
}
