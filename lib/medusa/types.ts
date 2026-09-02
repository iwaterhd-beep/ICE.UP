import { resolveSizeGuideId } from "@/lib/constants/size-guides";

export interface StorefrontVariant {
  id: string;
  title: string;
  sku?: string;
  price: number;
  currency: string;
  options: { label: string; value: string }[];
}

export interface StorefrontProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  variants: StorefrontVariant[];
  collection?: string;
  soldOut?: boolean;
  /** Id de guía de tallas de ESTE producto. Sin fallback de tienda. */
  sizeGuideId?: string;
}

interface MedusaCalculatedPrice {
  calculated_amount?: number;
  currency_code?: string;
}

interface MedusaVariant {
  id: string;
  title?: string | null;
  sku?: string | null;
  calculated_price?: MedusaCalculatedPrice;
  prices?: { amount?: number; currency_code?: string }[];
  options?: {
    value?: string;
    option?: { title?: string };
  }[];
}

export interface MedusaProductLike {
  id: string;
  handle?: string | null;
  title?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  images?: { url?: string }[];
  variants?: MedusaVariant[];
  collection?: { title?: string | null };
  metadata?: Record<string, unknown> | null;
}

export function formatPrice(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

export function mapMedusaProduct(product: MedusaProductLike): StorefrontProduct {
  const images =
    product.images?.map((image) => image.url).filter(Boolean) ??
    (product.thumbnail ? [product.thumbnail] : []);

  const variants: StorefrontVariant[] =
    product.variants?.map((variant) => {
      const calculated = variant.calculated_price;
      const price = calculated?.calculated_amount ?? variant.prices?.[0]?.amount ?? 0;
      const currency =
        calculated?.currency_code ?? variant.prices?.[0]?.currency_code ?? "EUR";

      return {
        id: variant.id,
        title: variant.title ?? product.title ?? "Variante",
        sku: variant.sku ?? undefined,
        price: Number(price),
        currency: currency.toUpperCase(),
        options:
          variant.options?.map((option) => ({
            label: option.option?.title ?? "Opción",
            value: option.value ?? "",
          })) ?? [],
      };
    }) ?? [];

  return {
    id: product.id,
    handle: product.handle ?? product.id,
    title: product.title ?? "Sin título",
    description: product.description ?? "",
    thumbnail: product.thumbnail ?? images[0] ?? "/archive/entry-5.jpg",
    images: images.length > 0 ? (images as string[]) : ["/archive/entry-5.jpg"],
    variants,
    collection: product.collection?.title ?? undefined,
    sizeGuideId: resolveSizeGuideId({
      handle: product.handle,
      metadata: product.metadata,
    }),
  };
}
