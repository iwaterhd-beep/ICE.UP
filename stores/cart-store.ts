"use client";

import { create } from "zustand";
import {
  clearCartIdCookie,
  readCartIdCookie,
  writeCartIdCookie,
} from "@/lib/cookies/cart-id";
import {
  addLineItem,
  createCart,
  retrieveCart,
} from "@/lib/medusa/cart";

interface CartItem {
  id: string;
  title: string;
  variantTitle: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  thumbnail?: string;
}

interface CartStore {
  cartId: string | null;
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  isLoading: boolean;
  isFallback: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  hydrate: () => Promise<void>;
  addToCart: (variantId: string, meta: Omit<CartItem, "id" | "quantity">) => Promise<void>;
  clearError: () => void;
}

function mapCartItems(cart: Awaited<ReturnType<typeof retrieveCart>>): CartItem[] {
  return (
    cart.items?.map((item: {
      id: string;
      product_title?: string | null;
      title?: string | null;
      variant_title?: string | null;
      quantity: number;
      unit_price?: number;
      thumbnail?: string | null;
    }) => ({
      id: item.id,
      title: item.product_title ?? item.title ?? "Producto",
      variantTitle: item.variant_title ?? "",
      quantity: item.quantity,
      unitPrice: item.unit_price ?? 0,
      currency: cart.currency_code?.toUpperCase() ?? "EUR",
      thumbnail: item.thumbnail ?? undefined,
    })) ?? []
  );
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartId: null,
  items: [],
  itemCount: 0,
  isOpen: false,
  isLoading: false,
  isFallback: false,
  error: null,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  clearError: () => set({ error: null }),

  hydrate: async () => {
    const existingId = readCartIdCookie();
    if (!existingId) return;

    try {
      const cart = await retrieveCart(existingId);
      const items = mapCartItems(cart);
      set({
        cartId: cart.id,
        items,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        isFallback: false,
      });
    } catch {
      clearCartIdCookie();
    }
  },

  addToCart: async (variantId, meta) => {
    if (variantId.startsWith("fb-")) {
      set((state) => {
        const items = [
          ...state.items.filter((item) => item.id !== variantId),
          {
            id: variantId,
            title: meta.title,
            variantTitle: meta.variantTitle,
            quantity: 1,
            unitPrice: meta.unitPrice,
            currency: meta.currency,
            thumbnail: meta.thumbnail,
          },
        ];
        return {
          items,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
          isOpen: true,
          isFallback: true,
          error: null,
        };
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      let cartId = get().cartId ?? readCartIdCookie();

      if (!cartId) {
        const cart = await createCart();
        cartId = cart.id;
        if (!cartId) throw new Error("Cart ID missing");
        writeCartIdCookie(cartId);
      }

      const cart = await addLineItem(cartId, variantId, 1);
      const items = mapCartItems(cart);

      set({
        cartId: cart.id,
        items,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        isOpen: true,
        isLoading: false,
        isFallback: false,
      });
      writeCartIdCookie(cart.id);
    } catch {
      set({
        isLoading: false,
        error: "No se pudo conectar con la tienda. Configura Medusa o usa modo demo.",
      });
    }
  },
}));
