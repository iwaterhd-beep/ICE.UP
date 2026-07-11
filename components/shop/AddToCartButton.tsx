"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { StorefrontProduct, StorefrontVariant } from "@/lib/medusa/types";
import { useCartStore } from "@/stores/cart-store";

interface AddToCartButtonProps {
  product: StorefrontProduct;
  selectedVariant: StorefrontVariant;
}

export function AddToCartButton({ product, selectedVariant }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const isLoading = useCartStore((state) => state.isLoading);
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    await addToCart(selectedVariant.id, {
      title: product.title,
      variantTitle: selectedVariant.title,
      unitPrice: selectedVariant.price,
      currency: selectedVariant.currency,
      thumbnail: product.thumbnail,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={isLoading}
      aria-label={`Añadir ${product.title} al carrito`}
      className="w-full bg-ice-white py-4 font-condensed text-xs font-black uppercase tracking-wide text-ice-black transition-opacity hover:opacity-85 disabled:opacity-50"
    >
      {isLoading ? "Añadiendo…" : added ? "Añadido" : "Añadir al carrito"}
    </button>
  );
}

export function BuyNowButton({ product, selectedVariant }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const handleClick = async () => {
    await addToCart(selectedVariant.id, {
      title: product.title,
      variantTitle: selectedVariant.title,
      unitPrice: selectedVariant.price,
      currency: selectedVariant.currency,
      thumbnail: product.thumbnail,
    });
    router.push("/checkout");
  };

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      className="w-full py-4 font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-400 transition-colors hover:text-ice-white"
    >
      Comprar ahora
    </button>
  );
}
