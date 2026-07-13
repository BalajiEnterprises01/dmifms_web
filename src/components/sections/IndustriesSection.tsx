"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Monitor,
  Landmark,
  HeartPulse,
  Factory,
  GraduationCap,
  Plane,
  ShoppingBag,
  Wifi,
  Crown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import { Industry } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  "building-2": Building2,
  monitor: Monitor,
  landmark: Landmark,
  "heart-pulse": HeartPulse,
  factory: Factory,
  "graduation-cap": GraduationCap,
  plane: Plane,
  "shopping-bag": ShoppingBag,
  wifi: Wifi,
  crown: Crown,
};

interface IndustriesSectionProps {
  industries: Industry[];
}

export default function IndustriesSection({
  industries,
}: IndustriesSectionProps) {
  const active = industries
    .filter((i) => i.status)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Cursive background text */}
      <div className="absolute top-10 left-[-5%] text-[15rem] font-serif text-black/[0.02] whitespace-nowrap pointer-events-none select-none">
        Industries
      </div>

      <div className="container-max section-padding relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-[#EAB308]" />
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Industry Expertise
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-[#0A192F] leading-[1.1] tracking-tight">
                Tailored Solutions.
                <br />
                Across Sectors.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="max-w-md flex flex-col gap-6 lg:pb-2">
              <p className="text-slate-600 text-[16px] leading-relaxed font-medium">
                From corporate towers to government institutions, our facility
                solutions adapt to every sector, delivering excellence
                everywhere.
              </p>
              <div className="hidden lg:flex items-center gap-8">
                <Link
                  href="/industries"
                  className="text-[15px] font-bold text-[#111] flex items-center gap-1 hover:gap-2 transition-all group">
                  View All Industries{" "}
                  <ChevronRight className="w-4 h-4 text-[#FFD700] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {active
            .map((industry, i) => {
              const Icon = iconMap[industry.icon] ?? Building2;

              // Only show first 4 on mobile, all 8 on desktop
              const isHiddenMobile = i >= 4;

              return (
                <ScrollReveal
                  key={industry.id}
                  direction="up"
                  delay={i * 0.1}
                  className={isHiddenMobile ? "hidden lg:block" : "block"}>
                  <Link
                    href="/industries"
                    className="group relative h-[380px] lg:h-[460px]  overflow-hidden bg-[#1a1a1a] block border border-white/5">
                    {/* Background Image */}
                    {industry.image ? (
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#222] to-[#111]" />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent lg:via-black/20 lg:group-hover:via-black/40 transition-all duration-500" />

                    {/* Top Section: Icon & Arrow */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#EAB308] group-hover:border-[#EAB308] transition-colors duration-500">
                        <Icon className="w-6 h-6 text-white group-hover:text-[#0A192F] transition-colors duration-500" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-500 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                        <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#0A192F]" />
                      </div>
                    </div>

                    {/* Bottom Section: Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-20 flex flex-col justify-end h-1/2">
                      <div className="transform translate-y-0 lg:translate-y-6 lg:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                          {industry.name}
                        </h3>
                        <div className="overflow-hidden">
                          <p className="text-white/80 lg:text-white/70 text-[13px] lg:text-[14px] line-clamp-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                            {industry.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })
            .slice(0, 8)}
        </div>

        {/* ── CTA Mobile ── */}
        <div className="mt-10 text-center lg:hidden">
          <Link
            href="/industries"
            className="inline-flex items-center justify-center px-8 py-4 w-full rounded-2xl font-bold text-sm bg-[#0A192F] text-white shadow-md hover:bg-[#EAB308] hover:text-[#0A192F] transition-colors">
            View All Industries
          </Link>
        </div>
      </div>
    </section>
  );
}
