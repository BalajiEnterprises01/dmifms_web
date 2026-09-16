"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { HeroData } from "@/types";
import { useIntroDone } from "@/components/motion/IntroLoader";
import { MaskLine } from "@/components/motion/Reveal";
import BracketButton from "@/components/motion/BracketButton";
import { EASE_LUXE, EASE_SOFT } from "@/lib/animations";
import { cn } from "@/lib/utils";

const SLIDE_MS = 6500;
const pad = (n: number) => String(n).padStart(2, "0");

export default function HomeHero({ data }: { data: HeroData }) {
  const ready = useIntroDone();
  const slides = data.slides;
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  // A paper-coloured shutter rises from the bottom as the hero scrolls
  // away, so the frame appears to shorten.
  const shutterY = useTransform(scrollYProgress, [0, 1], ["100%", "45%"]);

  const goTo = (next: number) => {
    setPrevious(index);
    setIndex((next + slides.length) % slides.length);
  };

  // Auto-advance; any manual change restarts the timer via `index`.
  useEffect(() => {
    if (!ready || slides.length < 2) return;
    const id = window.setTimeout(() => {
      setPrevious(index);
      setIndex((index + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [ready, index, slides.length]);

  const slide = slides[index];

  return (
    <section ref={sectionRef} className="site-container pt-28 pb-20 md:pt-36 md:pb-32">
      <div className="grid grid-cols-12 items-start gap-x-6 gap-y-6">
        <h1 className="col-span-12 text-[clamp(2.4rem,5.6vw,6rem)] leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase lg:col-span-9">
          <MaskLine play={ready} delay={0.15}>
            {data.title}
          </MaskLine>
          <MaskLine play={ready} delay={0.25}>
            {data.titleAccent}
          </MaskLine>
        </h1>
        <motion.div
          className="col-span-12 lg:col-span-3 lg:justify-self-end lg:pt-3 lg:text-right"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.7, ease: EASE_SOFT }}>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-ink uppercase">
            {data.subtitle}
          </p>
          <p className="mt-2 text-[11px] font-medium tracking-[0.18em] text-clay uppercase">
            {data.badge}
          </p>
        </motion.div>
      </div>

      {/* Image band */}
      <div className="relative mt-10 h-[46svh] overflow-hidden bg-sand md:mt-14 md:h-[64svh]">
        <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
          {slides.map((s, i) => (
            <div
              key={s.image + i}
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1400ms] ease-soft",
                i === index ? "z-20 opacity-100" : i === previous ? "z-10 opacity-100" : "z-0 opacity-0",
              )}>
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className={cn(
                  "object-cover transition-transform duration-[7000ms] ease-out",
                  i === index ? "scale-100" : "scale-110",
                )}
              />
            </div>
          ))}
        </motion.div>
        <motion.div aria-hidden className="absolute inset-0 z-30 bg-paper" style={{ y: shutterY }} />
        {/* Opening curtains */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 z-40 h-[50.5%] bg-paper"
          initial={{ y: "0%" }}
          animate={ready ? { y: "-100%" } : undefined}
          transition={{ duration: 1.5, delay: 0.35, ease: EASE_LUXE }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-40 h-[50.5%] bg-paper"
          initial={{ y: "0%" }}
          animate={ready ? { y: "100%" } : undefined}
          transition={{ duration: 1.5, delay: 0.35, ease: EASE_LUXE }}
        />
      </div>

      {/* Caption row */}
      <motion.div
        className="mt-6 grid grid-cols-12 items-start gap-x-6 gap-y-5 md:mt-8"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1, delay: 1.1, ease: EASE_SOFT }}>
        <div className="col-span-6 flex items-center gap-4 pt-1 md:col-span-3">
          <span className="text-[11px] font-medium tracking-[0.16em] text-clay tabular-nums">
            <span className="text-ink">{pad(index + 1)}</span> / {pad(slides.length)}
          </span>
          <span className="relative h-px w-16 overflow-hidden bg-ink/15 md:w-24">
            <motion.span
              key={index}
              className="absolute inset-0 origin-left bg-gold"
              initial={{ scaleX: 0 }}
              animate={ready ? { scaleX: 1 } : undefined}
              transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
            />
          </span>
        </div>

        <div className="col-span-6 -mt-3 flex justify-end md:order-last md:col-span-2">
          <BracketButton direction="prev" label="Previous slide" onClick={() => goTo(index - 1)} />
          <BracketButton direction="next" label="Next slide" onClick={() => goTo(index + 1)} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-4 md:col-span-7"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease: EASE_SOFT }}>
            <div className="col-span-12 md:col-span-6">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">
                {slide.subtitle}
              </p>
              <p className="mt-2 text-xl leading-tight tracking-[-0.02em] text-ink uppercase md:text-2xl">
                {slide.title}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6">
              {slide.description && (
                <p className="text-[15px] leading-[1.7] text-clay">{slide.description}</p>
              )}
              {slide.cta_href && slide.cta_label && (
                <Link href={slide.cta_href} className="btn-primary mt-6">
                  {slide.cta_label} <span aria-hidden>↗</span>
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
