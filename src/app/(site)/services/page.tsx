import { Suspense } from "react";
import type { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import type { Service, ServicesPageData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/sections/CTASection";
import ServicesIndex from "@/components/services/ServicesIndex";
import ImageReveal from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = readJSON<ServicesPageData>("services-page");
  return { title: hero.badge, description: hero.description };
}

export default function ServicesPage() {
  const { hero } = readJSON<ServicesPageData>("services-page");
  const services = readJSON<Service[]>("services")
    .filter((s) => s.status)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero
        badge={hero.badge}
        title={hero.title}
        titleAccent={hero.titleAccent}
        description={hero.description}
        breadcrumbs={[{ label: "Services" }]}
        bgImage={hero.image}
      />

      {/* The filter reads ?category= on the client (useSearchParams). */}
      <Suspense fallback={null}>
        <ServicesIndex services={services} />
      </Suspense>

      <section className="site-container pb-20 md:pb-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-ink/10 pt-10 md:pt-14">
          <div className="col-span-12 flex flex-col lg:col-span-5">
            <Reveal>
              <h2 className="text-sm font-semibold text-ink">At a glance</h2>
            </Reveal>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-16 lg:mt-auto lg:pt-16">
              {hero.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col-reverse">
                  <dt className="mt-4 text-[13px] leading-snug text-clay">{stat.label}</dt>
                  <dd className="text-[clamp(2.75rem,5vw,4.5rem)] leading-none font-light tracking-[-0.05em] text-ink tabular-nums">
                    {stat.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ImageReveal
              src={hero.secondaryImage}
              alt="Team Management"
              sizes="(min-width: 1024px) 58vw, 100vw"
              parallax
              className="aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
