"use client";

import Link from "next/link";
import type { Service, ServiceCategory } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";

export interface CategoryGroup {
  id: ServiceCategory;
  /** Section page slug, e.g. "soft-services". */
  slug: string;
  label: string;
  services: Service[];
}

interface CategoryIndexProps {
  categories: CategoryGroup[];
  intro: string;
}

/** Oversized category names, one row per category. */
export default function CategoryIndex({ categories, intro }: CategoryIndexProps) {
  return (
    <section className="site-container py-20 md:py-32">
      <SectionIntro label="Four service sections">{intro}</SectionIntro>

      <ul className="relative mt-12 border-b border-ink/10 md:mt-16">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/solutions/${category.slug}`}
              className="group grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink/10 py-10 md:py-14">
              <Reveal className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-6 lg:col-start-4">
                <h3 className="text-heading leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase transition-colors duration-500 group-hover:text-clay">
                  ({category.label})
                </h3>
                <p className="mt-6 max-w-xl text-body leading-[1.7] text-clay">
                  {category.services.map((s) => s.title).join(" · ")}
                </p>
              </Reveal>
              <span className="col-span-3 hidden items-start justify-end pt-5 text-eyebrow font-semibold tracking-[0.16em] text-ink uppercase lg:flex">
                View section <span aria-hidden className="ml-2">↗</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
