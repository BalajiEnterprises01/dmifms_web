"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import SliderButton from "@/components/motion/SliderButton";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_SOFT } from "@/lib/animations";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  if (items.length === 0) return null;

  const total = items.length;
  const current = items[index];
  const next = items[(index + 1) % total];
  const go = (dir: 1 | -1) => setIndex((index + dir + total) % total);

  const fade = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.55, ease: EASE_SOFT },
  };

  return (
    <section className="site-container py-20 md:py-32">
      <SectionIntro label="Client voices" />

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-16">
        <Reveal className="col-span-12 flex flex-col justify-between gap-8 lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              {...fade}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[13px] font-semibold tracking-[0.16em] uppercase">
              <span className="text-ink">{current.author}</span>
              <span className="text-tan">·</span>
              <span className="text-clay">{current.company}</span>
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-3">
            <SliderButton direction="prev" label="Previous testimonial" onClick={() => go(-1)} />
            <span className="w-16 text-center text-[12px] font-medium text-clay tabular-nums">
              <span className="text-ink">{pad(index + 1)}</span> / {pad(total)}
            </span>
            <SliderButton direction="next" label="Next testimonial" onClick={() => go(1)} />
          </div>
        </Reveal>

        <div className="col-span-12 lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.figure key={current.id} {...fade}>
              <blockquote className="text-[clamp(1.375rem,2.6vw,2.375rem)] leading-[1.18] tracking-[-0.025em] text-ink">
                “{current.quote}”
              </blockquote>
              <figcaption className="mt-8 grid max-w-md grid-cols-2 gap-6 border-t border-ink/10 pt-6">
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.16em] text-clay uppercase">Role</p>
                  <p className="mt-1.5 text-[15px] text-ink">{current.author}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.16em] text-clay uppercase">Organisation</p>
                  <p className="mt-1.5 text-[15px] text-ink">{current.company}</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="col-span-12 mt-4 grid grid-cols-12 gap-x-6">
          <div className="relative col-span-12 h-64 overflow-hidden bg-sand md:col-span-8 md:h-[40svh]">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: EASE_SOFT }}>
                <Image src={current.image} alt="" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="group relative col-span-4 hidden h-[40svh] overflow-hidden bg-sand md:block">
            <Image
              src={next.image}
              alt=""
              fill
              sizes="33vw"
              className="object-cover opacity-70 transition-[opacity,transform] duration-700 ease-soft group-hover:scale-105 group-hover:opacity-100"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
