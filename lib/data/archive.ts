export interface ArchiveEntry {
  id: string;
  year: number;
  collectionName: string;
  title: string;
  description: string;
  extendedDescription: string;
  images: string[];
  tags?: string[];
}

const archiveEntries: ArchiveEntry[] = [
  {
    id: "001",
    year: 2024,
    collectionName: "Gélido Origins",
    title: "Packaging Dopamine Hit",
    description:
      "Primer packaging del drop. Gráfico yeti, acabado holográfico, secuencia Dopamine Hit → Gear On → ICE UP!",
    extendedDescription:
      "El packaging ICE UP! nació como objeto coleccionable, no como mero envoltorio. Cada bolsa iridiscente documenta el ritual del drop: abrir, vestir, activar. Pieza de archivo desde el primer lote.",
    images: ["/archive/entry-1.jpg"],
    tags: ["packaging", "drop"],
  },
  {
    id: "002",
    year: 2024,
    collectionName: "Gélido Origins",
    title: "Logo Tee Crema",
    description:
      "Camiseta crema con parche logo en pecho. Primeras unidades fotografiadas en exteriores urbanos.",
    extendedDescription:
      "La Logo Tee Crema estableció el código visual mínimo de la marca: tipografía contenida, parche cuadrado, silueta relaxed. Fotografiada en entorno urbano con luz natural.",
    images: ["/archive/entry-2.jpg"],
    tags: ["essentials", "logo"],
  },
  {
    id: "003",
    year: 2025,
    collectionName: "Permafrost",
    title: "Duo — Logo Tees",
    description:
      "Sesión Permafrost. Negro y crema en contraste. Dos piezas, un mismo código.",
    extendedDescription:
      "Lookbook de la entrega Permafrost: negro profundo frente a crema neutra. Misma construcción, distinta actitud. Documentado en exteriores con arquitectura brutalista de fondo.",
    images: ["/archive/entry-3.jpg"],
    tags: ["lookbook", "duo"],
  },
  {
    id: "004",
    year: 2025,
    collectionName: "Permafrost",
    title: "Hood's Château — Canasta",
    description:
      "Camiseta gráfica colgada en canasta de cadena. Campaña urbana, luz dorada.",
    extendedDescription:
      "Hood's Château se presentó colgando de una canasta de baloncesto — referencia directa a la cultura callejera. El gráfico yeti en butaca roja se convirtió en pieza central del archivo visual ICE UP!",
    images: ["/archive/entry-4.jpg"],
    tags: ["campaign", "graphic tee"],
  },
  {
    id: "005",
    year: 2026,
    collectionName: "Invierno",
    title: "Bolsa Melt Ice",
    description:
      '"The content of this bag is so hot it can melt ice." Packaging de la colección Invierno.',
    extendedDescription:
      "La bolsa Melt Ice cerró el ciclo narrativo del invierno 2026: tipografía líquida, estrellas iridiscentes, fondo cosmos. Objeto de archivo y extensión de la identidad gráfica de la marca.",
    images: ["/archive/entry-5.jpg"],
    tags: ["packaging", "invierno"],
  },
  {
    id: "006",
    year: 2026,
    collectionName: "Invierno",
    title: "Campaña calle",
    description:
      "Lookbook urbano. Capas, cargo, energía de ciudad. ICE UP! en movimiento.",
    extendedDescription:
      "La campaña de calle documenta ICE UP! fuera del estudio: denim ancho, capas técnicas, entorno metropolitano. La marca en contexto real — no posado, en tránsito.",
    images: ["/archive/entry-6.png"],
    tags: ["lookbook", "street"],
  },
];

export function getArchiveEntries(): ArchiveEntry[] {
  return [...archiveEntries].sort((a, b) => b.year - a.year);
}

export function getArchiveYears(): number[] {
  return [...new Set(archiveEntries.map((e) => e.year))].sort((a, b) => b - a);
}

export function getArchiveCollections(): string[] {
  return [...new Set(archiveEntries.map((e) => e.collectionName))].sort();
}
