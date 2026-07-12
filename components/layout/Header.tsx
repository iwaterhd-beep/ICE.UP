"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useCartStore } from "@/stores/cart-store";
import { useHeroStore } from "@/stores/hero-store";
import { HERO_Z_INDEX } from "@/lib/constants/hero";
import { SiteTicker } from "./SiteTicker";
import { MobileNav } from "./MobileNav";

const NAV_LINKS = [
  { href: "/#archivo", label: "Archivo" },
  { href: "/#atelier", label: "Atelier" },
  { href: "/coleccion", label: "Colección" },
];

export function Header() {
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.itemCount);
  const openCart = useCartStore((state) => state.openCart);
  const hasEntered = useHeroStore((state) => state.hasEntered);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isVisible = !isHome || hasEntered;
  const heroGlass = isHome && hasEntered && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className={`fixed inset-x-0 top-0 transition-[background-color,border-color,backdrop-filter] duration-500 ${
              heroGlass
                ? "border-b border-white/10 bg-gradient-to-b from-black/75 via-black/40 to-transparent backdrop-blur-sm"
                : "border-b border-ice-gray-800 bg-ice-black"
            }`}
            style={{ zIndex: HERO_Z_INDEX.nav }}
          >
            <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:h-16 md:px-6">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center text-ice-white"
                aria-label="ICE UP! — Inicio"
              >
                <BrandLogo
                  variant="lockup"
                  priority
                  className="hidden sm:inline-flex"
                />
                <BrandLogo
                  variant="isotipo"
                  priority
                  className="inline-flex sm:hidden"
                />
              </Link>

              <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-300 transition-colors hover:text-ice-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={openCart}
                  className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-200 transition-colors hover:text-ice-white"
                  aria-label={`Abrir carrito, ${itemCount} artículos`}
                >
                  Carrito ({itemCount})
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen((value) => !value)}
                  className="font-condensed text-xs font-bold uppercase tracking-wide text-ice-gray-200 md:hidden"
                  aria-expanded={menuOpen}
                  aria-label="Abrir menú"
                >
                  Menú
                </button>
              </div>
            </div>
            <SiteTicker glass={heroGlass} />
          </motion.header>
        )}
      </AnimatePresence>

      <MobileNav open={menuOpen && isVisible} onClose={closeMenu} links={NAV_LINKS} />
    </>
  );
}
