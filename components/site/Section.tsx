import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { Reveal } from "@/components/site/Reveal";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: ReactNode;
  link?: { href: string; label: string };
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  index,
  kicker,
  title,
  link,
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cx("mb-10 md:mb-16", className)}>
      <div
        className={cx(
          "flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase",
          tone === "dark" ? "text-smoke" : "text-ink/50",
        )}
      >
        <span className={tone === "dark" ? "text-volt" : "text-ink"}>{index}</span>
        <span className={cx("h-px flex-1", tone === "dark" ? "bg-white/10" : "bg-ink/15")} />
        <span>{kicker}</span>
      </div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[13vw] leading-[0.9] uppercase sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {title}
        </h2>
        {link && (
          <Link
            href={link.href}
            className={cx(
              "group mb-1 inline-flex items-center gap-2 border px-5 py-3 font-mono text-[10px] tracking-[0.24em] uppercase transition-all",
              tone === "dark"
                ? "border-white/20 text-bone hover:border-volt hover:bg-volt hover:text-ink"
                : "border-ink/25 text-ink hover:bg-ink hover:text-bone",
            )}
          >
            {link.label}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
