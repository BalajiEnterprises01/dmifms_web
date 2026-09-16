"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { EASE_SOFT } from "@/lib/animations";

interface CounterProps {
  value: number;
  className?: string;
  duration?: number;
}

const format = (n: number) => Math.round(n).toLocaleString("en-IN");

/**
 * Counts up from zero the first time it scrolls into view. The server
 * renders the final value (meaningful without JS); the text node is then
 * driven imperatively so React never re-renders it mid-count.
 */
export default function Counter({ value, className, duration = 2.2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!inView) {
      node.textContent = "0";
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_SOFT,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span className={className}>
      <span ref={ref}>{format(value)}</span>
    </span>
  );
}
