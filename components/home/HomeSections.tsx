"use client";

import { motion } from "framer-motion";
import { Archive } from "@/components/archive";
import { Atelier } from "@/components/atelier";
import { CollectionTeaser } from "@/components/shop";
import { LUXURY_EASE } from "@/lib/constants/animation";
import type { StorefrontProduct } from "@/lib/medusa/types";
import { useHeroStore } from "@/stores/hero-store";

interface HomeSectionsProps {
  recentProducts: StorefrontProduct[];
}

export function HomeSections({ recentProducts }: HomeSectionsProps) {
  const hasEntered = useHeroStore((state) => state.hasEntered);

  if (!hasEntered) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.65 }}
    >
      <CollectionTeaser products={recentProducts} />
      <Archive />
      <Atelier />
    </motion.div>
  );
}
