import Link from "next/link";
import { readJSON } from "@/lib/jsonCMS";
import type { ContactData } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { MaskLine, Reveal, Rule } from "@/components/motion/Reveal";

/** Closing band shared by inner pages: contact heading, quote CTA, phone and email. */
export default function CTASection() {
  const contact = readJSON<ContactData>("contact");
  const phoneHref = `tel:${contact.phone.replace(/\s+/g, "")}`;

  return (
    <section className="site-container py-20 md:py-32">
      <Rule className="mb-10 md:mb-14" />
      <SectionIntro label="Contact us">{contact.subtitle}</SectionIntro>

      <h3 className="mt-12 text-display leading-[0.95] font-normal tracking-[-0.04em] break-words text-ink uppercase md:mt-16 lg:max-w-[80%]">
        <MaskLine>{contact.title}</MaskLine>
      </h3>

      <div className="mt-12 grid grid-cols-12 items-end gap-x-6 gap-y-10 md:mt-16">
        <Reveal className="col-span-12 md:col-span-3">
          <Link
            href="/contact"
            className="flex size-32 flex-col items-center justify-center gap-1 rounded-full bg-brand text-center text-[14px] font-bold tracking-[0.14em] text-paper uppercase transition-colors duration-500 hover:bg-brand-deep md:size-36">
            Get a quote
            <span aria-hidden>↗</span>
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="col-span-12 md:col-span-9">
          <ul className="flex flex-col gap-8 sm:flex-row sm:gap-16 md:justify-end">
            <li>
              <p className="text-eyebrow font-semibold tracking-[0.16em] text-clay uppercase">Phone</p>
              <a href={phoneHref} className="link-wipe mt-3">
                {contact.phone} <span aria-hidden>↗</span>
              </a>
            </li>
            <li>
              <p className="text-eyebrow font-semibold tracking-[0.16em] text-clay uppercase">Email</p>
              <a href={`mailto:${contact.email}`} className="link-wipe mt-3 tracking-[0.04em] normal-case">
                {contact.email} <span aria-hidden>↗</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
