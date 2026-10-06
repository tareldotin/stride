import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Marquee } from "@/components/site/Marquee";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import {
  getCollectionBySlug,
  getCollections,
  getProducts,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "Not found" };
  return { title: collection.name, description: collection.description };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const [collection, allCollections] = await Promise.all([
    getCollectionBySlug(slug),
    getCollections(),
  ]);
  if (!collection) notFound();

  const items = await getProducts({ collectionSlug: slug });
  const idx = allCollections.findIndex((c) => c.slug === slug);
  const next = allCollections[(idx + 1) % allCollections.length];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={collection.cover}
          alt={collection.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
        <div className="relative z-10 px-5 pb-12 md:px-10 md:pb-16">
          <Reveal>
            <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
              <Link href="/collections" className="flex items-center gap-2 text-bone/70 transition-colors hover:text-volt">
                <ArrowLeft className="size-3.5" /> All collections
              </Link>
              <span className="h-px w-14 bg-white/25" />
              Collection {collection.index}
            </div>
            <h1 className="font-display mt-6 text-[16vw] leading-[0.86] uppercase md:text-[10vw]">
              {collection.name.split(" ")[0]}{" "}
              <span className="text-stroke">{collection.name.split(" ").slice(1).join(" ")}</span>
            </h1>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-lg text-sm leading-relaxed text-bone/80 md:text-base">
                {collection.description}
              </p>
              <p className="font-mono text-[11px] tracking-[0.24em] text-volt uppercase">
                [{String(items.length).padStart(2, "0")} pieces] — “{collection.tagline}”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-2 gap-6 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Next collection */}
      <Link
        href={`/collections/${next.slug}`}
        className="group relative flex min-h-[46svh] items-center justify-center overflow-hidden border-t border-white/10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={next.cover}
          alt={next.name}
          loading="lazy"
          className="zoom-target absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative z-10 text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] text-bone/70 uppercase">
            Next world — {next.index}
          </p>
          <p className="font-display mt-4 flex items-center justify-center gap-4 text-[12vw] leading-none uppercase transition-colors group-hover:text-volt md:text-7xl">
            {next.name}
            <ArrowRight className="size-[8vw] transition-transform group-hover:translate-x-2 md:size-12" />
          </p>
        </div>
      </Link>

      <Marquee
        fast
        className="border-t border-white/10 py-4 text-bone/50"
        items={[collection.name, collection.tagline, "Engineered momentum", "STRIDE® SS26"]}
      />
    </>
  );
}
