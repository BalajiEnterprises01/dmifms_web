"use client";

import { useEffect, useState } from "react";
import { Inbox, Loader2, Mail, Phone, Trash2, RefreshCw } from "lucide-react";
import type { ContactLead } from "@/types";

export default function LeadsPage() {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error("Failed to load enquiries");
      setLeads((await res.json()) as ContactLead[]);
    } catch {
      setError("Could not load enquiries. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch {
      setError("Could not delete that enquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="text-sm text-slate-500 mt-1">
            Contact form submissions from the website.
          </p>
        </div>
        <button
          onClick={loadLeads}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50">
          <RefreshCw className={loading ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
          <Inbox className="w-10 h-10 text-slate-300 mb-3" />
          <p className="font-semibold text-slate-700">No enquiries yet</p>
          <p className="text-sm text-slate-500 mt-1">
            New contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-slate-900">{lead.name}</h2>
                  <p className="text-sm text-slate-500">{lead.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {lead.service}
                  </span>
                  <button
                    onClick={() => handleDelete(lead.id)}
                    disabled={deletingId === lead.id}
                    aria-label="Delete enquiry"
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50">
                    {deletingId === lead.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm text-slate-700">
                {lead.message}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-3 text-sm">
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:text-blue-600">
                  <Mail className="w-4 h-4" />
                  {lead.email}
                </a>
                <a
                  href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:text-blue-600">
                  <Phone className="w-4 h-4" />
                  {lead.phone}
                </a>
                <time
                  dateTime={lead.createdAt}
                  className="ml-auto text-xs text-slate-400">
                  {new Date(lead.createdAt).toLocaleString("en-IN")}
                </time>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
