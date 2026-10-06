import { Asterisk } from "lucide-react";
import { cx } from "@/lib/format";

type MarqueeProps = {
  items: string[];
  className?: string;
  fast?: boolean;
};

export function Marquee({ items, className, fast = false }: MarqueeProps) {
  const loop = [...items, ...items, ...items];
  return (
    <div className={cx("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cx(
          "flex w-max items-center",
          fast ? "animate-marquee-fast" : "animate-marquee",
        )}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {loop.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
                <span className="font-display text-sm tracking-[0.14em] uppercase md:text-base">
                  {item}
                </span>
                <Asterisk className="size-4 shrink-0" strokeWidth={2.5} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
