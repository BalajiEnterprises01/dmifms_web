import Link from "next/link";
import type { AboutData } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import ImageReveal from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop";

interface AboutSectionProps {
  data: AboutData;
}

/** Company statement beside a photo. */
export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="site-container py-20 md:py-32">
      <SectionIntro
        label="About us"
        aside={
          <Link href="/contact" className="link-wipe">
            Contact us <span aria-hidden>↗</span>
          </Link>
        }
      />

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-16">
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <ImageReveal
            src={data.image || FALLBACK_IMAGE}
            alt="About DM23 IFMS"
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            parallax
            className="aspect-[4/5] w-full"
          />
        </div>

        <div className="col-span-12 flex flex-col md:col-span-6 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-[clamp(1.375rem,2.6vw,2.375rem)] leading-[1.18] tracking-[-0.025em] text-ink">
              {data.title}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-8 md:mt-auto md:pt-10">
            <p className="max-w-md text-base leading-[1.7] text-clay">{data.description}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
