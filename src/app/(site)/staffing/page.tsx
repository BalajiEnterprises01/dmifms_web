import Link from "next/link";
import {
  Search,
  UserPlus,
  Wallet,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { readJSON } from "@/lib/jsonCMS";
import { StaffingData } from "@/types";
import ScrollReveal from "@/components/common/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Staffing Solutions",
  description:
    "End-to-end staffing solutions — recruitment, onboarding, payroll, and MIS reporting.",
};

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  "user-plus": UserPlus,
  wallet: Wallet,
  "bar-chart-3": BarChart3,
};

const benefits = [
  "Skilled, semi-skilled, technical and non-technical roles",
  "End-to-end BGV, documentation, induction, and site readiness",
  "Accurate payroll with statutory deductions and benefits admin",
  "Real-time MIS dashboards for performance and compliance tracking",
  "Dedicated compliance support for all statutory requirements",
];

export default function StaffingPage() {
  const data = readJSON<StaffingData>("staffing");

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* ── HIGH-END TALENT HERO ── */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-[#2563EB]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#EAB308]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* ── Left Content ── */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="w-full">
                {/* Micro Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-600 mb-8 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
                  {data.hero.badge}
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium text-[#0A192F] leading-[1.05] tracking-tight mb-8">
                  {data.hero.title} <br />
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">
                      {data.hero.titleAccent}
                    </span>
                    {/* Blue Underline swoosh */}
                    <svg
                      className="absolute w-full h-4 -bottom-2 left-0 text-[#2563EB] opacity-20"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none">
                      <path
                        d="M0 5 Q 50 10 100 5"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-xl mb-10 border-l-4 border-[#EAB308] pl-6">
                  {data.hero.description}
                </p>

                {/* Highlight Quote */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative max-w-xl">
                  <MessageSquare className="absolute top-4 right-4 w-12 h-12 text-slate-200/50" />
                  <p className="text-[#0A192F] font-bold text-base leading-relaxed relative z-10">
                    &quot;{data.hero.highlight}&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Content (Abstract Floating UI) ── */}
            <div className="lg:col-span-6 relative h-[500px] lg:h-[650px] w-full mt-10 lg:mt-0 hidden md:block">
              <div className="w-full h-full relative">
                {/* Main Image Masked Container */}
                <div className="absolute top-0 right-0 w-[85%] h-[85%] overflow-hidden rounded-[2rem] shadow-2xl z-10 border border-slate-100 bg-white p-2">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={data.hero.image}
                      alt="Professional Staffing"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/10 mix-blend-multiply" />
                  </div>
                </div>

                {/* Floating Element: Talent Card */}
                {data.hero.stats && data.hero.stats.length > 0 && (
                  <div className="absolute bottom-10 left-0 bg-white p-6 rounded-2xl shadow-2xl z-20 border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                    <div className="w-14 h-14 rounded-full bg-[#EAB308]/10 flex items-center justify-center shrink-0">
                      <UserPlus className="w-7 h-7 text-[#EAB308]" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-[#0A192F]">
                        {data.hero.stats[0].value}
                      </div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {data.hero.stats[0].label}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="relative z-20 -mt-10 pb-24 bg-[#F8F9FA]">
        <div className="container-max section-padding">
          {/* ── Offerings Grid (Premium Cards) ── */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-600 mb-4 shadow-sm">
                What We Offer
              </div>
              <h2 className="font-serif font-medium text-4xl md:text-5xl text-[#0A192F]">
                Our Staffing Offerings
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {data.offerings.map((offering, i) => {
                const Icon = iconMap[offering.icon] ?? Search;
                return (
                  <ScrollReveal
                    key={offering.id}
                    direction="up"
                    delay={i * 0.1}>
                    <div className="group bg-white p-8  border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-0 group-hover:scale-150 transition-transform duration-700 ease-out" />
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-[#0A192F] transition-colors duration-300">
                          <Icon className="w-7 h-7 text-[#2563EB] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-bold text-xl text-[#0A192F] mb-3">
                          {offering.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {offering.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* ── Benefits & CTA Architecture ── */}
          <div className="max-w-6xl mx-auto bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left: Benefits */}
              <div className="p-10 md:p-14">
                <h2 className="text-3xl font-serif font-medium text-[#0A192F] mb-8">
                  Why Choose Our Staffing?
                </h2>
                <div className="space-y-5">
                  {benefits.map((point) => (
                    <div key={point} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#EAB308]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-[#EAB308]" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CTA Card */}
              <div className="bg-[#0A192F] p-10 md:p-14 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EAB308]/20 rounded-full blur-[80px]" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-widest uppercase text-white mb-6 backdrop-blur-md">
                    Get Started
                  </div>
                  <h3 className="text-3xl font-serif font-medium text-white mb-4">
                    Need the right people?
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-10 font-medium">
                    Tell us your staffing requirement and we&apos;ll build a
                    customized workforce solution for your facility.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm bg-[#EAB308] text-[#0A192F] hover:bg-white transition-colors w-full sm:w-auto">
                    Discuss Your Needs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
