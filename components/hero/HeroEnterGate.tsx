"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants/brand";
import { LUXURY_EASE } from "@/lib/constants/animation";
import { useHeroStore } from "@/stores/hero-store";

const LETTERING = { width: 640, height: 200 };

export function HeroEnterGate() {
  const enterSite = useHeroStore((state) => state.enterSite);

  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: LUXURY_EASE }}
    >
      <motion.button
        type="button"
        onClick={enterSite}
        aria-label="Entrar en ICE UP!"
        className="relative z-10 cursor-pointer border-0 bg-transparent p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ice-white"
        initial={{ opacity: 0, scale: 0.88, y: 16 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -16, 0],
        }}
        transition={{
          opacity: { duration: 1, ease: LUXURY_EASE },
          scale: { duration: 1, ease: LUXURY_EASE },
          y: {
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          },
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <Image
          src={BRAND.lettering}
          alt="ICE UP!"
          width={LETTERING.width}
          height={LETTERING.height}
          priority
          className="h-auto w-[min(72vw,520px)] object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        />
      </motion.button>
    </motion.div>
  );
}
