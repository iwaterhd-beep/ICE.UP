"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ATELIER_QUOTE } from "@/lib/constants/atelier";
import { LUXURY_EASE, STAGGER_CHILDREN } from "@/lib/constants/animation";

export function AtelierQuote() {
  const ref = useRef<HTMLQuoteElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const words = ATELIER_QUOTE.text.split(" ");

  return (
    <blockquote
      ref={ref}
      className="relative mt-32 overflow-hidden px-6 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-ice-cream/[0.06]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12] mix-blend-soft-light"
        style={{ backgroundImage: `url(${ATELIER_QUOTE.texture})` }}
        aria-hidden="true"
      />

      <p className="relative mx-auto max-w-4xl text-center font-display text-2xl font-light leading-snug tracking-tight text-ice-cream md:text-4xl md:leading-tight">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="mr-[0.28em] inline-block"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: 0.7,
              ease: LUXURY_EASE,
              delay: index * STAGGER_CHILDREN * 0.35,
            }}
          >
            {word}
          </motion.span>
        ))}
      </p>

      <footer className="relative mt-10 text-center">
        <cite className="not-italic font-display text-[10px] uppercase tracking-[0.35em] text-ice-beige/80">
          — El Chico de Hielo
        </cite>
      </footer>
    </blockquote>
  );
}
