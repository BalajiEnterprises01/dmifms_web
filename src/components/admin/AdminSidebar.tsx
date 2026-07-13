"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Building2,
  GitBranch,
  Info,
  Phone,
  LogOut,
  ChevronRight,
  CheckCircle,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Enquiries", href: "/admin/leads", icon: Inbox },
  { label: "Home Hero", href: "/admin/hero", icon: Sparkles },
  { label: "Page Heroes", href: "/admin/page-heroes", icon: Sparkles },
  { label: "Services", href: "/admin/services", icon: Building2 },
  { label: "Industries", href: "/admin/industries", icon: GitBranch },
  { label: "Process", href: "/admin/process", icon: ChevronRight },
  { label: "Staffing", href: "/admin/staffing", icon: Building2 },
  { label: "Waste Mgmt", href: "/admin/waste", icon: Building2 },
  {
    label: "Add. Services",
    href: "/admin/additional-services",
    icon: Building2,
  },
  { label: "Why Choose Us", href: "/admin/why-choose-us", icon: CheckCircle },
  { label: "About Us", href: "/admin/about", icon: Info },
  { label: "Contact Info", href: "/admin/contact", icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-[260px] flex-shrink-0 bg-[#0A192F] flex flex-col h-full border-r border-slate-800/50 shadow-2xl z-20">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <span className="text-white font-black text-sm tracking-wider">
              DM
            </span>
          </div>
          <div>
            <div className="font-bold text-white text-base tracking-tight">
              DM23 IFMS
            </div>
            <div className="text-[11px] text-[#EAB308] font-bold uppercase tracking-widest">
              Admin Portal
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto relative">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">
          Content Hub
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300",
                active
                  ? "bg-gradient-to-r from-[#2563EB]/10 to-transparent text-[#3B82F6] border border-[#2563EB]/20 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent",
              )}>
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform duration-300",
                  active ? "scale-110" : "group-hover:scale-110",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/10 transition-all mb-2 border border-transparent hover:border-white/5">
          <Building2 className="w-4 h-4" />
          Live Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/10">
          <LogOut className="w-4 h-4" />
          Secure Logout
        </button>
      </div>
    </aside>
  );
}
