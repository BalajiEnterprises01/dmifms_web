import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import type { ContactLead } from "@/types";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// Pre-trimmed wide crop of the logo (300x78). The source logos are 500x500 squares,
// which render as a tall block in an email header.
const LOGO_PATH = path.join(
  process.cwd(),
  "public",
  "images",
  "logo",
  "email_logo.png",
);
const LOGO_CID = "dm23logo";

const NAVY = "#0A192F";
const BLUE = "#2563EB";
const GOLD = "#EAB308";

/** Mail is optional: if SMTP env vars are missing we skip sending instead of failing the request. */
export function isMailerConfigured(): boolean {
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
}

function getRecipient(): string {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_EMAIL?.trim() ||
    "dm23@dm23.co.in"
  );
}

/** Escape user-supplied text before embedding it in the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Email clients need table layouts and inline styles — no flexbox/grid, no external CSS. */
function buildHtml(lead: ContactLead, hasLogo: boolean): string {
  const received = new Date(lead.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const rows: [string, string][] = [
    ["Name", escapeHtml(lead.name)],
    ["Company", escapeHtml(lead.company)],
    [
      "Email",
      `<a href="mailto:${escapeHtml(lead.email)}" style="color:${BLUE};text-decoration:none;">${escapeHtml(lead.email)}</a>`,
    ],
    [
      "Phone",
      `<a href="tel:${escapeHtml(lead.phone.replace(/\s+/g, ""))}" style="color:${BLUE};text-decoration:none;">${escapeHtml(lead.phone)}</a>`,
    ],
    ["Received", escapeHtml(received)],
  ];

  const detailRows = rows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:12px 16px;background:${i % 2 === 0 ? "#f8fafc" : "#ffffff"};border-bottom:1px solid #e2e8f0;font:600 12px/1.4 Arial,Helvetica,sans-serif;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;width:110px;vertical-align:top;">${label}</td>
          <td style="padding:12px 16px;background:${i % 2 === 0 ? "#f8fafc" : "#ffffff"};border-bottom:1px solid #e2e8f0;font:400 15px/1.5 Arial,Helvetica,sans-serif;color:#0f172a;">${value}</td>
        </tr>`,
    )
    .join("");

  const logoBlock = hasLogo
    ? `<img src="cid:${LOGO_CID}" width="150" height="39" alt="DM23 IFMS" style="display:block;border:0;outline:none;width:150px;height:39px;" />`
    : `<div style="font:800 20px/1 Arial,Helvetica,sans-serif;color:#ffffff;letter-spacing:1px;">DM23 IFMS</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${escapeHtml(lead.name)} from ${escapeHtml(lead.company)} enquired about ${escapeHtml(lead.service)}.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef2f7;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">

          <!-- Header -->
          <tr>
            <td style="background-color:${NAVY};padding:18px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="background-color:#ffffff;border-radius:6px;padding:7px 10px;width:170px;">
                    ${logoBlock}
                  </td>
                  <td align="right" style="font:700 11px/1.4 Arial,Helvetica,sans-serif;color:${GOLD};text-transform:uppercase;letter-spacing:1.5px;">
                    Website Enquiry
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr><td style="height:4px;line-height:4px;font-size:0;background-color:${GOLD};">&nbsp;</td></tr>

          <!-- Title -->
          <tr>
            <td style="padding:30px 32px 20px;">
              <div style="display:inline-block;background-color:#eff6ff;color:${BLUE};font:700 12px/1 Arial,Helvetica,sans-serif;padding:7px 12px;border-radius:20px;margin-bottom:14px;">
                ${escapeHtml(lead.service)}
              </div>
              <h1 style="margin:0 0 6px;font:800 24px/1.3 Arial,Helvetica,sans-serif;color:${NAVY};">
                New enquiry from ${escapeHtml(lead.name)}
              </h1>
              <p style="margin:0;font:400 14px/1.5 Arial,Helvetica,sans-serif;color:#64748b;">
                Submitted via the DM23 IFMS website contact form.
              </p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                ${detailRows}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:24px 32px 0;">
              <div style="font:700 12px/1.4 Arial,Helvetica,sans-serif;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Message</div>
              <div style="background-color:#f8fafc;border-left:4px solid ${BLUE};border-radius:0 8px 8px 0;padding:16px 18px;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:#334155;white-space:pre-wrap;">${escapeHtml(lead.message)}</div>
            </td>
          </tr>

          <!-- CTAs -->
          <tr>
            <td style="padding:26px 32px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:8px;background-color:${BLUE};">
                    <a href="mailto:${escapeHtml(lead.email)}?subject=Re:%20Your%20enquiry%20with%20DM23%20IFMS"
                       style="display:inline-block;padding:13px 26px;font:700 14px/1 Arial,Helvetica,sans-serif;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Reply to ${escapeHtml(lead.name.split(" ")[0])}
                    </a>
                  </td>
                  <td style="width:10px;">&nbsp;</td>
                  <td style="border-radius:8px;border:1px solid #cbd5e1;">
                    <a href="tel:${escapeHtml(lead.phone.replace(/\s+/g, ""))}"
                       style="display:inline-block;padding:12px 24px;font:700 14px/1 Arial,Helvetica,sans-serif;color:${NAVY};text-decoration:none;border-radius:8px;">
                      Call now
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;">
              <p style="margin:0 0 4px;font:700 13px/1.4 Arial,Helvetica,sans-serif;color:${NAVY};">
                DM23 IFMS Pvt Ltd
              </p>
              <p style="margin:0;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#94a3b8;">
                Driven Minds. Delivered Excellence.<br />
                This is an automated notification &mdash; reply directly to contact the enquirer.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendLeadEmail(lead: ContactLead): Promise<void> {
  if (!isMailerConfigured()) {
    throw new Error("SMTP is not configured");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const hasLogo = fs.existsSync(LOGO_PATH);

  const text = [
    `New enquiry from the DM23 IFMS website`,
    ``,
    `Name:     ${lead.name}`,
    `Company:  ${lead.company}`,
    `Email:    ${lead.email}`,
    `Phone:    ${lead.phone}`,
    `Service:  ${lead.service}`,
    `Received: ${new Date(lead.createdAt).toLocaleString("en-IN")}`,
    ``,
    `Message:`,
    lead.message,
  ].join("\n");

  await transporter.sendMail({
    from: `"DM23 IFMS Website" <${SMTP_USER}>`,
    to: getRecipient(),
    replyTo: `"${lead.name}" <${lead.email}>`,
    subject: `New enquiry: ${lead.service} — ${lead.company}`,
    text,
    html: buildHtml(lead, hasLogo),
    attachments: hasLogo
      ? [{ filename: "dm23-logo.png", path: LOGO_PATH, cid: LOGO_CID }]
      : [],
  });
}
