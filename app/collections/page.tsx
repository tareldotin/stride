import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";
import { getCollections, getProducts } from "@/lib/queries";
import { cx } from "@/lib/format";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Collections",
  description: "Four worlds of engineered momentum — Run Division, Court Culture, Iron Club and Off Duty.",
};

export default async function CollectionsPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);
  const counts = new Map<string, number>();
  products.forEach((p) => counts.set(p.collectionSlug, (counts.get(p.collectionSlug) ?? 0) + 1));

  return (
    <>
      {/* Intro */}
      <section className="border-b border-white/10 px-5 pt-32 pb-14 md:px-10 md:pt-44 md:pb-20">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            04 worlds — one obsession
          </p>
          <h1 className="font-display mt-6 text-[15vw] leading-[0.86] uppercase md:text-[9vw]">
            The <span className="text-stroke">Collections</span>
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-smoke md:text-base">
            We don&apos;t make &quot;product lines&quot;. We build complete kits for
            distinct ways of moving — every piece in a collection is designed to work
            with every other piece. Pick your world.
          </p>
        </Reveal>
      </section>

      {/* Stacked collection rows */}
      <section>
        {collections.map((c, i) => (
          <Reveal key={c.slug}>
            <Link
              href={`/collections/${c.slug}`}
              className="group relative grid border-b border-white/10 transition-colors hover:bg-coal md:grid-cols-12"
            >
              {/* Number + name */}
              <div
                className={cx(
                  "flex flex-col justify-between gap-10 px-5 py-10 md:col-span-5 md:px-10 md:py-16",
                  i % 2 === 1 && "md:order-2",
                )}
              >
                <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-smoke">
                  <span className="text-volt">/{c.index}</span>
                  <span className="h-px w-14 bg-white/15" />
                  <span className="uppercase">
                    [{String(counts.get(c.slug) ?? 0).padStart(2, "0")} pieces]
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-6xl leading-[0.9] uppercase transition-colors group-hover:text-volt md:text-7xl lg:text-8xl">
                    {c.name.split(" ")[0]}
                    <br />
                    <span className="text-stroke transition-all group-hover:text-volt group-hover:[-webkit-text-stroke-width:0px]">
                      {c.name.split(" ").slice(1).join(" ")}
                    </span>
                  </h2>
                  <p className="mt-5 font-mono text-[11px] tracking-[0.24em] text-bone/70 uppercase">
                    “{c.tagline}”
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke">
                    {c.description}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-3 border border-bone/25 px-6 py-3.5 font-display text-xs tracking-[0.16em] uppercase transition-all group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
                  Enter the world
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              {/* Cover */}
              <div className="relative min-h-[320px] overflow-hidden md:col-span-7 md:min-h-[520px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.cover}
                  alt={c.name}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="zoom-target absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <Marquee
        className="border-b border-white/10 bg-volt py-3.5 text-ink"
        items={[
          "Run Division — 01",
          "Court Culture — 02",
          "Iron Club — 03",
          "Off Duty — 04",
          "Built to work together",
        ]}
      />
    </>
  );
}
