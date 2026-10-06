import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Camera } from "lucide-react";
import { Marquee } from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";
import { LOOKS } from "@/lib/data";
import { cx } from "@/lib/format";

export const metadata: Metadata = {
  title: "Lookbook SS26",
  description: "Seven looks shot where the work happens — tracks, courts and iron rooms around the world.",
};

const LAYOUTS = [
  "md:col-span-7 md:col-start-1",
  "md:col-span-5 md:col-start-8 md:mt-40",
  "md:col-span-6 md:col-start-4 md:-mt-10",
  "md:col-span-5 md:col-start-1 md:mt-24",
  "md:col-span-6 md:col-start-7 md:mt-40",
  "md:col-span-5 md:col-start-3 md:-mt-6",
  "md:col-span-6 md:col-start-5 md:mt-28",
];

export default function LookbookPage() {
  return (
    <>
      {/* Intro */}
      <section className="border-b border-white/10 px-5 pt-32 pb-14 md:px-10 md:pt-44 md:pb-20">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            <Camera className="size-3.5" /> Editorial — Spring / Summer 26
          </p>
          <h1 className="font-display mt-6 text-[16vw] leading-[0.86] uppercase md:text-[10vw]">
            Look<span className="text-stroke">book</span>
          </h1>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-smoke md:text-base">
              Shot on location in Portland, Minsk and Manila. No studio tricks — just
              athletes, golden hours and gear that was already broken in. Tap any
              frame to shop the collection it was pulled from.
            </p>
            <p className="font-mono text-[11px] tracking-[0.24em] text-smoke uppercase">
              07 frames <span className="text-volt">/</span> 03 continents
            </p>
          </div>
        </Reveal>
      </section>

      {/* Looks — staggered editorial grid */}
      <section className="px-5 py-16 md:grid md:grid-cols-12 md:px-10 md:py-28">
        <div className="contents md:col-span-12 md:grid md:grid-cols-12">
          {LOOKS.map((look, i) => (
            <Reveal key={look.index} className={cx("mb-14 md:mb-0", LAYOUTS[i % LAYOUTS.length])}>
              <Link href={`/collections/${look.collection}`} className="group block">
                <div className="relative overflow-hidden bg-carbon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={look.image}
                    alt={look.title}
                    loading="lazy"
                    className="zoom-target block h-auto w-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-ink/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.24em] text-volt backdrop-blur">
                    LOOK {look.index}
                  </span>
                  <span className="absolute right-4 bottom-4 flex size-11 translate-y-3 items-center justify-center border border-bone/30 text-bone opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:hover:border-volt group-hover:hover:bg-volt group-hover:hover:text-ink">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-2xl uppercase transition-colors group-hover:text-volt md:text-3xl">
                    {look.title}
                  </h2>
                  <p className="text-right font-mono text-[9px] leading-relaxed tracking-[0.16em] text-smoke uppercase">
                    {look.caption}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Outro CTA */}
      <section className="border-t border-white/10 px-5 py-20 text-center md:py-28">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">Your turn</p>
          <h2 className="font-display mx-auto mt-6 max-w-4xl text-5xl leading-[0.9] uppercase md:text-8xl">
            Wear it <span className="text-stroke">where it counts</span>
          </h2>
          <Link
            href="/shop"
            className="group mt-10 inline-flex items-center gap-3 bg-volt px-9 py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone"
          >
            Shop SS26
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <Marquee
        className="border-t border-white/10 bg-coal py-4 text-bone/50"
        items={["SS26 Editorial", "07 frames", "Tracks · Courts · Iron rooms", "Worn in, never worn out"]}
      />
    </>
  );
}
