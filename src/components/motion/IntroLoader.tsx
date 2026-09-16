"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_LUXE, EASE_SOFT } from "@/lib/animations";

const IntroContext = createContext(true);

/** True once the intro overlay has cleared (always true off the homepage). */
export const useIntroDone = () => useContext(IntroContext);

const SWEEP_MS = 2100;
const EXIT_MS = 700;

/**
 * Homepage intro: the logo appears, a disc sweeps across it (inverting the
 * colours underneath via mix-blend-difference), then the overlay lifts and
 * the hero starts its own reveal. Plays on each full load of "/", never on
 * client-side navigation, and is skipped for reduced-motion users.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Decided once, from the URL of the full page load. Layout state survives
  // client-side navigation, so later visits to "/" never replay the intro.
  const [playsIntro] = useState(pathname === "/");
  const [showIntro, setShowIntro] = useState(playsIntro);
  const [done, setDone] = useState(!playsIntro);

  // Mount-only: both timers must survive the showIntro change they cause.
  // (Keying this effect on showIntro would clear `release` when the overlay
  // lifts, leaving the header and hero hidden forever.)
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
    const lift = window.setTimeout(() => {
      setShowIntro(false);
      root.style.overflow = "";
    }, SWEEP_MS);
    const release = window.setTimeout(() => setDone(true), SWEEP_MS + EXIT_MS * 0.4);
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(release);
      root.style.overflow = "";
    };
  }, [playsIntro]);

  return (
    <IntroContext.Provider value={done}>
      {children}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            aria-hidden
            className="fixed inset-0 z-100 flex items-center justify-center bg-paper"
            exit={{ opacity: 0 }}
            transition={{ duration: EXIT_MS / 1000, ease: EASE_SOFT }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, -10] }}
              transition={{ duration: SWEEP_MS / 1000, times: [0, 0.2, 0.8, 1], ease: EASE_SOFT }}>
              <Image
                src="/images/logo/header_logo.png"
                alt=""
                width={730}
                height={254}
                priority
                className="h-auto w-52 md:w-72"
              />
            </motion.div>
            {/* Direct child of the overlay, so it blends against the paper
                background as well as the logo (a transformed wrapper would
                isolate the blend and show the disc's raw colour). */}
            <motion.span
              className="pointer-events-none absolute top-1/2 left-1/2 -mt-[clamp(48px,6vw,80px)] -ml-[clamp(48px,6vw,80px)] size-[clamp(96px,12vw,160px)] rounded-full bg-sweep mix-blend-difference"
              initial={{ x: "-170%", opacity: 0 }}
              animate={{ x: "170%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, delay: 0.3, ease: EASE_LUXE }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
