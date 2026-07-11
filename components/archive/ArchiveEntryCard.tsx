"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ArchiveEntry } from "@/lib/data/archive";
import { LUXURY_EASE } from "@/lib/constants/animation";

interface ArchiveEntryCardProps {
  entry: ArchiveEntry;
  index: number;
  priority?: boolean;
  onSelect: (entry: ArchiveEntry) => void;
}

export function ArchiveEntryCard({
  entry,
  index,
  priority = false,
  onSelect,
}: ArchiveEntryCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      className={`relative flex w-full flex-col gap-8 md:w-[calc(50%-3rem)] ${
        isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
      }`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: LUXURY_EASE, delay: index * 0.05 }}
    >
      <button
        type="button"
        onClick={() => onSelect(entry)}
        className="group cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ice-white"
        aria-label={`Ver expediente: ${entry.title}, ${entry.year}`}
      >
        <motion.div layoutId={`archive-image-${entry.id}`} className="relative aspect-[4/5] overflow-hidden bg-ice-gray-800">
          <Image
            src={entry.images[0]}
            alt={`${entry.title} — ${entry.collectionName}, ${entry.year}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover grayscale transition-all duration-700 ease-luxury group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        </motion.div>

        <div className="mt-6 space-y-2">
          <p className="font-display text-[10px] uppercase tracking-[0.35em] text-ice-gray-300">
            {entry.year} — {entry.collectionName}
          </p>
          <h3 className="font-display text-xl font-light tracking-tight md:text-2xl">
            {entry.title}
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-ice-gray-300">
            {entry.description}
          </p>
        </div>
      </button>
    </motion.article>
  );
}
