import { Hero } from "@/components/hero";
import { HomeSections } from "@/components/home/HomeSections";
import { getProducts } from "@/lib/medusa";

const RECENT_PRODUCTS_LIMIT = 6;

export default async function Home() {
  const products = await getProducts();
  const recentProducts = products.slice(0, RECENT_PRODUCTS_LIMIT);

  return (
    <main>
      <Hero />
      <HomeSections recentProducts={recentProducts} />
    </main>
  );
}
