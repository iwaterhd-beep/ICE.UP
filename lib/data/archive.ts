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
    title: "Primera manifestación",
    description:
      "Las primeras piezas nacidas del bosque. Siluetas oversized, costuras visibles, lana cruda.",
    extendedDescription:
      "Gélido Origins marcó el nacimiento de ICE UP! como lenguaje visual. Cada prenda fue confeccionada en el atelier de El Chico de Hielo, con materiales seleccionados a mano en lotes limitados. La colección exploró la tensión entre protección y vulnerabilidad — capas que envuelven sin ocultar.",
    images: ["/archive/entry-1.jpg", "/archive/entry-2.jpg"],
    tags: ["debut", "outerwear"],
  },
  {
    id: "002",
    year: 2024,
    collectionName: "Gélido Origins",
    title: "Capa de niebla",
    description:
      "Abrigo estructural en negro profundo. Forro de seda técnica, cierre oculto.",
    extendedDescription:
      "La Capa de niebla se convirtió en pieza icónica de la marca. Su construcción requiere más de cuarenta horas de trabajo manual. El corte asimétrico evoca la topografía de un paisaje helado visto desde la distancia.",
    images: ["/archive/entry-2.jpg"],
    tags: ["icono", "abrigos"],
  },
  {
    id: "003",
    year: 2025,
    collectionName: "Permafrost",
    title: "Edición Permafrost",
    description:
      "Segunda entrega. Texturas granuladas, paleta reducida, bordes sin rematar.",
    extendedDescription:
      "Permafrost profundizó la investigación material de la casa. Tejidos tratados con procesos artesanales de encogimiento controlado, bordes sin rematar que revelan la estructura interna de cada prenda. Solo doce unidades por modelo.",
    images: ["/archive/entry-3.jpg", "/archive/entry-4.jpg"],
    tags: ["limitada", "texturas"],
  },
  {
    id: "004",
    year: 2025,
    collectionName: "Permafrost",
    title: "Traje de calma",
    description:
      "Conjunto de dos piezas. Líneas rectas, hombros caídos, ausencia de ornamentos.",
    extendedDescription:
      "El Traje de calma fue diseñado como segunda piel para el invierno urbano. Patronaje desarrollado durante tres meses de pruebas sobre cuerpos reales. Cada costura interior está reforzada a mano con hilo de seda.",
    images: ["/archive/entry-4.jpg"],
    tags: ["tailoring", "unisex"],
  },
  {
    id: "005",
    year: 2026,
    collectionName: "Invierno",
    title: "Nueva colección invierno",
    description:
      "La entrega actual. Referencias al paisaje del vídeo inaugural — bosque, tienda, luz.",
    extendedDescription:
      "La colección Invierno 2026 cierra el ciclo narrativo iniciado en el bosque nevado. Piezas que dialogan con la arquitectura minimalista y la luz tenue del crepúsculo polar. Disponible progresivamente en la tienda.",
    images: ["/archive/entry-5.jpg", "/archive/entry-6.jpg"],
    tags: ["actual", "invierno"],
  },
  {
    id: "006",
    year: 2026,
    collectionName: "Invierno",
    title: "Monolito negro",
    description:
      "Parka estructural inspirada en la fachada de la tienda. Logo bordado a mano.",
    extendedDescription:
      "Monolito negro es la pieza central de la campaña. El bordado del logotipo ICE UP! requiere seis horas de trabajo por unidad. La silueta evoca un volumen arquitectónico — protección total, presencia silenciosa.",
    images: ["/archive/entry-6.jpg"],
    tags: ["hero piece", "bordado"],
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
