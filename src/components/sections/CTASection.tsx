"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Phone,
  Quote,
  Sparkles,
  Building2,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import { ContactData } from "@/types";

const testimonials = [
  {
    quote:
      "DM23 IFMS transformed our facility operations. Their SOP-driven approach cut our maintenance costs by 30%.",
    author: "Facility Manager",
    company: "Leading IT Park, Bangalore",
  },
  {
    quote:
      "Exceptional professionalism and compliance standards. The team is well-trained and always responsive.",
    author: "Head of Admin",
    company: "Pharma Manufacturing Unit",
  },
  {
    quote:
      "We've worked with several FM vendors — DM23 stands out for their consistency and EHS practices.",
    author: "Operations Director",
    company: "Multi-site Corporate Group",
  },
];

export default function CTASection() {
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    fetch("/api/content/contact")
      .then((res) => res.json())
      .then((json) => setContact(json))
      .catch(() => setContact(null));
  }, []);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#F8F9FA]">
      {/* Premium Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#111 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD700]/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 container-max section-padding">
        {/* ── Top Grid: CTA + Testimonials ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Main Content */}
          <div className="max-w-2xl">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold tracking-widest uppercase text-slate-600 mb-8 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#EAB308]" />
                Ready to Upgrade?
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-serif font-medium text-[#0A192F] leading-[1.1] tracking-tight mb-8">
                Elevate Your Facility <br />
                <span className="relative">
                  Experience.
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-[#EAB308] opacity-30"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none">
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-slate-600 text-[18px] leading-relaxed mb-10 font-medium">
                Join industry leaders who trust DM23 for seamless, safe, and
                smart facility management. Let&aposs design a customized
                solution for your space.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-[15px] bg-[#0A192F] text-white shadow-xl hover:shadow-2xl hover:bg-[#1A365D] hover:-translate-y-1 transition-all duration-300">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={
                    contact?.phone
                      ? `tel:${contact.phone.replace(/\s+/g, "")}`
                      : "/contact"
                  }
                  className="inline-flex items-center justify-center gap-3 px-8 py-4  font-bold text-[15px] text-[#0A192F] bg-white border-2 border-gray-100 hover:border-[#EAB308] hover:bg-gray-50 transition-all duration-300 shadow-sm">
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#EAB308]" /> No
                  obligation
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#EAB308]" /> Expert
                  audit
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Testimonials Stack */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F8F9FA] z-10 pointer-events-none h-full" />
            <div className="flex flex-col gap-4 max-h-[500px] overflow-hidden pb-20">
              {testimonials.map((t, i) => (
                <ScrollReveal key={i} direction="up" delay={0.2 + i * 0.1}>
                  <div className="p-8  bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
                    <Quote className="absolute top-6 right-8 w-10 h-10 text-gray-100 group-hover:text-[#EAB308]/20 transition-colors" />
                    <div className="flex gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-[15px] font-bold text-[#0A192F]">
                          {t.author}
                        </div>
                        <div className="text-[13px] text-slate-500 font-medium">
                          {t.company}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[15px]">
                      {t.quote}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom: Premium Stats Row ── */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-10 p-10 lg:p-12 bg-[#0A192F] relative overflow-hidden flex flex-wrap justify-between gap-10">
            {/* Dark background pattern */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {[
              { value: "10+", label: "Industries Served" },
              { value: "500+", label: "Sites Managed" },
              { value: "5000+", label: "Skilled Workforce" },
              { value: "98%", label: "Client Retention Rate" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="relative z-10 flex-1 min-w-[150px]">
                <div className="flex flex-col gap-2">
                  <div className="text-4xl lg:text-5xl font-serif font-medium text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-[#EAB308] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
                {i !== 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
