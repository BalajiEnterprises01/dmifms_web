import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/jsonCMS";
import { isAdminAuthenticated } from "@/lib/auth";

const ALLOWED_SECTIONS = ["hero", "about", "vision-mission", "quality", "waste", "production", "sections", "contact", "industries", "process", "why-choose-us", "services-page", "industries-page", "process-page"];

interface RouteParams {
  params: Promise<{ section: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { section } = await params;
  if (!ALLOWED_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }
  try {
    const data = readJSON(section);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await isAdminAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { section } = await params;
  if (!ALLOWED_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }
  try {
    const body = await request.json();
    writeJSON(section, body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
