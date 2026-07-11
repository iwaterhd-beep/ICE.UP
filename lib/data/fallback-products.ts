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
    id: "fallback-monolito",
    handle: "monolito-negro",
    title: "Monolito Negro",
    description:
      "Parka estructural inspirada en la fachada de la tienda. Logo bordado a mano. Forro de seda técnica.",
    thumbnail: "/archive/entry-6.jpg",
    images: ["/archive/entry-6.jpg", "/archive/entry-5.jpg"],
    collection: "Invierno",
    variants: [
      variant("fb-mono-s", "S", 89000, [{ label: "Talla", value: "S" }]),
      variant("fb-mono-m", "M", 89000, [{ label: "Talla", value: "M" }]),
      variant("fb-mono-l", "L", 89000, [{ label: "Talla", value: "L" }]),
    ],
  },
  {
    id: "fallback-capa",
    handle: "capa-niebla",
    title: "Capa de Niebla",
    description:
      "Abrigo estructural en negro profundo. Más de cuarenta horas de trabajo manual por unidad.",
    thumbnail: "/archive/entry-2.jpg",
    images: ["/archive/entry-2.jpg"],
    collection: "Gélido Origins",
    soldOut: true,
    variants: [
      variant("fb-capa-s", "S", 72000, [{ label: "Talla", value: "S" }]),
      variant("fb-capa-m", "M", 72000, [{ label: "Talla", value: "M" }]),
    ],
  },
  {
    id: "fallback-traje",
    handle: "traje-calma",
    title: "Traje de Calma",
    description:
      "Conjunto de dos piezas. Líneas rectas, hombros caídos. Costuras interiores reforzadas a mano.",
    thumbnail: "/archive/entry-4.jpg",
    images: ["/archive/entry-4.jpg", "/archive/entry-3.jpg"],
    collection: "Permafrost",
    variants: [
      variant("fb-traje-s", "S / Negro", 65000, [
        { label: "Talla", value: "S" },
        { label: "Color", value: "Negro" },
      ]),
      variant("fb-traje-m", "M / Negro", 65000, [
        { label: "Talla", value: "M" },
        { label: "Color", value: "Negro" },
      ]),
    ],
  },
  {
    id: "fallback-chaleco",
    handle: "chaleco-escarcha",
    title: "Chaleco Escarcha",
    description:
      "Chaleco acolchado artesanal. Relleno de plumón reciclado, cierre de corozo.",
    thumbnail: "/archive/entry-3.jpg",
    images: ["/archive/entry-3.jpg"],
    collection: "Permafrost",
    soldOut: true,
    variants: [
      variant("fb-ch-s", "S", 48000, [{ label: "Talla", value: "S" }]),
      variant("fb-ch-m", "M", 48000, [{ label: "Talla", value: "M" }]),
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
