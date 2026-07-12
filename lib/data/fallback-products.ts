import type { StorefrontProduct, StorefrontVariant } from "@/lib/medusa/types";

function variant(
  id: string,
  title: string,
  price: number,
  options: StorefrontVariant["options"],
): StorefrontVariant {
  return { id, title, sku: id, price, currency: "EUR", options };
}

const TEE_SIZES = ["S", "M", "L", "XL"] as const;

function teeVariants(prefix: string, price: number): StorefrontVariant[] {
  return TEE_SIZES.map((size) =>
    variant(`${prefix}-${size.toLowerCase()}`, size, price, [{ label: "Talla", value: size }]),
  );
}

export const FALLBACK_PRODUCTS: StorefrontProduct[] = [
  {
    id: "fallback-gorra-desert-camo",
    handle: "gorra-desert-camo",
    title: "Gorra Desert Camo",
    description:
      "Gorra 6-panel en camo desert chocolate chip. Parche bordado «ice up!» en rosa y amarillo. Cierre ajustable.",
    thumbnail: "/products/gorra-desert-camo-front.png",
    images: [
      "/products/gorra-desert-camo-front.png",
      "/products/gorra-desert-camo-side.png",
    ],
    collection: "Drop Activo",
    variants: [
      variant("fb-cap-one", "Única", 4200, [{ label: "Talla", value: "Única" }]),
    ],
  },
  {
    id: "fallback-star-tee-blanco",
    handle: "star-tee-blanco",
    title: "Star Tee Blanco",
    description:
      "Camiseta blanca con logo «ice up!» en rosa salmón y estrella central. Algodón premium. Hecha en L'Hospitalet.",
    thumbnail: "/products/star-tee-blanco-fold.png",
    images: [
      "/products/star-tee-blanco-fold.png",
      "/products/star-tee-blanco-lifestyle.png",
      "/products/core-tees-pack.png",
    ],
    collection: "Drop Activo",
    variants: teeVariants("fb-stb", 3900),
  },
  {
    id: "fallback-hoods-chateau",
    handle: "hoods-chateau-tee",
    title: "Hood's Château Tee",
    description:
      "Camiseta oversize con gráfico frontal y espalda. Algodón pesado. Edición limitada del drop Hood's Château.",
    thumbnail: "/products/hoods-chateau-front.jpg",
    images: [
      "/products/hoods-chateau-front.jpg",
      "/products/hoods-chateau-hoop.jpg",
      "/products/hoods-chateau-back.jpg",
      "/products/hoods-chateau-box.png",
    ],
    collection: "Invierno",
    variants: teeVariants("fb-hc", 4800),
  },
  {
    id: "fallback-logo-negro",
    handle: "logo-tee-negro",
    title: "Logo Tee Negro",
    description:
      "Camiseta negra con parche bordado ICE UP! en pecho. Corte relaxed. Algodón premium. Made in L'Hospitalet.",
    thumbnail: "/products/logo-tee-negro-fold.png",
    images: [
      "/products/logo-tee-negro-fold.png",
      "/products/core-tees-pack.png",
    ],
    collection: "Gélido Origins",
    variants: teeVariants("fb-ln", 3800),
  },
  {
    id: "fallback-logo-crema",
    handle: "logo-tee-crema",
    title: "Logo Tee Crema",
    description:
      "Camiseta crema con parche azul ICE UP! en pecho. Pieza esencial del drop. Algodón pesado.",
    thumbnail: "/products/logo-tee-crema-fold.png",
    images: [
      "/products/logo-tee-crema-fold.png",
      "/products/logo-tee-crema-lifestyle.png",
      "/products/core-tees-pack.png",
    ],
    collection: "Permafrost",
    variants: teeVariants("fb-lc", 3800),
  },
  {
    id: "fallback-logo-navy",
    handle: "logo-tee-navy",
    title: "Logo Tee Navy",
    description:
      "Camiseta navy con parche azul ICE UP! en pecho. Acabado premium sobre hormigón — literalmente.",
    thumbnail: "/products/logo-tee-navy-lifestyle.png",
    images: ["/products/logo-tee-navy-lifestyle.png"],
    collection: "Gélido Origins",
    variants: teeVariants("fb-lnv", 3800),
  },
  {
    id: "fallback-bolsa",
    handle: "bolsa-ice-up",
    title: "Caja Hood's Château",
    description:
      "Packaging exclusivo del drop Hood's Château. Cielo, nubes y ladrillo. Incluida con pedidos seleccionados.",
    thumbnail: "/products/hoods-chateau-box.png",
    images: [
      "/products/hoods-chateau-box.png",
      "/products/bolsa-melt.jpg",
      "/products/bolsa-dopamine.jpg",
    ],
    collection: "Invierno",
    soldOut: true,
    variants: [
      variant("fb-box-one", "Única", 0, [{ label: "Talla", value: "Única" }]),
    ],
  },
];

export function getFallbackProducts(): StorefrontProduct[] {
  return FALLBACK_PRODUCTS;
}

export function getFallbackProduct(handle: string): StorefrontProduct | null {
  return FALLBACK_PRODUCTS.find((product) => product.handle === handle) ?? null;
}

export function getFallbackCollections(): { id: string; title: string; handle: string }[] {
  const titles = [...new Set(FALLBACK_PRODUCTS.map((p) => p.collection).filter(Boolean))];
  return titles.map((title) => ({
    id: title!.toLowerCase().replace(/\s+/g, "-"),
    title: title!,
    handle: title!.toLowerCase().replace(/\s+/g, "-"),
  }));
}
