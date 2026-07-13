"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Users,
  Layers,
  ShieldCheck,
  BarChart3,
  Award,
  BadgeCheck,
  Zap,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import { Differentiator } from "@/types";
import Image from "next/image";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  "clipboard-list": ClipboardList,
  users: Users,
  layers: Layers,
  "shield-check": ShieldCheck,
  "bar-chart-3": BarChart3,
};

interface WhyChooseUsProps {
  differentiators: Differentiator[];
}

export default function WhyChooseUs({ differentiators }: WhyChooseUsProps) {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-24 pb-20 lg:py-0">
      {/* ── FULL Background Image Layer ── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop"
          alt="Why choose us background"
          fill
          className="object-cover object-center"
        />
        {/* Gradients for text readability */}
        {/* Mobile: Full dark/light overlay */}
        <div className="absolute inset-0 bg-[#F8F9FA]/95 lg:hidden" />

        {/* Desktop: Left-to-right fade out to show image on the right */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#F8F9FA] via-[#F8F9FA]/90 to-transparent w-[70%]" />
      </div>

      <div className="absolute top-10 left-[-5%] text-[12rem] font-serif text-black/[0.03] whitespace-nowrap pointer-events-none select-none z-0">
        Why Us
      </div>

      <div className="container-max section-padding relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 h-full">
          {/* ── LEFT: Content & Features ── */}
          <div className="lg:w-[55%] flex flex-col justify-center py-12 lg:py-32">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-[#EAB308]" />
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Why Choose Us
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-[#0A192F] leading-[1.1] tracking-tight">
                Beyond Standard.
                <br />
                Beyond Expectations.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-slate-700 text-[18px] leading-relaxed font-medium mb-12 max-w-lg">
                We don&apos;t just manage facilities; we engineer environments that
                drive your business forward. Here is what sets us apart.
              </p>
            </ScrollReveal>

            <div className="flex flex-col gap-6 lg:gap-8 max-w-xl">
              {differentiators.slice(0, 4).map((item, i) => {
                const Icon = iconMap[item.icon] ?? CheckCircle2;
                return (
                  <ScrollReveal
                    key={item.id}
                    direction="up"
                    delay={0.3 + i * 0.1}>
                    <div className="group flex items-start gap-5 p-4 -ml-4 rounded-2xl hover:bg-white/60 transition-colors duration-300 backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-[#EAB308] group-hover:border-[#EAB308] shadow-sm transition-colors duration-500">
                        <Icon className="w-5 h-5 text-slate-500 group-hover:text-[#0A192F] transition-colors duration-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#0A192F] mb-2 group-hover:text-[#2563EB] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal direction="up" delay={0.7}>
              <div className="mt-12">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-[#0A192F] font-bold hover:text-[#EAB308] transition-colors group">
                  Learn More About Us
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:bg-[#EAB308] group-hover:text-[#0A192F] group-hover:border-[#EAB308] transition-all">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
