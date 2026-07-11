"use client";

import { motion } from "framer-motion";

export function CollectionFilters({
  collections,
  active,
  onChange,
}: {
  collections: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  const pills = ["Todas", ...collections];

  return (
    <div
      className="flex flex-wrap justify-start gap-x-4 gap-y-2 md:justify-end"
      role="tablist"
      aria-label="Filtrar por colección"
    >
      {pills.map((pill) => {
        const isActive = active === pill;
        return (
          <button
            key={pill}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(pill)}
            className={`font-condensed text-xs font-bold uppercase tracking-wide transition-colors ${
              isActive
                ? "text-ice-white underline decoration-2 underline-offset-4"
                : "text-ice-gray-500 hover:text-ice-gray-300"
            }`}
          >
            {pill === "Todas" ? "All" : pill}
          </button>
        );
      })}
    </div>
  );
}

/** @deprecated Usar SiteTicker global en Header */
export function CollectionMarquee() {
  return null;
}
