"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { StorefrontProduct } from "@/lib/medusa/types";
import { ProductGrid } from "./ProductGrid";

interface CollectionTeaserProps {
  products: StorefrontProduct[];
}

export function CollectionTeaser({ products }: CollectionTeaserProps) {
  return (
    <section
      id="coleccion"
      className="border-t border-ice-gray-800 bg-ice-black px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-500">
              Drop activo
            </p>
            <h2 className="mt-3 font-condensed text-4xl font-black uppercase tracking-wide md:text-6xl">
              Colección
            </h2>
            <p className="mt-4 max-w-md font-condensed text-sm font-bold uppercase leading-relaxed tracking-wide text-ice-gray-400">
              Piezas limitadas. Hechas a mano. Sin stock masivo. Punto.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              href="/coleccion"
              className="inline-block bg-ice-white px-8 py-4 font-condensed text-xs font-black uppercase tracking-wide text-ice-black transition-opacity hover:opacity-85"
            >
              Ver todo
            </Link>
          </motion.div>
        </div>

        {products.length > 0 && (
          <motion.div
            className="mt-14 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <ProductGrid products={products} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
