"use client";

import { Eye, Target, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionLabel from "@/components/common/SectionLabel";
import { VisionMissionData } from "@/types";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface VisionMissionSectionProps {
  data: VisionMissionData;
}

export default function VisionMissionSection({
  data,
}: VisionMissionSectionProps) {
  return (
    <section id="vision-mission" className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="container-max section-padding">
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionLabel label="Vision & Mission" className="mb-4" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text leading-tight">
              Our <span className="gradient-text">Purpose & Direction</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-slate-500 text-base leading-relaxed mt-4 max-w-xl mx-auto">
              Every facility we manage reflects our commitment to excellence,
              sustainability, and people.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            variants={fadeUp}
            className="relative bg-linear-to-br from-brand-navy to-brand-blue rounded-3xl p-8 text-white overflow-hidden shadow-xl shadow-blue-900/20">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/4 rounded-full translate-y-1/3 -translate-x-1/3" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-3">
                {data.vision.title}
              </div>
              <p className="text-lg font-semibold text-white leading-relaxed mb-6">
                {data.vision.description}
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-100 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-emerald/4 rounded-full -translate-y-1/3 translate-x-1/3" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-brand-emerald/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-brand-emerald" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-brand-emerald mb-3">
                {data.mission.title}
              </div>
              <div className="space-y-4">
                {data.mission.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-emerald/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
