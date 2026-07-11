export interface AtelierPhase {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const ATELIER_INTRO = {
  designerName: "El Chico de Hielo",
  portrait: "/atelier/designer.jpg",
  headline: "Donde el frío se vuelve forma",
  paragraphs: [
    "Cada pieza ICE UP! nace en un espacio de silencio. Sin producción en masa, sin prisa. Solo manos, aguja e intención.",
    "El Chico de Hielo — así conocen al diseñador detrás de la marca — trabaja como un artesano del norte: observa el material, escucha lo que pide, y cose hasta que la prenda respira sola.",
  ],
} as const;

export const ATELIER_PHASES: AtelierPhase[] = [
  {
    id: "boceto",
    title: "Boceto",
    description:
      "Todo empieza en papel. Líneas rápidas, proporciones probadas a mano alzada. No hay CAD ni render previo — solo la intuición del cuerpo y el peso del tejido.",
    image: "/atelier/process-1.jpg",
  },
  {
    id: "patronaje",
    title: "Patronaje",
    description:
      "El patrón se construye pieza a pieza sobre maniquí de draping. Cada curva se ajusta durante días hasta encontrar la tensión exacta entre estructura y caída.",
    image: "/atelier/process-2.jpg",
  },
  {
    id: "cosido",
    title: "Cosido a mano",
    description:
      "Las costuras interiores se refuerzan con hilo de seda. Las exteriores, cuando existen, quedan visibles como cicatriz honesta del proceso artesanal.",
    image: "/atelier/process-3.jpg",
  },
  {
    id: "acabado",
    title: "Acabado",
    description:
      "Revisión final bajo luz natural. Cada prenda pasa por manos del diseñador antes de recibir el sello ICE UP! — garantía de que ninguna unidad es igual a otra.",
    image: "/atelier/process-4.jpg",
  },
];

export const ATELIER_QUOTE = {
  text: "No diseño ropa para cubrir cuerpos. Diseño armaduras de calma para quienes caminan entre el frío y la ciudad.",
  texture: "/atelier/texture.jpg",
} as const;
