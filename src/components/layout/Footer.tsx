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

  const externalLinks = [
    { label: "LinkedIn", href: ensureAbsoluteUrl(contact.social.linkedin) },
    { label: "X (Twitter)", href: ensureAbsoluteUrl(contact.social.twitter) },
    { label: "Facebook", href: ensureAbsoluteUrl(contact.social.facebook) },
  ];

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
      <div className="mx-auto max-w-screen-2xl px-5 pt-16 md:px-12 md:pt-24">
        {/* Brand row. The navy/gold logo has no contrast on the dark footer,
            so it sits on a paper plate. */}
        <div className="flex flex-col gap-8 border-b border-paper/10 pb-12 md:flex-row md:items-center md:justify-between md:pb-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <Link
              href="/"
              aria-label="DM23 IFMS — home"
              className="inline-flex w-fit bg-paper px-6 py-5 transition-opacity hover:opacity-90">
              <Image
                src="/images/logo/header_logo.png"
                alt="DM23 IFMS Pvt Ltd"
                width={730}
                height={254}
                className="h-14 w-auto md:h-16"
              />
            </Link>
            <div>
              <p className="text-lg leading-snug text-paper md:text-xl">{hero.subtitle}</p>
              <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                {hero.title} {hero.titleAccent}
              </p>
            </div>
          </div>
          <Link href="/contact" className="btn-light w-full sm:w-fit">
            Get a quote <span aria-hidden>↗</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-8">
          {details.map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-2 inline-block max-w-xs py-2 text-[15px] leading-relaxed text-paper/80 transition-colors hover:text-paper">
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 max-w-xs py-2 text-[15px] leading-relaxed text-paper/80">
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 h-px w-full bg-paper/10 md:mt-24" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-12 md:py-16 lg:grid-cols-12">
          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">Company</p>
            <ul className="mt-5 flex flex-col gap-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-paper/70 transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services" className="col-span-2 lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">Services</p>
            <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[15px] text-paper/70 transition-colors hover:text-paper">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="col-start-2 row-start-1 flex flex-col items-end gap-3 text-right lg:col-span-4 lg:col-start-9">
            <li className="mb-2 text-xs font-semibold tracking-[0.16em] text-gold uppercase">Connect</li>
            <li>
              <Link
                href="/terms"
                className="text-[13px] font-medium tracking-[0.12em] text-paper/70 uppercase transition-colors hover:text-paper">
                Terms of Service <span aria-hidden>↗</span>
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-[13px] font-medium tracking-[0.12em] text-paper/70 uppercase transition-colors hover:text-paper">
                Privacy Policy <span aria-hidden>↗</span>
              </Link>
            </li>
            {externalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[13px] font-medium tracking-[0.12em] text-paper/70 uppercase transition-colors hover:text-paper">
                  {link.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-px w-full bg-paper/10" />

        <div className="pt-10 md:pt-14">
          <FooterWordmark text="DM23 IFMS" />
        </div>

        <div className="flex flex-col gap-2 py-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DM23 IFMS Pvt Ltd. All rights reserved.</p>
          <p className="tracking-[0.16em] uppercase">Driven Minds. Delivered Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
