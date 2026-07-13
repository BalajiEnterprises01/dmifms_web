import Link from "next/link";
import { Split, Leaf, Cpu, ShieldCheck, Activity, Handshake, ClipboardList, ArrowRight, Recycle, ArrowUpRight } from "lucide-react";
import { readJSON } from "@/lib/jsonCMS";
import { WasteData } from "@/types";
import ScrollReveal from "@/components/common/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waste Management Excellence | DMIFMS",
  description: "Sustainable waste management solutions — source segregation, organic composting, and tech-driven SOPs.",
};

const leverIconMap: Record<string, React.ElementType> = {
  split: Split, leaf: Leaf, cpu: Cpu,
};
const factorIconMap: Record<string, React.ElementType> = {
  "shield-check": ShieldCheck, activity: Activity, handshake: Handshake, "clipboard-list": ClipboardList,
};

export default function WasteManagementPage() {
  const data = readJSON<WasteData>("waste");

  return (
    <>
      {/* 🌿 ECO-TECH HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A1914] pt-32 pb-20">
        {/* Abstract Eco-Tech Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-emerald/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#10B981]/10 rounded-full blur-[150px] mix-blend-screen" />
          
          {/* Subtle Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                <Recycle className="w-5 h-5 text-brand-emerald" />
                <span className="text-sm font-semibold tracking-wide text-brand-emerald uppercase">
                  {data.hero.badge}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                {data.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-[#34D399]">{data.hero.titleAccent}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                {data.hero.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-emerald text-white font-bold text-lg transition-all duration-300 hover:bg-[#059669] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                >
                  Start Your Green Journey
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                <Link
                  href="#excellence"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 text-white font-semibold text-lg border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md"
                >
                  Explore Our Framework
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Floating Stat/Element */}
        {data.hero.stats && data.hero.stats.length > 0 && (
          <div className="hidden lg:flex absolute bottom-12 right-12 bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl items-center gap-4 animate-bounce-slow">
            <div className="w-12 h-12 rounded-full bg-brand-emerald/20 flex items-center justify-center border border-brand-emerald/30">
              <Leaf className="w-6 h-6 text-brand-emerald" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">{data.hero.stats[0].value}</div>
              <div className="text-slate-400 text-sm">{data.hero.stats[0].label}</div>
            </div>
          </div>
        )}
      </section>

      {/* 🎯 CORE LEVERS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-text mb-6">
                Three Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-[#059669]">Waste Excellence</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {data.levers.map((lever, i) => {
              const Icon = leverIconMap[lever.icon] ?? Leaf;
              return (
                <ScrollReveal key={lever.id} direction="up" delay={i * 0.1}>
                  <div className="group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full">
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-slate-50 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                        <Icon className="w-8 h-8 text-brand-emerald" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-brand-text mb-4 group-hover:text-brand-emerald transition-colors">
                        {lever.title}
                      </h3>
                      
                      <p className="text-slate-500 leading-relaxed">
                        {lever.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🛡️ EXCELLENCE FRAMEWORK SECTION (Split Layout) */}
      <section id="excellence" className="py-24 bg-slate-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 mb-6">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                  <span className="text-sm font-bold text-brand-emerald uppercase tracking-wider">
                    Our Framework
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-text mb-6 leading-tight">
                  Driving Consistency & <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-[#059669]">Compliance</span>
                </h2>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                  We don&apos;t just manage waste; we implement a rigorous framework designed to protect health, ensure compliance, and maximize sustainability outcomes.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-brand-text hover:bg-brand-emerald transition-colors shadow-lg"
                >
                  Consult with an Expert
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {data.excellence_factors.map((factor, i) => {
                const Icon = factorIconMap[factor.icon] ?? ShieldCheck;
                return (
                  <ScrollReveal key={factor.id} direction="up" delay={i * 0.1}>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-emerald/30 shadow-sm hover:shadow-xl transition-all duration-300 h-full group">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-brand-emerald/10 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 text-brand-text group-hover:text-brand-emerald transition-colors" />
                      </div>
                      <h3 className="font-bold text-brand-text text-lg mb-3">{factor.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{factor.description}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
