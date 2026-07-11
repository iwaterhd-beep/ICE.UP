import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { SITE } from "@/lib/constants/site";

const FOOTER_LINKS = [
  { href: "/#archivo", label: "Archivo" },
  { href: "/#atelier", label: "Atelier" },
  { href: "/coleccion", label: "Colección" },
];

export function Footer() {
  return (
    <footer className="border-t border-ice-gray-800 bg-ice-black px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-10" />
            <p className="font-condensed text-2xl font-black uppercase tracking-wide">
              {SITE.name}
            </p>
          </div>
          <p className="mt-3 font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-500">
            {SITE.tagline} — {SITE.description}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-400 transition-colors hover:text-ice-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-12 max-w-[1600px] font-condensed text-[10px] font-bold uppercase tracking-wide text-ice-gray-600">
        © {new Date().getFullYear()} {SITE.name}
      </p>
    </footer>
  );
}
