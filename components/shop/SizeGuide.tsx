"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/constants/animation";
import { getSizeGuide, type SizeGuide } from "@/lib/constants/size-guides";

interface SizeGuideButtonProps {
  sizeGuideId?: string;
}

export function SizeGuideButton({ sizeGuideId }: SizeGuideButtonProps) {
  const guide = getSizeGuide(sizeGuideId);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!guide) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 font-condensed text-[11px] font-bold uppercase tracking-wide text-ice-gray-400 underline decoration-ice-gray-600 underline-offset-4 transition-colors hover:text-ice-white"
      >
        Guía de tallas
      </button>

      <AnimatePresence>
        {open && (
          <SizeGuideModal
            guide={guide}
            titleId={titleId}
            closeRef={closeRef}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SizeGuideModal({
  guide,
  titleId,
  closeRef,
  onClose,
}: {
  guide: SizeGuide;
  titleId: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: LUXURY_EASE }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Cerrar guía de tallas"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: LUXURY_EASE }}
        className="relative z-10 w-full max-w-xl border border-ice-gray-700 bg-ice-black p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id={titleId}
              className="font-condensed text-lg font-black uppercase tracking-wide"
            >
              {guide.title}
            </h2>
            <p className="mt-1 font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-400">
              {guide.subtitle}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-400 hover:text-ice-white"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[280px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ice-gray-700">
                {guide.columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-2 py-2 font-condensed text-[11px] font-bold uppercase tracking-wide text-ice-gray-400"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.rows.map((row) => (
                <tr key={row.size} className="border-b border-ice-gray-800">
                  {guide.columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-2 py-2.5 font-condensed text-sm font-bold uppercase tracking-wide"
                    >
                      {row[column.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {guide.footnote && (
          <p className="mt-4 font-condensed text-[11px] font-bold uppercase tracking-wide text-ice-gray-500">
            {guide.footnote}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
