import { readJSON } from "@/lib/jsonCMS";
import { AboutData, VisionMissionData } from "@/types";
import AboutSection from "@/components/sections/AboutSection";
import VisionMissionSection from "@/components/sections/VisionMissionSection";
import QualitySection from "@/components/sections/QualitySection";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DM23 IFMS — India's fast-growing facility management company with deep expertise in soft services.",
};

export default function AboutPage() {
  const aboutData = readJSON<AboutData>("about");
  const vmData = readJSON<VisionMissionData>("vision-mission");
  const qualityData = readJSON<{
    badge: string;
    title: string;
    description: string;
    hierarchy: {
      id: number;
      level: string;
      description: string;
      icon: string;
    }[];
    status: boolean;
  }>("quality");

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* ── HIGH-END TYPOGRAPHY HERO (Unique for About Page) ── */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-white">
        {/* Soft Ambient Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-[#F8F9FA] to-white" />
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#EAB308]/5 rounded-full blur-[100px]" />
          <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Center Aligned Typography Focus */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-600 mb-10 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
                {aboutData.hero.badge}
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-medium text-[#0A192F] leading-[0.95] tracking-tight mb-10">
                {aboutData.hero.title} <br />
                <span className="relative inline-block mt-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#F59E0B]">
                    {aboutData.hero.titleAccent}
                  </span>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto">
                {aboutData.hero.description}
              </p>
            </div>

            {/* Massive Edge-to-Edge Image with Floating Stats */}
            <div className="relative w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src={aboutData.hero.image}
                alt="Team Collaboration"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[#0A192F]/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent" />

              {/* Floating Stats Bar Inside Image */}
              <div className="absolute bottom-10 left-10 right-10 flex flex-wrap justify-around items-center gap-6 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                {aboutData.hero.stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    <div className="text-center">
                      <div
                        className={`text-4xl font-bold ${index === aboutData.hero.stats.length - 1 ? "text-[#EAB308]" : "text-white"} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                        {stat.label}
                      </div>
                    </div>
                    {index < aboutData.hero.stats.length - 1 && (
                      <div className="w-px h-12 bg-white/20 hidden md:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-10">
        <AboutSection data={aboutData} />
      </div>
      <VisionMissionSection data={vmData} />
      <QualitySection data={qualityData} />
    </div>
  );
}
