"use client";

import { useMemo, useState } from "react";
import type { ArchiveEntry } from "@/lib/data/archive";
import {
  getArchiveCollections,
  getArchiveEntries,
  getArchiveYears,
} from "@/lib/data/archive";
import { ArchiveEntryCard } from "./ArchiveEntryCard";
import { ArchiveModal } from "./ArchiveModal";
import { ArchiveTimeline } from "./ArchiveTimeline";

type FilterValue = "all" | `year:${number}` | `collection:${string}`;

export function Archive() {
  const allEntries = useMemo(() => getArchiveEntries(), []);
  const years = useMemo(() => getArchiveYears(), []);
  const collections = useMemo(() => getArchiveCollections(), []);

  const [filter, setFilter] = useState<FilterValue>("all");
  const [selectedEntry, setSelectedEntry] = useState<ArchiveEntry | null>(null);

  const filteredEntries = useMemo(() => {
    if (filter === "all") return allEntries;
    if (filter.startsWith("year:")) {
      const year = Number(filter.replace("year:", ""));
      return allEntries.filter((entry) => entry.year === year);
    }
    const collection = filter.replace("collection:", "");
    return allEntries.filter((entry) => entry.collectionName === collection);
  }, [allEntries, filter]);

  const pills: { label: string; value: FilterValue }[] = [
    { label: "Todo", value: "all" },
    ...years.map((year) => ({ label: String(year), value: `year:${year}` as FilterValue })),
    ...collections.map((name) => ({
      label: name,
      value: `collection:${name}` as FilterValue,
    })),
  ];

  return (
    <section id="archivo" className="relative bg-ice-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-xl">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-ice-gray-400">
            Museo
          </p>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight md:text-5xl">
            Archivo
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ice-gray-300">
            Un recorrido cronológico por las colecciones y piezas que definen la
            historia de ICE UP! — archivo digital, no catálogo.
          </p>
        </header>

        <div className="sticky top-0 z-40 -mx-6 mb-16 border-b border-ice-gray-800 bg-ice-black/95 px-6 py-4 backdrop-blur-md">
          <div
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
            role="tablist"
            aria-label="Filtrar archivo"
          >
            {pills.map((pill) => {
              const isActive = filter === pill.value;
              return (
                <button
                  key={pill.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(pill.value)}
                  className={`shrink-0 border px-4 py-2 font-display text-[10px] uppercase tracking-[0.25em] transition-colors duration-500 ${
                    isActive
                      ? "border-ice-white bg-ice-white text-ice-black"
                      : "border-ice-gray-600 text-ice-gray-300 hover:border-ice-gray-400 hover:text-ice-white"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <ArchiveTimeline entryCount={filteredEntries.length} />

          <div className="relative flex flex-col gap-24 md:gap-32">
            {filteredEntries.map((entry, index) => (
              <ArchiveEntryCard
                key={entry.id}
                entry={entry}
                index={index}
                priority={index < 3}
                onSelect={setSelectedEntry}
              />
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <p className="py-24 text-center text-sm text-ice-gray-400">
              No hay entradas para este filtro.
            </p>
          )}
        </div>
      </div>

      <ArchiveModal
        entry={selectedEntry}
        entries={filteredEntries}
        onClose={() => setSelectedEntry(null)}
        onNavigate={setSelectedEntry}
      />
    </section>
  );
}
