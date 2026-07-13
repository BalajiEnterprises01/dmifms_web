"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  UserCheck,
  GraduationCap,
  FileCheck,
  ClipboardList,
  ShieldCheck,
  Users,
  Rocket,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import { ProcessStep } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  "map-pin": MapPin,
  "user-check": UserCheck,
  "graduation-cap": GraduationCap,
  "file-check": FileCheck,
  "clipboard-list": ClipboardList,
  "shield-check": ShieldCheck,
  users: Users,
  rocket: Rocket,
  "check-circle-2": CheckCircle2,
};

interface ProcessSectionProps {
  steps: ProcessStep[];
}

export default function ProcessSection({ steps }: ProcessSectionProps) {
  const active = steps.filter((s) => s.status);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to negative horizontal translation.
  // Using 95vw to ensure we don't over-scroll past the last card
  const x = useTransform(smoothProgress, [0, 1], ["5%", "-75%"]);

  return (
    <>
      {/* ── DESKTOP VIEW (Sticky Horizontal Scroll) ── */}
      <section
        ref={targetRef}
        className="hidden md:block py-24 relative h-[300vh] bg-white">
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-white z-10">
          {/* Background Cursive Text */}
          <div className="absolute top-20 right-[-5%] text-[15rem] font-serif text-black/[0.02] whitespace-nowrap pointer-events-none select-none z-0">
            Process
          </div>

          <div className="container-max section-padding relative z-10 w-full">
            {/* ── Header ── */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
              <div className="max-w-2xl">
                <ScrollReveal direction="up">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-4 bg-[#FFD700]" />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                      Our Methodology
                    </span>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.1}>
                  <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-serif font-medium text-[#111] leading-[1.1] tracking-tight">
                    How We Deliver.
                    <br />
                    Flawless Execution.
                  </h2>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="up" delay={0.2}>
                <div className="max-w-md flex flex-col gap-6 lg:pb-2">
                  <p className="text-slate-600 text-[18px] leading-relaxed font-medium">
                    A proven 9-step transition methodology — from site
                    assessment to full stabilization. We leave nothing to
                    chance.
                  </p>
                  <div className="hidden lg:flex items-center gap-8">
                    <Link
                      href="/process"
                      className="text-[15px] font-bold text-[#111] flex items-center gap-1 hover:gap-2 hover:text-[#FFD700] transition-all">
                      View Detailed Process <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Horizontal Scrolling Process Steps (SaaS Style) ── */}
            <div className="relative mt-10 w-full overflow-hidden">
              {/* Horizontal Line connecting steps */}
              <div className="absolute top-[4.5rem] left-0 w-full h-[2px] bg-gray-100 z-0" />

              <motion.div style={{ x }} className="flex gap-10 w-max px-0">
                {active.map((step, i) => {
                  const Icon = iconMap[step.icon] ?? CheckCircle2;
                  const isLast = i === active.length - 1;

                  return (
                    <div
                      key={step.id}
                      className="relative w-[380px] shrink-0 group">
                      {/* Step Number Circle overlaying the line */}
                      <div className="absolute top-[4.5rem] left-8 w-10 h-10 -translate-y-1/2 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-slate-400 font-bold text-sm z-10 group-hover:border-[#EAB308] group-hover:text-[#0A192F] group-hover:bg-[#EAB308]/10 transition-colors duration-300 shadow-sm">
                        {step.step}
                      </div>

                      {/* Top content: Icon & Badge */}
                      <div className="mb-20 relative z-10">
                        <div className="w-16 h-16 bg-gray-50 rounded-[1.2rem] border border-gray-200 flex items-center justify-center group-hover:bg-[#EAB308] group-hover:border-[#EAB308] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                          <Icon className="w-7 h-7 text-slate-600 group-hover:text-[#0A192F] transition-colors duration-500" />
                        </div>
                      </div>

                      {/* Bottom content: Text Box */}
                      <div
                        className={`p-8 rounded-[2rem] border transition-all duration-500 h-[260px] flex flex-col justify-start relative z-10 ${
                          isLast
                            ? "bg-[#EAB308] border-[#EAB308] shadow-lg"
                            : "bg-white border-gray-200 group-hover:border-[#EAB308] shadow-sm group-hover:shadow-xl"
                        }`}>
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className={`text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${
                              isLast
                                ? "bg-[#0A192F]/10 text-[#0A192F]"
                                : "bg-gray-100 text-slate-500"
                            }`}>
                            Step {step.step}
                          </span>
                        </div>

                        <h3
                          className={`text-2xl font-bold mb-4 leading-snug ${isLast ? "text-[#0A192F]" : "text-[#0A192F]"}`}>
                          {step.title}
                        </h3>

                        <p
                          className={`text-[15px] leading-relaxed line-clamp-3 ${isLast ? "text-[#111]/80" : "text-slate-600"}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE VIEW (Vertical Stack) ── */}
      <section className="md:hidden py-20 bg-[#F8F9FA] relative overflow-hidden">
        {/* Background Cursive Text */}
        <div className="absolute top-10 right-[-10%] text-[8rem] font-serif text-black/[0.03] whitespace-nowrap pointer-events-none select-none z-0">
          Process
        </div>

        <div className="container-max section-padding relative z-10">
          {/* ── Header ── */}
          <div className="mb-12">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-[#EAB308]" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Our Methodology
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-4xl font-serif font-medium text-[#0A192F] leading-[1.1] tracking-tight mb-4">
                How We Deliver.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-slate-600 text-[15px] leading-relaxed font-medium">
                A proven 9-step transition methodology — from site assessment to
                full stabilization.
              </p>
            </ScrollReveal>
          </div>

          {/* ── Vertical Timeline Process Steps ── */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-[27px] w-[2px] bg-gray-200 z-0" />

            <div className="flex flex-col gap-8 relative z-10">
              {active.map((step, i) => {
                const Icon = iconMap[step.icon] ?? CheckCircle2;
                const isLast = i === active.length - 1;

                return (
                  <ScrollReveal key={step.id} direction="up" delay={i * 0.05}>
                    <div className="flex gap-6 relative group">
                      {/* Left: Icon & Line Node */}
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 transition-colors duration-300 ${
                            isLast
                              ? "bg-[#EAB308] shadow-md"
                              : "bg-white border-2 border-gray-100 group-hover:border-[#EAB308]"
                          }`}>
                          <Icon
                            className={`w-6 h-6 ${isLast ? "text-[#0A192F]" : "text-slate-600 group-hover:text-[#0A192F]"}`}
                          />
                        </div>
                      </div>

                      {/* Right: Content Card */}
                      <div
                        className={`flex-1 p-6 rounded-[1.5rem] border transition-all duration-300 ${
                          isLast
                            ? "bg-[#EAB308] border-[#EAB308] shadow-lg"
                            : "bg-white border-gray-100 shadow-sm group-hover:border-[#EAB308]/50"
                        }`}>
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${
                              isLast
                                ? "bg-[#0A192F]/10 text-[#0A192F]"
                                : "bg-gray-100 text-slate-500"
                            }`}>
                            Step {step.step}
                          </span>
                        </div>
                        <h3
                          className={`text-xl font-bold mb-2 leading-snug ${isLast ? "text-[#0A192F]" : "text-[#0A192F]"}`}>
                          {step.title}
                        </h3>
                        <p
                          className={`text-[14px] leading-relaxed ${isLast ? "text-[#0A192F]/80" : "text-slate-600"}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* ── CTA Mobile ── */}
          <div className="mt-12 text-center">
            <Link
              href="/process"
              className="inline-flex items-center justify-center px-8 py-4 w-full rounded-2xl font-bold text-[15px] bg-[#0A192F] text-white shadow-xl hover:bg-[#1A365D] transition-colors">
              View Detailed Process
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
