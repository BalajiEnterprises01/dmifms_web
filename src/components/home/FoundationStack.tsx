"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionIntro from "@/components/common/SectionIntro";
import { cn } from "@/lib/utils";

export interface FoundationCard {
  id: string;
  heading: string;
  lead?: string;
  points: string[];
  image: string;
  href?: string;
  hrefLabel?: string;
}

interface FoundationStackProps {
  intro: string;
  cards: FoundationCard[];
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Sticky cards that stack as you scroll: each new card slides over the
 * last, which recedes (scale) and dims (opacity overlay). Plain stacked
 * cards below md.
 */
export default function FoundationStack({ intro, cards }: FoundationStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="py-20 md:py-32">
      <div className="site-container">
        <SectionIntro label="How we deliver">{intro}</SectionIntro>
      </div>

      <div ref={containerRef} className="site-container mt-12 flex flex-col gap-16 md:mt-16 md:gap-0">
        {cards.map((card, i) => (
          <StackCard key={card.id} card={card} index={i} total={cards.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

interface StackCardProps {
  card: FoundationCard;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const STACK_QUERY = "(min-width: 768px)";

const subscribeStacking = (onChange: () => void) => {
  const query = window.matchMedia(STACK_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** Cards only stick (and so only recede) from md up; false on the server. */
function useStacking() {
  return useSyncExternalStore(
    subscribeStacking,
    () => window.matchMedia(STACK_QUERY).matches,
    () => false,
  );
}

function StackCard({ card, index, total, progress }: StackCardProps) {
  const stacking = useStacking();
  const cardsAbove = total - 1 - index;
  // Recede only once the next card starts covering this one, so the card
  // being read always stays crisp. The last card never recedes.
  const start = Math.min((index + 0.5) / total, 1);
  const scale = useTransform(progress, [start, 1], [1, 1 - cardsAbove * 0.03]);
  const dim = useTransform(progress, [start, 1], [0, Math.min(cardsAbove * 0.05, 0.12)]);
  const imageFirst = index % 2 === 1;

  return (
    <div
      className="md:sticky md:h-[min(84svh,820px)] md:pb-6"
      style={{ top: `calc(6.5rem + ${index * 1.25}rem)` }}>
      <motion.article
        style={stacking ? { scale } : undefined}
        className="relative h-full origin-top overflow-hidden bg-paper shadow-[0_-40px_60px_-50px] shadow-night/30">
        <div className="grid h-full grid-cols-12 gap-x-6 gap-y-8 border-t border-ink/15 pt-8 md:pt-10">
          <div className={cn("col-span-12 flex flex-col md:col-span-6", imageFirst && "md:order-last md:pl-6")}>
            <div className="flex items-start gap-5 md:gap-8">
              <span className="text-4xl leading-none font-light tracking-[-0.04em] text-ink tabular-nums md:text-5xl">
                ({pad(index + 1)})
              </span>
              <h3 className="max-w-[16ch] pt-1 text-xs leading-[1.6] font-bold tracking-[0.14em] text-ink uppercase md:text-sm">
                {card.heading}
              </h3>
            </div>
            {card.lead && (
              <p className="mt-8 max-w-md text-[15px] leading-[1.7] text-clay md:mt-10">{card.lead}</p>
            )}
            {card.points.length > 0 && (
              <ul className="mt-8 grid max-w-xl grid-cols-1 gap-x-6 sm:grid-cols-2">
                {card.points.map((point, p) => (
                  <li key={point} className="flex gap-4 border-t border-ink/10 py-3 text-sm leading-snug text-ink">
                    <span className="pt-px text-[10px] text-tan tabular-nums">{pad(p + 1)}</span>
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {card.href && (
              <Link href={card.href} className="btn-primary mt-8 self-start md:mt-auto">
                {card.hrefLabel ?? "Learn more"} <span aria-hidden>↗</span>
              </Link>
            )}
          </div>
          <div className="relative col-span-12 h-72 overflow-hidden bg-sand sm:h-96 md:col-span-6 md:h-full">
            <Image src={card.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
        {stacking && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-night" style={{ opacity: dim }} />
        )}
      </motion.article>
    </div>
  );
}
