import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { IntroProvider } from "@/components/motion/IntroLoader";

/**
 * Pages are prerendered and served from cache, so they load fast. Admin
 * saves call revalidatePath, so edits still appear immediately; the hourly
 * window is only a backstop if a write happens outside the API.
 */
export const revalidate = 3600;

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
