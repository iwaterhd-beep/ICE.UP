interface BrandMarkProps {
  className?: string;
}

/** Marca gráfica inspirada en la confianza del Tri-Ferg de Palace */
export function BrandMark({ className = "h-8 w-8" }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M24 4L44 40H4L24 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="miter"
      />
      <path
        d="M24 14L34 32H14L24 14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
        opacity="0.45"
      />
    </svg>
  );
}
