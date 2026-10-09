"use client";

import { useState } from "react";
import { X, Loader2, Save } from "lucide-react";
import { Service, ServiceCategory } from "@/types";

interface EditServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onSave: () => void;
}

const categories: { value: ServiceCategory; label: string }[] = [
  { value: "soft", label: "Soft Services" },
  { value: "manpower", label: "Manpower Services" },
  { value: "specialized", label: "Specialised Services" },
  { value: "repair", label: "Repair & Maintenance Services" },
];

export default function EditServiceModal({ service, onClose, onSave }: EditServiceModalProps) {
  const isEdit = !!service;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: service?.title ?? "",
    slug: service?.slug ?? "",
    category: service?.category ?? "soft" as ServiceCategory,
    categoryLabel: service?.categoryLabel ?? "Soft Services",
    shortDescription: service?.shortDescription ?? "",
    description: service?.description ?? "",
    icon: service?.icon ?? "sparkles",
    image: service?.image ?? "",
    features: service?.features.join("\n") ?? "",
    status: service?.status ?? true,
    order: service?.order ?? 1,
  });

  const set = (key: string, value: string | boolean | number | ServiceCategory) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleCategoryChange = (cat: ServiceCategory) => {
    const labelMap: Record<ServiceCategory, string> = Object.fromEntries(
      categories.map((c) => [c.value, c.label]),
    ) as Record<ServiceCategory, string>;
    setForm((f) => ({ ...f, category: cat, categoryLabel: labelMap[cat] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
    };

    if (isEdit && service) {
      await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setLoading(false);
    onSave();
  };

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/30 transition-all bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-extrabold text-[#0F172A] text-base">
            {isEdit ? "Edit Service" : "Add New Service"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Title *</label>
              <input className={inputClass} value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Slug *</label>
              <input className={inputClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Category *</label>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    form.category === cat.value
                      ? "bg-[#1E3A8A] text-white"
                      : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {cat.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Short Description *</label>
            <input className={inputClass} value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} required />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Full Description *</label>
            <textarea className={`${inputClass} resize-none`} rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Icon name</label>
              <input className={inputClass} value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="sparkles" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Image path</label>
              <input className={inputClass} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/images/services/..." />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Features (one per line)</label>
            <textarea className={`${inputClass} resize-none`} rows={4} value={form.features} onChange={(e) => set("features", e.target.value)} placeholder="Daily cleaning&#10;Deep cleaning&#10;Sanitization" />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.status} onChange={(e) => set("status", e.target.checked)} className="w-4 h-4 rounded accent-[#1E3A8A]" />
              <span className="text-sm font-semibold text-slate-600">Active / Visible</span>
            </label>
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:opacity-90 disabled:opacity-60 transition-opacity">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isEdit ? "Save Changes" : "Add Service"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
