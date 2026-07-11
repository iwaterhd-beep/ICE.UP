"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CollectionTeaser() {
  return (
    <section className="border-t border-ice-gray-800 bg-ice-black px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
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
    </section>
  );
}
