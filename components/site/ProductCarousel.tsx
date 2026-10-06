"use client";

import type { Product } from "@/db/schema";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { ProductCard } from "@/components/site/ProductCard";

export function ProductCarousel({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * w * 2, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 md:-mx-10 md:px-10"
      >
        {products.map((p) => (
          <div
            key={p.slug}
            data-card
            className="w-[72vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-[22.5vw]"
          >
            <ProductCard product={p} />
          </div>
        ))}
        <div className="w-1 shrink-0" />
      </div>

      <div className="mt-8 hidden justify-end gap-2 md:flex">
        <button
          onClick={() => scrollBy(-1)}
          className="flex size-12 items-center justify-center border border-white/15 transition-all hover:border-volt hover:bg-volt hover:text-ink"
          aria-label="Scroll left"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          className="flex size-12 items-center justify-center border border-white/15 transition-all hover:border-volt hover:bg-volt hover:text-ink"
          aria-label="Scroll right"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
