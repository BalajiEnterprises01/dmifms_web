"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Info, ImageIcon, Upload, Plus, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { StaffingData } from "@/types";

export default function AdminStaffingPage() {
  const [data, setData] = useState<StaffingData | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/content/staffing")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await fetch("/api/content/staffing", {
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

  const uploadImg = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "staffing-images");

    const uploadPromise = fetch("/api/upload", { method: "POST", body: fd })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok && json.url && data) {
          setData({ ...data, hero: { ...data.hero, image: json.url } });
          return "Image uploaded successfully! Remember to click Save Changes.";
        } else {
          throw new Error(json.error || "Upload failed");
        }
      })
      .finally(() => setUploading(false));

    toast.promise(uploadPromise, {
      loading: "Uploading image...",
      success: "Image uploaded successfully! Remember to click Save Changes.",
      error: (err) => err.message || "Network error during upload",
    });
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
            Staffing Solutions
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage staffing page content and offerings.
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
          <div>
            {lbl("Highlight Quote")}{" "}
            <input
              className={inp}
              value={data.hero?.highlight || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, highlight: e.target.value },
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

        <div>
          {lbl("Hero Image")}
          <div
            className="relative rounded-2xl overflow-hidden w-64 aspect-[16/9] bg-slate-100 cursor-pointer group border-2 border-dashed border-slate-200"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => {
                const f = (e.target as HTMLInputElement).files?.[0];
                if (f) uploadImg(f);
              };
              input.click();
            }}>
            {data.hero?.image ? (
              <Image
                src={data.hero.image}
                alt="Hero"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="w-6 h-6 text-white" />
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Offerings ── */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold text-[#0F172A] text-lg tracking-wide flex items-center gap-2">
            <Info className="w-5 h-5 text-[#1E3A8A]" /> Offerings
          </h2>
          <button
            onClick={() =>
              setData({
                ...data,
                offerings: [
                  ...(data.offerings || []),
                  {
                    id: Date.now().toString(),
                    title: "New Offering",
                    icon: "user",
                    features: [],
                  },
                ],
              })
            }
            className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">
            <Plus className="w-4 h-4" /> Add Offering
          </button>
        </div>

        <div className="space-y-4">
          {data.offerings?.map((offering, idx) => (
            <div
              key={offering.id || idx}
              className="p-4 border border-slate-200 rounded-xl space-y-3 relative group">
              <button
                onClick={() => {
                  const n = [...(data.offerings || [])];
                  n.splice(idx, 1);
                  setData({ ...data, offerings: n });
                }}
                className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-2 gap-4 pr-8">
                <div>
                  {lbl("Title")}{" "}
                  <input
                    className={inp}
                    value={offering.title}
                    onChange={(e) => {
                      const n = [...(data.offerings || [])];
                      n[idx].title = e.target.value;
                      setData({ ...data, offerings: n });
                    }}
                  />
                </div>
                <div>
                  {lbl("Icon (e.g. user, user-check)")}{" "}
                  <input
                    className={inp}
                    value={offering.icon}
                    onChange={(e) => {
                      const n = [...(data.offerings || [])];
                      n[idx].icon = e.target.value;
                      setData({ ...data, offerings: n });
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  {lbl("Features")}
                  <button
                    onClick={() => {
                      const n = [...(data.offerings || [])];
                      if (!n[idx].features) n[idx].features = [];
                      n[idx].features.push("New feature");
                      setData({ ...data, offerings: n });
                    }}
                    className="text-xs font-bold text-blue-600">
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {offering.features?.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center gap-2">
                      <input
                        className={inp}
                        value={feat}
                        onChange={(e) => {
                          const n = [...(data.offerings || [])];
                          if (!n[idx].features) n[idx].features = [];
                          n[idx].features[fidx] = e.target.value;
                          setData({ ...data, offerings: n });
                        }}
                      />
                      <button
                        onClick={() => {
                          const n = [...(data.offerings || [])];
                          n[idx].features.splice(fidx, 1);
                          setData({ ...data, offerings: n });
                        }}
                        className="text-red-500 p-2">
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
