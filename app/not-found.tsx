import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
        Error 404 — Off the beaten path
      </p>
      <h1 className="font-display mt-6 text-[22vw] leading-none uppercase md:text-[12rem]">
        <span className="text-stroke">4</span>0<span className="text-stroke">4</span>
      </h1>
      <p className="mt-6 max-w-sm text-sm text-smoke">
        This page hit the wall before you did. Let&apos;s get you back on route.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-3 bg-volt px-8 py-4 font-display text-sm tracking-[0.14em] text-ink uppercase transition-colors hover:bg-bone"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to base
      </Link>
    </section>
  );
}
