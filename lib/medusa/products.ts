import { medusa } from "./client";
import {
  getFallbackCollections,
  getFallbackProduct,
  getFallbackProducts,
} from "@/lib/data/fallback-products";
import { mapMedusaProduct, type StorefrontProduct } from "./types";

const PRODUCT_FIELDS =
  "id,handle,title,description,thumbnail,*images,*variants,*variants.options,*variants.calculated_price,*collection,metadata";

export async function getProducts(): Promise<StorefrontProduct[]> {
  try {
    const { products } = await medusa.store.product.list({
      limit: 50,
      fields: PRODUCT_FIELDS,
    });

    if (products?.length) {
      return products.map(mapMedusaProduct);
    }
  } catch {
    /* Medusa no disponible — usar catálogo local */
  }

  return getFallbackProducts();
}

export async function getProduct(
  handle: string,
): Promise<StorefrontProduct | null> {
  try {
    const { products } = await medusa.store.product.list({
      handle,
      limit: 1,
      fields: PRODUCT_FIELDS,
    });

    if (products?.[0]) {
      return mapMedusaProduct(products[0]);
    }
  } catch {
    /* fallback abajo */
  }

  return getFallbackProduct(handle);
}

export async function getCollections(): Promise<
  { id: string; title: string; handle: string }[]
> {
  try {
    const { collections } = await medusa.store.collection.list({ limit: 20 });

    if (collections?.length) {
      return collections.map((collection: { id: string; title?: string | null; handle?: string | null }) => ({
        id: collection.id,
        title: collection.title ?? "Colección",
        handle: collection.handle ?? collection.id,
      }));
    }
  } catch {
    /* fallback abajo */
  }

  return getFallbackCollections();
}

export async function getDefaultRegionId(): Promise<string | null> {
  try {
    const { regions } = await medusa.store.region.list();
    return regions?.[0]?.id ?? null;
  } catch {
    return null;
  }
}
