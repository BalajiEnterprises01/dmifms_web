"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Industry } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import SliderButton from "@/components/motion/SliderButton";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

// Repeating size/offset rhythm so the row reads as a staggered collage.
const SHAPES = [
  { box: "w-[72vw] sm:w-[46vw] md:w-[31vw] lg:w-[26vw]", ratio: "aspect-[4/5]", offset: "" },
  { box: "w-[58vw] sm:w-[36vw] md:w-[21vw] lg:w-[17vw]", ratio: "aspect-[3/4]", offset: "md:mt-20" },
  { box: "w-[66vw] sm:w-[40vw] md:w-[25vw] lg:w-[21vw]", ratio: "aspect-square", offset: "md:mt-44" },
];

interface IndustriesSliderProps {
  industries: Industry[];
  intro: string;
}

export default function IndustriesSlider({ industries, intro }: IndustriesSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [syncEdges]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const distance = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <section className="overflow-x-clip py-20 md:py-32">
      <div className="site-container">
        <SectionIntro
          label="Industries we serve"
          aside={
            <div className="flex gap-3">
              <SliderButton direction="prev" label="Previous industries" onClick={() => step(-1)} disabled={atStart} />
              <SliderButton direction="next" label="Next industries" onClick={() => step(1)} disabled={atEnd} />
            </div>
          }>
          {intro}
        </SectionIntro>
      </div>

      <div
        ref={trackRef}
        onScroll={syncEdges}
        data-lenis-prevent-horizontal
        className="no-scrollbar site-track mt-12 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto pb-4 md:mt-16">
        {industries.map((industry, i) => {
          const shape = SHAPES[i % SHAPES.length];
          return (
            <Link
              key={industry.id}
              data-card
              href={`/industries#${industry.slug}`}
              className={cn("group shrink-0 snap-start", shape.box, shape.offset)}>
              <Reveal delay={Math.min(i, 3) * 0.08} y={40}>
                <div className={cn("relative overflow-hidden bg-sand", shape.ratio)}>
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    sizes="(min-width: 1024px) 26vw, (min-width: 768px) 31vw, 72vw"
                    className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-[14px] font-semibold tracking-[0.12em] text-ink uppercase">
                    {industry.name}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-snug text-clay">
                    {industry.services.join(" · ")}
                  </p>
                </div>
              </Reveal>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
