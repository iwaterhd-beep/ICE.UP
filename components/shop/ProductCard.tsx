"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { StorefrontProduct } from "@/lib/medusa/types";
import { formatPrice } from "@/lib/medusa/types";

interface ProductCardProps {
  product: StorefrontProduct;
  index: number;
  className?: string;
}

export function ProductCard({ product, index, className = "" }: ProductCardProps) {
  const price = product.variants[0]?.price ?? 0;
  const currency = product.variants[0]?.currency ?? "EUR";
  const soldOut = product.soldOut;

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
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            priority={index < 4}
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-300 ${
              soldOut ? "opacity-50" : "group-hover:opacity-90"
            }`}
          />
          {soldOut && (
            <span className="absolute inset-0 flex items-center justify-center bg-ice-black/30">
              <span className="font-condensed text-sm font-black uppercase tracking-wide text-ice-white">
                Sold Out
              </span>
            </span>
          )}
        </div>

        <h3 className="mt-3 font-condensed text-sm font-bold uppercase leading-snug tracking-wide text-ice-white md:text-[15px]">
          {product.title}
        </h3>
        <p
          className={`mt-1 font-condensed text-sm font-bold uppercase tracking-wide ${
            soldOut ? "text-ice-gray-500" : "text-ice-white"
          }`}
        >
          {soldOut ? "Sold Out" : formatPrice(price, currency)}
        </p>
      </Link>
    </motion.article>
  );
}
