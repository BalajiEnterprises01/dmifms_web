"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Service, ServiceCategory } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_SOFT } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface CategoryGroup {
  id: ServiceCategory;
  label: string;
  services: Service[];
}

interface CategoryIndexProps {
  categories: CategoryGroup[];
  intro: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Oversized category names. On hover-capable pointers a photo from the
 * category trails the cursor (spring-smoothed transform).
 */
export default function CategoryIndex({ categories, intro }: CategoryIndexProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<ServiceCategory | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const followX = useSpring(x, { stiffness: 160, damping: 22, mass: 0.5 });
  const followY = useSpring(y, { stiffness: 160, damping: 22, mass: 0.5 });

  const track = (e: React.PointerEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section className="site-container py-20 md:py-32">
      <SectionIntro label="Three core categories">{intro}</SectionIntro>

      <ul
        ref={listRef}
        onPointerMove={track}
        onPointerLeave={() => setActive(null)}
        className="relative mt-12 border-b border-ink/10 md:mt-16">
        {categories.map((category, i) => (
          <li key={category.id} onPointerEnter={() => setActive(category.id)}>
            <Link
              href={`/services?category=${category.id}`}
              className="group grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink/10 py-10 md:py-14">
              <span className="col-span-2 pt-2 text-[11px] text-tan tabular-nums md:col-span-3 md:pt-4">
                {pad(i + 1)}
              </span>
              <Reveal className="col-span-10 md:col-span-9 lg:col-span-6">
                <h3 className="text-[clamp(2rem,4.8vw,4.75rem)] leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase transition-colors duration-500 group-hover:text-clay">
                  ({category.label})
                </h3>
                <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-clay">
                  {category.services.map((s) => s.title).join(" · ")}
                </p>
              </Reveal>
              <span className="col-span-3 hidden items-start justify-end pt-5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase lg:flex">
                {pad(category.services.length)} services <span aria-hidden className="ml-2">↗</span>
              </span>
            </Link>
          </li>
        ))}

        <motion.li
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-10 hidden aspect-[4/5] w-[clamp(220px,19vw,320px)] overflow-hidden pointer-fine:block"
          style={{ x: followX, y: followY, translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: EASE_SOFT }}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                active === category.id ? "opacity-100" : "opacity-0",
              )}>
              {category.services[0] && (
                <Image
                  src={category.services[0].image}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </motion.li>
      </ul>
    </section>
  );
}
