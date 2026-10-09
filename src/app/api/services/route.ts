import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/jsonCMS";
import { isAdminAuthenticated } from "@/lib/auth";
import { revalidateSite } from "@/lib/revalidate";
import { Service } from "@/types";

export async function GET() {
  const services = readJSON<Service[]>("services");
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const auth = await isAdminAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const services = readJSON<Service[]>("services");

  const newService: Service = {
    ...body,
    id: body.id || body.title.toLowerCase().replace(/\s+/g, "-"),
    slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
    status: body.status ?? true,
    order: body.order ?? services.length + 1,
  };

  services.push(newService);
  writeJSON("services", services);
  revalidateSite();
  return NextResponse.json(newService, { status: 201 });
}
