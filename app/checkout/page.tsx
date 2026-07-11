import type { Metadata } from "next";
import { CheckoutForm } from "@/components/shop/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — ICE UP!",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-xl">
        <header className="mb-12">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-ice-gray-400">
            Checkout
          </p>
          <h1 className="mt-4 font-display text-3xl font-light tracking-tight">
            Finalizar pedido
          </h1>
        </header>
        <CheckoutForm />
      </div>
    </main>
  );
}
