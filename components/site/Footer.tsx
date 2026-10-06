import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { NewsletterForm } from "@/components/site/NewsletterForm";

const SHOP_LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=footwear", label: "Footwear" },
  { href: "/shop?category=apparel", label: "Apparel" },
  { href: "/shop?category=equipment", label: "Equipment" },
  { href: "/collections", label: "Collections" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "Our Story" },
  { href: "/lookbook", label: "Lookbook SS26" },
  { href: "/collections/run-division", label: "Run Division" },
  { href: "/collections/iron-club", label: "Iron Club" },
  { href: "/cart", label: "Your Cart" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink">
      {/* Newsletter band */}
      <div className="grid border-b border-white/10 md:grid-cols-2">
        <div className="border-b border-white/10 px-5 py-10 md:border-r md:border-b-0 md:px-10 md:py-14">
          <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            The Dispatch
          </p>
          <h3 className="mt-4 font-display text-4xl leading-[0.95] uppercase md:text-5xl">
            First in line.
            <br />
            <span className="text-stroke">Every drop.</span>
          </h3>
        </div>
        <div className="flex flex-col justify-center px-5 py-10 md:px-10">
          <p className="max-w-md text-sm leading-relaxed text-smoke">
            Early access to limited drops, training protocols from our lab, and 10%
            off your first order. No noise — one email, twice a month.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-2 gap-10 px-5 py-12 md:grid-cols-4 md:px-10 md:py-16">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-smoke uppercase">Shop</p>
          <ul className="mt-5 space-y-3">
            {SHOP_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-1 text-sm text-bone/75 transition-colors hover:text-volt"
                >
                  {l.label}
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-smoke uppercase">Company</p>
          <ul className="mt-5 space-y-3">
            {COMPANY_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-1 text-sm text-bone/75 transition-colors hover:text-volt"
                >
                  {l.label}
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-smoke uppercase">Support</p>
          <ul className="mt-5 space-y-3 text-sm text-bone/75">
            <li>Shipping in 2–4 days</li>
            <li>30-day sweat-test returns</li>
            <li>help@stride.run</li>
            <li>+1 (800) STRIDE-1</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-smoke uppercase">Follow</p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: InstagramIcon, label: "Instagram" },
              { Icon: XIcon, label: "X" },
              { Icon: YoutubeIcon, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex size-10 items-center justify-center border border-white/15 text-bone/70 transition-all hover:border-volt hover:bg-volt hover:text-ink"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 max-w-[220px] font-mono text-[10px] leading-relaxed tracking-[0.14em] text-smoke uppercase">
            Portland · Tokyo · Berlin. Inspired everywhere people move.
          </p>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="overflow-hidden border-t border-white/10 px-2">
        <div
          aria-hidden
          className="font-display -mb-[0.16em] text-center text-[24vw] tracking-[0.02em] text-carbon select-none"
        >
          STRIDE
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-5 py-5 font-mono text-[10px] tracking-[0.22em] text-smoke uppercase md:flex-row md:px-10">
        <span>© 2026 Stride Athletics Co. All rights reserved.</span>
        <span>
          Engineered momentum <span className="text-volt">/</span> EST. 2019
        </span>
        <span>Imagery — Pexels photographers</span>
      </div>
    </footer>
  );
}
