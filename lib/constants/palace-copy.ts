/** Copy estilo Palace — bullets irreverentes por producto */
export const PALACE_COPY: Record<string, string[]> = {
  "monolito-negro": [
    "PARKA ESTRUCTURAL. NO ES UN ABRIGO NORMAL.",
    "LOGO BORDADO A MANO — CERO STICKERS.",
    "FORRO DE SEDA TÉCNICA. SUENA CARO PORQUE LO ES.",
    "INSPIRADA EN LA FACHADA DE LA TIENDA. OBVIO.",
  ],
  "capa-niebla": [
    "MÁS DE 40 HORAS POR UNIDAD. TÚ NI 40 MINUTOS EN EL GYM.",
    "NEGRO PROFUNDO. COMO TU ALMA EN ENERO.",
    "ABRIGO ESTRUCTURAL — NO PARA LA PLAYA.",
    "GÉLIDO ORIGINS. SUENA COMO UNA BANDA POST-PUNK.",
  ],
  "traje-calma": [
    "DOS PIEZAS. HOMBROS CAÍDOS. CERO PRISA.",
    "COSTURAS REFORZADAS A MANO. NO SE ROMPE.",
    "PARA EVENTOS DONDE NO QUIERES HABLAR CON NADIE.",
    "PERMAFROST COLLECTION. FRÍO PERO ELEGANTE.",
  ],
  "chaleco-escarcha": [
    "PLUMÓN RECICLADO. SALVA EL PLANETA CON ESTILO.",
    "CIERRE DE COROZO. SÍ, DE VERDAD.",
    "ACOLCHADO ARTESANAL — NO DE ZARA.",
    "CAPA INTERMEDIA PERFECTA. O FINAL SI ERES VALIENTE.",
  ],
};

export const TICKER_ITEMS = [
  "ICE UP!",
  "EDICIÓN LIMITADA",
  "HECHO A MANO",
  "EL CHICO DE HIELO",
  "DROP ACTIVO",
  "SIN STOCK MASIVO",
  "NO REPRODUCCIÓN EN SERIE",
] as const;

export function getPalaceCopy(handle: string): string[] {
  return PALACE_COPY[handle] ?? [];
}
