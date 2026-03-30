/**
 * /api/alert — Section 8 waitlist alert signup
 * Adds contact to Resend segment "Haven — Section 8 Waitlist Alerts"
 * and sends a confirmation email.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

// Resend segment for Section 8 waitlist alerts
const ALERT_SEGMENT_ID = "f731173e-a5c8-449c-aaed-71c9c3563f58";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let email = "";
  let county = "Camden";
  try {
    const body = await req.json() as { email?: string; county?: string };
    email = (body.email ?? "").trim().toLowerCase();
    county = (body.county ?? "Camden").trim().slice(0, 60);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!EMAIL_REGEXP.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    // Add to Resend segment
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: ALERT_SEGMENT_ID,
    });

    // Send confirmation email
    await resend.emails.send({
      from: "Haven <haven@getmaide.com>",
      to: email,
      subject: "You're on the list — Section 8 waitlist alert",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #0a0f1a; color: #e2e8f0;">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Haven</span>
            <span style="font-size: 13px; color: #4a9e9e; margin-left: 8px;">by getMAIde</span>
          </div>
          <h1 style="font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 12px;">You're on the list.</h1>
          <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 16px;">
            Haven will notify you the moment a Section 8 / Housing Choice Voucher waitlist opens
            in <strong style="color: #e2e8f0;">${county} County, NJ</strong>.
          </p>
          <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 24px;">
            The Housing Authority of the City of Camden (HACC) waitlist last opened on
            March 21, 2025 — and closed the same day. When it opens again, Haven will send
            you this email within hours.
          </p>
          <div style="background: #111827; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <p style="font-size: 13px; color: #64748b; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.08em;">While you wait</p>
            <p style="color: #e2e8f0; font-size: 14px; margin: 0 0 8px; line-height: 1.5;">
              Know your housing rights. Haven decodes eviction notices, lease agreements,
              and court filings — free, in plain language.
            </p>
            <a href="https://haven.getmaide.com" style="color: #4a9e9e; font-size: 14px;">
              Open Haven →
            </a>
          </div>
          <p style="color: #475569; font-size: 12px; line-height: 1.5; margin: 0;">
            You'll only hear from Haven when a waitlist actually opens in your area.
            No newsletters, no spam. To unsubscribe, reply with "stop."
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[haven/alert] error:", err);
    return NextResponse.json(
      { error: "Could not save your email. Please try again." },
      { status: 500 }
    );
  }
}
