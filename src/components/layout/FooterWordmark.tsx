"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_SOFT } from "@/lib/animations";

/** Oversized brand wordmark whose letters rise in sequence. */
export default function FooterWordmark({ text }: { text: string }) {
  // Observe the clipping line itself; the letters start below the clip,
  // where IntersectionObserver reports them as not visible.
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <p
      ref={ref}
      aria-label={text}
      className="flex justify-center overflow-hidden pb-[0.06em] font-display text-[clamp(4.5rem,18vw,18rem)] leading-[0.9] font-normal tracking-[-0.02em] whitespace-nowrap text-paper select-none">
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
