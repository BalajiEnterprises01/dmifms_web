import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { IntroProvider } from "@/components/motion/IntroLoader";

export const dynamic = "force-dynamic";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <IntroProvider>
        <div className="flex min-h-screen flex-col bg-paper text-ink">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </IntroProvider>
    </SmoothScroll>
  );
}
