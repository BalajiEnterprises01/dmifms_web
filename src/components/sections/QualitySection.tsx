"use client";

import { motion } from "framer-motion";
import { Crown, Briefcase, UserCog, Handshake, ClipboardCheck, Users, ArrowDown } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionLabel from "@/components/common/SectionLabel";
import { staggerContainer, fadeUp } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
  crown: Crown, briefcase: Briefcase, "user-cog": UserCog,
  handshake: Handshake, "clipboard-check": ClipboardCheck, users: Users,
};

const levelColors = ["#1E3A8A", "#2563EB", "#0EA5E9", "#10B981", "#F59E0B", "#6366F1"];

interface QualityData {
  badge: string;
  title: string;
  description: string;
  hierarchy: { id: number; level: string; description: string; icon: string }[];
  status: boolean;
}

export default function QualitySection({ data }: { data: QualityData }) {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-max section-padding">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <SectionLabel label={data.badge} className="mb-4" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text leading-tight mb-4">
              {data.title.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="gradient-text">{data.title.split(" ").slice(2).join(" ")}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-slate-500 text-base leading-relaxed">{data.description}</p>
          </ScrollReveal>
        </div>

        {/* ── Hierarchy ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center gap-2 max-w-lg mx-auto"
        >
          {data.hierarchy.map((level, i) => {
            const Icon = iconMap[level.icon] ?? Users;
            const color = levelColors[i % levelColors.length];
            const isTop = i === 0;
            const widthPct = Math.min(40 + i * 13, 100);

            return (
              <motion.div
                key={level.id}
                variants={fadeUp}
                className="w-full flex flex-col items-center"
                style={{ maxWidth: `${widthPct}%` }}
              >
                <div
                  className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-default"
                  style={{
                    background: isTop
                      ? `linear-gradient(135deg, ${color}, ${color}CC)`
                      : `${color}10`,
                    border: isTop ? "none" : `1.5px solid ${color}30`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: isTop ? "rgba(255,255,255,0.2)" : `${color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: isTop ? "white" : color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-sm font-bold truncate"
                      style={{ color: isTop ? "white" : color }}
                    >
                      {level.level}
                    </div>
                    <div
                      className="text-[11px] truncate"
                      style={{ color: isTop ? "rgba(255,255,255,0.65)" : "#94a3b8" }}
                    >
                      {level.description}
                    </div>
                  </div>
                  <div
                    className="text-[10px] font-black shrink-0"
                    style={{ color: isTop ? "rgba(255,255,255,0.5)" : `${color}60` }}
                  >
                    L{level.id}
                  </div>
                </div>

                {/* Arrow connector */}
                {i < data.hierarchy.length - 1 && (
                  <ArrowDown className="w-3.5 h-3.5 text-slate-300 my-0.5" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <ScrollReveal delay={0.4}>
          <p className="text-center text-xs text-slate-400 mt-6 font-medium">
            Quality hierarchy flows from Deployments → Director level
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
