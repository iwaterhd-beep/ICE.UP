"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { readCartIdCookie } from "@/lib/cookies/cart-id";
import { completeCart, retrieveCart, updateCart } from "@/lib/medusa/cart";

export function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const isFallback = useCartStore((state) => state.isFallback);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    if (isFallback || items.length === 0) {
      setStatus("success");
      setMessage(
        "Pedido demo registrado. Conecta Medusa + Stripe para procesar pagos reales.",
      );
      return;
    }

    const cartId = readCartIdCookie();
    if (!cartId) {
      setStatus("error");
      setMessage("No hay carrito activo.");
      return;
    }

    const form = new FormData(event.currentTarget);

    try {
      await updateCart(cartId, {
        shipping_address: {
          first_name: form.get("firstName"),
          last_name: form.get("lastName"),
          address_1: form.get("address"),
          city: form.get("city"),
          postal_code: form.get("postalCode"),
          country_code: "es",
          phone: form.get("phone"),
        },
        email: form.get("email"),
      });

      await retrieveCart(cartId);
      await completeCart(cartId);

      setStatus("success");
      setMessage("Pedido completado. Revisa tu email de confirmación.");
    } catch {
      setStatus("error");
      setMessage(
        "Error al procesar el pago. Verifica Medusa, región de envío y Stripe.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="border border-ice-gray-700 px-8 py-12 text-center">
        <p className="font-display text-xl font-light">{message}</p>
        <Link
          href="/coleccion"
          className="mt-8 inline-block border border-ice-white px-8 py-3 font-display text-[10px] uppercase tracking-[0.3em]"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Nombre" name="firstName" required />
        <Field label="Apellidos" name="lastName" required />
      </div>
      <Field label="Email" name="email" type="email" required />
      <Field label="Dirección" name="address" required />
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Ciudad" name="city" required />
        <Field label="Código postal" name="postalCode" required />
      </div>
      <Field label="Teléfono" name="phone" type="tel" />

      {message && status === "error" && (
        <p className="text-xs text-red-300">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || items.length === 0}
        className="w-full border border-ice-white py-4 font-display text-[10px] uppercase tracking-[0.3em] transition-colors hover:bg-ice-white hover:text-ice-black disabled:opacity-40"
      >
        {status === "loading" ? "Procesando…" : "Pagar con Stripe"}
      </button>

      <p className="text-[10px] leading-relaxed text-ice-gray-500">
        Pagos gestionados por Stripe vía Medusa. Configura{" "}
        <code className="text-ice-gray-400">pp_stripe_stripe</code> en el backend.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-display text-[10px] uppercase tracking-[0.25em] text-ice-gray-400">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border border-ice-gray-700 bg-transparent px-4 py-3 text-sm text-ice-white focus:border-ice-white focus:outline-none"
      />
    </label>
  );
}
