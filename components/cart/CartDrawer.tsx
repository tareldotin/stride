"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_CENTS } from "@/lib/data";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotalCents, setQty, removeItem } = useCart();
  const progress = Math.min(1, subtotalCents / FREE_SHIPPING_CENTS);
  const remaining = FREE_SHIPPING_CENTS - subtotalCents;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[65] flex w-full max-w-md flex-col border-l border-white/10 bg-coal"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            aria-label="Shopping cart"
          >
            {/* Head */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <p className="font-display text-xl uppercase">
                Cart{" "}
                <span className="font-mono text-xs text-volt">
                  [{String(items.reduce((n, i) => n + i.qty, 0)).padStart(2, "0")}]
                </span>
              </p>
              <button
                onClick={closeCart}
                className="flex size-9 items-center justify-center border border-white/15 transition-colors hover:border-volt hover:text-volt"
                aria-label="Close cart"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Free shipping meter */}
            <div className="border-b border-white/10 px-6 py-4">
              <p className="font-mono text-[10px] tracking-[0.2em] text-smoke uppercase">
                {remaining > 0 ? (
                  <>
                    <span className="text-volt">{formatPrice(remaining)}</span> away from
                    free shipping
                  </>
                ) : (
                  <span className="text-volt">Free shipping unlocked</span>
                )}
              </p>
              <div className="mt-2 h-[3px] w-full bg-white/10">
                <motion.div
                  className="h-full bg-volt"
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="font-display text-3xl uppercase text-bone/40">Empty.</p>
                  <p className="max-w-[240px] text-sm text-smoke">
                    Your cart is catching its breath. Go put something fast in it.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 border border-bone/25 px-6 py-3 font-display text-xs tracking-[0.14em] uppercase transition-all hover:border-volt hover:bg-volt hover:text-ink"
                  >
                    Keep shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-white/10">
                  {items.map((item) => (
                    <li key={`${item.slug}-${item.size}`} className="flex gap-4 py-5">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-carbon"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-sm tracking-wide uppercase">
                              {item.name}
                            </p>
                            <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-smoke uppercase">
                              {item.color} / {item.size}
                            </p>
                          </div>
                          <p className="font-mono text-xs text-bone">
                            {formatPrice(item.priceCents * item.qty)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-white/15">
                            <button
                              className="flex size-8 items-center justify-center transition-colors hover:text-volt"
                              onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-8 text-center font-mono text-xs">
                              {item.qty}
                            </span>
                            <button
                              className="flex size-8 items-center justify-center transition-colors hover:text-volt"
                              onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.slug, item.size)}
                            className="text-smoke transition-colors hover:text-ember"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Foot */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.24em] text-smoke uppercase">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl">{formatPrice(subtotalCents)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="group mt-4 flex w-full items-center justify-center gap-2 bg-volt py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone"
                >
                  Checkout
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="mt-2 flex w-full items-center justify-center border border-white/15 py-3 font-mono text-[10px] tracking-[0.24em] text-bone/70 uppercase transition-colors hover:border-bone hover:text-bone"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
