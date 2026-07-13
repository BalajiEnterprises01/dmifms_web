"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Headset,
  Flower2,
  Recycle,
  Building2,
  Bug,
  Hotel,
  Coffee,
  Briefcase,
  Zap,
  Wallet,
  UsersRound,
  Shield,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import SectionLabel from "@/components/common/SectionLabel";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { Service } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  headset: Headset,
  "flower-2": Flower2,
  recycle: Recycle,
  "building-2": Building2,
  bug: Bug,
  hotel: Hotel,
  coffee: Coffee,
  briefcase: Briefcase,
  zap: Zap,
  wallet: Wallet,
  "users-round": UsersRound,
  shield: Shield,
};

const categories = [
  { id: "all", label: "All Services", color: "#1E3A8A" },
  { id: "facility", label: "Facility Services", color: "#1E3A8A" },
  { id: "operational", label: "Operational Services", color: "#0EA5E9" },
  { id: "business", label: "Business Services", color: "#10B981" },
];

const categoryColors: Record<string, string> = {
  facility: "#1E3A8A",
  operational: "#0EA5E9",
  business: "#10B981",
};

// NOTE: In a real app this would come from props/server
// For client component demo we import directly
import servicesData from "../../../../data/services.json";
import servicesPageDataRaw from "../../../../data/services-page.json";
import { ServicesPageData } from "@/types";

export default function ServicesPage() {
  const services = servicesData as Service[];
  const pageData = servicesPageDataRaw as ServicesPageData;
  const [activeTab, setActiveTab] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category",
    );
    const validCategory = categories.some((cat) => cat.id === category)
      ? category
      : "all";

    setActiveTab(validCategory ?? "all");
  }, []);

  const filtered =
    activeTab === "all"
      ? services.filter((s) => s.status)
      : services.filter((s) => s.category === activeTab && s.status);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* ── Custom Premium Hero (Out of the Box Layout) ── */}
      <section className="relative pt-22 pb-20 overflow-hidden bg-white">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-[#EAB308]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* ── Left Content (Text & Badges) ── */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full">
                {/* Micro Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-600 mb-8 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
                  {pageData.hero.badge}
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium text-[#0A192F] leading-[1.05] tracking-tight mb-8">
                  {pageData.hero.title} <br />
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#F59E0B]">
                      {pageData.hero.titleAccent}
                    </span>
                    {/* Golden Underline swoosh */}
                    <svg
                      className="absolute w-full h-4 -bottom-2 left-0 text-[#EAB308] opacity-30"
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
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-xl mb-10 border-l-4 border-[#2563EB] pl-6">
                  {pageData.hero.description}
                </p>

                {/* Stats Row inline */}
                <div className="flex items-center gap-8 md:gap-12 pt-4">
                  {pageData.hero.stats.map((stat, idx) => (
                    <React.Fragment key={idx}>
                      <div>
                        <div className="text-3xl font-bold text-[#0A192F]">
                          {stat.value}
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                          {stat.label}
                        </div>
                      </div>
                      {idx < pageData.hero.stats.length - 1 && (
                        <div className="w-px h-10 bg-slate-200" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right Content (Abstract Image Composition) ── */}
            <div className="lg:col-span-6 relative h-[500px] lg:h-[650px] w-full mt-10 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full h-full relative">
                {/* Main Image Masked Container */}
                <div className="absolute top-0 right-0 w-[90%] h-[90%]  overflow-hidden shadow-2xl z-10 border-[8px] border-white">
                  <Image
                    src={pageData.hero.image}
                    alt="Facility Management"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0A192F]/10 mix-blend-multiply" />
                </div>

                {/* Floating Element 1: Secondary Image */}
                <div className="absolute bottom-0 left-0 w-[55%] h-[45%] overflow-hidden shadow-2xl z-20 border-[8px] border-white transform -rotate-3">
                  <Image
                    src={pageData.hero.secondaryImage}
                    alt="Team Management"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 relative z-20">
        <div className="container-max section-padding">
          {/* ── Premium Category Tabs (Desktop) & Dropdown (Mobile) ── */}
          <div className="mb-16">
            {/* Desktop Tabs */}
            <div className="hidden md:flex flex-wrap gap-3 justify-center bg-white p-2.5 shadow-[0_10px_40px_rgb(0,0,0,0.05)] border border-slate-100 max-w-fit mx-auto rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-6 py-3 text-sm font-bold transition-all duration-300 rounded-lg ${
                    activeTab === cat.id
                      ? "bg-[#0A192F] text-white shadow-md scale-105"
                      : "bg-transparent text-slate-500 hover:text-[#0A192F] hover:bg-slate-50"
                  }`}>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden relative w-full max-w-xs mx-auto">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white border border-slate-200 rounded-xl shadow-sm text-[#0A192F] font-bold text-[15px]">
                {categories.find((c) => c.id === activeTab)?.label}
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveTab(cat.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3.5 text-sm font-bold transition-colors ${
                          activeTab === cat.id
                            ? "bg-slate-50 text-[#0A192F]"
                            : "text-slate-500 hover:bg-slate-50 hover:text-[#0A192F]"
                        }`}>
                        {cat.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Services Grid (Image Based Premium Cards) ── */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((service) => {
                const Icon = iconMap[service.icon] ?? Sparkles;
                const isFacility = service.category === "facility";
                const isOp = service.category === "operational";

                // Color coding logic
                const iconColor = isFacility
                  ? "text-[#2563EB]"
                  : isOp
                    ? "text-[#EAB308]"
                    : "text-[#10B981]";
                const iconBg = isFacility
                  ? "bg-[#2563EB]/10"
                  : isOp
                    ? "bg-[#EAB308]/10"
                    : "bg-[#10B981]/10";
                const badgeBg = isFacility
                  ? "bg-[#2563EB]"
                  : isOp
                    ? "bg-[#EAB308]"
                    : "bg-[#10B981]";

                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}>
                    <Link
                      href={`/services/${service.slug}?category=${service.category}`}
                      className="group block h-[400px] w-full overflow-hidden bg-[#0A192F] relative shadow-md hover:shadow-2xl transition-all duration-500">
                      {/* Full Background Image */}
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          unoptimized={service.image.endsWith(".svg")}
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
                            <span
                              className={`text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md`}>
                              {
                                categories
                                  .find((c) => c.id === service.category)
                                  ?.label.split(" ")[0]
                              }
                            </span>
                          </div>

                          <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug drop-shadow-md">
                            {service.title}
                          </h3>
                        </div>

                        {/* Hidden on Desktop until Hover / Always visible on Mobile */}
                        <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] mt-4 lg:mt-0">
                          <div className="overflow-hidden">
                            <p className="text-slate-300 text-sm leading-relaxed mb-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2 lg:line-clamp-3">
                              {service.shortDescription}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-bold text-[#EAB308] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-200">
                              Explore Service
                              <ArrowRight className="w-4 h-4 lg:group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
