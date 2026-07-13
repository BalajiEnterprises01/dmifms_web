import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Phone,
  Star,
  ShieldCheck,
  Zap,
  Building2,
  Users,
  Settings,
  Mail,
} from "lucide-react";
import { readJSON } from "@/lib/jsonCMS";
import { ContactData, Service } from "@/types";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateStaticParams() {
  const services = readJSON<Service[]>("services");
  return services.filter((s) => s.status).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const services = readJSON<Service[]>("services");
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.description,
  };
}

const categoryMeta: Record<
  string,
  { color: string; bg: string; icon: React.ElementType; gradient: string }
> = {
  facility: {
    color: "#2563EB",
    bg: "bg-[#2563EB]/10",
    gradient: "from-[#1E3A8A] to-[#2563EB]",
    icon: ShieldCheck,
  },
  operational: {
    color: "#EAB308",
    bg: "bg-[#EAB308]/10",
    gradient: "from-[#0A192F] to-[#1A365D]",
    icon: Zap,
  },
  business: {
    color: "#10B981",
    bg: "bg-[#10B981]/10",
    gradient: "from-[#064E3B] to-[#10B981]",
    icon: Star,
  },
};

export default async function ServiceDetailPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { category } = await searchParams;
  const services = readJSON<Service[]>("services");
  const service = services.find((s) => s.slug === slug && s.status);

  if (!service) notFound();

  const meta = categoryMeta[service.category] ?? categoryMeta.facility;
  const CatIcon = meta.icon;
  const contact = readJSON<ContactData>("contact");
  const related = services
    .filter(
      (s) => s.category === service.category && s.id !== service.id && s.status,
    )
    .slice(0, 3);
  const backHref =
    category && ["facility", "operational", "business"].includes(category)
      ? `/services?category=${category}`
      : `/services?category=${service.category}`;

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* ── PREMIUM FULL-WIDTH OVERLAY HERO ── */}
      <section className="relative pt-28 pb-24 overflow-hidden bg-[#0A192F]">
        {/* Background Image with Dark Wash */}
        <div className="absolute inset-0 z-0">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.title}
              fill
              unoptimized={service.image.endsWith(".svg")}
              className="object-cover opacity-40 mix-blend-overlay"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-r from-[#0A192F] to-[#1A365D]" />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-[#0A192F]/90 via-[#0A192F]/60 to-[#F8F9FA]" />

          {/* Subtle Glows */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#EAB308]/15 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-[150px] pointer-events-none" />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-10 lg:absolute lg:top-0 lg:left-4 z-20 flex justify-start">
            <Link
              href={backHref}
              className="group inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-all duration-300 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 hover:border-white/20">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to All Services
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            {/* Category Pill */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#EAB308] text-[#0A192F] text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              <CatIcon className="w-4 h-4" />
              {service.categoryLabel}
            </div>

            {/* Huge Premium Title */}
            <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-serif font-medium text-white leading-[1.1] tracking-tight mb-8 drop-shadow-xl">
              {service.title}
            </h1>

            {/* Subtitle / Short Description */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto mb-10">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ARCHITECTURE ── */}
      <section className="relative z-20 -mt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-10 xl:gap-16">
            {/* LEFT: Core Details (8 Cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Image & Overview Card (Seamless Design) */}
              <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                {service.image && (
                  <div className="relative w-full h-[300px] lg:h-[400px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      unoptimized={service.image.endsWith(".svg")}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/80 to-transparent" />
                    <div className="absolute bottom-16 left-8 text-white">
                      <div className="text-sm font-bold tracking-widest uppercase text-[#EAB308] mb-2">
                        Service Overview
                      </div>
                      <h2 className="text-3xl font-serif">
                        Comprehensive Approach
                      </h2>
                    </div>
                  </div>
                )}

                <div className="p-8 lg:p-12">
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Grid of Features (SaaS Style Icon Boxes) */}
              <div className="mt-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-8 bg-[#EAB308] rounded-full" />
                  <h3 className="text-3xl font-serif font-medium text-[#0A192F]">
                    Key Deliverables
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {service.features.map((feature, idx) => (
                    <div
                      key={feature}
                      className="group relative bg-white p-6  border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#EAB308] to-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-[1.5rem]" />
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-[#EAB308]/10 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-[#0A192F] group-hover:text-[#EAB308]" />
                      </div>
                      <p className="text-slate-800 font-bold text-[15px] leading-snug">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Premium Sticky Sidebar (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Contact/Action Card (Dark Theme) */}
                <div className="bg-[#0A192F] p-8 relative overflow-hidden shadow-2xl border border-[#1A365D]">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EAB308]/20 rounded-full blur-2xl" />

                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/30 flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-7 h-7 text-[#EAB308]" />
                    </div>

                    <h4 className="text-2xl font-serif font-medium text-white mb-3">
                      Ready to Optimize?
                    </h4>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                      Connect with our experts to design a tailored service plan
                      for your facility.
                    </p>

                    <div className="flex flex-col gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-4  font-bold text-[#0A192F] bg-[#EAB308] hover:bg-white transition-colors shadow-lg">
                        Request a Proposal
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-4  font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
                        <Phone className="w-4 h-4" />
                        Call Support
                      </a>
                    </div>
                  </div>
                </div>

                {/* Trust Metrics Card */}
                <div className="bg-white p-8 border border-slate-200 shadow-lg">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 pb-4 border-b border-slate-100">
                    Why DM23 IFMS
                  </h4>

                  <ul className="space-y-6">
                    {[
                      {
                        title: "Expert Workforce",
                        desc: "SOP trained & certified",
                        icon: Users,
                      },
                      {
                        title: "Compliance First",
                        desc: "100% statutory adherence",
                        icon: ShieldCheck,
                      },
                      {
                        title: "Custom Solutions",
                        desc: "Tailored to your facility",
                        icon: Settings,
                      },
                      {
                        title: "Pan-India Reach",
                        desc: "Serving 500+ locations",
                        icon: Building2,
                      },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                          <item.icon className="w-5 h-5 text-[#0A192F]" />
                        </div>
                        <div>
                          <div className="font-bold text-[#0A192F] text-sm mb-1">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.desc}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ── Related Services Grid ── */}
          {related.length > 0 && (
            <div className="mt-24 pt-10 border-t border-slate-200">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-600 mb-4 shadow-sm">
                  Explore More
                </div>
                <h2 className="font-serif font-medium text-4xl text-[#0A192F]">
                  Related Services
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}?category=${service.category}`}
                    className="group block bg-white p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-[#EAB308] group-hover:border-[#EAB308] transition-colors duration-300">
                      <CatIcon className="w-7 h-7 text-[#0A192F] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-xl text-[#0A192F] mb-3 group-hover:text-[#2563EB] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-8 line-clamp-2">
                      {s.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0A192F] group-hover:gap-4 transition-all">
                      Learn More
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#EAB308] group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
