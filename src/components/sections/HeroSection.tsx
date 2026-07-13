"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Award,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { HeroData } from "@/types";
import { staggerContainer, fadeUp, fadeRight } from "@/lib/animations";

interface HeroSectionProps {
  data: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (!data.slides || data.slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data.slides]);

  const nextSlide = () => {
    if (!data.slides) return;
    setCurrentSlide((prev) => (prev + 1) % data.slides.length);
  };

  const prevSlide = () => {
    if (!data.slides) return;
    setCurrentSlide(
      (prev) => (prev - 1 + data.slides.length) % data.slides.length,
    );
  };

  return (
    <section className="relative min-h-screen bg-[#0A101F] overflow-hidden flex items-center pt-20">
      {/* ── Dynamic Image Slider block ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {data.slides && data.slides.length > 0 && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0">
              <Image
                src={data.slides[currentSlide].image}
                alt={data.slides[currentSlide].title}
                fill
                className="object-cover opacity-80"
                priority
              />
              {/* Dark overlay for text readability (bottom heavy) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full container-max section-padding pb-16">
        <div className="max-w-5xl">
          {/* Dynamic Headline based on Slide */}
          <div className="min-h-[220px] md:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 1, 0.5, 1],
                }}>
                {/* Subheading (Top) */}
                {data.slides[currentSlide]?.subtitle && (
                  <p className="text-[#EAB308] font-semibold tracking-wider uppercase text-sm md:text-base mb-4 drop-shadow-md">
                    {data.slides[currentSlide].subtitle}
                  </p>
                )}

                {/* Main Heading */}
                <h1 className="font-serif font-medium text-white leading-tight text-5xl md:text-6xl lg:text-7xl mb-6 drop-shadow-lg">
                  {data.slides[currentSlide]?.title}
                </h1>

                {/* Minimalist Underline */}
                <div className="w-20 h-1 bg-[#2563EB] mb-6 " />

                {/* Paragraph Description */}
                {data.slides[currentSlide]?.description && (
                  <p className="text-slate-200 text-lg md:text-xl font-medium mb-8 max-w-2xl drop-shadow-md leading-relaxed">
                    {data.slides[currentSlide].description}
                  </p>
                )}

                {/* Pill Button CTA with Shine and Worker Animation */}
                <Link
                  href={data.slides[currentSlide]?.cta_href || "/services"}
                  className="relative group/btn inline-flex items-center justify-center px-8 py-3.5  font-bold text-sm bg-white text-[#0A192F] shadow-[0_0_0_0_rgba(255,255,255,0.7)] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300">
                  {/* Layer 1: Base glow behind text */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                  {/* Layer 2: The actual Shine sweep effect */}
                  <div className="absolute inset-0  overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#2563EB]/20 to-transparent skew-x-[-20deg] group-hover/btn:animate-[shine_1.5s_ease-in-out_infinite]" />
                  </div>

                  <span className="relative z-10 flex items-center group-hover/btn:text-[#2563EB] transition-colors duration-300">
                    {data.slides[currentSlide]?.cta_label || "Explore Services"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>

                  {/* Flying Worker SVG Animation */}
                  <div className="absolute -top-4 -left-4 opacity-0 group-hover/btn:animate-[flyUpLeft_1s_ease-out_forwards] pointer-events-none z-20">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16 24C16 15.1634 23.1634 8 32 8C40.8366 8 48 15.1634 48 24H16Z"
                        fill="#F59E0B"
                      />
                      <circle cx="32" cy="32" r="12" fill="#FDBA74" />
                      <path
                        d="M20 64V48C20 41.3726 25.3726 36 32 36C38.6274 36 44 41.3726 44 48V64H20Z"
                        fill="#1E3A8A"
                      />
                      <path
                        d="M48 40L60 28L56 24L44 36L48 40Z"
                        fill="#94A3B8"
                      />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Centered Dot Indicators */}
      {data.slides && data.slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {data.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5  border border-white/50 transition-all duration-300 ${
                currentSlide === idx
                  ? "bg-white scale-125"
                  : "bg-transparent hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
