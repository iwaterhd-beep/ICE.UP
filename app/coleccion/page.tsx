import type { Metadata } from "next";
import { getProducts } from "@/lib/medusa";
import { CollectionView } from "@/components/shop/CollectionView";

export const metadata: Metadata = {
  title: "Colección — ICE UP!",
  description: "Piezas disponibles de ICE UP!. Ediciones limitadas artesanales.",
};

export default async function ColeccionPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen px-4 pb-24 pt-[7.5rem] md:px-6 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <CollectionView products={products} />
      </div>
    </main>
  );
}
