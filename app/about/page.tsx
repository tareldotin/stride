import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Gauge, Leaf, Users } from "lucide-react";
import { Marquee } from "@/components/site/Marquee";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { MEDIA } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "STRIDE was founded in a Portland garage in 2019 by two engineers and a disillusioned sprinter. This is our story.",
};

const STATS = [
  { value: "2019", label: "Founded in a Portland garage" },
  { value: "1.2M", label: "Athletes kitted worldwide" },
  { value: "214", label: "Prototypes per final product" },
  { value: "03", label: "Labs — PDX · TYO · BER" },
];

const VALUES = [
  {
    icon: Gauge,
    title: "Performance first",
    copy: "If a fabric, foam or alloy doesn't shave time, add reps or kill fatigue, it doesn't ship. Aesthetics follow physics, never the reverse.",
  },
  {
    icon: Flame,
    title: "Built to be beaten",
    copy: "We abrasion-test 200km, compression-test 1M cycles and wash-test 100 cycles before a sample earns the right to be photographed.",
  },
  {
    icon: Leaf,
    title: "Lighter footprint",
    copy: "92% recycled or renewable inputs, plastic-free packaging and carbon-neutral delivery on every order — performance without the guilt.",
  },
  {
    icon: Users,
    title: "Community powered",
    copy: "38 elite athletes and 4,000 run-club members test every drop. Their split times and sweat patterns shape what you buy.",
  },
];

const TIMELINE = [
  { year: "2019", event: "Two engineers and one disillusioned sprinter quit their jobs. First midsole compound poured in a rented garage kiln." },
  { year: "2021", event: "Velocity Racer prototype goes viral after a local marathoner breaks 2:20 in an unmarked pair. Waitlist hits 40,000." },
  { year: "2023", event: "Iron Club launches. Our single-cast kettlebell sells out in 71 minutes and crashes the site twice." },
  { year: "2025", event: "Tokyo and Berlin labs open. 1.2 million athletes now train in STRIDE across 43 countries." },
  { year: "2026", event: "Drop 04 — our fastest, lightest, most recycled collection yet. You're reading about it right now." },
];

export default function AboutPage() {
  return (
    <>
      {/* Manifesto hero */}
      <section className="border-b border-white/10 px-5 pt-32 pb-16 md:px-10 md:pt-44 md:pb-24">
        <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
          The company — since 2019
        </p>
        <h1 className="font-display mt-8 leading-[0.88] uppercase">
          <RevealLines
            lines={[
              <span key="a" className="block text-[13vw] md:text-[9vw]">
                We don&apos;t make
              </span>,
              <span key="b" className="block text-[13vw] text-volt md:text-[9vw]">
                Sportswear.
              </span>,
              <span key="c" className="text-stroke block text-[13vw] md:text-[9vw]">
                We build momentum.
              </span>,
            ]}
            stagger={0.14}
          />
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-bone/75 md:text-base">
            STRIDE exists for the people who set alarms they hate, run in weather
            they shouldn&apos;t, and count reps nobody will ever see. We&apos;re
            engineers and athletes with one shared belief: the right gear
            doesn&apos;t just witness your best days — it creates them.
          </p>
        </Reveal>
      </section>

      {/* Stats band */}
      <section className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="px-5 py-10 md:px-10 md:py-14">
            <Reveal delay={i * 0.08}>
              <p className="font-display text-4xl text-volt md:text-6xl">{s.value}</p>
              <p className="mt-3 max-w-[200px] font-mono text-[9px] leading-relaxed tracking-[0.18em] text-smoke uppercase">
                {s.label}
              </p>
            </Reveal>
          </div>
        ))}
      </section>

      {/* Story split */}
      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 md:px-10 md:py-24">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.3em] text-smoke uppercase">
              01 — Origin
            </p>
            <h2 className="font-display mt-6 text-4xl leading-[0.92] uppercase md:text-6xl">
              It started with
              <br />a <span className="text-volt">blown-out shoe</span>
            </h2>
            <div className="mt-8 max-w-lg space-y-5 text-sm leading-relaxed text-bone/70">
              <p>
                Mile 18 of a wet Portland marathon, our founder&apos;s race-day shoes
                — 200 dollars, three months old — split at the midsole. He finished
                barefoot, and spent the drive home asking why the industry ships
                marketing instead of engineering.
              </p>
              <p>
                The first STRIDE midsole was poured in a rented garage kiln two weeks
                later. The first 400 pairs were numbered by hand. The first 40,000
                were claimed by waitlist before a single ad ran. Seven years on,
                nothing about the formula has changed: test brutally, build honestly,
                price fairly.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="group relative min-h-[420px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MEDIA.aboutStory}
            alt="Athletes training on stadium bleachers"
            loading="lazy"
            className="zoom-target absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-smoke uppercase">
            02 — What we refuse to compromise
          </p>
          <h2 className="font-display mt-6 text-4xl uppercase md:text-6xl">
            Four <span className="text-stroke">laws</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="bg-ink">
              <div className="group flex h-full flex-col p-7 transition-colors hover:bg-coal md:p-9">
                <div className="flex size-12 items-center justify-center border border-white/15 transition-all group-hover:border-volt group-hover:bg-volt">
                  <v.icon className="size-5 text-volt transition-colors group-hover:text-ink" />
                </div>
                <p className="mt-8 font-mono text-[10px] text-smoke">0{i + 1}</p>
                <h3 className="font-display mt-2 text-2xl uppercase">{v.title}</h3>
                <p className="mt-4 text-[13px] leading-relaxed text-smoke">{v.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-white/10 bg-bone px-5 py-16 text-ink md:px-10 md:py-24">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-ink/50 uppercase">
            03 — The road so far
          </p>
          <h2 className="font-display mt-6 text-4xl uppercase md:text-6xl">
            Seven years, <span className="text-stroke-ink">zero shortcuts</span>
          </h2>
        </Reveal>
        <div className="mt-12">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05}>
              <div className="group grid items-baseline gap-2 border-t border-ink/15 py-7 transition-colors last:border-b hover:bg-ink/5 md:grid-cols-12 md:gap-6">
                <p className="font-display text-4xl md:col-span-3 md:text-6xl lg:col-span-2">
                  {t.year}
                </p>
                <p className="max-w-2xl text-sm leading-relaxed text-ink/70 md:col-span-9 lg:col-span-10 lg:text-base">
                  {t.event}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Facility band + CTA */}
      <section className="group relative flex min-h-[70svh] items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MEDIA.aboutFacility}
          alt="The STRIDE flagship facility and test gym"
          loading="lazy"
          className="zoom-target absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative z-10 px-5 text-center">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
              Portland HQ — 21,000 sq ft of lab & iron
            </p>
            <h2 className="font-display mt-6 text-[12vw] leading-[0.9] uppercase md:text-[7vw]">
              Come move <span className="text-stroke">with us</span>
            </h2>
            <Link
              href="/shop"
              className="group/btn mt-10 inline-flex items-center gap-3 bg-volt px-9 py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone"
            >
              Shop the latest drop
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Marquee
        fast
        className="border-t border-white/10 py-4 text-bone/50"
        items={["Never stand still", "Engineered momentum", "Portland · Tokyo · Berlin", "EST. 2019"]}
      />
    </>
  );
}
