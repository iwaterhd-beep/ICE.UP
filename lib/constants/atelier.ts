export interface AtelierPhase {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const ATELIER_INTRO = {
  designerName: "El Chico de Hielo",
  portrait: "/atelier/designer.jpg",
  headline: "Del packaging a la calle",
  paragraphs: [
    "ICE UP! no empieza en una pasarela. Empieza en una bolsa iridiscente, en una camiseta colgando de una canasta, en una esquina cualquiera de la ciudad.",
    "El Chico de Hielo diseña piezas que existen en el mundo real — no en un render. Cada drop se documenta, se archiva, y se libera en lotes limitados.",
  ],
} as const;

export const ATELIER_PHASES: AtelierPhase[] = [
  {
    id: "concepto",
    title: "Concepto gráfico",
    description:
      "Identidad visual del drop: tipografía líquida, acabados holográficos, copy con actitud. El packaging es la primera pieza que ves.",
    image: "/atelier/process-1.jpg",
  },
  {
    id: "produccion",
    title: "Producción",
    description:
      "Selección de blanks, parches bordados, serigrafía de alta densidad. Cada unidad pasa control de calidad manual.",
    image: "/atelier/process-2.jpg",
  },
  {
    id: "campana",
    title: "Campaña",
    description:
      "Fotografía en entorno urbano. Canastas, aceras, luz natural. La prenda se presenta donde vive — en la calle.",
    image: "/atelier/process-3.jpg",
  },
  {
    id: "drop",
    title: "Drop",
    description:
      "Lanzamiento en edición limitada. Lo que no coges hoy, mañana es archivo. Sin reposición, sin stock masivo.",
    image: "/atelier/process-4.jpg",
  },
];

export const ATELIER_QUOTE = {
  text: "No hacemos ropa para guardar en cajón. Hacemos piezas para salir, moverse, y quemar el asfalto.",
  texture: "/atelier/texture.jpg",
} as const;
