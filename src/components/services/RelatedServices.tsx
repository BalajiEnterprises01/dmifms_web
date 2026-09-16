import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";

interface RelatedServicesProps {
  services: Service[];
  /** Where "Explore More" leads (the category view of /services). */
  exploreHref: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Other services in the same category: swipeable row on small screens, three columns on desktop. */
export default function RelatedServices({ services, exploreHref }: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className="overflow-x-clip py-20 md:py-32">
      <div className="site-container">
        <SectionIntro
          label="Related Services"
          aside={
            <Link href={exploreHref} className="link-wipe">
              Explore More <span aria-hidden>↗</span>
            </Link>
          }
        />
      </div>

      <ul
        data-lenis-prevent-horizontal
        className="no-scrollbar site-track mt-12 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto pb-4 md:mt-16 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {services.map((service, i) => (
          <li key={service.id} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto">
            <Link href={`/services/${service.slug}?category=${service.category}`} className="group block">
              <Reveal delay={i * 0.08} y={40}>
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw"
                    className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <h3 className="text-xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase transition-colors duration-500 group-hover:text-clay md:text-2xl">
                    {service.title}
                  </h3>
                  <span className="pt-1 text-[11px] text-tan tabular-nums">({pad(i + 1)})</span>
                </div>
                <p className="mt-3 max-w-sm text-[15px] leading-[1.7] text-clay">{service.shortDescription}</p>
                <span className="link-wipe mt-5">
                  Learn More <span aria-hidden>↗</span>
                </span>
              </Reveal>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
