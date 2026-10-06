"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cx } from "@/lib/format";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={active}
            src={images[active]}
            alt={name}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.24em] text-bone/80">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            className={cx(
              "relative aspect-square overflow-hidden border bg-carbon transition-all",
              active === i ? "border-volt" : "border-white/10 opacity-60 hover:opacity-100",
            )}
            aria-label={`View image ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
