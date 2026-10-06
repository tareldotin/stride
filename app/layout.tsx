import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  title: {
    default: "STRIDE® — Engineered Momentum | Sportswear & Equipment",
    template: "%s | STRIDE®",
  },
  description:
    "Race-day footwear, technical apparel and garage-gym equipment. Built for the daily chase. STRIDE — engineered momentum since 2019.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable} ${jbmono.variable}`}>
      <body className="bg-ink font-sans text-bone antialiased">
        <CartProvider>
          <div className="grain" aria-hidden />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
