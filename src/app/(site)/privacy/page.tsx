import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Reveal, Rule } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy | DM23 IFMS",
  description: "Privacy policy for DM23 IFMS website visitors and enquiries.",
};

const EMAIL = "info@dm23.co.in";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Information we collect",
    body: "This may include your name, email address, phone number, company name, and any details you share through our contact forms.",
  },
  {
    title: "How we use it",
    body: "We use the information to reply to enquiries, schedule calls, prepare proposals, and maintain service records.",
  },
  {
    title: "Data protection",
    body: "We follow reasonable technical and organizational safeguards to reduce unauthorized access, loss, or misuse of submitted data.",
  },
  {
    title: "Contact",
    body: (
      <>
        For privacy-related questions, contact us at{" "}
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Privacy Policy" }]}
        badge="Privacy Policy"
        title="How we handle your information"
        description="DM23 IFMS collects only the information required to respond to enquiries, process service requests, and improve our website experience. We do not sell personal data, and we keep access limited to authorized team members."
        size="sm"
      />

      <section className="site-container pt-8 pb-20 md:pt-12 md:pb-32">
        <ul>
          <Rule />
          {sections.map((section) => (
            <li key={section.title}>
              <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-11">
                <h2 className="col-span-12 text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:col-span-6 md:text-row">
                  ({section.title})
                </h2>
                <p className="col-span-12 max-w-md text-body leading-[1.7] text-clay md:col-span-5 md:col-start-8">
                  {section.body}
                </p>
              </Reveal>
              <Rule />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
