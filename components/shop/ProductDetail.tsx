"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { StorefrontProduct, StorefrontVariant } from "@/lib/medusa/types";
import { formatPrice } from "@/lib/medusa/types";
import { getPalaceCopy } from "@/lib/constants/palace-copy";
import { AddToCartButton, BuyNowButton } from "./AddToCartButton";
import { SizeGuideButton } from "./SizeGuide";

interface ProductDetailProps {
  product: StorefrontProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<StorefrontVariant>(
    product.variants[0],
  );
  const [activeImage, setActiveImage] = useState(0);
  const copyLines = getPalaceCopy(product.handle);
  const soldOut = product.soldOut;

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-ice-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.images[activeImage] ?? product.thumbnail}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeImage] ?? product.thumbnail}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover ${soldOut ? "opacity-60" : ""}`}
              />
            </motion.div>
          </AnimatePresence>
          {soldOut && (
            <span className="absolute inset-0 flex items-center justify-center bg-ice-black/20">
              <span className="font-condensed text-xl font-black uppercase tracking-wide">
                Sold Out
              </span>
            </span>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`relative h-14 w-12 overflow-hidden border-2 transition-colors ${
                  index === activeImage ? "border-ice-white" : "border-ice-gray-700"
                }`}
                aria-label={`Imagen ${index + 1}`}
              >
                <Image src={image} alt="" fill sizes="48px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="flex flex-col justify-center"
      >
        <Link
          href="/coleccion"
          className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-500 transition-colors hover:text-ice-white"
        >
          ← All
        </Link>

        {product.collection && (
          <p className="mt-6 font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-500">
            {product.collection}
          </p>
        )}
        <h1 className="mt-2 font-condensed text-2xl font-black uppercase leading-tight tracking-wide md:text-3xl lg:text-4xl">
          {product.title}
        </h1>
        <p className="mt-4 font-condensed text-lg font-bold uppercase tracking-wide text-ice-white">
          {soldOut ? "Sold Out" : formatPrice(selectedVariant.price, selectedVariant.currency)}
        </p>

        {copyLines.length > 0 ? (
          <ul className="palace-copy mt-8 space-y-2 text-ice-gray-300">
            {copyLines.map((line) => (
              <li key={line} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-sm leading-relaxed text-ice-gray-300">
            {product.description}
          </p>
        )}

        {!soldOut && product.variants.length > 1 && (
          <div className="mt-8">
            <p className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-500">
              Talla
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`border-2 px-4 py-2 font-condensed text-xs font-bold uppercase tracking-wide transition-colors ${
                    selectedVariant.id === variant.id
                      ? "border-ice-white bg-ice-white text-ice-black"
                      : "border-ice-gray-600 text-ice-gray-300 hover:border-ice-gray-400"
                  }`}
                >
                  {variant.title}
                </button>
              ))}
            </div>
            <SizeGuideButton sizeGuideId={product.sizeGuideId} />
          </div>
        )}

        {!soldOut && product.variants.length <= 1 && (
          <div className="mt-8">
            <SizeGuideButton sizeGuideId={product.sizeGuideId} />
          </div>
        )}

        {!soldOut && (
          <div className="mt-8 space-y-2">
            <AddToCartButton product={product} selectedVariant={selectedVariant} />
            <BuyNowButton product={product} selectedVariant={selectedVariant} />
          </div>
        )}
      </motion.div>
    </div>
  );
}
