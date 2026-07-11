import { Archive } from "@/components/archive";
import { Atelier } from "@/components/atelier";
import { Hero } from "@/components/hero";
import { CollectionTeaser } from "@/components/shop";

export default function Home() {
  return (
    <main>
      <Hero />
      <Archive />
      <Atelier />
      <CollectionTeaser />
    </main>
  );
}
