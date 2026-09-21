import { NextResponse } from "next/server";
import { readJSON } from "@/lib/jsonCMS";
import { isAdminAuthenticated } from "@/lib/auth";
import type { ContactLead } from "@/types";

// Leads contain personal data (name, email, phone): admin only, never public.
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = readJSON<ContactLead[]>("leads");
    return NextResponse.json(leads);
  } catch {
    return NextResponse.json([]);
  }
}
