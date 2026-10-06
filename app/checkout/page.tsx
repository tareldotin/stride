"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Loader2,
  Lock,
  MapPin,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_CENTS } from "@/lib/data";

const SHIPPING_CENTS = 1200;

type Phase = "form" | "placing" | "done";

function SectionTitle({
  icon: Icon,
  index,
  title,
}: {
  icon: typeof User;
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
      <span className="flex size-9 items-center justify-center border border-volt/40 text-volt">
        <Icon className="size-4" />
      </span>
      <p className="font-display text-lg tracking-wide uppercase">
        <span className="mr-2 font-mono text-[10px] text-smoke">{index}</span>
        {title}
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, subtotalCents, clear, count } = useCart();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [card, setCard] = useState("");

  useEffect(() => setMounted(true), []);

  const shipping =
    subtotalCents === 0 || subtotalCents >= FREE_SHIPPING_CENTS ? 0 : SHIPPING_CENTS;
  const total = subtotalCents + shipping;

  const placeOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phase !== "form") return;
    setPhase("placing");

    const data = new FormData(e.currentTarget);
    const name = `${data.get("first") ?? ""} ${data.get("last") ?? ""}`.trim() || "STRIDE Athlete";
    const email = String(data.get("email") ?? "athlete@stride.run");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          items,
          subtotalCents,
          shippingCents: shipping,
          totalCents: total,
        }),
      });
      const json = (await res.json()) as { orderId?: string };
      const seed = (json.orderId ?? `${Date.now()}`).replace(/[^a-z0-9]/gi, "");
      setOrderNumber(`S-${seed.slice(0, 8).toUpperCase().padEnd(8, "X")}`);
    } catch {
      setOrderNumber(`S-${Date.now().toString(36).toUpperCase().slice(-8).padStart(8, "X")}`);
    }
    clear();
    setPhase("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Success ─────────────────────────────────────────────── */
  if (phase === "done") {
    return (
      <section className="flex min-h-svh flex-col items-center justify-center px-5 pt-24 pb-16 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 200 }}
          className="flex size-20 items-center justify-center border border-volt/50 bg-volt/10"
        >
          <BadgeCheck className="size-9 text-volt" />
        </motion.div>
        <p className="mt-8 font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
          Order confirmed
        </p>
        <h1 className="font-display mt-4 text-[14vw] leading-[0.86] uppercase md:text-[7vw]">
          You&apos;re <span className="text-stroke">locked in.</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-smoke">
          Order <span className="font-mono text-bone">{orderNumber}</span> is being
          picked and packed in Portland. A confirmation email with tracking lands in
          your inbox within the hour.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 bg-volt px-8 py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone"
          >
            Keep moving
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-3 border border-bone/25 px-8 py-4 font-display text-sm tracking-[0.14em] uppercase transition-all hover:border-volt hover:text-volt"
          >
            Back home
          </Link>
        </div>
      </section>
    );
  }

  /* ── Empty cart ──────────────────────────────────────────── */
  if (mounted && items.length === 0) {
    return (
      <section className="flex min-h-svh flex-col items-center justify-center gap-5 px-5 text-center">
        <p className="font-display text-5xl uppercase text-bone/40">Nothing to check out.</p>
        <p className="max-w-sm text-sm text-smoke">
          Your cart is empty. Load it up with something fast first.
        </p>
        <Link
          href="/shop"
          className="group mt-3 inline-flex items-center gap-3 bg-volt px-8 py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to the shop
        </Link>
      </section>
    );
  }

  /* ── Form ────────────────────────────────────────────────── */
  return (
    <section className="min-h-svh px-5 pt-32 pb-20 md:px-10 md:pt-44">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-10">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            <Lock className="size-3" /> Encrypted demo checkout
          </p>
          <h1 className="font-display mt-4 text-[14vw] leading-[0.86] uppercase md:text-[8vw]">
            Check<span className="text-stroke">out</span>
          </h1>
        </div>
        <p className="mb-2 font-mono text-[11px] tracking-[0.24em] text-smoke uppercase">
          [{String(count).padStart(2, "0")} items] — {formatPrice(total)}
        </p>
      </div>

      <form onSubmit={placeOrder} className="mt-12 grid gap-14 lg:grid-cols-[1fr_420px]">
        {/* Left — form sections */}
        <div className="space-y-12">
          <section>
            <SectionTitle icon={User} index="01" title="Contact" />
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <input required name="email" type="email" placeholder="Email address" className="field sm:col-span-2" />
              <input required name="first" placeholder="First name" className="field" />
              <input required name="last" placeholder="Last name" className="field" />
            </div>
          </section>

          <section>
            <SectionTitle icon={MapPin} index="02" title="Shipping" />
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <input required name="address" placeholder="Street address" className="field sm:col-span-2" />
              <input required name="city" placeholder="City" className="field" />
              <input required name="zip" placeholder="ZIP / Postcode" className="field" />
              <select name="country" className="field bg-ink sm:col-span-2" defaultValue="United States">
                {["United States", "Canada", "United Kingdom", "Germany", "Japan", "Australia"].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  ),
                )}
              </select>
            </div>
          </section>

          <section>
            <SectionTitle icon={CreditCard} index="03" title="Payment" />
            <p className="mt-3 flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-smoke uppercase">
              <ShieldCheck className="size-3.5 text-volt" />
              Demo mode — no real charge is made
            </p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <input
                required
                name="card"
                inputMode="numeric"
                placeholder="Card number"
                className="field sm:col-span-2"
                value={card}
                onChange={(e) =>
                  setCard(
                    e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(),
                  )
                }
              />
              <input required name="expiry" placeholder="MM / YY" className="field" maxLength={7} />
              <input required name="cvc" inputMode="numeric" placeholder="CVC" className="field" maxLength={4} />
            </div>
          </section>
        </div>

        {/* Right — summary */}
        <aside className="h-fit border border-white/10 bg-coal p-7 lg:sticky lg:top-28">
          <p className="font-display text-2xl uppercase">Your order</p>
          <ul className="mt-6 max-h-72 space-y-4 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={`${item.slug}-${item.size}`} className="flex gap-4">
                <div className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden bg-carbon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute top-0 right-0 bg-volt px-1 font-mono text-[9px] text-ink">
                    ×{item.qty}
                  </span>
                </div>
                <div className="flex flex-1 items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xs leading-snug uppercase">{item.name}</p>
                    <p className="mt-1 font-mono text-[9px] tracking-[0.16em] text-smoke uppercase">
                      {item.size}
                    </p>
                  </div>
                  <p className="font-mono text-xs">{formatPrice(item.priceCents * item.qty)}</p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-smoke">Subtotal</dt>
              <dd className="font-mono">{formatPrice(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-smoke">Shipping</dt>
              <dd className="font-mono">
                {shipping === 0 ? <span className="text-volt">Free</span> : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-4">
              <dt className="font-display text-lg uppercase">Total</dt>
              <dd className="font-display text-3xl">{formatPrice(total)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            disabled={phase === "placing"}
            className="group mt-7 flex w-full items-center justify-center gap-3 bg-volt py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone disabled:cursor-wait disabled:opacity-80"
          >
            {phase === "placing" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Locking it in…
              </>
            ) : (
              <>
                Place order — {formatPrice(total)}
              </>
            )}
          </button>
          <p className="mt-4 text-center font-mono text-[9px] tracking-[0.2em] text-smoke uppercase">
            30-day sweat-test returns · Carbon-neutral
          </p>
        </aside>
      </form>
    </section>
  );
}
