import Image from "next/image";
import Link from "next/link";
import { readJSON } from "@/lib/jsonCMS";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { siteLinks } from "@/lib/site-nav";
import FooterWordmark from "@/components/layout/FooterWordmark";
import type { ContactData, HeroData, Service } from "@/types";

export default function Footer() {
  const contact = readJSON<ContactData>("contact");
  const hero = readJSON<HeroData>("hero");
  // Read from the CMS so the footer never drifts from the services list.
  const services = readJSON<Service[]>("services")
    .filter((s) => s.status)
    .sort((a, b) => a.order - b.order);

  // Only show social profiles that have been set in admin > Contact.
  const externalLinks = [
    { label: "LinkedIn", url: contact.social.linkedin },
    { label: "X (Twitter)", url: contact.social.twitter },
    { label: "Facebook", url: contact.social.facebook },
  ]
    .filter((link) => link.url.trim())
    .map((link) => ({ label: link.label, href: ensureAbsoluteUrl(link.url) }));

  const details = [
    { label: "Address", value: contact.address },
    {
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Company", value: "DM23 IFMS Pvt Ltd" },
  ];

  return (
    <footer className="relative overflow-hidden bg-night text-paper">
      <div className="mx-auto max-w-screen-2xl px-5 pt-12 md:px-12 md:pt-16">
        {/* Brand row: an all-white version of the logo (dm23_logo_white.png)
            sits directly on the navy. */}
        <div className="flex flex-col gap-6 border-b border-paper/10 pb-10 md:flex-row md:items-center md:justify-between md:pb-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
            <Link
              href="/"
              aria-label="DM23 IFMS home"
              className="inline-flex w-fit transition-opacity hover:opacity-80">
              <Image
                src="/images/logo/dm23_logo_white.png"
                alt="DM23 IFMS Pvt Ltd"
                width={1343}
                height={420}
                className="h-14 w-auto md:h-16"
              />
            </Link>
            <div>
              <p className="text-lg leading-snug text-paper md:text-xl">{hero.subtitle}</p>
              <p className="mt-2 text-[13px] font-semibold tracking-[0.16em] text-gold uppercase">
                {hero.title} {hero.titleAccent}
              </p>
            </div>
          </div>
          <Link href="/contact" className="btn-light w-full sm:w-fit">
            Get a quote <span aria-hidden>↗</span>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-8">
          {details.map((item) => (
            <div key={item.label}>
              <p className="text-[13px] font-semibold tracking-[0.16em] text-gold uppercase">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-2 inline-block max-w-xs py-2 text-base leading-relaxed text-paper/80 transition-colors hover:text-paper">
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 max-w-xs py-2 text-base leading-relaxed text-paper/80">
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 h-px w-full bg-paper/10 md:mt-12" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 md:py-12 lg:grid-cols-12">
          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="text-[13px] font-semibold tracking-[0.16em] text-gold uppercase">Company</p>
            <ul className="mt-5 flex flex-col gap-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-paper/70 transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services" className="col-span-2 lg:col-span-5">
            <p className="text-[13px] font-semibold tracking-[0.16em] text-gold uppercase">Services</p>
            <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-base text-paper/70 transition-colors hover:text-paper">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="col-start-2 row-start-1 flex flex-col items-end gap-3 text-right lg:col-span-4 lg:col-start-9">
            <li className="mb-2 text-[13px] font-semibold tracking-[0.16em] text-gold uppercase">Connect</li>
            <li>
              <Link
                href="/terms"
                className="text-[14px] font-medium tracking-[0.12em] text-paper/70 uppercase transition-colors hover:text-paper">
                Terms of Service <span aria-hidden>↗</span>
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-[14px] font-medium tracking-[0.12em] text-paper/70 uppercase transition-colors hover:text-paper">
                Privacy Policy <span aria-hidden>↗</span>
              </Link>
            </li>
            {externalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[14px] font-medium tracking-[0.12em] text-paper/70 uppercase transition-colors hover:text-paper">
                  {link.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-px w-full bg-paper/10" />

        <div className="pt-8 md:pt-10">
          <FooterWordmark text="DM23 IFMS" />
        </div>

        <div className="flex flex-col gap-2 py-6 text-[13px] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DM23 IFMS Pvt Ltd. All rights reserved.</p>
          <p className="tracking-[0.16em] uppercase">Driven Minds. Delivered Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
