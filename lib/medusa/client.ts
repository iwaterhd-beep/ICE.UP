import Medusa from "@medusajs/js-sdk";

const medusaUrl =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000";

const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? "";

export const medusa = new Medusa({
  baseUrl: medusaUrl,
  publishableKey,
});
