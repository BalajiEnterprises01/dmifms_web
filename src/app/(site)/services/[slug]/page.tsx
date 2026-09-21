import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import type { ContactData, Service } from "@/types";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionIntro from "@/components/common/SectionIntro";
import { MaskLine, Reveal } from "@/components/motion/Reveal";
import RelatedServices from "@/components/services/RelatedServices";
import ServicePager from "@/components/services/ServicePager";

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

const WHY_DM23 = [
  { title: "Expert Workforce", desc: "SOP trained & certified" },
  { title: "Compliance First", desc: "100% statutory adherence" },
  { title: "Custom Solutions", desc: "Tailored to your facility" },
  { title: "Pan-India Reach", desc: "Serving 500+ locations" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default async function ServiceDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { category } = await searchParams;
  const services = readJSON<Service[]>("services");
  const service = services.find((s) => s.slug === slug && s.status);

  if (!service) notFound();

  const contact = readJSON<ContactData>("contact");
  const related = services
    .filter((s) => s.category === service.category && s.id !== service.id && s.status)
    .slice(0, 3);
  const backHref =
    category && ["facility", "operational", "business"].includes(category)
      ? `/services?category=${category}`
      : `/services?category=${service.category}`;

  // Previous / next across the whole catalogue, wrapping at the ends.
  const ordered = services.filter((s) => s.status).sort((a, b) => a.order - b.order);
  const position = ordered.findIndex((s) => s.id === service.id);
  const prev = ordered[(position - 1 + ordered.length) % ordered.length];
  const next = ordered[(position + 1) % ordered.length];

  return (
    <>
      <PageHero
        badge={service.categoryLabel}
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[{ label: "Services", href: backHref }, { label: service.title }]}
        bgImage={service.image}
        fullImage
      />

      <section className="site-container py-20 md:py-32">
        <SectionIntro
          label="Service Overview"
          aside={
            <Link href={backHref} className="link-wipe">
              <span aria-hidden>←</span> Back to All Services
            </Link>
          }>
          {service.description}
        </SectionIntro>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-16 md:mt-24">
          <div className="col-span-12 lg:col-span-8">
            <h3 className="text-[clamp(2rem,4.8vw,4.75rem)] leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase">
              <MaskLine>Comprehensive</MaskLine>
              <MaskLine delay={0.08}>Approach</MaskLine>
            </h3>

            <div className="mt-12 md:mt-16">
              <Reveal>
                <h3 className="text-sm font-semibold text-ink">Key Deliverables</h3>
              </Reveal>
              <Reveal delay={0.08}>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-ink/10 pt-8 sm:grid-cols-3">
                  {service.features.map((feature, i) => (
                    <div key={feature}>
                      <dt className="text-[10px] font-semibold tracking-[0.16em] text-tan uppercase tabular-nums">
                        ({pad(i + 1)})
                      </dt>
                      <dd className="mt-2 text-sm leading-snug text-ink">{feature}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          <aside className="col-span-12 self-start lg:sticky lg:top-32 lg:col-span-4 lg:pl-6">
            <Reveal className="border-t border-ink/15 pt-8">
              <h3 className="text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:text-[2rem]">
                Ready to Optimize?
              </h3>
              <p className="mt-4 max-w-sm text-[15px] leading-[1.7] text-clay">
                Connect with our experts to design a tailored service plan for your facility.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <Link
                  href="/contact"
                  className="rounded-full bg-brand px-6 py-3 text-[11px] font-semibold tracking-[0.16em] text-paper uppercase transition-colors duration-500 hover:bg-brand-deep">
                  Request a Proposal
                </Link>
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="link-wipe">
                  Call Support <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-14 md:mt-16">
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">Why DM23 IFMS</h3>
              <ul className="mt-5 border-b border-ink/10">
                {WHY_DM23.map((item, i) => (
                  <li key={item.title} className="flex gap-4 border-t border-ink/10 py-4">
                    <span className="pt-0.5 text-[10px] text-tan tabular-nums">{pad(i + 1)}</span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-[13px] leading-snug text-clay">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>

      <RelatedServices services={related} exploreHref={backHref} />

      {ordered.length > 1 && <ServicePager prev={prev} next={next} />}

      <CTASection />
    </>
  );
}
