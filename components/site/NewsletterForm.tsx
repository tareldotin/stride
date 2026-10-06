"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="mt-6 flex items-center gap-3 border border-volt/40 bg-volt/10 px-4 py-3">
        <Check className="size-4 text-volt" />
        <p className="font-mono text-[11px] tracking-[0.18em] text-volt uppercase">
          You&apos;re on the list. Watch your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 flex max-w-md items-end gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="field flex-1"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="group flex shrink-0 items-center gap-2 border border-bone/25 px-5 py-3 font-display text-xs tracking-[0.14em] uppercase transition-all hover:border-volt hover:bg-volt hover:text-ink"
        aria-label="Subscribe"
      >
        Join
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
