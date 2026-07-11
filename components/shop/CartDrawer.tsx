"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/medusa/types";
import { LUXURY_EASE } from "@/lib/constants/animation";

export function CartDrawer() {
  const {
    isOpen,
    items,
    itemCount,
    isLoading,
    isFallback,
    error,
    closeCart,
    hydrate,
    clearError,
  } = useCartStore();

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-label="Cerrar carrito"
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-ice-black shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compra"
          >
            <div className="flex items-center justify-between border-b border-ice-gray-800 px-6 py-5">
              <h2 className="font-display text-sm uppercase tracking-[0.3em]">
                Carrito ({itemCount})
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="font-display text-[10px] uppercase tracking-[0.25em] text-ice-gray-400 hover:text-ice-white"
              >
                Cerrar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {error && (
                <p className="mb-4 border border-red-900/50 bg-red-950/30 px-4 py-3 text-xs text-red-200">
                  {error}
                  <button type="button" onClick={clearError} className="ml-2 underline">
                    OK
                  </button>
                </p>
              )}

              {isFallback && (
                <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-ice-beige/70">
                  Modo demo — conecta Medusa para pedidos reales
                </p>
              )}

              {items.length === 0 ? (
                <p className="text-sm text-ice-gray-400">Tu carrito está vacío.</p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      {item.thumbnail && (
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-ice-gray-800">
                          <Image
                            src={item.thumbnail}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-display text-sm">{item.title}</p>
                        <p className="text-xs text-ice-gray-400">{item.variantTitle}</p>
                        <p className="mt-2 text-xs text-ice-gray-200">
                          {formatPrice(item.unitPrice, item.currency)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-ice-gray-800 px-6 py-6">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full border border-ice-white py-4 text-center font-display text-[10px] uppercase tracking-[0.3em] transition-colors hover:bg-ice-white hover:text-ice-black"
              >
                {isLoading ? "Actualizando…" : "Finalizar pedido"}
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
