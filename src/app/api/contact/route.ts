import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";
import { readJSON, writeJSON } from "@/lib/jsonCMS";
import { isMailerConfigured, sendLeadEmail } from "@/lib/mailer";
import {
  isSheetWebhookConfigured,
  sendLeadToSheet,
} from "@/lib/sheetWebhook";
import type { ContactLead } from "@/types";

const schema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(10).max(20),
  service: z.string().min(1).max(80),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  let lead: ContactLead;

  try {
    const body = await request.json();
    const data = schema.parse(body);

    lead = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 1. Persist the lead first — it must survive even if email delivery fails.
  try {
    const leads = readJSON<ContactLead[]>("leads");
    leads.unshift(lead);
    writeJSON("leads", leads);
  } catch (error) {
    console.error("Failed to save lead:", error);
    return NextResponse.json(
      { error: "Could not save your enquiry. Please try again." },
      { status: 500 },
    );
  }

  // 2. Notify by email and push to the Google Sheet webhook. Failures here are
  //    logged but never fail the request: the lead is already stored and visible
  //    in the admin dashboard, so it can't be lost.
  await Promise.allSettled([
    isMailerConfigured()
      ? sendLeadEmail(lead).catch((error) => {
          console.error("Failed to send lead email:", error);
        })
      : Promise.resolve(console.warn("SMTP not configured — no email sent.")),

    isSheetWebhookConfigured()
      ? sendLeadToSheet(lead).catch((error) => {
          console.error("Failed to push lead to sheet webhook:", error);
        })
      : Promise.resolve(
          console.warn("SHEET_WEBHOOK_URL not set — no sheet row added."),
        ),
  ]);

  return NextResponse.json({ success: true }, { status: 201 });
}
