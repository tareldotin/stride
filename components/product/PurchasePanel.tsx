"use client";

import type { Product } from "@/db/schema";
import { formatPrice, cx } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { FREE_SHIPPING_CENTS } from "@/lib/data";

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-mono text-[11px] tracking-[0.24em] text-bone/80 uppercase">
          {title}
        </span>
        <span className={cx("transition-colors", open ? "text-volt" : "text-smoke")}>
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-relaxed text-smoke">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PurchasePanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [color, setColor] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const [added, setAdded] = useState(false);

  const add = () => {
    if (size === null) {
      setWarn(true);
      return;
    }
    addItem({
      slug: product.slug,
      name: product.name,
      priceCents: product.priceCents,
      image: product.images[0],
      size: product.sizes[size],
      color: product.colors[color].name,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div>
      {/* Price block */}
      <div className="flex flex-wrap items-center gap-4">
        <p className="font-display text-4xl md:text-5xl">{formatPrice(product.priceCents)}</p>
        {product.compareAtCents && (
          <p className="font-mono text-base text-smoke line-through">
            {formatPrice(product.compareAtCents)}
          </p>
        )}
        <span className="flex items-center gap-1.5 border border-white/15 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-bone/80">
          <Star className="size-3 fill-volt text-volt" />
          {product.rating.toFixed(1)} · {product.reviews} reviews
        </span>
      </div>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-bone/75 md:text-[15px]">
        {product.description}
      </p>

      {/* Colors */}
      <div className="mt-8">
        <p className="font-mono text-[10px] tracking-[0.24em] text-smoke uppercase">
          Colour — <span className="text-bone">{product.colors[color].name}</span>
        </p>
        <div className="mt-3 flex gap-3">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setColor(i)}
              aria-label={c.name}
              className={cx(
                "flex size-9 items-center justify-center rounded-full border transition-all",
                color === i ? "border-volt" : "border-white/20 hover:border-bone",
              )}
            >
              <span
                className="size-6 rounded-full border border-white/10"
                style={{ backgroundColor: c.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p
            className={cx(
              "font-mono text-[10px] tracking-[0.24em] uppercase transition-colors",
              warn && size === null ? "text-ember" : "text-smoke",
            )}
          >
            {warn && size === null ? "Select a size first" : "Select size"}
          </p>
          <button className="font-mono text-[10px] tracking-[0.18em] text-smoke uppercase underline underline-offset-4 hover:text-volt">
            Size guide
          </button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {product.sizes.map((s, i) => (
            <button
              key={s}
              onClick={() => {
                setSize(i);
                setWarn(false);
              }}
              className={cx(
                "border py-3 font-mono text-[11px] tracking-wide transition-all",
                size === i
                  ? "border-volt bg-volt text-ink"
                  : warn
                    ? "border-ember/50 text-bone/70 hover:border-volt"
                    : "border-white/15 text-bone/70 hover:border-volt hover:text-bone",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Qty + Add */}
      <div className="mt-8 flex gap-3">
        <div className="flex items-center border border-white/15">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex size-12 items-center justify-center transition-colors hover:text-volt"
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center font-mono text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="flex size-12 items-center justify-center transition-colors hover:text-volt"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <button
          onClick={add}
          className={cx(
            "group flex flex-1 items-center justify-center gap-3 px-6 font-display text-sm tracking-[0.16em] uppercase transition-all",
            added ? "bg-bone text-ink" : "bg-volt text-ink hover:bg-bone",
          )}
        >
          {added ? (
            <>
              <Check className="size-4" /> Added to bag
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" /> Add to bag —{" "}
              {formatPrice(product.priceCents * qty)}
            </>
          )}
        </button>
      </div>

      {/* Assurances */}
      <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
        {[
          { icon: Truck, label: product.priceCents >= FREE_SHIPPING_CENTS ? "Ships free" : "Free over $150" },
          { icon: RotateCcw, label: "30-day returns" },
          { icon: Package, label: "Carbon neutral" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 px-2 py-4 text-center">
            <Icon className="size-4 text-volt" />
            <span className="font-mono text-[9px] tracking-[0.14em] text-smoke uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Accordions */}
      <div className="mt-2 border-t border-white/10">
        <Accordion title="Details & specs">
          <ul className="space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-[7px] size-1 shrink-0 bg-volt" />
                {d}
              </li>
            ))}
          </ul>
        </Accordion>
        <Accordion title="Shipping">
          Orders ship within 24 hours from our Portland warehouse. Express delivery in
          2–4 business days, free on all orders over $150. Every parcel is
          carbon-neutral and packed plastic-free.
        </Accordion>
        <Accordion title="Returns — the 30-day sweat test">
          Train in it hard for 30 days. If it doesn&apos;t move better than anything
          you&apos;ve owned, send it back for a full refund — no questions, no
          restocking fees.
        </Accordion>
      </div>
    </div>
  );
}
