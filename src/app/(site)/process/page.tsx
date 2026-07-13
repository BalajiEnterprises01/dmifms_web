import { readJSON } from "@/lib/jsonCMS";
import { ProcessStep, ProcessPageData } from "@/types";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "DM23 IFMS 9-step implementation process — from pre-deployment to stabilization.",
};

export default function ProcessPage() {
  const steps = readJSON<ProcessStep[]>("process");
  const pageData = readJSON<ProcessPageData>("process-page");
  
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* ── HIGH-END ENGINEERING HERO ── */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-[#0A192F]">
        {/* Technical Blueprint Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={pageData?.hero?.image || "https://images.unsplash.com/photo-1503945438517-f65904a52ce6?q=80&w=2670&auto=format&fit=crop"}
            alt="Process and Engineering"
            fill
            className="object-cover opacity-20 mix-blend-luminosity grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F]/95 via-[#0A192F]/80 to-[#1A365D]" />

          {/* Blueprint Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl">
            {/* Tech Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-white/5 border-l-2 border-[#EAB308] text-xs font-bold tracking-widest uppercase text-white mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
              {pageData?.hero?.badge}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-medium text-white leading-[1.05] tracking-tight mb-8">
              {pageData?.hero?.title} <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#F59E0B]">
                  {pageData?.hero?.titleAccent}
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-2xl mb-12">
              {pageData?.hero?.description}
            </p>

            {/* Micro Stats */}
            <div className="flex gap-12 pt-8 border-t border-white/10">
              {pageData?.hero?.stats?.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] text-[#EAB308] font-bold tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The actual process timeline component */}
      <div className="relative z-20 bg-[#F8F9FA]">
        <ProcessSection steps={steps} />
      </div>
      <CTASection />
    </div>
  );
}
