import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070E1C] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1E3A8A]/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#2563EB]/15 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 leading-none mb-6 select-none">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-base mb-10 max-w-sm mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:opacity-90 transition-opacity shadow-lg"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white border border-white/20 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
