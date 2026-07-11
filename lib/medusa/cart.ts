import { medusa } from "./client";
import { getDefaultRegionId } from "./products";

export async function createCart() {
  const regionId = await getDefaultRegionId();
  const { cart } = await medusa.store.cart.create(
    regionId ? { region_id: regionId } : {},
  );
  return cart;
}

export async function retrieveCart(cartId: string) {
  const { cart } = await medusa.store.cart.retrieve(cartId, {
    fields: "*items,*items.variant,*items.product",
  });
  return cart;
}

export async function addLineItem(
  cartId: string,
  variantId: string,
  quantity = 1,
) {
  const { cart } = await medusa.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity,
  });
  return cart;
}

export async function updateCart(cartId: string, data: Record<string, unknown>) {
  const { cart } = await medusa.store.cart.update(cartId, data);
  return cart;
}

export async function completeCart(cartId: string) {
  return medusa.store.cart.complete(cartId);
}

export async function initializePayment(cart: Awaited<ReturnType<typeof retrieveCart>>) {
  const { payment_collection } =
    await medusa.store.payment.initiatePaymentSession(cart, {
      provider_id: "pp_stripe_stripe",
    });
  return payment_collection;
}
