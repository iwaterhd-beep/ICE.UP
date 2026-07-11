"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { ArchiveEntry } from "@/lib/data/archive";
import { LUXURY_EASE } from "@/lib/constants/animation";

interface ArchiveModalProps {
  entry: ArchiveEntry | null;
  entries: ArchiveEntry[];
  onClose: () => void;
  onNavigate: (entry: ArchiveEntry) => void;
}

function ArchiveModalGallery({ entry }: { entry: ArchiveEntry }) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="md:contents">
      <motion.div
        layoutId={`archive-image-${entry.id}`}
        className="relative aspect-[4/5] bg-ice-gray-800 md:aspect-auto md:min-h-[480px]"
      >
        <Image
          src={entry.images[imageIndex] ?? entry.images[0]}
          alt={`${entry.title} — imagen ${imageIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>

      {entry.images.length > 1 && (
        <div className="mt-8 flex gap-2 px-8 md:mt-0 md:px-0">
          {entry.images.map((image, idx) => (
            <button
              key={image}
              type="button"
              onClick={() => setImageIndex(idx)}
              className={`relative h-16 w-12 overflow-hidden border ${
                idx === imageIndex
                  ? "border-ice-white"
                  : "border-ice-gray-600 opacity-60"
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
            >
              <Image src={image} alt="" fill sizes="48px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ArchiveModal({
  entry,
  entries,
  onClose,
  onNavigate,
}: ArchiveModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const currentIndex = entry
    ? entries.findIndex((item) => item.id === entry.id)
    : -1;

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(entries[currentIndex - 1]);
  }, [currentIndex, entries, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < entries.length - 1) {
      onNavigate(entries[currentIndex + 1]);
    }
  }, [currentIndex, entries, onNavigate]);

  useEffect(() => {
    if (!entry) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [entry, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: LUXURY_EASE }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`archive-modal-title-${entry.id}`}
            className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto bg-ice-black outline-none md:max-h-[90vh]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 font-display text-[10px] uppercase tracking-[0.3em] text-ice-gray-300 transition-colors hover:text-ice-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-white"
              aria-label="Cerrar expediente"
            >
              Cerrar
            </button>

            <div className="grid md:grid-cols-2">
              <ArchiveModalGallery key={entry.id} entry={entry} />

              <div className="flex flex-col justify-between p-8 md:p-12">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.35em] text-ice-gray-300">
                    Expediente {entry.id} — {entry.year}
                  </p>
                  <h2
                    id={`archive-modal-title-${entry.id}`}
                    className="mt-4 font-display text-2xl font-light tracking-tight md:text-3xl"
                  >
                    {entry.title}
                  </h2>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ice-gray-400">
                    {entry.collectionName}
                  </p>
                  <p className="mt-8 text-sm leading-relaxed text-ice-gray-200">
                    {entry.extendedDescription}
                  </p>

                  {entry.tags && entry.tags.length > 0 && (
                    <ul className="mt-8 flex flex-wrap gap-2" aria-label="Etiquetas">
                      {entry.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-ice-gray-600 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ice-gray-300"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-ice-gray-700 pt-6">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={currentIndex <= 0}
                    className="font-display text-[10px] uppercase tracking-[0.25em] text-ice-gray-300 transition-colors enabled:hover:text-ice-white disabled:opacity-30"
                  >
                    ← Anterior
                  </button>
                  <span className="text-[10px] text-ice-gray-500">
                    {currentIndex + 1} / {entries.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={currentIndex >= entries.length - 1}
                    className="font-display text-[10px] uppercase tracking-[0.25em] text-ice-gray-300 transition-colors enabled:hover:text-ice-white disabled:opacity-30"
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
