"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_SOFT } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Rise distance in px. */
  y?: number;
  duration?: number;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
}

/** Fade + rise when scrolled into view. Plays once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 1,
  amount = 0.25,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_SOFT }}>
      {children}
    </motion.div>
  );
}

interface MaskLineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Drive the reveal manually (e.g. after the intro) instead of on scroll. */
  play?: boolean;
}

/**
 * Text that slides up from behind an invisible mask — the headline
 * treatment used across the site. Wrap each visual line separately.
 */
export function MaskLine({ children, className, delay = 0, play }: MaskLineProps) {
  // Observe the visible mask, not the text: the text starts translated
  // outside the overflow clip, so IntersectionObserver would never see it.
  const maskRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(maskRef, { once: true, amount: 0.5 });
  const shown = play ?? inView;

  return (
    <span ref={maskRef} className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={shown ? { y: "0%" } : undefined}
        transition={{ duration: 1.1, delay, ease: EASE_SOFT }}>
        {children}
      </motion.span>
    </span>
  );
}

interface RuleProps {
  className?: string;
  delay?: number;
}

/** Hairline divider that draws in from the left. */
export function Rule({ className, delay = 0 }: RuleProps) {
  return (
    <motion.div
      aria-hidden
      className={cn("h-px w-full origin-left bg-ink/15", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.4, delay, ease: EASE_SOFT }}
    />
  );
}
