import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/medusa";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const products = await getProducts();

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/coleccion`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/checkout`, changeFrequency: "monthly", priority: 0.3 },
    ...products.map((product) => ({
      url: `${base}/producto/${product.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
