import Link from "next/link";
import { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import { cn } from "@/lib/utils";
import { Industry, IndustriesPageData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionIntro from "@/components/common/SectionIntro";
import ImageReveal from "@/components/motion/ImageReveal";
import { Reveal, Rule } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "DM23 IFMS serves industries from corporate offices to healthcare facilities, with tailored facility management solutions.",
};

export default function IndustriesPage() {
  const industries = readJSON<Industry[]>("industries")
    .filter((i) => i.status)
    .sort((a, b) => a.order - b.order);
  const pageData = readJSON<IndustriesPageData>("industries-page");

  return (
    <>
      <PageHero
        badge={pageData.hero.badge}
        title={pageData.hero.title}
        titleAccent={pageData.hero.titleAccent}
        description={pageData.hero.description}
        bgImage={pageData.hero.image}
      />

      {/* ── One editorial block per industry (anchors: /industries#<slug>) ── */}
      <section className="site-container py-20 md:py-32">
        <SectionIntro label="Industries we serve" />

        <div className="mt-12 md:mt-16">
          <Rule />
          {industries.map((industry, i) => {
            const imageRight = i % 2 === 1;
            return (
              <article
                key={industry.id}
                id={industry.slug}
                className="scroll-mt-20 md:scroll-mt-24">
                <div className="grid grid-cols-12 gap-x-6 gap-y-8 py-10 md:py-16">
                  <ImageReveal
                    src={industry.image}
                    alt={industry.name}
                    parallax
                    className={cn(
                      "col-span-12 aspect-[4/3] bg-sand md:col-span-6 md:row-start-1 md:aspect-[5/4]",
                      imageRight ? "md:col-start-7" : "md:col-start-1",
                    )}
                  />

                  <div
                    className={cn(
                      "col-span-12 flex flex-col md:col-span-5 md:row-start-1",
                      imageRight ? "md:col-start-1" : "md:col-start-8",
                    )}>
                    <Reveal>
                      <h3 className="text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:text-row">
                        {industry.name}
                      </h3>
                    </Reveal>

                    <Reveal delay={0.08} className="mt-6 md:mt-auto md:pt-10">
                      <p className="max-w-md text-body leading-[1.7] text-clay">
                        {industry.description}
                      </p>

                      {industry.services.length > 0 && (
                        <div className="mt-8">
                          <p className="text-eyebrow font-semibold tracking-[0.16em] text-clay uppercase">
                            Key services
                          </p>
                          <ul className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                            {industry.services.map((service) => (
                              <li
                                key={service}
                                className="border-t border-ink/10 py-3 text-eyebrow font-semibold tracking-[0.14em] text-ink uppercase">
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link
                        href="/contact"
                        aria-label={`Discuss solutions for ${industry.name}`}
                        className="link-wipe mt-8">
                        Discuss solutions <span aria-hidden>↗</span>
                      </Link>
                    </Reveal>
                  </div>
                </div>
                <Rule />
              </article>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
