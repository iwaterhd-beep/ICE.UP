import Image from "next/image";
import { BRAND, type LogoVariant } from "@/lib/constants/brand";

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

const ISOTIPO = { width: 120, height: 48 };
const WORDMARK = { width: 200, height: 48 };

export function BrandLogo({
  variant = "lockup",
  className = "",
  priority = false,
}: BrandLogoProps) {
  if (variant === "isotipo") {
    return (
      <Image
        src={BRAND.isotipo}
        alt="ICE UP!"
        width={ISOTIPO.width}
        height={ISOTIPO.height}
        priority={priority}
        className={`h-auto w-auto object-contain ${className}`}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <Image
        src={BRAND.wordmark}
        alt="ICE UP!"
        width={WORDMARK.width}
        height={WORDMARK.height}
        priority={priority}
        className={`h-auto w-auto object-contain brightness-0 invert ${className}`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 md:gap-3 ${className}`}>
      <Image
        src={BRAND.isotipo}
        alt=""
        aria-hidden
        width={ISOTIPO.width}
        height={ISOTIPO.height}
        priority={priority}
        className="h-7 w-auto object-contain md:h-8"
      />
      <Image
        src={BRAND.wordmark}
        alt="ICE UP!"
        width={WORDMARK.width}
        height={WORDMARK.height}
        priority={priority}
        className="h-5 w-auto object-contain brightness-0 invert md:h-6"
      />
    </span>
  );
}

/** @deprecated Usar BrandLogo */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <BrandLogo variant="isotipo" className={`h-auto max-h-full w-auto ${className}`} />
  );
}
