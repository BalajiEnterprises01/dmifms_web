"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardList,
  Users,
  Layers,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionLabel from "@/components/common/SectionLabel";
import { AboutData } from "@/types";
import { staggerContainer, fadeUp } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
  "clipboard-list": ClipboardList,
  users: Users,
  layers: Layers,
  "shield-check": ShieldCheck,
  "bar-chart-3": BarChart3,
};

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* ── Background "About Us" Text ── */}
      <div className="absolute md:-top-2 md:left-10 top-7 left-6 w-full flex items-start justify-start pointer-events-none z-0">
        <span
          className="text-[16vw] md:text-[12vw] font-bold text-blue-100 opacity-80 whitespace-nowrap select-none tracking-tight leading-none"
          style={{ fontFamily: "'Brush Script MT', 'Comic Sans MS', cursive" }}>
          About Us
        </span>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="relative">
          {/* ── Right Side: Image (Absolute on Desktop for Overlap) ── */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-[-40px] w-[42%] z-0 group pointer-events-auto">
            <ScrollReveal
              direction="right"
              delay={0.2}
              className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden shadow-2xl border border-slate-100/50 ">
                <Image
                  src={
                    data.image ||
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop"
                  }
                  alt="About DM23 IFMS"
                  fill
                  className="object-cover"
                />
                {/* Subtle overlay gradient to ensure image looks premium */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                {/* ── Contact Us Button on Image ── */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
                  <Link
                    href="/contact"
                    className="relative group/btn flex items-center justify-center cursor-pointer px-6 py-2.5 bg-white/95 backdrop-blur-md hover:bg-white text-[#0A192F] font-bold  shadow-[0_0_0_0_rgba(255,255,255,0.7)] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.3)] border border-white/50 hover:-translate-y-1 transition-all duration-300">
                    {/* Layer 1: Base glow behind text */}
                    <div className="absolute inset-0  bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                    {/* Layer 2: The Shine Effect */}
                    <div className="absolute inset-0  overflow-hidden pointer-events-none">
                      <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#2563EB]/20 to-transparent skew-x-[-20deg] group-hover/btn:animate-[shine_1.5s_ease-in-out_infinite]" />
                    </div>

                    <span className="relative z-10 flex items-center group-hover/btn:text-[#2563EB] transition-colors duration-300 gap-2">
                      Contact Us{" "}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>

                    {/* Flying Worker SVG Animation */}
                    <div className="absolute -top-8 -left-8 opacity-0 group-hover/btn:animate-[flyUpLeft_1s_ease-out_forwards] pointer-events-none scale-125">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        {/* Worker Hard Hat */}
                        <path
                          d="M16 24C16 15.1634 23.1634 8 32 8C40.8366 8 48 15.1634 48 24H16Z"
                          fill="#F59E0B"
                        />
                        {/* Face */}
                        <circle cx="32" cy="32" r="12" fill="#FDBA74" />
                        {/* Body */}
                        <path
                          d="M20 64V48C20 41.3726 25.3726 36 32 36C38.6274 36 44 41.3726 44 48V64H20Z"
                          fill="#1E3A8A"
                        />
                        {/* Wrench/Tool */}
                        <path
                          d="M48 40L60 28L56 24L44 36L48 40Z"
                          fill="#94A3B8"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Left Side: Content ── */}
          <div className="relative z-10 w-full lg:w-[82%] pointer-events-none">
            {/* Text Content */}
            <div className="w-full lg:w-[68%] lg:pr-10 mb-4 pt-4 pointer-events-auto">
              <ScrollReveal direction="up">
                <h2 className="text-[2rem] md:text-4xl lg:text-[42px] font-bold text-[#0a192f] leading-[1.2] tracking-tight mb-6 font-serif">
                  {data.title}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.1}>
                <p className="text-slate-600 text-[17px] leading-[1.7] max-w-[95%]">
                  {data.description}
                </p>
              </ScrollReveal>
            </div>

            {/* Stats Grid Wrapper (Overlaps Image) */}
            <ScrollReveal
              direction="up"
              delay={0.2}
              className="pointer-events-auto">
              <div className="bg-[#F8F9FA]/95 backdrop-blur-md p-4 sm:p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-white/80 ">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {data.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col justify-center min-h-[110px] sm:min-h-[130px]  group">
                      <div className="text-[24px] sm:text-[32px] md:text-[36px] font-medium text-[#f97316] mb-1 sm:mb-2 leading-none">
                        {stat.value}{" "}
                        <span className="text-[18px] sm:text-[24px]">
                          {stat.suffix}
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-[14px] text-slate-600 font-medium leading-tight px-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Mobile Image ── */}
          <div className="block lg:hidden mt-10 w-full h-[350px] sm:h-[450px] relative overflow-hidden shadow-xl  group pointer-events-auto">
            <Image
              src={
                data.image ||
                "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop"
              }
              alt="About DM23 IFMS"
              fill
              className="object-cover"
            />
            {/* Subtle overlay gradient to ensure image looks premium */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            {/* ── Contact Us Button on Mobile Image ── */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
              <Link
                href="/contact"
                className="relative group/btn flex items-center justify-center cursor-pointer px-6 py-2.5 bg-white/95 backdrop-blur-md hover:bg-white text-[#0A192F] font-bold  shadow-[0_0_0_0_rgba(255,255,255,0.7)] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.3)] border border-white/50 hover:-translate-y-1 transition-all duration-300">
                {/* Layer 1: Base glow behind text */}
                <div className="absolute inset-0  bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                {/* Layer 2: The Shine Effect */}
                <div className="absolute inset-0  overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#2563EB]/20 to-transparent skew-x-[-20deg] group-hover/btn:animate-[shine_1.5s_ease-in-out_infinite]" />
                </div>

                <span className="relative z-10 flex items-center group-hover/btn:text-[#2563EB] transition-colors duration-300 gap-2 whitespace-nowrap text-sm">
                  Contact Us{" "}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>

                {/* Flying Worker SVG Animation */}
                <div className="absolute -top-8 -left-8 opacity-0 group-hover/btn:animate-[flyUpLeft_1s_ease-out_forwards] pointer-events-none scale-100 sm:scale-125">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 24C16 15.1634 23.1634 8 32 8C40.8366 8 48 15.1634 48 24H16Z"
                      fill="#F59E0B"
                    />
                    <circle cx="32" cy="32" r="12" fill="#FDBA74" />
                    <path
                      d="M20 64V48C20 41.3726 25.3726 36 32 36C38.6274 36 44 41.3726 44 48V64H20Z"
                      fill="#1E3A8A"
                    />
                    <path d="M48 40L60 28L56 24L44 36L48 40Z" fill="#94A3B8" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
