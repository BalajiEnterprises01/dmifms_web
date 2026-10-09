"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Service, ServiceCategory, ServiceSection } from "@/types";
import { serviceHref } from "@/lib/service-links";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_SOFT } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Filter = ServiceCategory | "all";

interface FilterOption {
  id: Filter;
  label: string;
}

interface ServicesIndexProps {
  /** Active services, already sorted. */
  services: Service[];
  /** The four sections, in display order: drives the filter and the links. */
  sections: ServiceSection[];
}

/**
 * Category filter over an editorial list of services. The filter lives in
 * `?category=` so deep links (homepage, footer) keep working; switching
 * rewrites the URL in place without a navigation or history entry. Each
 * row carries its own thumbnail.
 */
export default function ServicesIndex({ services, sections }: ServicesIndexProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // "All" first, then the four sections in their own order.
  const options: FilterOption[] = [
    { id: "all", label: "All Services" },
    ...sections.map((s) => ({ id: s.id, label: s.label })),
  ];

  const requested = searchParams.get("category");
  const active: Filter = options.find((o) => o.id === requested)?.id ?? "all";
  const visible = active === "all" ? services : services.filter((s) => s.category === active);
  const showCategory = active === "all";

  const select = (id: Filter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("category");
    else params.set("category", id);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  return (
    <section className="site-container py-20 md:py-32">
      <SectionIntro
        label="Service index"
        aside={
          <div
            role="group"
            aria-label="Filter services by category"
            className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end md:gap-x-8">
            {options.map((option) => {
              const selected = option.id === active;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="services-list"
                  onClick={() => select(option.id)}
                  className={cn(
                    "group relative py-3 text-eyebrow font-semibold tracking-[0.16em] uppercase transition-colors duration-500",
                    selected ? "text-ink" : "text-clay hover:text-ink",
                  )}>
                  {option.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-1.5 h-px origin-left bg-current transition-transform duration-700 ease-luxe",
                      selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </button>
              );
            })}
          </div>
        }
      />

      <p aria-live="polite" className="sr-only">
        {`${visible.length} ${visible.length === 1 ? "service" : "services"} shown`}
      </p>

      <div className="relative mt-12 md:mt-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={active}
            id="services-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SOFT }}
            className="border-b border-ink/10">
            {visible.map((service, i) => (
              <li key={service.id}>
                <Link
                  href={`${serviceHref(service, sections)}?category=${service.category}`}
                  className="group block border-t border-ink/10">
                  <Reveal
                    delay={Math.min(i, 5) * 0.06}
                    y={24}
                    className="grid grid-cols-12 items-start gap-x-6 gap-y-4 py-8 md:py-10">
                    <div className="col-span-12 flex items-start justify-between gap-5 md:col-span-7 lg:col-span-6">
                      <div className="min-w-0">
                        {showCategory && (
                          <p className="mb-3 text-eyebrow font-semibold tracking-[0.16em] text-clay uppercase">
                            {service.categoryLabel}
                          </p>
                        )}
                        {/* Wrap between words only; a phone-width title column
                            is too narrow for text-2xl ("HOUSEKEEPIN/G"). */}
                        <h3 className="text-xl leading-[1.1] font-normal tracking-[-0.02em] text-ink uppercase transition-colors duration-500 group-hover:text-clay sm:text-2xl md:text-row">
                          {service.title}
                        </h3>
                      </div>
                      {service.image && (
                        <div className="relative aspect-[4/3] w-20 shrink-0 overflow-hidden bg-sand max-[359px]:hidden sm:w-32">
                          <Image
                            src={service.image}
                            alt=""
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <p
                      className={cn(
                        "col-span-12 max-w-md text-body leading-[1.7] text-clay md:col-span-4",
                        showCategory ? "md:pt-8" : "md:pt-1",
                      )}>
                      {service.shortDescription}
                    </p>

                    <span
                      aria-hidden
                      className={cn(
                        "hidden justify-end text-xl leading-none text-ink transition-transform duration-500 ease-soft group-hover:translate-x-1 group-hover:-translate-y-1 md:col-span-1 md:flex lg:col-span-2",
                        showCategory ? "md:pt-8" : "md:pt-2",
                      )}>
                      ↗
                    </span>
                  </Reveal>
                </Link>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
