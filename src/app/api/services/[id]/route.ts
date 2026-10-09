import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/jsonCMS";
import { isAdminAuthenticated } from "@/lib/auth";
import { revalidateSite } from "@/lib/revalidate";
import { Service } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await isAdminAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const services = readJSON<Service[]>("services");
  const idx = services.findIndex((s) => s.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  services[idx] = { ...services[idx], ...body };
  writeJSON("services", services);
  revalidateSite();
  return NextResponse.json(services[idx]);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const auth = await isAdminAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const services = readJSON<Service[]>("services");
  const idx = services.findIndex((s) => s.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  services[idx].status = !services[idx].status;
  writeJSON("services", services);
  revalidateSite();
  return NextResponse.json({ id, status: services[idx].status });
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const auth = await isAdminAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const services = readJSON<Service[]>("services");
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === services.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeJSON("services", filtered);
  revalidateSite();
  return NextResponse.json({ success: true });
}
