import Link from "next/link";
import { readJSON } from "@/lib/jsonCMS";
import { ensureAbsoluteUrl } from "@/lib/utils";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Award,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { ContactData } from "@/types";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Industries", href: "/industries" },
    { label: "Contact Us", href: "/contact" },
  ],
  services: [
    { label: "Facility Services", href: "/services?category=facility" },
    { label: "Operational Services", href: "/services?category=operational" },
    { label: "Business Services", href: "/services?category=business" },
    { label: "Staffing Solutions", href: "/staffing" },
    { label: "Waste Management", href: "/waste-management" },
  ],
};

const certBadges = [
  { icon: Award, label: "EHS Certified" },
  { icon: ShieldCheck, label: "Statutory Compliant" },
  { icon: BadgeCheck, label: "SOP Trained" },
];

// Inline SVG icons for social platforms not available in this lucide-react version
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M4 4h3.6l5.1 6.8L18.8 4H22l-7.6 8.4L22.5 20H18.9l-5.6-7.4L7.2 20H4l8.1-8.9L4 4z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  const contact = readJSON<ContactData>("contact");

  const socialLinks = () => {
    const social = contact.social;

    return [
      {
        Icon: LinkedinIcon,
        href: ensureAbsoluteUrl(social.linkedin),
        label: "LinkedIn",
      },
      { Icon: XIcon, href: ensureAbsoluteUrl(social.twitter), label: "X" },
      {
        Icon: FacebookIcon,
        href: ensureAbsoluteUrl(social.facebook),
        label: "Facebook",
      },
    ];
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-[#FFD700]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-max section-padding relative z-10">
        {/* ── Top Section: Brand + Newsletter ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-16 border-b border-white/10">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center shadow-lg group-hover:border-[#FFD700] group-hover:bg-[#FFD700]/10 transition-colors">
                <span className="text-white font-black text-lg group-hover:text-[#FFD700] transition-colors">
                  DM
                </span>
              </div>
              <div>
                <div className="font-bold text-white text-xl tracking-tight">
                  DM23 IFMS
                </div>
                <div className="text-[11px] text-slate-400 font-medium tracking-widest uppercase">
                  Facility Management
                </div>
              </div>
            </Link>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
              Elevating facility standards across India with premium,
              integrated, and technology-driven management solutions.
            </p>

            {/* Social Links - Apple Style */}
            <div className="flex items-center gap-3">
              {socialLinks().map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#111] hover:bg-[#FFD700] hover:border-[#FFD700] transition-all duration-300">
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-auto  p-6 bg-white/5 border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
                Ready to elevate your facility?
              </h3>
              <p className="text-[13px] text-slate-400 mb-5 leading-relaxed">
                Share your requirements — we&apos;ll send a tailored proposal.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[13px] bg-[#FFD700] text-[#111] hover:bg-white transition-colors duration-300 group/cta">
                Get a Free Quote
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Middle Section: Links & Contact ── */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-6 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" /> Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-slate-400 hover:text-[#FFD700] transition-colors flex items-center gap-2 group w-max">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-6 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" /> Services
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-slate-400 hover:text-[#FFD700] transition-colors flex items-center gap-2 group w-max">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-bold text-white text-sm mb-6 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />{" "}
              Standards
            </h4>
            <div className="flex flex-col gap-4">
              {certBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors w-max pr-6">
                  <div className="w-8 h-8 rounded-lg bg-[#111] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <span className="text-[13px] text-slate-300 font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-bold text-white text-sm mb-6 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" /> Get in
              Touch
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FFD700]/20 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FFD700] transition-colors" />
                </div>
                <span className="text-[14px] text-slate-400 leading-relaxed pt-1">
                  Lakshmi Nivas, Vinayaka Nagar, <br />
                  Murugeshpalya, Bangalore — 560017
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FFD700]/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FFD700] transition-colors" />
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[14px] text-slate-400 hover:text-white transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FFD700]/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FFD700] transition-colors" />
                </div>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="text-[14px] text-slate-400 hover:text-white transition-colors font-medium">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-500">
            © {new Date().getFullYear()} DM23 IFMS Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
