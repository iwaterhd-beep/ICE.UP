import { AtelierIntro } from "./AtelierIntro";
import { AtelierProcess } from "./AtelierProcess";
import { AtelierQuote } from "./AtelierQuote";

export function Atelier() {
  return (
    <section
      id="atelier"
      className="border-t border-ice-gray-800 bg-ice-black px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-lg">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-ice-beige/70">
            Atelier
          </p>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-ice-cream md:text-5xl">
            El espacio del diseñador
          </h2>
        </header>

        <AtelierIntro />
        <AtelierProcess />
        <AtelierQuote />
      </div>
    </section>
  );
}
