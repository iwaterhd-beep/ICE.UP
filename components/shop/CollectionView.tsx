"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { StorefrontProduct } from "@/lib/medusa/types";
import { CollectionFilters } from "./CollectionMarquee";
import { ProductCard } from "./ProductCard";

interface CollectionViewProps {
  products: StorefrontProduct[];
}

export function CollectionView({ products }: CollectionViewProps) {
  const [filter, setFilter] = useState("Todas");

  const collections = useMemo(
    () =>
      [...new Set(products.map((p) => p.collection).filter(Boolean))] as string[],
    [products],
  );

  const filtered = useMemo(() => {
    if (filter === "Todas") return products;
    return products.filter((p) => p.collection === filter);
  }, [products, filter]);

  return (
    <>
      <header className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase tracking-wide md:text-5xl">
            {filter === "Todas" ? "All" : filter}
          </h1>
          <p className="mt-2 font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-500">
            {filtered.length} pieza{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CollectionFilters
          collections={collections}
          active={filter}
          onChange={setFilter}
        />
      </header>

      <motion.div
        layout
        className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 md:gap-y-12 lg:grid-cols-4"
      >
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-24 text-center font-condensed text-sm font-bold uppercase tracking-wide text-ice-gray-500">
          Nada aquí. Prueba otro filtro.
        </p>
      )}
    </>
  );
}
