import type { Metadata } from "next";
import { Barlow_Condensed, Inter, Space_Grotesk } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { CartDrawer } from "@/components/shop";
import { HeroVideoPreload } from "@/components/hero/HeroVideoPreload";
import { defaultMetadata } from "@/lib/constants/metadata";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlowCondensed.variable} ${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <HeroVideoPreload />
      </head>
      <body className="min-h-full flex flex-col bg-ice-black text-ice-white font-body">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
