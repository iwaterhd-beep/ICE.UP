export type SizeGuideRow = {
  size: string;
  chest?: string;
  length?: string;
  sleeve?: string;
  waist?: string;
  notes?: string;
};

export type SizeGuide = {
  id: string;
  title: string;
  subtitle: string;
  columns: { key: keyof SizeGuideRow; label: string }[];
  rows: SizeGuideRow[];
  footnote?: string;
};

/**
 * Guías reutilizables por tipo de prenda.
 * Un producto solo muestra una guía si se le asigna explícitamente
 * (`metadata.size_guide` / `sizeGuideId`). Nunca hay un default de tienda.
 */
export const SIZE_GUIDES: Record<string, SizeGuide> = {
  tee: {
    id: "tee",
    title: "Guía de tallas — camisetas",
    subtitle: "Medidas en cm, prenda tumbada. Fit relaxed.",
    columns: [
      { key: "size", label: "Talla" },
      { key: "chest", label: "Pecho" },
      { key: "length", label: "Largo" },
      { key: "sleeve", label: "Manga" },
    ],
    rows: [
      { size: "S", chest: "54", length: "70", sleeve: "21" },
      { size: "M", chest: "57", length: "72", sleeve: "22" },
      { size: "L", chest: "60", length: "74", sleeve: "23" },
      { size: "XL", chest: "64", length: "76", sleeve: "24" },
    ],
    footnote: "Tolerancia ±1,5 cm. Hecha en L'Hospitalet.",
  },
  oversized_tee: {
    id: "oversized_tee",
    title: "Guía de tallas — tee oversize",
    subtitle: "Corte oversize de verdad. Medidas en cm.",
    columns: [
      { key: "size", label: "Talla" },
      { key: "chest", label: "Pecho" },
      { key: "length", label: "Largo" },
      { key: "sleeve", label: "Manga" },
    ],
    rows: [
      { size: "S", chest: "58", length: "72", sleeve: "22" },
      { size: "M", chest: "62", length: "74", sleeve: "23" },
      { size: "L", chest: "66", length: "76", sleeve: "24" },
      { size: "XL", chest: "70", length: "78", sleeve: "25" },
    ],
    footnote: "Si dudas entre dos, baja una talla.",
  },
  cap: {
    id: "cap",
    title: "Guía de tallas — gorras",
    subtitle: "Talla única ajustable.",
    columns: [
      { key: "size", label: "Talla" },
      { key: "notes", label: "Contorno" },
    ],
    rows: [{ size: "Única", notes: "54–60 cm · cierre ajustable" }],
  },
};

/** Asignación explícita por handle. Productos no listados no muestran guía. */
export const SIZE_GUIDE_BY_HANDLE: Record<string, string> = {
  "gorra-desert-camo": "cap",
  "star-tee-blanco": "tee",
  "hoods-chateau-tee": "oversized_tee",
  "logo-tee-negro": "tee",
  "logo-tee-crema": "tee",
  "logo-tee-navy": "tee",
  "t-shirt": "tee",
  sweatshirt: "tee",
  sweatpants: "tee",
  shorts: "tee",
};

const GUIDE_META_KEYS = ["size_guide", "size_chart", "sizeGuide"] as const;

export function resolveSizeGuideId(input: {
  handle?: string | null;
  metadata?: Record<string, unknown> | null;
  sizeGuideId?: string | null;
}): string | undefined {
  if (input.sizeGuideId && SIZE_GUIDES[input.sizeGuideId]) {
    return input.sizeGuideId;
  }

  const metadata = input.metadata;
  if (metadata) {
    for (const key of GUIDE_META_KEYS) {
      const value = metadata[key];
      if (typeof value === "string" && value.trim()) {
        const id = value.trim();
        // Guía propia del producto: si no hay tabla con ese id, no caemos a otra.
        return SIZE_GUIDES[id] ? id : undefined;
      }
    }
  }

  const handle = input.handle ?? "";
  const fromHandle = SIZE_GUIDE_BY_HANDLE[handle];
  return fromHandle && SIZE_GUIDES[fromHandle] ? fromHandle : undefined;
}

export function getSizeGuide(id: string | undefined): SizeGuide | null {
  if (!id) return null;
  return SIZE_GUIDES[id] ?? null;
}
