"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import type { Service, ServiceCategory } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_SOFT } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Filter = ServiceCategory | "all";

interface FilterOption {
  id: Filter;
  label: string;
  count: number;
}

interface ServicesIndexProps {
  /** Active services, already sorted. */
  services: Service[];
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Category filter over an editorial list of services. The filter lives in
 * `?category=` so deep links (homepage, footer) keep working; switching
 * rewrites the URL in place without a navigation or history entry. On
 * hover-capable pointers the row's photo trails the cursor; touch devices
 * get a small thumbnail on each row instead.
 */
export default function ServicesIndex({ services }: ServicesIndexProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // "All" first, then categories in first-seen order.
  const options = services.reduce<FilterOption[]>(
    (list, service) => {
      const option = list.find((o) => o.id === service.category);
      if (option) option.count += 1;
      else list.push({ id: service.category, label: service.categoryLabel, count: 1 });
      return list;
    },
    [{ id: "all", label: "All Services", count: services.length }],
  );

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

  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const followX = useSpring(x, { stiffness: 160, damping: 22, mass: 0.5 });
  const followY = useSpring(y, { stiffness: 160, damping: 22, mass: 0.5 });

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  // Start the preview under the cursor instead of springing in from a corner.
  const enter = (e: React.PointerEvent<HTMLDivElement>) => {
    track(e);
    followX.jump(x.get());
    followY.jump(y.get());
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
                    "group relative py-3 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-500",
                    selected ? "text-ink" : "text-clay hover:text-ink",
                  )}>
                  {option.label}
                  <span className="ml-1 align-top text-[9px] font-medium tracking-normal text-tan tabular-nums">
                    {pad(option.count)}
                  </span>
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

      <div
        ref={wrapRef}
        onPointerEnter={enter}
        onPointerMove={track}
        onPointerLeave={() => setHovered(null)}
        className="relative mt-12 md:mt-16">
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
              <li key={service.id} onPointerEnter={() => setHovered(service.id)}>
                <Link
                  href={`/services/${service.slug}?category=${service.category}`}
                  className="group block border-t border-ink/10">
                  <Reveal
                    delay={Math.min(i, 5) * 0.06}
                    y={24}
                    className="grid grid-cols-12 items-start gap-x-6 gap-y-4 py-8 md:py-10">
                    <span
                      className={cn(
                        "col-span-2 text-[11px] text-tan tabular-nums md:col-span-1",
                        showCategory ? "pt-px" : "pt-1.5 md:pt-2.5",
                      )}>
                      ({pad(i + 1)})
                    </span>

                    <div className="col-span-10 flex items-start justify-between gap-5 md:col-span-6 lg:col-span-5">
                      <div className="min-w-0">
                        {showCategory && (
                          <p className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">
                            {service.categoryLabel}
                          </p>
                        )}
                        {/* Wrap between words only; a phone-width title column
                            is too narrow for text-2xl ("HOUSEKEEPIN/G"). */}
                        <h3 className="text-xl leading-[1.1] font-normal tracking-[-0.02em] text-ink uppercase transition-colors duration-500 group-hover:text-clay sm:text-2xl md:text-[2rem]">
                          {service.title}
                        </h3>
                      </div>
                      <div className="relative aspect-[4/3] w-20 shrink-0 overflow-hidden bg-sand max-[359px]:hidden sm:w-32 pointer-fine:hidden">
                        <Image
                          src={service.image}
                          alt=""
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <p
                      className={cn(
                        "col-span-10 col-start-3 max-w-md text-[15px] leading-[1.7] text-clay md:col-span-4 md:col-start-auto",
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

        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-10 hidden aspect-[4/3] w-[clamp(240px,22vw,360px)] overflow-hidden bg-sand pointer-fine:block"
          style={{ x: followX, y: followY, translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: EASE_SOFT }}>
          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                hovered === service.id ? "opacity-100" : "opacity-0",
              )}>
              <Image src={service.image} alt="" fill sizes="360px" className="object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
