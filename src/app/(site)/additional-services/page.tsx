import Link from "next/link";
import {
  Shield,
  Utensils,
  Headset,
  ShieldCheck,
  Footprints,
  Hotel,
  ChefHat,
  Coffee,
  Sandwich,
  Users,
  Wallet,
  Mail,
  Briefcase,
  ArrowRight,
  Layers,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { readJSON } from "@/lib/jsonCMS";
import { AdditionalServicesData } from "@/types";
import ScrollReveal from "@/components/common/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Additional Services | DMIFMS",
  description: "Hospitality and Support services by DM23 IFMS.",
};

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  utensils: Utensils,
  headset: Headset,
  "shield-check": ShieldCheck,
  footprints: Footprints,
  cctv: Shield,
  hotel: Hotel,
  "chef-hat": ChefHat,
  coffee: Coffee,
  sandwich: Sandwich,
  users: Users,
  wallet: Wallet,
  mail: Mail,
  briefcase: Briefcase,
};

const categoryCopy: Record<string, { intro: string; points: string[] }> = {
  hospitality: {
    intro:
      "Guest-facing support designed to keep stays, meals, and shared spaces clean, organized, and welcoming.",
    points: [
      "Guest house operations and room readiness",
      "Pantry, cafeteria, and catering support",
      "Food court and beverage counter operations",
      "Courteous service staff for front-line execution",
    ],
  },
  support: {
    intro:
      "Back-end support services that keep offices running smoothly without distracting the core team.",
    points: [
      "Staffing, payroll, and admin outsourcing",
      "Mail room and document handling",
      "Reception and helpdesk assistance",
      "Day-to-day operational coordination",
    ],
  },
};

export default function AdditionalServicesPage() {
  const data = readJSON<AdditionalServicesData>("additional-services");

  return (
    <>
      {/* 🌌 COMMAND CENTER HERO */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-[#020617]">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#EAB308]/10 rounded-full blur-[100px] mix-blend-screen opacity-30" />

          {/* Tech Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Layers className="w-5 h-5 text-[#EAB308]" />
              <span className="text-sm font-semibold tracking-wide text-white uppercase">
                {data.hero.badge}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
              {data.hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-sky to-[#EAB308]">
                {data.hero.titleAccent}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {data.hero.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Link
              href="#services"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#020617] font-bold text-lg hover:bg-[#EAB308] hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]">
              Explore Solutions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 🏢 MASONRY / STACKED CATEGORIES SECTION */}
      <section
        id="services"
        className="py-24 bg-slate-50 relative -mt-20 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20 pt-8">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-text mb-6">
                Tailored Solutions for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-blue">
                  Every Need
                </span>
              </h2>
              <p className="text-lg text-slate-500">
                From warm hospitality to reliable back-office support, we provide
                end-to-end services to elevate your facility&apos;s operations.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {data.categories.map((cat, ci) => {
              const CatIcon = iconMap[cat.icon] ?? Shield;
              const isEven = ci % 2 !== 0;
              const copy = categoryCopy[cat.id] ?? categoryCopy.hospitality;

              return (
                <div
                  key={cat.id}
                  className={`flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20 items-center`}>
                  {/* Category Header Card */}
                  <div className="w-full lg:w-1/3">
                    <ScrollReveal direction={isEven ? "left" : "right"}>
                      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                        {/* Background Decoration */}
                        <div
                          className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 ease-out"
                          style={{ backgroundColor: cat.color }}
                        />

                        <div className="relative z-10">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner"
                            style={{
                              backgroundColor: `${cat.color}15`,
                              color: cat.color,
                            }}>
                            <CatIcon className="w-8 h-8" />
                          </div>
                          <h3 className="text-3xl font-extrabold text-brand-text mb-4">
                            {cat.title}
                          </h3>
                          <div
                            className="w-12 h-1.5 rounded-full mb-6"
                            style={{ backgroundColor: cat.color }}
                          />
                          <p className="text-slate-500 font-medium">
                            Professional {cat.title.toLowerCase()} services
                            designed to seamlessly integrate with your core
                            operations.
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Services Grid */}
                  <div className="w-full lg:w-2/3">
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                      {cat.services.map((service, si) => {
                        const Icon = iconMap[service.icon] ?? CheckCircle2;
                        return (
                          <ScrollReveal
                            key={service.id}
                            direction="up"
                            delay={si * 0.1}>
                            <div className="group flex items-start gap-4 p-5 md:p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-default">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                style={{
                                  backgroundColor: `${cat.color}10`,
                                  color: cat.color,
                                }}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1 pt-1">
                                <h4 className="font-bold text-brand-text text-lg group-hover:text-brand-blue transition-colors">
                                  {service.title}
                                </h4>
                                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                  {copy.intro}
                                </p>
                                <div className="mt-3 space-y-1.5">
                                  {copy.points.slice(0, 2).map((point) => (
                                    <div
                                      key={point}
                                      className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-[#EAB308] mt-0.5 shrink-0" />
                                      <span>{point}</span>
                                    </div>
                                  ))}
                                </div>
                                <Link
                                  href="/contact"
                                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-blue hover:gap-2 transition-all">
                                  Learn more{" "}
                                  <ArrowUpRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </ScrollReveal>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
