import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/medusa";
import { ProductDetail } from "@/components/shop/ProductDetail";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Producto — ICE UP!" };

  return {
    title: `${product.title} — ICE UP!`,
    description: product.description,
  };
}

export default async function ProductoPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  return (
    <main className="min-h-screen px-4 pb-24 pt-[7.5rem] md:px-6 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <ProductDetail product={product} />
      </div>
    </main>
  );
}
