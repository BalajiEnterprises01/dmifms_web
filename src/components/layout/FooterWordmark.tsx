"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_SOFT } from "@/lib/animations";

/** Oversized brand wordmark whose letters rise in sequence. */
export default function FooterWordmark({ text }: { text: string }) {
  // Observe the clipping line itself — the letters start below the clip,
  // where IntersectionObserver reports them as not visible.
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <p
      ref={ref}
      aria-label={text}
      className="flex overflow-hidden text-[clamp(3.5rem,15.5vw,15.5rem)] leading-[0.85] font-normal tracking-[-0.05em] whitespace-nowrap text-paper select-none">
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : undefined}
          transition={{ duration: 1.2, delay: i * 0.05, ease: EASE_SOFT }}>
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </p>
  );
}
