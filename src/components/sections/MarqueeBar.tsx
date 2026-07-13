"use client";

import { Building2, Monitor, Landmark, HeartPulse, Factory, GraduationCap, Plane, ShoppingBag, Wifi, Crown } from "lucide-react";

const industries = [
  { name: "Corporate Offices", Icon: Building2 },
  { name: "IT & ITES", Icon: Monitor },
  { name: "Banking & Finance", Icon: Landmark },
  { name: "Pharma & Healthcare", Icon: HeartPulse },
  { name: "Manufacturing", Icon: Factory },
  { name: "Educational Institutes", Icon: GraduationCap },
  { name: "Hospitality & Aviation", Icon: Plane },
  { name: "Malls & Food Courts", Icon: ShoppingBag },
  { name: "Telecom & Networking", Icon: Wifi },
  { name: "Government", Icon: Crown },
];

export default function MarqueeBar() {
  const doubled = [...industries, ...industries];

  return (
    <div className="bg-[#1E3A8A] py-4 overflow-hidden">
      <div className="flex items-center gap-0 w-max animate-marquee">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-8 border-r border-white/15 flex-shrink-0"
          >
            <item.Icon className="w-4 h-4 text-white/60" />
            <span className="text-sm font-semibold text-white/80 whitespace-nowrap tracking-wide">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
