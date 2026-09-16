"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Inertial smooth scrolling for the public site. Lenis drives the native
 * window scroll, so framer-motion's useScroll and CSS `position: sticky`
 * keep working. Disabled entirely for prefers-reduced-motion users, who
 * also get transform animations stripped via MotionConfig.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
      autoRaf: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis keeps its own scroll target; reset it on route change so a new
  // page doesn't inherit momentum from the previous one. Deep links such as
  // /industries#pharma-healthcare land on their anchor instead of the top.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) {
      lenis.scrollTo(target, { immediate: true, force: true, offset: -96 });
    } else {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
