import { Variants } from "framer-motion";

type CubicBezier = [number, number, number, number];

/** Slow-in / slow-out curve for curtains, wipes and slides (public site). */
export const EASE_LUXE: CubicBezier = [0.76, 0, 0.24, 1];
/** Long, soft deceleration for fades and rises (public site). */
export const EASE_SOFT: CubicBezier = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 250,
  damping: 25,
};

export const smoothTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};
