"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { cx } from "@/lib/format";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { count, openCart, closeCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    closeCart();
  }, [pathname, closeCart]);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="flex h-16 items-stretch justify-between md:h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-1 px-5 md:px-10"
            aria-label="STRIDE home"
          >
            <span className="font-display text-2xl leading-none tracking-wide text-bone transition-colors group-hover:text-volt md:text-[28px]">
              STRIDE
            </span>
            <span className="mb-2 font-mono text-[9px] text-volt">®</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "group relative font-mono text-[11px] tracking-[0.28em] uppercase transition-colors",
                    active ? "text-volt" : "text-bone/70 hover:text-bone",
                  )}
                >
                  {item.label}
                  <span
                    className={cx(
                      "absolute -bottom-1 left-0 h-px bg-volt transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-stretch">
            <div className="hidden items-center border-l border-white/10 px-6 font-mono text-[10px] tracking-[0.22em] text-smoke uppercase lg:flex">
              Free shipping over $150
            </div>
            <button
              onClick={openCart}
              className="group relative flex items-center gap-2 border-l border-white/10 px-5 transition-colors hover:bg-white/5 md:px-7"
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingBag className="size-[18px] text-bone transition-colors group-hover:text-volt" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-bone/70 group-hover:text-bone">
                [{String(count).padStart(2, "0")}]
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center border-l border-white/10 px-5 transition-colors hover:bg-white/5 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <span className="font-display text-2xl text-bone">STRIDE<span className="text-volt">®</span></span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex size-10 items-center justify-center border border-white/15"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Mobile">
              {[{ href: "/", label: "Home" }, ...NAV, { href: "/cart", label: "Cart" }].map(
                (item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span className="font-mono text-[11px] text-volt">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-5xl uppercase text-bone transition-colors group-hover:text-volt">
                        {item.label}
                      </span>
                      <ArrowUpRight className="size-5 self-center text-smoke transition-transform group-hover:translate-x-1 group-hover:text-volt" />
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>
            <div className="border-t border-white/10 px-6 py-5 font-mono text-[10px] tracking-[0.24em] text-smoke uppercase">
              SS26 Drop 04 — Live now
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
