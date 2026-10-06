import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Marquee } from "@/components/site/Marquee";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/Section";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { getCollections, getProductBySlug, getRelated } from "@/lib/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, collections] = await Promise.all([
    getRelated(product, 4),
    getCollections(),
  ]);
  const collection = collections.find((c) => c.slug === product.collectionSlug);

  return (
    <>
      <section className="px-5 pt-24 pb-16 md:px-10 md:pt-32 md:pb-24">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-smoke uppercase"
        >
          <Link href="/" className="transition-colors hover:text-volt">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/shop" className="transition-colors hover:text-volt">
            Shop
          </Link>
          <ChevronRight className="size-3" />
          <Link
            href={`/shop?category=${product.category}`}
            className="transition-colors hover:text-volt"
          >
            {product.category}
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-bone">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <ProductGallery images={product.images} name={product.name} />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-wrap items-center gap-3">
              {product.tag && (
                <span
                  className={
                    product.tag === "NEW"
                      ? "bg-volt px-2.5 py-1 font-mono text-[9px] tracking-[0.22em] text-ink uppercase"
                      : "border border-bone/30 px-2.5 py-1 font-mono text-[9px] tracking-[0.22em] text-bone uppercase"
                  }
                >
                  {product.tag}
                </span>
              )}
              {collection && (
                <Link
                  href={`/collections/${collection.slug}`}
                  className="border border-white/15 px-2.5 py-1 font-mono text-[9px] tracking-[0.22em] text-smoke uppercase transition-colors hover:border-volt hover:text-volt"
                >
                  {collection.name}
                </Link>
              )}
            </div>

            <h1 className="font-display mt-5 text-5xl leading-[0.9] uppercase md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-3 font-mono text-[11px] tracking-[0.24em] text-smoke uppercase">
              SKU {product.slug.toUpperCase().replaceAll("-", "·")}
            </p>

            <div className="mt-8">
              <PurchasePanel product={product} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24">
        <SectionHeading
          index="+"
          kicker="Complete the kit"
          title={
            <>
              Pairs <span className="text-stroke">well with</span>
            </>
          }
          link={{ href: "/shop", label: "Shop all" }}
        />
        <div className="grid grid-cols-2 gap-6 gap-y-12 lg:grid-cols-4">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee
        className="border-t border-white/10 bg-coal py-4 text-bone/50"
        items={[
          "30-day sweat-test returns",
          "Ships within 24 hours",
          "Free express over $150",
          "Engineered in Portland",
        ]}
      />
    </>
  );
}
