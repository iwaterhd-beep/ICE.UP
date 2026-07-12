"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { StorefrontProduct } from "@/lib/medusa/types";
import { formatPrice } from "@/lib/medusa/types";
import { LUXURY_EASE } from "@/lib/constants/animation";

interface ProductCardProps {
  product: StorefrontProduct;
  index: number;
  className?: string;
}

export function ProductCard({ product, index, className = "" }: ProductCardProps) {
  const reduceMotion = useReducedMotion();
  const price = product.variants[0]?.price ?? 0;
  const currency = product.variants[0]?.currency ?? "EUR";
  const soldOut = product.soldOut;
  const hoverImage =
    product.images.find((image) => image !== product.thumbnail) ?? null;
  const canAnimate = !soldOut && !reduceMotion;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={className}
    >
      <Link
        href={`/producto/${product.handle}`}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-white"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-ice-gray-900">
          <motion.div
            className="relative h-full w-full"
            initial={false}
            whileHover={canAnimate ? { scale: 1.07 } : undefined}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-opacity duration-500 ${
                soldOut
                  ? "opacity-50"
                  : hoverImage
                    ? "opacity-100 group-hover:opacity-0"
                    : "opacity-100 group-hover:opacity-95"
              }`}
            />

            {hoverImage && !soldOut && (
              <Image
                src={hoverImage}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </motion.div>

          {!soldOut && (
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
          )}

          {!soldOut && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-end justify-between px-4 py-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
              <span className="font-condensed text-[10px] font-black uppercase tracking-[0.2em] text-ice-white">
                Ver pieza
              </span>
              <span className="font-condensed text-lg font-black leading-none text-ice-white">
                →
              </span>
            </span>
          )}

          {soldOut && (
            <span className="absolute inset-0 flex items-center justify-center bg-ice-black/30">
              <span className="font-condensed text-sm font-black uppercase tracking-wide text-ice-white">
                Sold Out
              </span>
            </span>
          )}
        </div>

        <div className="mt-3 overflow-hidden">
          <h3 className="font-condensed text-sm font-bold uppercase leading-snug tracking-wide text-ice-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 md:text-[15px]">
            {product.title}
          </h3>
          <p
            className={`mt-1 font-condensed text-sm font-bold uppercase tracking-wide transition-colors duration-300 ${
              soldOut
                ? "text-ice-gray-500"
                : "text-ice-gray-400 group-hover:text-ice-white"
            }`}
          >
            {soldOut ? "Sold Out" : formatPrice(price, currency)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
