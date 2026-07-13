import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DM23 IFMS",
  description: "Privacy policy for DM23 IFMS website visitors and enquiries.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="container-max max-w-4xl mx-auto bg-white border border-slate-100 shadow-sm rounded-3xl p-8 md:p-12">
        <p className="text-xs font-bold uppercase tracking-widest text-[#EAB308] mb-4">
          Privacy Policy
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#0A192F] mb-6">
          How we handle your information
        </h1>
        <p className="text-slate-600 leading-relaxed mb-8">
          DM23 IFMS collects only the information required to respond to
          enquiries, process service requests, and improve our website
          experience. We do not sell personal data, and we keep access limited
          to authorized team members.
        </p>

        <div className="space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">
              Information we collect
            </h2>
            <p>
              This may include your name, email address, phone number, company
              name, and any details you share through our contact forms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">
              How we use it
            </h2>
            <p>
              We use the information to reply to enquiries, schedule calls,
              prepare proposals, and maintain service records.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">
              Data protection
            </h2>
            <p>
              We follow reasonable technical and organizational safeguards to
              reduce unauthorized access, loss, or misuse of submitted data.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">Contact</h2>
            <p>
              For privacy-related questions, contact us at dm23@dm23.co.in.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
