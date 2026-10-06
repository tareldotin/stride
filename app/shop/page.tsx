import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Marquee } from "@/components/site/Marquee";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { getCollections, getProducts, sortProducts, type SortKey } from "@/lib/queries";
import { CATEGORIES } from "@/lib/data";
import { cx } from "@/lib/format";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Every STRIDE product — footwear, apparel and equipment. Filter by discipline.",
};

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price · Low" },
  { key: "price-desc", label: "Price · High" },
  { key: "name", label: "A–Z" },
];

function buildHref(params: Record<string, string | undefined>) {
  const q = Object.entries(params)
    .filter(([, v]) => v && v !== "all" && v !== "featured")
    .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
    .join("&");
  return q ? `/shop?${q}` : "/shop";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; collection?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.category ?? "all";
  const sort = (["featured", "price-asc", "price-desc", "name"].includes(sp.sort ?? "")
    ? sp.sort
    : "featured") as SortKey;
  const collection = sp.collection ?? "all";

  const collections = await getCollections();
  let list = await getProducts({
    category: category === "all" ? undefined : category,
    collectionSlug: collection === "all" ? undefined : collection,
  });
  list = sortProducts(list, sort);

  const categoryLabel =
    category === "all" ? "Shop all" : (CATEGORIES.find((c) => c.slug === category)?.label ?? "Shop");

  return (
    <>
      {/* Header band */}
      <section className="border-b border-white/10 px-5 pt-32 pb-12 md:px-10 md:pt-40 md:pb-16">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            The full arsenal — SS26
          </p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-[15vw] leading-[0.86] uppercase md:text-[9vw]">
              {categoryLabel.split(" ")[0]}{" "}
              <span className="text-stroke">{categoryLabel.split(" ")[1] ?? "kit"}</span>
            </h1>
            <p className="mb-2 font-mono text-[11px] tracking-[0.24em] text-smoke uppercase">
              [{String(list.length).padStart(2, "0")} products]
            </p>
          </div>
        </Reveal>
      </section>

      {/* Filter rail */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-ink/90 backdrop-blur-xl md:top-[72px]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4 md:px-10">
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-smoke uppercase">
            <SlidersHorizontal className="size-3.5 text-volt" /> Filter
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[{ slug: "all", label: "All" }, ...CATEGORIES].map((c) => (
              <Link
                key={c.slug}
                href={buildHref({ category: c.slug, sort, collection })}
                scroll={false}
                className={cx(
                  "border px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-all",
                  category === c.slug
                    ? "border-volt bg-volt text-ink"
                    : "border-white/15 text-bone/60 hover:border-bone hover:text-bone",
                )}
              >
                {c.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-smoke uppercase md:flex">
              <ArrowUpDown className="size-3.5 text-volt" /> Sort
            </span>
            {SORTS.map((s) => (
              <Link
                key={s.key}
                href={buildHref({ category, sort: s.key, collection })}
                scroll={false}
                className={cx(
                  "px-2 py-2 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors",
                  sort === s.key ? "text-volt" : "text-smoke hover:text-bone",
                )}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Collection sub-filter */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/5 px-5 py-3 md:px-10">
          <span className="font-mono text-[9px] tracking-[0.24em] text-smoke/70 uppercase">
            Collection
          </span>
          {[{ slug: "all", name: "All" }, ...collections].map((c) => (
            <Link
              key={c.slug}
              href={buildHref({ category, sort, collection: c.slug })}
              scroll={false}
              className={cx(
                "font-mono text-[10px] tracking-[0.16em] uppercase transition-colors",
                collection === c.slug ? "text-volt" : "text-bone/50 hover:text-bone",
              )}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="px-5 py-14 md:px-10 md:py-20">
        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-28 text-center">
            <p className="font-display text-4xl uppercase text-bone/40">No matches</p>
            <p className="text-sm text-smoke">Try clearing a filter or two.</p>
            <Link
              href="/shop"
              className="mt-2 border border-bone/25 px-6 py-3 font-display text-xs tracking-[0.14em] uppercase transition-all hover:border-volt hover:bg-volt hover:text-ink"
            >
              Reset filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <Marquee
        className="border-t border-white/10 bg-coal py-4 text-bone/50"
        items={[
          "30-day sweat-test returns",
          "Free express shipping over $150",
          "Carbon-neutral delivery",
          "Members get 10% back",
        ]}
      />
    </>
  );
}
