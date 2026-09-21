import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Reveal, Rule } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service | DM23 IFMS",
  description: "Terms of service for using the DM23 IFMS website.",
};

const EMAIL = "info@dm23.co.in";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Acceptable use",
    body: "Do not attempt to disrupt the website, misuse forms, or submit false information.",
  },
  {
    title: "Service information",
    body: "Content on this website is provided as a general overview and does not replace a formal proposal or contract.",
  },
  {
    title: "Liability",
    body: "DM23 IFMS is not responsible for losses arising from website use outside the intended purpose or from third-party links.",
  },
  {
    title: "Contact",
    body: (
      <>
        For questions about these terms, email{" "}
        <a
          href={`mailto:${EMAIL}`}
          className="text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-500 hover:decoration-ink">
          {EMAIL}
        </a>
        .
      </>
    ),
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Terms of Service" }]}
        badge="Terms of Service"
        title="Website usage terms"
        description="By using this website, you agree to use the content for lawful and informational purposes only. Service descriptions, images, and contact details may be updated without prior notice."
        size="sm"
      />

      <section className="site-container pt-8 pb-20 md:pt-12 md:pb-32">
        <ol>
          <Rule />
          {sections.map((section, i) => (
            <li key={section.title}>
              <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-11">
                <span className="col-span-12 pt-1 text-[11px] text-tan tabular-nums md:col-span-3 md:pt-3">
                  ({pad(i + 1)})
                </span>
                <h2 className="col-span-12 text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:col-span-4 md:text-[2rem]">
                  ({section.title})
                </h2>
                <p className="col-span-12 max-w-md text-[15px] leading-[1.7] text-clay md:col-span-5">
                  {section.body}
                </p>
              </Reveal>
              <Rule />
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
