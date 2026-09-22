"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { preload } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_LUXE, EASE_SOFT } from "@/lib/animations";

const IntroContext = createContext(true);

/** True once the intro overlay has cleared (always true off the homepage). */
export const useIntroDone = () => useContext(IntroContext);

/** 800px WebP copy of the logo (63KB): the full PNG is far too heavy for a loader. */
const LOADER_LOGO = "/images/logo/dm23_logo_loader.webp";

const FORMATION_MS = 2800;
const EXIT_MS = 700;
/** Longest wait for the logo before the formation starts regardless. */
const LOGO_TIMEOUT_MS = 1200;

const COLS = 10;
const ROWS = 4;

/** Small seeded PRNG so the scatter is identical on the server and client. */
function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Each fragment starts scattered, rotated and shrunk away from its home cell,
// pushed further out the further it sits from the centre, and flies in
// centre-first so the logo forms outwards.
const FRAGMENTS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const rand = seeded(i + 23);
  const dx = (col - (COLS - 1) / 2) / ((COLS - 1) / 2);
  const dy = (row - (ROWS - 1) / 2) / ((ROWS - 1) / 2);
  return {
    col,
    row,
    x: dx * 160 + (rand() - 0.5) * 240,
    y: dy * 110 + (rand() - 0.5) * 180,
    rotate: (rand() - 0.5) * 160,
    scale: 0.3 + rand() * 0.4,
    delay: 0.1 + Math.hypot(dx, dy) * 0.2 + rand() * 0.25,
  };
});

/**
 * The DM23 logo assembling from 40 fragments of its own artwork, then a gold
 * shine (masked to the logo's shape) runs across it and the tagline settles
 * in. Transform and opacity only.
 */
function LogoFormation({ play }: { play: boolean }) {
  const maskStyle = {
    maskImage: `url(${LOADER_LOGO})`,
    WebkitMaskImage: `url(${LOADER_LOGO})`,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-[1343/420] w-64 sm:w-80 md:w-[26rem]">
        {/* Fragments: each shows its own cell of the logo image. */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={play ? { opacity: 0 } : undefined}
          transition={{ delay: 1.75, duration: 0.3 }}>
          {FRAGMENTS.map((f) => (
            <motion.span
              key={`${f.col}-${f.row}`}
              className="absolute block bg-no-repeat"
              style={{
                left: `${(f.col * 100) / COLS}%`,
                top: `${(f.row * 100) / ROWS}%`,
                width: `${100 / COLS}%`,
                height: `${100 / ROWS}%`,
                backgroundImage: `url(${LOADER_LOGO})`,
                backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                backgroundPosition: `${(f.col / (COLS - 1)) * 100}% ${(f.row / (ROWS - 1)) * 100}%`,
              }}
              initial={{ x: f.x, y: f.y, rotate: f.rotate, scale: f.scale, opacity: 0 }}
              animate={play ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 } : undefined}
              transition={{ duration: 1.15, delay: f.delay, ease: EASE_SOFT }}
            />
          ))}
        </motion.div>

        {/* The seamless logo takes over once the pieces have landed. */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : undefined}
          transition={{ delay: 1.6, duration: 0.35 }}>
          <Image src="/images/logo/dm23_logo.png" alt="" fill sizes="26rem" priority />
        </motion.div>

        {/* Gold shine, clipped to the logo's silhouette. */}
        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={maskStyle}>
          <motion.span
            className="absolute inset-y-0 -left-1/2 w-1/2"
            style={{
              background:
                "linear-gradient(100deg, transparent 20%, color-mix(in oklab, var(--site-gold-soft) 70%, white) 50%, transparent 80%)",
            }}
            initial={{ x: "0%" }}
            animate={play ? { x: "400%" } : undefined}
            transition={{ delay: 1.85, duration: 0.85, ease: EASE_LUXE }}
          />
        </span>
      </div>

      <motion.p
        className="mt-6 text-eyebrow font-semibold tracking-[0.3em] text-clay uppercase md:mt-8 md:text-eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 2, duration: 0.7, ease: EASE_SOFT }}>
        Driven Minds · Delivered Excellence
      </motion.p>
    </div>
  );
}

/**
 * Homepage intro: the logo forms from its fragments, then the overlay lifts
 * and the hero starts its own reveal. Plays on each full load of "/", never
 * on client-side navigation, and is skipped for reduced-motion users.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Decided once, from the URL of the full page load. Layout state survives
  // client-side navigation, so later visits to "/" never replay the intro.
  const [playsIntro] = useState(pathname === "/");
  const [showIntro, setShowIntro] = useState(playsIntro);
  const [done, setDone] = useState(!playsIntro);
  const [logoReady, setLogoReady] = useState(false);

  if (playsIntro) preload(LOADER_LOGO, { as: "image", type: "image/webp" });

  // Reduced motion skips the intro; otherwise lock scrolling while it plays.
  useEffect(() => {
    if (!playsIntro) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowIntro(false);
      setDone(true);
      return;
    }
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [playsIntro]);

  // Start the formation only once the logo has decoded, so fragments never
  // fly in empty. Capped, so a slow network can't stall the page.
  useEffect(() => {
    if (!playsIntro) return;
    let cancelled = false;
    const markReady = () => {
      if (!cancelled) setLogoReady(true);
    };
    const img = new window.Image();
    img.src = LOADER_LOGO;
    img.decode().then(markReady, markReady);
    const fallback = window.setTimeout(markReady, LOGO_TIMEOUT_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, [playsIntro]);

  // Timeline. Keyed only on logoReady, never on the state these timers set:
  // re-running on showIntro would clear `release` when the overlay lifts and
  // leave the header and hero hidden forever.
  useEffect(() => {
    if (!playsIntro || !logoReady) return;
    const lift = window.setTimeout(() => {
      setShowIntro(false);
      document.documentElement.style.overflow = "";
    }, FORMATION_MS);
    const release = window.setTimeout(() => setDone(true), FORMATION_MS + EXIT_MS * 0.4);
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(release);
    };
  }, [playsIntro, logoReady]);

  return (
    <IntroContext.Provider value={done}>
      {children}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            aria-hidden
            className="fixed inset-0 z-100 flex items-center justify-center bg-paper"
            exit={{ opacity: 0, y: "-4%" }}
            transition={{ duration: EXIT_MS / 1000, ease: EASE_SOFT }}>
            <LogoFormation play={logoReady} />
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
