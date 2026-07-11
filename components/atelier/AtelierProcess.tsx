"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ATELIER_PHASES } from "@/lib/constants/atelier";
import { LUXURY_EASE } from "@/lib/constants/animation";

export function AtelierProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(
      Math.floor(value * ATELIER_PHASES.length),
      ATELIER_PHASES.length - 1,
    );
    setActivePhase((current) => (current === index ? current : index));
  });

  const phase = ATELIER_PHASES[activePhase];

  return (
    <div
      ref={containerRef}
      className="relative mt-32"
      style={{ height: `${ATELIER_PHASES.length * 100}vh` }}
    >
      <div className="sticky top-0 z-0 hidden h-screen md:block">
        <div className="mx-auto grid h-full max-w-6xl grid-cols-12 items-center gap-12 px-6">
          <div className="relative col-span-5 aspect-[3/4] overflow-hidden bg-ice-gray-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: LUXURY_EASE }}
              >
                <Image
                  src={phase.image}
                  alt={phase.title}
                  fill
                  sizes="42vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-4 left-4 font-display text-[10px] uppercase tracking-[0.35em] text-ice-white/60">
              {String(activePhase + 1).padStart(2, "0")} /{" "}
              {String(ATELIER_PHASES.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0">
        {ATELIER_PHASES.map((item, index) => (
          <div
            key={item.id}
            className="mx-auto grid min-h-screen max-w-6xl grid-cols-12 items-center gap-12 px-6"
          >
            <div className="col-span-12 md:col-span-5">
              <div className="relative mb-8 aspect-[4/5] overflow-hidden bg-ice-gray-800 md:hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 md:col-start-7">
              <motion.div
                animate={{
                  opacity: activePhase === index ? 1 : 0.2,
                  y: activePhase === index ? 0 : 20,
                }}
                transition={{ duration: 0.5, ease: LUXURY_EASE }}
              >
                <p className="font-display text-[10px] uppercase tracking-[0.35em] text-ice-beige/70">
                  Proceso
                </p>
                <h3 className="mt-4 font-display text-2xl font-light tracking-tight text-ice-cream md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-ice-gray-200 md:text-base">
                  {item.description}
                </p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
