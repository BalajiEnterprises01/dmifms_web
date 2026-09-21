import { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { ContactData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import SectionIntro from "@/components/common/SectionIntro";
import ContactForm from "@/components/sections/ContactForm";
import ImageReveal from "@/components/motion/ImageReveal";
import { Reveal, Rule } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DM23 IFMS for facility management solutions tailored to your needs.",
};

const assurances = [
  {
    title: "Operating Hours",
    description: "Mon-Sat: 9:00 AM - 6:00 PM\nSunday: Closed",
  },
  {
    title: "Free Consultation",
    description: "Get a no-cost site assessment and customized proposal.",
  },
  {
    title: "Certified Quality",
    description: "ISO certified processes and highly trained workforce.",
  },
];

const labelClass = "text-[11px] font-semibold tracking-[0.16em] text-clay uppercase";

const pad = (n: number) => String(n).padStart(2, "0");

/** map_embed may hold a bare https URL or a pasted <iframe> snippet. */
function mapSource(embed: string | undefined): string | null {
  const value = embed?.trim();
  if (!value) return null;
  if (value.startsWith("https://")) return value;
  return value.match(/src=["'](https:\/\/[^"']+)["']/)?.[1] ?? null;
}

export default function ContactPage() {
  const data = readJSON<ContactData>("contact");
  const mapSrc = mapSource(data.map_embed);

  const details = [
    { label: "Address", value: data.address },
    {
      label: "Phone",
      value: data.phone,
      href: `tel:${data.phone.replace(/\s+/g, "")}`,
    },
    { label: "Email", value: data.email, href: `mailto:${data.email}` },
  ];

  const socials = [
    { label: "LinkedIn", url: data.social.linkedin },
    { label: "X (Twitter)", url: data.social.twitter },
    { label: "Facebook", url: data.social.facebook },
  ]
    .filter((social) => social.url)
    .map((social) => ({ label: social.label, href: ensureAbsoluteUrl(social.url) }));

  return (
    <>
      <PageHero
        badge={data.hero.badge}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        description={data.hero.description}
        bgImage={data.hero.image}
      />

      {/* ── Enquiry form ── */}
      <section className="site-container py-20 md:py-32">
        <SectionIntro
          label="Enquiry"
          aside={
            <p className={`${labelClass} max-w-60 md:text-right`}>
              Our team typically responds within 24 hours.
            </p>
          }>
          {data.subtitle}
        </SectionIntro>
        <div className="mt-12 md:mt-16">
          <ContactForm />
        </div>
      </section>

      {/* ── Direct details ── */}
      <section className="site-container pb-20 md:pb-32">
        <SectionIntro label="Get in touch">
          Reach out directly using the details below, or fill out the form and we&apos;ll get
          back to you within 24 hours.
        </SectionIntro>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-16">
          <ImageReveal
            src={data.hero.secondaryImage}
            alt="DM23 IFMS-managed office reception"
            sizes="(min-width: 768px) 42vw, 100vw"
            className="col-span-12 aspect-[3/2] self-start bg-sand md:col-span-5"
          />

          <div className="col-span-12 md:col-span-7 lg:col-span-6 lg:col-start-7">
            <Rule />
            <dl className="grid grid-cols-1 gap-x-6 gap-y-10 pt-8 sm:grid-cols-2 md:pt-10">
              {details.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.08}>
                  <dt className={labelClass}>{item.label}</dt>
                  <dd className="mt-4 max-w-xs text-[15px] leading-relaxed break-words text-ink">
                    {item.href ? (
                      <a href={item.href} className="-my-2.5 inline-block py-2.5 transition-colors duration-300 hover:text-clay">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </Reveal>
              ))}
              {socials.length > 0 && (
                <Reveal delay={details.length * 0.08}>
                  <dt className={labelClass}>Connect</dt>
                  <dd className="mt-4">
                    <ul className="flex flex-col items-start gap-2">
                      {socials.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="link-wipe">
                            {social.label} <span aria-hidden>↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </Reveal>
              )}
            </dl>

            <ol className="mt-14 md:mt-20">
              {assurances.map((item, i) => (
                <li key={item.title}>
                  <Rule delay={i * 0.08} />
                  <Reveal className="grid grid-cols-12 gap-x-6 gap-y-2 py-6">
                    <span className="col-span-2 pt-0.5 text-[11px] font-semibold tracking-[0.16em] text-tan tabular-nums">
                      ({pad(i + 1)})
                    </span>
                    <h3 className="col-span-10 text-sm font-semibold text-ink sm:col-span-4">
                      {item.title}
                    </h3>
                    <p className="col-span-10 col-start-3 text-[15px] leading-[1.7] whitespace-pre-line text-clay sm:col-span-6 sm:col-start-auto">
                      {item.description}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Rule />
          </div>
        </div>

        {mapSrc && (
          <Reveal className="mt-16 md:mt-24">
            <iframe
              src={mapSrc}
              title="Office location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[50svh] min-h-80 w-full border-0 bg-sand"
            />
          </Reveal>
        )}
      </section>
    </>
  );
}
