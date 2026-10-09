import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSection, getSections, servicesInSection } from "@/lib/services";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal, Rule } from "@/components/motion/Reveal";

interface Props {
  params: Promise<{ section: string }>;
}

export async function generateStaticParams() {
  return getSections().map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const data = getSection(section);
  if (!data) return {};
  return { title: data.label, description: data.description };
}

/** One of the four service sections: its services listed, with the copy for the section. */
export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  const data = getSection(section);
  if (!data) notFound();

  const services = servicesInSection(data.id);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: data.label }]}
        badge={data.badge}
        title={data.title}
        titleAccent={data.titleAccent}
        description={data.description}
        bgImage={data.image}
        imageAlt={data.label}
      />

      {/* ── What the section covers ── */}
      <section className="site-container py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <Reveal className="col-span-12 md:col-span-3">
            <h2 className="text-lg font-semibold text-ink">At a glance</h2>
          </Reveal>
          <div className="col-span-12 md:col-span-9">
            <Reveal delay={0.08}>
              <blockquote className="max-w-5xl text-heading-sm leading-[1.1] tracking-[-0.03em] text-ink">
                “{data.highlight}”
              </blockquote>
            </Reveal>
            <ul className="mt-12 grid max-w-4xl grid-cols-1 gap-x-10 md:mt-16 md:grid-cols-2">
              {data.points.map((point, i) => (
                <li key={point}>
                  <Reveal delay={i * 0.06} className="flex gap-4 border-t border-ink/10 py-5">
                    <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />
                    <p className="text-body leading-[1.6] text-ink">{point}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── The services in this section ── */}
      <section className="site-container pb-20 md:pb-32">
        <SectionIntro label={`${data.label} we provide`} />

        <div className="mt-12 md:mt-16">
          <Rule />
          <ul>
            {services.map((service, i) => (
              <li key={service.id}>
                <Link href={`/services/${service.slug}`} className="group block">
                <Reveal
                  delay={Math.min(i, 5) * 0.05}
                  className="grid grid-cols-12 items-start gap-x-6 gap-y-4 py-8 md:py-10">
                  {/* The column is kept even without a photo, so every title lines up. */}
                  <div className="relative col-span-3 aspect-[4/3] overflow-hidden sm:col-span-2">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="160px"
                        className="bg-sand object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <h3 className="col-span-9 text-xl leading-[1.1] font-normal tracking-[-0.02em] text-ink uppercase transition-colors duration-500 group-hover:text-clay sm:col-span-5 sm:text-2xl md:col-span-4 md:text-row">
                    {service.title}
                  </h3>
                  <p className="col-span-12 max-w-md text-body leading-[1.7] text-clay sm:col-span-5">
                    {service.shortDescription}
                  </p>
                  <span
                    aria-hidden
                    className="col-span-12 hidden justify-end text-xl leading-none text-ink transition-transform duration-500 ease-soft group-hover:translate-x-1 group-hover:-translate-y-1 md:col-span-1 md:flex">
                    ↗
                  </span>
                </Reveal>
                </Link>
                <Rule />
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-16">
          <Link href="/contact" className="btn-primary">
            Enquire now <span aria-hidden>↗</span>
          </Link>
          <Link href="/services" className="link-wipe">
            All services <span aria-hidden>↗</span>
          </Link>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
