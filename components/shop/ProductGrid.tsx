"use client";

import type { StorefrontProduct } from "@/lib/medusa/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: StorefrontProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 md:gap-y-12 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
