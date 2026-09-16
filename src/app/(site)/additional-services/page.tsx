import Link from "next/link";
import type { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import type { AdditionalServicesData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionIntro from "@/components/common/SectionIntro";
import { MaskLine, Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Additional Services | DMIFMS",
  description: "Hospitality and Support services by DM23 IFMS.",
};

const categoryCopy: Record<string, { intro: string; points: string[] }> = {
  hospitality: {
    intro:
      "Guest-facing support designed to keep stays, meals, and shared spaces clean, organized, and welcoming.",
    points: [
      "Guest house operations and room readiness",
      "Pantry, cafeteria, and catering support",
      "Food court and beverage counter operations",
      "Courteous service staff for front-line execution",
    ],
  },
  support: {
    intro:
      "Back-end support services that keep offices running smoothly without distracting the core team.",
    points: [
      "Staffing, payroll, and admin outsourcing",
      "Mail room and document handling",
      "Reception and helpdesk assistance",
      "Day-to-day operational coordination",
    ],
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function AdditionalServicesPage() {
  const data = readJSON<AdditionalServicesData>("additional-services");

  return (
    <>
      <PageHero
        badge={data.hero.badge}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        description={data.hero.description}
        breadcrumbs={[{ label: "Additional Services" }]}
        bgImage="/images/services/office-assistance.jpg"
      />

      <section id="services" className="site-container scroll-mt-24 py-20 md:py-32">
        <SectionIntro
          label={data.title}
          aside={
            <Link href="#categories" className="link-wipe">
              Explore Solutions <span aria-hidden>↓</span>
            </Link>
          }>
          From warm hospitality to reliable back-office support, we provide end-to-end services to
          elevate your facility&apos;s operations.
        </SectionIntro>

        <h3 className="mt-16 text-[clamp(2.4rem,5.6vw,6rem)] leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase md:mt-24">
          <MaskLine>Tailored Solutions</MaskLine>
          <MaskLine delay={0.08}>for Every Need</MaskLine>
        </h3>
      </section>

      <div id="categories" className="site-container scroll-mt-24 pb-20 md:pb-32">
        {data.categories.map((cat, ci) => {
          const copy = categoryCopy[cat.id] ?? categoryCopy.hospitality;

          return (
            <section
              key={cat.id}
              aria-labelledby={`category-${cat.id}`}
              className="grid grid-cols-12 gap-x-6 gap-y-10 border-t border-ink/15 py-14 md:py-20">
              <div className="col-span-12 flex items-baseline justify-between gap-6">
                <span className="text-[11px] text-tan tabular-nums">{pad(ci + 1)}</span>
                <span className="text-[11px] font-semibold tracking-[0.16em] text-ink uppercase">
                  {pad(cat.services.length)} services
                </span>
              </div>

              <h2
                id={`category-${cat.id}`}
                className="col-span-12 -mt-4 text-[clamp(2.4rem,5.6vw,6rem)] leading-[0.95] font-normal tracking-[-0.04em] break-words text-ink uppercase">
                <MaskLine>({cat.title})</MaskLine>
              </h2>

              <div className="col-span-12 self-start lg:sticky lg:top-32 lg:col-span-5">
                <Reveal>
                  <p className="max-w-md text-[15px] leading-[1.7] text-ink">
                    Professional {cat.title.toLowerCase()} services designed to seamlessly integrate
                    with your core operations.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-clay">{copy.intro}</p>
                </Reveal>
                <Reveal delay={0.16}>
                  <ul className="mt-8 max-w-md border-b border-ink/10">
                    {copy.points.map((point, p) => (
                      <li
                        key={point}
                        className="flex gap-4 border-t border-ink/10 py-3 text-sm leading-snug text-ink">
                        <span className="pt-px text-[10px] text-tan tabular-nums">{pad(p + 1)}</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <ol className="col-span-12 border-b border-ink/10 lg:col-span-7">
                {cat.services.map((service, si) => (
                  <li key={service.id}>
                    <Link href="/contact" className="group block border-t border-ink/10">
                      <Reveal
                        delay={Math.min(si, 4) * 0.06}
                        y={24}
                        className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-6 md:py-8">
                        <span className="col-span-2 text-[11px] text-tan tabular-nums">
                          ({pad(si + 1)})
                        </span>
                        <h3 className="col-span-10 text-2xl leading-[1.08] font-normal tracking-[-0.025em] break-words text-ink uppercase transition-colors duration-500 group-hover:text-clay md:col-span-7 md:text-[2rem]">
                          {service.title}
                        </h3>
                        <span className="col-span-10 col-start-3 md:col-span-3 md:col-start-auto md:justify-self-end">
                          <span className="link-wipe">
                            Learn more <span aria-hidden>↗</span>
                          </span>
                        </span>
                      </Reveal>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>

      <CTASection />
    </>
  );
}
