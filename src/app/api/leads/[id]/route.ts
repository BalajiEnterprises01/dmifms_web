import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/jsonCMS";
import { isAdminAuthenticated } from "@/lib/auth";
import type { ContactLead } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const leads = readJSON<ContactLead[]>("leads");
    const remaining = leads.filter((lead) => lead.id !== id);

    if (remaining.length === leads.length) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    writeJSON("leads", remaining);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
