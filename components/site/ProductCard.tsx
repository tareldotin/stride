"use client";

import type { Product } from "@/db/schema";
import { formatPrice, cx } from "@/lib/format";
import { Plus, Star } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

type Props = {
  product: Product;
  className?: string;
  showQuickAdd?: boolean;
};

export function ProductCard({ product, className, showQuickAdd = true }: Props) {
  const { addItem } = useCart();

  const quickAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      priceCents: product.priceCents,
      image: product.images[0],
      size: product.sizes[Math.min(2, product.sizes.length - 1)],
      color: product.colors[0].name,
      qty: 1,
    });
  };

  return (
    <div className={cx("group", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0"
          aria-label={product.name}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          {product.images[1] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        {product.tag && (
          <span
            className={cx(
              "absolute top-3 left-3 z-10 px-2.5 py-1 font-mono text-[9px] tracking-[0.22em] uppercase",
              product.tag === "NEW" ? "bg-volt text-ink" : "bg-ink/80 text-bone backdrop-blur",
            )}
          >
            {product.tag}
          </span>
        )}

        {showQuickAdd && (
          <button
            onClick={quickAdd}
            className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full items-center justify-between bg-ink/85 px-4 py-3.5 font-display text-xs tracking-[0.16em] text-bone uppercase backdrop-blur transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 hover:bg-volt hover:text-ink"
          >
            Quick add
            <Plus className="size-4" />
          </button>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link
            href={`/product/${product.slug}`}
            className="font-display text-base leading-tight tracking-wide uppercase transition-colors hover:text-volt"
          >
            {product.name}
          </Link>
          <p className="mt-1.5 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-smoke uppercase">
            <span>{product.category}</span>
            <span className="inline-block size-[3px] rounded-full bg-white/25" />
            <span className="flex items-center gap-1">
              <Star className="size-2.5 fill-volt text-volt" />
              {product.rating.toFixed(1)} ({product.reviews})
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-sm text-bone">{formatPrice(product.priceCents)}</p>
          {product.compareAtCents && (
            <p className="font-mono text-[10px] text-smoke line-through">
              {formatPrice(product.compareAtCents)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
