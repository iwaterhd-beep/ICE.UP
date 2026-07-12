/** Copy estilo Palace — bullets irreverentes por producto */
export const PALACE_COPY: Record<string, string[]> = {
  "hoods-chateau-tee": [
    "GRÁFICO YETI EN BUTACA ROJA. NO PREGUNTES POR QUÉ.",
    "OVERSIZE DE VERDAD — NO ES 'UN POQUITO GRANDE'.",
    "ESPALDA CON HOOD'S CHÂTEAU. LA GENTE TE SEGUIRÁ.",
    "FOTografiada EN CANASTA DE CADENA. OBVIO.",
  ],
  "logo-tee-negro": [
    "NEGRO. LOGO EN PECHO. CERO RUIDO.",
    "PARCHE ICE UP! — NO ES UN STICKER DE TEMU.",
    "RELAXED FIT. PARA IR CÓMODO Y VERSE BIEN.",
    "LA BASE DE CUALQUIER ARMARIO DECENTE.",
  ],
  "logo-tee-crema": [
    "CREMA NEUTRA. LOGO AZUL. COMBINA CON TODO.",
    "PIEZA ESENCIAL DEL DROP — NO ES FILLER.",
    "ALGODÓN PREMIUM. SE NOTA AL TOCARLA.",
    "FOTOGRAFIADA EN LA CALLE, NO EN ESTUDIO FALSO.",
  ],
  "bolsa-ice-up": [
    "PACKAGING HOLOGRÁFICO. GUÁRDALA — VALE DINERO.",
    "THE CONTENT OF THIS BAG IS SO HOT IT CAN MELT ICE.",
    "INCLUIDA EN PEDIDOS SELECCIONADOS. NO SE VENDE SUELTA (AÚN).",
    "OBJETO COLECCIONABLE. NO LA TIRES.",
  ],
};

export const TICKER_ITEMS = [
  "ICE UP!",
  "EDICIÓN LIMITADA",
  "HOOD'S CHÂTEAU",
  "DOPAMINE HIT",
  "GEAR ON",
  "DROP ACTIVO",
  "SIN STOCK MASIVO",
] as const;

export function getPalaceCopy(handle: string): string[] {
  return PALACE_COPY[handle] ?? [];
}
