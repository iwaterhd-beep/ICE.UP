import type { StorefrontProduct, StorefrontVariant } from "@/lib/medusa/types";

function variant(
  id: string,
  title: string,
  price: number,
  options: StorefrontVariant["options"],
): StorefrontVariant {
  return { id, title, sku: id, price, currency: "EUR", options };
}

export const FALLBACK_PRODUCTS: StorefrontProduct[] = [
  {
    id: "fallback-hoods-chateau",
    handle: "hoods-chateau-tee",
    title: "Hood's Château Tee",
    description:
      "Camiseta oversize con gráfico frontal y espalda. Algodón pesado. Edición limitada.",
    thumbnail: "/products/hoods-chateau-front.jpg",
    images: [
      "/products/hoods-chateau-front.jpg",
      "/products/hoods-chateau-hoop.jpg",
      "/products/hoods-chateau-back.jpg",
    ],
    collection: "Invierno",
    variants: [
      variant("fb-hc-s", "S", 4800, [{ label: "Talla", value: "S" }]),
      variant("fb-hc-m", "M", 4800, [{ label: "Talla", value: "M" }]),
      variant("fb-hc-l", "L", 4800, [{ label: "Talla", value: "L" }]),
      variant("fb-hc-xl", "XL", 4800, [{ label: "Talla", value: "XL" }]),
    ],
  },
  {
    id: "fallback-logo-negro",
    handle: "logo-tee-negro",
    title: "Logo Tee Negro",
    description:
      "Camiseta negra con parche logo ICE UP! en pecho. Corte relaxed. Algodón premium.",
    thumbnail: "/products/logo-tee-negro.jpg",
    images: ["/products/logo-tee-negro.jpg"],
    collection: "Gélido Origins",
    variants: [
      variant("fb-ln-s", "S", 3800, [{ label: "Talla", value: "S" }]),
      variant("fb-ln-m", "M", 3800, [{ label: "Talla", value: "M" }]),
      variant("fb-ln-l", "L", 3800, [{ label: "Talla", value: "L" }]),
    ],
  },
  {
    id: "fallback-logo-crema",
    handle: "logo-tee-crema",
    title: "Logo Tee Crema",
    description:
      "Camiseta crema con parche logo ICE UP! en pecho. Pieza esencial del drop.",
    thumbnail: "/products/logo-tee-crema.jpg",
    images: ["/products/logo-tee-crema.jpg"],
    collection: "Permafrost",
    variants: [
      variant("fb-lc-s", "S", 3800, [{ label: "Talla", value: "S" }]),
      variant("fb-lc-m", "M", 3800, [{ label: "Talla", value: "M" }]),
      variant("fb-lc-l", "L", 3800, [{ label: "Talla", value: "L" }]),
    ],
  },
  {
    id: "fallback-bolsa",
    handle: "bolsa-ice-up",
    title: "Bolsa ICE UP!",
    description:
      "Packaging exclusivo del drop. Acabado holográfico. Incluida con pedidos seleccionados.",
    thumbnail: "/products/bolsa-melt.jpg",
    images: ["/products/bolsa-melt.jpg", "/products/bolsa-dopamine.jpg"],
    collection: "Invierno",
    soldOut: true,
    variants: [
      variant("fb-bolsa-one", "Única", 1200, [{ label: "Talla", value: "Única" }]),
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
