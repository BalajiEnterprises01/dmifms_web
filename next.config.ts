import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  // Pages folded into the four service sections (2026-10-09).
  async redirects() {
    return [
      { source: "/staffing", destination: "/solutions/man-power", permanent: true },
      { source: "/additional-services", destination: "/services", permanent: true },
      { source: "/services/front-office", destination: "/services/help-desk", permanent: true },
      { source: "/services/horticulture", destination: "/services/garden-maintenance", permanent: true },
      { source: "/services/staffing", destination: "/services/contract-staffing", permanent: true },
      { source: "/services/mechanical-electrical", destination: "/solutions/repair-maintenance", permanent: true },
      { source: "/services/office-assistance", destination: "/solutions/man-power", permanent: true },
      { source: "/services/payroll-management", destination: "/solutions/man-power", permanent: true },
      { source: "/services/waste-management", destination: "/waste-management", permanent: true },
    ];
  },
};

export default nextConfig;
