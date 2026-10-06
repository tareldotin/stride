"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_CENTS } from "@/lib/data";

const SHIPPING_CENTS = 1200;

export default function CartPage() {
  const { items, subtotalCents, setQty, removeItem, count } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const shipping = subtotalCents === 0 || subtotalCents >= FREE_SHIPPING_CENTS ? 0 : SHIPPING_CENTS;
  const total = subtotalCents + shipping;
  const progress = Math.min(1, subtotalCents / FREE_SHIPPING_CENTS);
  const remaining = Math.max(0, FREE_SHIPPING_CENTS - subtotalCents);

  return (
    <section className="min-h-svh px-5 pt-32 pb-20 md:px-10 md:pt-44">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-10">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            Review your loadout
          </p>
          <h1 className="font-display mt-4 text-[14vw] leading-[0.86] uppercase md:text-[8vw]">
            Your <span className="text-stroke">cart</span>
          </h1>
        </div>
        <p className="mb-2 font-mono text-[11px] tracking-[0.24em] text-smoke uppercase">
          [{String(mounted ? count : 0).padStart(2, "0")} items]
        </p>
      </div>

      {mounted && items.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-28 text-center">
          <p className="font-display text-5xl uppercase text-bone/40">Empty kit bag.</p>
          <p className="max-w-sm text-sm text-smoke">
            Nothing in here yet. The new drop won&apos;t wait — and neither should you.
          </p>
          <Link
            href="/shop"
            className="group mt-3 inline-flex items-center gap-3 bg-volt px-8 py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone"
          >
            Shop the drop
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-14 lg:grid-cols-[1fr_400px]">
          {/* Items */}
          <ul className="divide-y divide-white/10 border-b border-white/10 lg:border-b-0">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={`${item.slug}-${item.size}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -24 }}
                  className="flex gap-5 py-7 md:gap-8"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-carbon md:w-32"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-display text-xl uppercase transition-colors hover:text-volt md:text-2xl"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1.5 font-mono text-[10px] tracking-[0.18em] text-smoke uppercase">
                          {item.color} <span className="text-white/25">/</span> {item.size}
                        </p>
                      </div>
                      <p className="font-mono text-base md:text-lg">
                        {formatPrice(item.priceCents * item.qty)}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <div className="flex items-center border border-white/15">
                        <button
                          onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                          className="flex size-10 items-center justify-center transition-colors hover:text-volt"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-10 text-center font-mono text-sm">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                          className="flex size-10 items-center justify-center transition-colors hover:text-volt"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <p className="hidden font-mono text-[10px] tracking-[0.18em] text-smoke uppercase md:block">
                        {formatPrice(item.priceCents)} each
                      </p>
                      <button
                        onClick={() => removeItem(item.slug, item.size)}
                        className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-smoke uppercase transition-colors hover:text-ember"
                      >
                        <Trash2 className="size-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {/* Summary */}
          <aside className="h-fit border border-white/10 bg-coal p-7 lg:sticky lg:top-28">
            <p className="font-display text-2xl uppercase">Summary</p>

            <div className="mt-6">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-smoke uppercase">
                <span>Free shipping</span>
                <span>{remaining > 0 ? `${formatPrice(remaining)} to go` : "Unlocked"}</span>
              </div>
              <div className="mt-2 h-[3px] w-full bg-white/10">
                <div
                  className="h-full bg-volt transition-all duration-700"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            <dl className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-smoke">Subtotal</dt>
                <dd className="font-mono">{formatPrice(subtotalCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-smoke">Shipping</dt>
                <dd className="font-mono">
                  {shipping === 0 ? <span className="text-volt">Free</span> : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4">
                <dt className="font-display text-lg uppercase">Total</dt>
                <dd className="font-display text-3xl">{formatPrice(total)}</dd>
              </div>
            </dl>

            <Link
              href="/checkout"
              aria-disabled={items.length === 0}
              className="group mt-7 flex w-full items-center justify-center gap-3 bg-volt py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone"
            >
              <Lock className="size-4" />
              Secure checkout
            </Link>
            <Link
              href="/shop"
              className="group mt-4 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.22em] text-smoke uppercase transition-colors hover:text-bone"
            >
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
              Keep shopping
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
