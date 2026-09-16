"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Service } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import BracketButton from "@/components/motion/BracketButton";
import { EASE_LUXE, EASE_SOFT } from "@/lib/animations";

const pad = (n: number) => String(n).padStart(2, "0");
const IMAGE_SIZES = "(min-width: 1024px) 50vw, 100vw";

// The incoming photo slides over the outgoing one, which drifts slightly
// the other way for depth. zIndex switches instantly on exit.
const imageVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", zIndex: 1 }),
  center: { x: "0%", zIndex: 1, transition: { duration: 1.1, ease: EASE_LUXE } },
  exit: (dir: number) => ({
    x: dir > 0 ? "-25%" : "25%",
    zIndex: 0,
    transition: { x: { duration: 1.1, ease: EASE_LUXE }, zIndex: { duration: 0 } },
  }),
};

interface ServicesShowcaseProps {
  services: Service[];
  intro: string;
}

/** One service at a time: large photo, feature grid and description. */
export default function ServicesShowcase({ services, intro }: ServicesShowcaseProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const total = services.length;
  const service = services[index];
  const upcoming = services[(index + 1) % total];

  const go = (dir: 1 | -1) => setState([(index + dir + total) % total, dir]);

  return (
    <section className="site-container py-20 md:py-32">
      <SectionIntro
        label="Our services"
        aside={
          <Link href="/services" className="link-wipe">
            All services <span aria-hidden>↗</span>
          </Link>
        }>
        {intro}
      </SectionIntro>

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-16">
        <div className="col-span-12 lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden bg-sand lg:aspect-auto lg:h-[min(76svh,780px)]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={service.id}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0">
                <Image src={service.image} alt={service.title} fill sizes={IMAGE_SIZES} className="object-cover" />
              </motion.div>
            </AnimatePresence>
            {/* Warm the cache for the next photo so it never slides in blank. */}
            <div aria-hidden className="pointer-events-none absolute size-px overflow-hidden opacity-0">
              <Image src={upcoming.image} alt="" fill sizes={IMAGE_SIZES} loading="eager" />
            </div>
          </div>
        </div>

        <div className="col-span-12 flex flex-col lg:col-span-6 lg:pl-6">
          <div className="flex items-start justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={service.categoryLabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pt-1 text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">
                {service.categoryLabel}
              </motion.p>
            </AnimatePresence>
            <div className="-mt-3 flex items-center">
              <BracketButton direction="prev" label="Previous service" onClick={() => go(-1)} />
              <span className="w-16 text-center text-[11px] font-medium text-clay tabular-nums">
                <span className="text-ink">{pad(index + 1)}</span> / {pad(total)}
              </span>
              <BracketButton direction="next" label="Next service" onClick={() => go(1)} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: EASE_SOFT }}
              className="mt-10 lg:mt-auto">
              <h3 className="text-[clamp(2rem,3.6vw,3.5rem)] leading-[0.98] font-normal tracking-[-0.035em] text-ink uppercase">
                {service.title}
              </h3>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-ink/10 pt-8 sm:grid-cols-3">
                {service.features.map((feature, i) => (
                  <div key={feature}>
                    <dt className="text-[10px] font-semibold tracking-[0.16em] text-tan uppercase tabular-nums">
                      ({pad(i + 1)})
                    </dt>
                    <dd className="mt-2 text-sm leading-snug text-ink">{feature}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-10 max-w-lg text-[15px] leading-[1.7] text-clay">{service.description}</p>
              <Link
                href={`/services/${service.slug}`}
                aria-label={`View ${service.title} service details`}
                className="btn-primary mt-10">
                View service details <span aria-hidden>↗</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
