import type { Metadata } from "next";
import { ArrowDown, ArrowRight, ArrowUpRight, Gauge, Layers, Recycle } from "lucide-react";
import Link from "next/link";
import { Marquee } from "@/components/site/Marquee";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/Section";
import { getProducts } from "@/lib/queries";
import { MEDIA } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "STRIDE® — Engineered Momentum | Sportswear & Equipment",
};

const CATEGORY_TILES = [
  {
    index: "01",
    label: "Footwear",
    blurb: "Carbon-tuned racers & court icons",
    image: MEDIA.categoryFootwear,
    href: "/shop?category=footwear",
  },
  {
    index: "02",
    label: "Apparel",
    blurb: "Technical layers, heavyweight fleece",
    image: MEDIA.categoryApparel,
    href: "/shop?category=apparel",
  },
  {
    index: "03",
    label: "Equipment",
    blurb: "Iron that outlives your program",
    image: MEDIA.categoryEquipment,
    href: "/shop?category=equipment",
  },
];

const LAB_STATS = [
  { value: "214", label: "Prototypes tested per silhouette" },
  { value: "38", label: "Elite athletes in the test pool" },
  { value: "92%", label: "Recycled or renewable inputs" },
];

export default async function HomePage() {
  const all = await getProducts();
  const fresh = all.filter((p) => p.tag === "NEW");
  const newest = [...fresh, ...all.filter((p) => p.tag !== "NEW")].slice(0, 7);
  const bestsellers = all.filter((p) => p.tag === "BESTSELLER").slice(0, 4);

  return (
    <>
      {/* ── 01 · HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={MEDIA.heroPoster}
          >
            <source src={MEDIA.heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-5 pt-32 pb-10 md:px-10 md:pb-14">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.32em] text-volt uppercase md:text-[11px]">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-volt" />
              SS26 · Drop 04 — Engineered Momentum
            </p>
          </Reveal>

          <h1 className="font-display leading-[0.86] uppercase">
            <RevealLines
              lines={[
                <span key="a" className="block text-[17vw] md:text-[12.5vw]">Move</span>,
                <span key="b" className="block text-[17vw] text-volt md:text-[12.5vw]">
                  Faster
                </span>,
                <span key="c" className="text-stroke block text-[17vw] md:text-[12.5vw]">
                  Than Doubt
                </span>,
              ]}
              stagger={0.14}
            />
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.35}>
              <p className="max-w-md text-sm leading-relaxed text-bone/75 md:text-base">
                Race-day footwear, technical apparel and uncompromising equipment —
                obsessively engineered in our Portland lab for the people who refuse
                to sit still.
              </p>
            </Reveal>
            <Reveal delay={0.45} className="flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 bg-volt px-8 py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone"
              >
                Shop the drop
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/collections"
                className="group inline-flex items-center gap-3 border border-bone/30 px-8 py-4 font-display text-sm tracking-[0.14em] uppercase transition-all hover:border-bone hover:bg-bone hover:text-ink"
              >
                Collections
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Meta bar */}
        <div className="relative z-10 grid grid-cols-2 border-t border-white/15 font-mono text-[9px] tracking-[0.24em] text-bone/60 uppercase md:grid-cols-4 md:text-[10px]">
          <div className="border-r border-white/15 px-5 py-4 md:px-10">
            89% energy return <span className="text-volt">/</span> NitroCell™
          </div>
          <div className="px-5 py-4 md:border-r md:border-white/15 md:px-10">
            184g <span className="text-volt">/</span> Velocity Racer 01
          </div>
          <div className="border-t border-r border-white/15 px-5 py-4 md:border-t-0 md:px-10">
            Free shipping <span className="text-volt">/</span> $150+
          </div>
          <div className="flex items-center gap-2 border-t border-white/15 px-5 py-4 md:border-t-0 md:px-10">
            Scroll <ArrowDown className="size-3 animate-bounce text-volt" />
          </div>
        </div>
      </section>

      {/* ── 02 · MARQUEE ──────────────────────────────────────── */}
      <Marquee
        className="border-y border-ink/10 bg-volt py-3.5 text-ink"
        items={[
          "SS26 Drop 04 — Live Now",
          "Free Express Shipping Over $150",
          "30-Day Sweat-Test Returns",
          "Velocity Racer 01 — Out Now",
          "Carbon-Neutral Delivery",
        ]}
      />

      {/* ── 03 · CATEGORIES ───────────────────────────────────── */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <SectionHeading
          index="01"
          kicker="Choose your arena"
          title={
            <>
              Shop by <span className="text-stroke">discipline</span>
            </>
          }
          link={{ href: "/shop", label: "View everything" }}
        />
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {CATEGORY_TILES.map((tile, i) => (
            <Reveal key={tile.label} delay={i * 0.12} className="bg-ink">
              <Link href={tile.href} className="group relative block overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tile.image}
                    alt={tile.label}
                    loading="lazy"
                    className="zoom-target absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                  <span className="absolute top-5 left-5 font-mono text-[11px] tracking-[0.3em] text-bone/70">
                    /{tile.index}
                  </span>
                  <span className="absolute top-5 right-5 flex size-10 items-center justify-center border border-bone/25 text-bone transition-all duration-300 group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <h3 className="font-display text-4xl uppercase transition-colors group-hover:text-volt md:text-5xl">
                    {tile.label}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-bone/60 uppercase">
                    {tile.blurb}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 04 · NEW ARRIVALS ─────────────────────────────────── */}
      <section className="border-t border-white/10 py-20 md:py-32">
        <div className="px-5 md:px-10">
          <SectionHeading
            index="02"
            kicker="Just landed"
            title={
              <>
                New <span className="text-volt">arrivals</span>
              </>
            }
            link={{ href: "/shop", label: "Shop all" }}
          />
          <ProductCarousel products={newest} />
        </div>
      </section>

      {/* ── 05 · SPOTLIGHT / RUN DIVISION (bone) ──────────────── */}
      <section className="bg-bone text-ink">
        <div className="grid min-h-[90vh] md:grid-cols-2">
          <div className="flex flex-col justify-between px-5 py-14 md:px-12 md:py-20">
            <div>
              <p className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-ink/50 uppercase">
                <span className="bg-ink px-2 py-1 text-volt">Collection 01</span>
                Featured spotlight
              </p>
              <h2 className="mt-8 font-display text-[16vw] leading-[0.88] uppercase md:text-[7.5vw]">
                Run
                <br />
                <span className="text-stroke-ink">Division</span>
              </h2>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-ink/70 md:text-base">
                Speed is a decision you make every morning. Carbon-tuned footwear and
                featherweight layers for tempo days, race days, and every dark 5AM in
                between.
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/collections/run-division"
                className="group inline-flex items-center gap-3 bg-ink px-8 py-4 font-display text-sm tracking-[0.14em] text-bone uppercase transition-colors hover:bg-ember hover:text-ink"
              >
                Explore the collection
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-5 font-mono text-[10px] tracking-[0.24em] text-ink/50 uppercase">
                04 silhouettes · from $149
              </p>
            </div>
          </div>
          <div className="group relative min-h-[50vh] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/3763873/pexels-photo-3763873.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=1500"
              alt="Sprinter on the start line wearing Run Division"
              loading="lazy"
              className="zoom-target absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between md:right-8 md:bottom-8 md:left-8">
              <p className="font-display text-2xl text-bone uppercase md:text-4xl">
                Speed is
                <br />a decision.
              </p>
              <span className="bg-volt px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-ink uppercase">
                Carbon inside
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 · THE LAB ──────────────────────────────────────── */}
      <section className="border-t border-white/10 px-5 py-20 md:px-10 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MEDIA.techLab}
                alt="Athletes training on stadium bleachers"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-4 -bottom-6 hidden w-56 border border-volt/40 bg-ink p-5 md:block">
              <Gauge className="size-5 text-volt" />
              <p className="mt-3 font-display text-3xl">0.21s</p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-smoke uppercase">
                Avg. reaction gain in plate testing
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-smoke uppercase">
                <span className="text-volt">03</span>
                <span className="h-px w-16 bg-white/15" />
                Inside the lab
              </p>
              <h2 className="mt-6 font-display text-5xl leading-[0.9] uppercase md:text-7xl">
                Obsessed with the{" "}
                <span className="text-stroke">milli&shy;second</span>
              </h2>
              <p className="mt-8 max-w-lg text-sm leading-relaxed text-bone/70 md:text-base">
                Every STRIDE product starts as a question screamed at a treadmill in
                our Portland lab. We film footstrikes at 1,000fps, torture foams for a
                million compressions, and let 38 elite athletes try to break it all.
                If it survives, it earns the mark.
              </p>
            </Reveal>

            <div className="mt-12 grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {LAB_STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1} className="px-2 py-6 sm:px-5">
                  <p className="font-display text-4xl text-volt md:text-5xl">{s.value}</p>
                  <p className="mt-2 font-mono text-[9px] leading-relaxed tracking-[0.16em] text-smoke uppercase">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 border border-bone/30 px-7 py-4 font-display text-sm tracking-[0.14em] uppercase transition-all hover:border-volt hover:bg-volt hover:text-ink"
              >
                <Layers className="size-4" />
                Our story
              </Link>
              <span className="inline-flex items-center gap-2 px-2 font-mono text-[10px] tracking-[0.2em] text-smoke uppercase">
                <Recycle className="size-4 text-volt" /> 92% recycled inputs
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 07 · BESTSELLERS ──────────────────────────────────── */}
      <section className="border-t border-white/10 px-5 py-20 md:px-10 md:py-32">
        <SectionHeading
          index="04"
          kicker="Proven under pressure"
          title={
            <>
              Best<span className="text-stroke">sellers</span>
            </>
          }
          link={{ href: "/shop", label: "Shop all" }}
        />
        <div className="grid grid-cols-2 gap-6 gap-y-12 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 08 · LOOKBOOK TEASER ──────────────────────────────── */}
      <section className="group relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MEDIA.lookbookTeaser}
          alt="Athlete mid long-jump"
          loading="lazy"
          className="zoom-target absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative z-10 px-5 text-center">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.32em] text-volt uppercase">
              Editorial — Spring / Summer 26
            </p>
            <h2 className="font-display mt-6 text-[15vw] leading-[0.88] uppercase md:text-[9vw]">
              Look<span className="text-stroke">book</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm text-bone/80">
              Seven looks shot where the work actually happens — tracks, courts and
              iron rooms around the world.
            </p>
            <Link
              href="/lookbook"
              className="group/btn mt-10 inline-flex items-center gap-3 bg-bone px-9 py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-volt"
            >
              View the looks
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 09 · CLOSING MARQUEE ──────────────────────────────── */}
      <Marquee
        fast
        className="border-t border-white/10 py-5 text-bone/60"
        items={[
          "Move Faster Than Doubt",
          "Engineered Momentum",
          "EST. 2019 — Portland OR",
          "Never Stand Still",
        ]}
      />
    </>
  );
}
