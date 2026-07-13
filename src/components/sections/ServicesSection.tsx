"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import { Service } from "@/types";

const categoryConfig = {
  facility: {
    label: "Facility Services",
    tagline:
      "Core environment & building care. Maintaining the foundation of your business.",
    color: "#3B82F6",
    bgImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop",
    href: "/services?category=facility",
  },
  operational: {
    label: "Operational Services",
    tagline:
      "Day-to-day business support. Keeping your operations smooth and efficient.",
    color: "#0EA5E9",
    bgImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop",
    href: "/services?category=operational",
  },
  business: {
    label: "Business Services",
    tagline:
      "HR, staffing & compliance. Empowering your workforce and managing risks.",
    color: "#10B981",
    bgImage:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
    href: "/services?category=business",
  },
} as const;

type CategoryKey = keyof typeof categoryConfig;

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const active = services
    .filter((s) => s.status)
    .sort((a, b) => a.order - b.order);

  const byCategory: Record<CategoryKey, Service[]> = {
    facility: active.filter((s) => s.category === "facility"),
    operational: active.filter((s) => s.category === "operational"),
    business: active.filter((s) => s.category === "business"),
  };
  const categoryCounts: Record<CategoryKey, string> = {
    facility: `${byCategory.facility.length} Services`,
    operational: `${byCategory.operational.length} Services`,
    business: `${byCategory.business.length} Services`,
  };

  return (
    <section className="py-10 bg-[#F8F9FA] relative">
      <div className="container-max section-padding">
        <div className="relative max-w-7xl mx-auto">
          {/* ── TOP: Sticky Header (Like IndustriesSection) ── */}
          <div className="lg:sticky lg:top-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pt-10 pb-16 lg:pb-20 z-0">
            <div className="max-w-2xl text-left">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-[#EAB308]" />
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Our Core Expertise
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-serif font-medium text-[#0A192F] leading-[1.1] tracking-tight">
                  Three Categories.
                  <br />
                  Complete Coverage.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal
              direction="up"
              delay={0.2}
              className="text-left lg:text-left">
              <div className="max-w-md flex flex-col gap-6 lg:pb-2 ">
                <p className="text-slate-600 text-[18px] leading-relaxed font-medium">
                  From repairs and installations to preventative maintenance,
                  we&apos;ve got you covered. Choose reliability, choose DM23.
                </p>
                <div className="hidden lg:flex items-center gap-8">
                  <Link
                    href="/services"
                    className="text-[15px] font-bold text-[#0A192F] flex items-center gap-1 hover:gap-2 hover:text-[#EAB308] transition-all">
                    View All Services <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── BOTTOM: Stacked Cards ── */}
          <div className="flex flex-col gap-8 lg:gap-0 w-full relative z-10">
            {(["facility", "operational", "business"] as CategoryKey[]).map(
              (cat, i) => {
                const config = categoryConfig[cat];
                const catServices = byCategory[cat];

                return (
                  <div
                    key={cat}
                    className="lg:sticky w-full"
                    style={{ top: `calc(5rem + ${i * 2.5}rem)` }}>
                    <ScrollReveal
                      direction="up"
                      delay={0.1}
                      className="w-full h-full lg:min-h-[250px] lg:mb-12">
                      {/* The Card */}
                      <div className="bg-white p-6 md:p-8 lg:p-12 shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-slate-100/80 hover:shadow-[0_25px_50px_rgb(0,0,0,0.12)] transition-all duration-500 flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 h-full items-center relative overflow-hidden group">
                        {/* Left: Text Content */}
                        <div className="lg:w-1/2 flex flex-col justify-center w-full z-10 h-full py-4 text-left">
                          <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-6 w-max shadow-sm">
                            {categoryCounts[cat]}
                          </div>

                          <h3 className="text-3xl lg:text-[2.5rem] font-bold text-[#111] mb-4 tracking-tight leading-tight">
                            {config.label}
                          </h3>

                          <p className="text-slate-500 text-lg leading-relaxed mb-8">
                            {config.tagline}
                          </p>

                          <div className="flex flex-col gap-4 mb-10">
                            {catServices.slice(0, 4).map((svc) => (
                              <div
                                key={svc.id}
                                className="flex items-start gap-3">
                                <div className="mt-1 shrink-0 bg-slate-50 p-1 rounded-full">
                                  <CheckCircle2 className="w-5 h-5 text-[#EAB308]" />
                                </div>
                                <span className="text-slate-700 font-medium leading-snug">
                                  {svc.title}
                                </span>
                              </div>
                            ))}
                          </div>

                          <Link
                            href={config.href}
                            className="inline-flex items-center gap-2 text-[#0A192F] font-bold hover:gap-4 transition-all mt-auto group/link w-max">
                            Explore Category
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover/link:bg-[#EAB308] group-hover/link:text-white transition-colors">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </Link>
                        </div>

                        {/* Right: Image */}
                        <div className="lg:w-1/2 w-full h-[300px] lg:h-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 p-4 lg:p-6 z-0">
                          <div className="relative w-full h-full  overflow-hidden shadow-lg">
                            <Image
                              src={config.bgImage}
                              alt={config.label}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
