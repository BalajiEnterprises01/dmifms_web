import { readJSON } from "@/lib/jsonCMS";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { ContactData } from "@/types";
import ContactForm from "@/components/sections/ContactForm";
import {
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Users,
  Award,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

const LinkedinIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M4 4h3.6l5.1 6.8L18.8 4H22l-7.6 8.4L22.5 20H18.9l-5.6-7.4L7.2 20H4l8.1-8.9L4 4z" />
  </svg>
);

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DM23 IFMS for facility management solutions tailored to your needs.",
};

export default function ContactPage() {
  const data = readJSON<ContactData>("contact");
  const quickLinks = [
    {
      label: "LinkedIn",
      href: ensureAbsoluteUrl(data.social.linkedin),
      icon: LinkedinIcon,
      external: true,
    },
    {
      label: "X",
      href: ensureAbsoluteUrl(data.social.twitter),
      icon: XIcon,
      external: true,
    },
    {
      label: "Email",
      href: `mailto:${data.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: "Mobile",
      href: `tel:${data.phone.replace(/\s+/g, "")}`,
      icon: Phone,
      external: false,
    },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* ── HIGH-END ABSTRACT HERO ── */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-[#0A192F]">
        {/* Abstract Background Art */}
        <div className="absolute inset-0 z-0">
          <Image
            src={data.hero.image}
            alt="Corporate Office Architecture"
            fill
            className="object-cover opacity-20 mix-blend-luminosity grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 via-[#0A192F]/60 to-[#F8F9FA]" />

          {/* Glowing Orbs */}
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#EAB308]/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#2563EB]/15 rounded-full blur-[100px]" />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-white mb-8 backdrop-blur-md shadow-2xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EAB308] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EAB308]"></span>
              </span>
              {data.hero.badge}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-medium text-white leading-[1.05] tracking-tight mb-8">
              {data.hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#F59E0B] italic">
                {data.hero.titleAccent}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto">
              {data.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── FLOATING CONTACT ARCHITECTURE ── */}
      <section className="relative z-20 -mt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-0 max-w-6xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-[#0A192F]/5 border border-slate-100 overflow-hidden">
            {/* ── LEFT: Premium Info Panel ── */}
            <div className="lg:col-span-5 bg-[#0A192F] relative overflow-hidden flex flex-col">
              {/* Internal Backgrounds */}
              <div className="absolute inset-0">
                <Image
                  src={data.hero.secondaryImage}
                  alt="Support Texture"
                  fill
                  className="object-cover opacity-10 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F]/90 to-[#1A365D]/90" />
              </div>

              <div className="relative z-10 p-10 md:p-14 flex-grow flex flex-col">
                <div className="mb-12">
                  <h2 className="text-3xl font-serif font-medium text-white mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Reach out directly using the details below, or fill out the
                    form and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6 flex-grow">
                  {/* Phone */}
                  <a
                    href={`tel:${data.phone.replace(/\s+/g, "")}`}
                    className="group flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#EAB308]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#EAB308] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-[#0A192F]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">
                        Direct Line
                      </div>
                      <div className="text-lg text-white font-medium group-hover:text-[#EAB308] transition-colors">
                        {data.phone}
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${data.email}`}
                    className="group flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#EAB308]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-[#EAB308] transition-colors">
                      <Mail className="w-6 h-6 text-white group-hover:text-[#0A192F] transition-colors" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">
                        Email Support
                      </div>
                      <div className="text-sm text-white font-medium group-hover:text-[#EAB308] transition-colors break-all">
                        {data.email}
                      </div>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">
                        Corporate HQ
                      </div>
                      <div className="text-sm text-white/90 leading-relaxed font-medium">
                        {data.address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Socials/Extra */}
                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs font-bold text-white/50 uppercase tracking-widest">
                    Connect with us
                  </div>
                  <div className="flex gap-3">
                    {quickLinks.map(({ label, href, icon: Icon, external }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer noopener" : undefined}
                        className="relative w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#EAB308] hover:border-[#EAB308] cursor-pointer transition-colors group">
                        <Icon className="w-4 h-4 text-white group-hover:text-[#0A192F] transition-colors" />
                        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white text-[#0A192F] text-[10px] font-bold px-2 py-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                          {label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Modern Form ── */}
            <div className="lg:col-span-7 bg-white p-10 md:p-14 lg:p-16 flex flex-col justify-center">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-serif font-medium text-[#0A192F] mb-2">
                    Send a Message
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    Our team typically responds within 24 hours.
                  </p>
                </div>
                <div className="hidden sm:flex w-14 h-14 rounded-full bg-slate-50 items-center justify-center border border-slate-100">
                  <MessageSquare className="w-6 h-6 text-[#EAB308]" />
                </div>
              </div>

              {/* Actual Form Component */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── MINI INFO STRIP ── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container-max max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Operating Hours",
                desc: "Mon-Sat: 9:00 AM - 6:00 PM\nSunday: Closed",
              },
              {
                icon: Users,
                title: "Free Consultation",
                desc: "Get a no-cost site assessment and customized proposal.",
              },
              {
                icon: Award,
                title: "Certified Quality",
                desc: "ISO certified processes and highly trained workforce.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-[#EAB308]/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#0A192F]" />
                </div>
                <h3 className="font-bold text-[#0A192F] mb-3">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
