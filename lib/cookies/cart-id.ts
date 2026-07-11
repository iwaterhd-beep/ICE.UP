export const CART_ID_COOKIE = "iceup_cart_id";

export function readCartIdCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CART_ID_COOKIE}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function writeCartIdCookie(cartId: string): void {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * 30;
  document.cookie = `${CART_ID_COOKIE}=${encodeURIComponent(cartId)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function clearCartIdCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CART_ID_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
