import type { ContactLead } from "@/types";

// Tool-agnostic: works with any service exposing a "catch"-style webhook
// (Make.com custom webhook, Zapier catch hook, n8n, Power Automate, ...).
// It receives the flat JSON below and appends it as a row in the Google Sheet.
// ZAPIER_WEBHOOK_URL is still read as a fallback so existing .env files keep working.
const SHEET_WEBHOOK_URL =
  process.env.SHEET_WEBHOOK_URL ?? process.env.ZAPIER_WEBHOOK_URL;

/** The webhook is optional: if the URL is unset we skip it instead of failing the request. */
export function isSheetWebhookConfigured(): boolean {
  return Boolean(SHEET_WEBHOOK_URL);
}

/**
 * Google Sheets evaluates any cell starting with = + - @ as a formula. That breaks
 * phone numbers ("+91 98765 43210" → #ERROR!) and lets a visitor inject a formula
 * through the form. A leading apostrophe forces Sheets to store the value as text;
 * the apostrophe itself is not displayed.
 */
function asSheetText(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

/**
 * Push a lead to the sheet webhook. The payload is intentionally flat — the
 * automation tool maps these top-level keys straight to spreadsheet columns.
 */
export async function sendLeadToSheet(lead: ContactLead): Promise<void> {
  if (!SHEET_WEBHOOK_URL) {
    throw new Error("SHEET_WEBHOOK_URL is not set");
  }

  const res = await fetch(SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: lead.id,
      date: new Date(lead.createdAt).toLocaleString("en-IN"),
      name: asSheetText(lead.name),
      company: asSheetText(lead.company),
      email: asSheetText(lead.email),
      phone: asSheetText(lead.phone),
      service: asSheetText(lead.service),
      message: asSheetText(lead.message),
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Sheet webhook responded with ${res.status}`);
  }
}
