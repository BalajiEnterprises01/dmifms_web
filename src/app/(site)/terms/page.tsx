import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | DM23 IFMS",
  description: "Terms of service for using the DM23 IFMS website.",
};

export default function TermsPage() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="container-max max-w-4xl mx-auto bg-white border border-slate-100 shadow-sm rounded-3xl p-8 md:p-12">
        <p className="text-xs font-bold uppercase tracking-widest text-[#EAB308] mb-4">
          Terms of Service
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#0A192F] mb-6">
          Website usage terms
        </h1>
        <p className="text-slate-600 leading-relaxed mb-8">
          By using this website, you agree to use the content for lawful and
          informational purposes only. Service descriptions, images, and contact
          details may be updated without prior notice.
        </p>

        <div className="space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">
              Acceptable use
            </h2>
            <p>
              Do not attempt to disrupt the website, misuse forms, or submit
              false information.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">
              Service information
            </h2>
            <p>
              Content on this website is provided as a general overview and does
              not replace a formal proposal or contract.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">Liability</h2>
            <p>
              DM23 IFMS is not responsible for losses arising from website use
              outside the intended purpose or from third-party links.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">Contact</h2>
            <p>For questions about these terms, email dm23@dm23.co.in.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
