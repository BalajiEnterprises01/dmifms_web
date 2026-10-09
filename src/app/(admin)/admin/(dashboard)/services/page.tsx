"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, ToggleLeft, ToggleRight, Plus, Loader2 } from "lucide-react";
import { Service } from "@/types";
import { Badge } from "@/components/ui/badge";
import EditServiceModal from "@/components/admin/EditServiceModal";

const categoryColors: Record<string, string> = {
  soft: "bg-blue-100 text-blue-700",
  manpower: "bg-sky-100 text-sky-700",
  specialized: "bg-emerald-100 text-emerald-700",
  repair: "bg-amber-100 text-amber-700",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editService, setEditService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => { 
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchServices(); 
  }, []);

  const toggleStatus = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: "PATCH" });
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: !s.status } : s))
    );
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service permanently?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const openEdit = (service: Service) => {
    setEditService(service);
    setShowModal(true);
  };

  const openAdd = () => {
    setEditService(null);
    setShowModal(true);
  };

  const onSave = () => {
    fetchServices();
    setShowModal(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">{services.length} total, {services.filter(s => s.status).length} active</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-[#F8FAFC]">
                <th className="text-left px-5 py-3 text-xs font-black text-slate-400 uppercase tracking-wider">Service</th>
                <th className="text-left px-5 py-3 text-xs font-black text-slate-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-black text-slate-400 uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="text-right px-5 py-3 text-xs font-black text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-sm text-[#0F172A]">{service.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{service.shortDescription}</div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${categoryColors[service.category] ?? "bg-slate-100 text-slate-600"}`}>
                      {service.categoryLabel}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <button
                      onClick={() => toggleStatus(service.id)}
                      className="flex items-center gap-1.5 text-xs font-bold transition-colors"
                    >
                      {service.status ? (
                        <><ToggleRight className="w-5 h-5 text-[#10B981]" /><span className="text-[#10B981]">Active</span></>
                      ) : (
                        <><ToggleLeft className="w-5 h-5 text-slate-300" /><span className="text-slate-400">Inactive</span></>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(service)}
                        className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#1E3A8A] hover:bg-[#1E3A8A]/5 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <EditServiceModal
          service={editService}
          onClose={() => setShowModal(false)}
          onSave={onSave}
        />
      )}
    </div>
  );
}
