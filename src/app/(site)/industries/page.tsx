import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
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
} from "lucide-react";
import { readJSON } from "@/lib/jsonCMS";
import { Industry, IndustriesPageData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "DM23 IFMS serves 10+ industries — from corporate offices to government institutions — with tailored facility management solutions.",
};

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

export default function IndustriesPage() {
  const industries = readJSON<Industry[]>("industries")
    .filter((i) => i.status)
    .sort((a, b) => a.order - b.order);
  const pageData = readJSON<IndustriesPageData>("industries-page");

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* ── HIGH-END ARCHITECTURAL HERO (Unique for Industries) ── */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-[#0A192F]">
        {/* Abstract Architectural Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={pageData?.hero?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"}
            alt="Abstract Architecture"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 via-[#0A192F]/80 to-[#F8F9FA]" />
          
          {/* Geometric Accents */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2563EB]/10 to-transparent skew-x-12 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#EAB308]/10 to-transparent -skew-y-12 -translate-y-32" />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-white mb-8 backdrop-blur-md shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              {pageData?.hero?.badge || "Industry Expertise"}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-medium text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl">
              {pageData?.hero?.title || "Empowering"} <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#F59E0B]">
                  {pageData?.hero?.titleAccent || "Every Sector."}
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto mb-16">
              {pageData?.hero?.description || "Tailored facility management solutions engineered for the unique demands of your industry."}
            </p>

            {/* Glassmorphism Stats Bar */}
            <div className="inline-flex flex-wrap justify-center gap-8 md:gap-16 px-10 py-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              {[
                { value: "10+", label: "Industries Served" },
                { value: "500+", label: "Sites Managed" },
                { value: "5K+", label: "Trained Staff" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                    {s.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-[#EAB308] font-bold tracking-widest uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="relative z-20 -mt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container-max section-padding">
          {/* Industry Cards Grid (Image Based Premium Cards - Matching Services) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, i) => {
              const Icon = iconMap[industry.icon] ?? Building2;
              const badgeBg = "bg-[#2563EB]";

              return (
                <ScrollReveal key={industry.id} direction="up" delay={i * 0.05}>
                  <Link
                    href="/contact"
                    className="group block h-[400px] w-full overflow-hidden bg-[#0A192F] relative shadow-md hover:shadow-2xl transition-all duration-500">
                    {/* Full Background Image */}
                    {industry.image ? (
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-60 group-hover:opacity-40"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1A365D]" />
                    )}

                    {/* Gradient Overlays for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-[#0A192F]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />

                    {/* Content Container */}
                    <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end z-10">
                      {/* Always visible on Mobile / Hover slide on Desktop */}
                      <div className="flex flex-col gap-4 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] lg:group-hover:-translate-y-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:${badgeBg} transition-colors duration-500`}>
                            <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                        </div>

                        <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug drop-shadow-md">
                          {industry.name}
                        </h3>
                      </div>

                      {/* Hidden on Desktop until Hover / Always visible on Mobile */}
                      <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] mt-4 lg:mt-0">
                        <div className="overflow-hidden">
                          <p className="text-slate-300 text-sm leading-relaxed mb-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2 lg:line-clamp-3">
                            {industry.description}
                          </p>

                          {/* Service tags */}
                          <div className="flex flex-wrap gap-2 mb-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-150">
                            {industry.services.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="px-2 py-1 rounded text-[10px] font-bold bg-white/10 border border-white/20 text-white backdrop-blur-sm">
                                {s}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-sm font-bold text-[#EAB308] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            Discuss Solutions
                            <ArrowRight className="w-4 h-4 lg:group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
