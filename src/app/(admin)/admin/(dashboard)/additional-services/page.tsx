"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Info, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { AdditionalServicesData } from "@/types";

export default function AdminAdditionalServicesPage() {
  const [data, setData] = useState<AdditionalServicesData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content/additional-services")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await fetch("/api/content/additional-services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Saved successfully!");
    } catch (e) {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (!data)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
      </div>
    );

  const inp =
    "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/40 bg-white";
  const lbl = (t: string) => (
    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
      {t}
    </label>
  );

  return (
    <div className="max-w-4xl space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">
            Additional Services
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage additional services page content.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#1e3a8a]/90 text-white text-sm font-bold rounded-xl transition-all shadow-sm disabled:opacity-50">
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}{" "}
          Save Changes
        </button>
      </div>

      {/* ── Hero Section ── */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5 shadow-sm">
        <h2 className="font-extrabold text-[#0F172A] text-lg tracking-wide flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-[#1E3A8A]" /> Hero Content
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            {lbl("Badge")}{" "}
            <input
              className={inp}
              value={data.hero?.badge || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, badge: e.target.value },
                })
              }
            />
          </div>
          <div>
            {lbl("Title")}{" "}
            <input
              className={inp}
              value={data.hero?.title || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, title: e.target.value },
                })
              }
            />
          </div>
          <div>
            {lbl("Title Accent")}{" "}
            <input
              className={inp}
              value={data.hero?.titleAccent || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, titleAccent: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div>
          {lbl("Description")}
          <textarea
            className={`${inp} h-24`}
            value={data.hero?.description || ""}
            onChange={(e) =>
              setData({
                ...data,
                hero: { ...data.hero, description: e.target.value },
              })
            }
          />
        </div>
      </div>

      {/* ── Categories Section ── */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold text-[#0F172A] text-lg tracking-wide flex items-center gap-2">
            <Info className="w-5 h-5 text-[#1E3A8A]" /> Categories
          </h2>
          <button
            onClick={() =>
              setData({
                ...data,
                categories: [
                  ...(data.categories || []),
                  {
                    id: Date.now().toString(),
                    title: "New Category",
                    icon: "shield",
                    color: "#2563EB",
                    services: [],
                  },
                ],
              })
            }
            className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        <div className="space-y-6">
          {data.categories?.map((cat, idx) => (
            <div
              key={cat.id || idx}
              className="p-4 border border-slate-200 rounded-xl space-y-3 relative group">
              <button
                onClick={() => {
                  const n = [...data.categories];
                  n.splice(idx, 1);
                  setData({ ...data, categories: n });
                }}
                className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-3 gap-4 pr-8">
                <div>
                  {lbl("Title")}{" "}
                  <input
                    className={inp}
                    value={cat.title}
                    onChange={(e) => {
                      const n = [...data.categories];
                      n[idx].title = e.target.value;
                      setData({ ...data, categories: n });
                    }}
                  />
                </div>
                <div>
                  {lbl("Icon")}{" "}
                  <input
                    className={inp}
                    value={cat.icon}
                    onChange={(e) => {
                      const n = [...data.categories];
                      n[idx].icon = e.target.value;
                      setData({ ...data, categories: n });
                    }}
                  />
                </div>
                <div>
                  {lbl("Color Hex")}{" "}
                  <input
                    className={inp}
                    value={cat.color}
                    onChange={(e) => {
                      const n = [...data.categories];
                      n[idx].color = e.target.value;
                      setData({ ...data, categories: n });
                    }}
                  />
                </div>
              </div>

              {/* Sub-services */}
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-700">
                    Services in this Category
                  </h4>
                  <button
                    onClick={() => {
                      const n = [...data.categories];
                      n[idx].services.push({
                        id: Date.now().toString(),
                        title: "New Service",
                        icon: "check",
                      });
                      setData({ ...data, categories: n });
                    }}
                    className="text-xs font-bold text-blue-600">
                    + Add Service
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {cat.services.map((svc, sidx) => (
                    <div
                      key={svc.id || sidx}
                      className="flex gap-2 items-center bg-white p-2 rounded-lg border border-slate-200">
                      <input
                        className={`${inp} py-1.5`}
                        placeholder="Title"
                        value={svc.title}
                        onChange={(e) => {
                          const n = [...data.categories];
                          n[idx].services[sidx].title = e.target.value;
                          setData({ ...data, categories: n });
                        }}
                      />
                      <input
                        className={`${inp} py-1.5 w-24`}
                        placeholder="Icon"
                        value={svc.icon}
                        onChange={(e) => {
                          const n = [...data.categories];
                          n[idx].services[sidx].icon = e.target.value;
                          setData({ ...data, categories: n });
                        }}
                      />
                      <button
                        onClick={() => {
                          const n = [...data.categories];
                          n[idx].services.splice(sidx, 1);
                          setData({ ...data, categories: n });
                        }}
                        className="text-red-500 p-1 hover:bg-red-50 rounded">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
