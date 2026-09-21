import type { Metadata } from "next";
import { Inter, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Display serif for the footer wordmark only; not preloaded, since it sits
// at the very bottom of every page.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "DM23 IFMS Pvt Ltd | Integrated Facility Management Solutions",
    template: "%s | DM23 IFMS",
  },
  description:
    "DM23 IFMS is India's fast-growing facility management company. Driven Minds. Delivered Excellence. Housekeeping, Staffing, Waste Management & more.",
  keywords: [
    "facility management",
    "integrated facility management",
    "housekeeping services",
    "staffing solutions",
    "waste management",
    "DM23 IFMS",
    "Bangalore facility management",
    "TFM",
    "total facility management",
    "pest control",
  ],
  authors: [{ name: "DM23 IFMS Pvt Ltd" }],
  creator: "DM23 IFMS Pvt Ltd",
  metadataBase: new URL("https://dm23ifms.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DM23 IFMS Pvt Ltd",
    title: "DM23 IFMS Pvt Ltd | Integrated Facility Management Solutions",
    description:
      "India's fast-growing facility management company. Housekeeping, Staffing, Waste Management & more across 10+ industries.",
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630, alt: "DM23 IFMS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DM23 IFMS Pvt Ltd | Facility Management Solutions",
    description: "India's trusted partner for integrated facility management.",
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DM23 IFMS Pvt Ltd",
  url: "https://dm23ifms.com",
  logo: "https://dm23ifms.com/images/logo/dm23_logo.png",
  description:
    "India's fast-growing integrated facility management company delivering consistent quality through trained people and robust processes.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#14, Lakshmi Nivas, 2nd Floor, 8th Main, 8th Cross, Murugeshpalya",
    addressLocality: "Bangalore",
    postalCode: "560017",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9148274743",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: "English",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
