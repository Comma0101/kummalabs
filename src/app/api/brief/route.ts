import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml, validateBrief } from "@/lib/brief";

// Receives the studio project-brief form and emails it to the studio inbox.
// Returns success only when the notification email was accepted by the provider.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = validateBrief(body, Date.now());
  if (!result.ok) {
    return NextResponse.json({ error: "Check the highlighted fields.", fields: result.errors }, { status: 400 });
  }
  if (result.spam) {
    // Accepted silently so bots get no signal; nothing is sent.
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BRIEF_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.error("brief: email delivery is not configured (RESEND_API_KEY / BRIEF_NOTIFICATION_EMAIL)");
    return NextResponse.json({ error: "delivery_unavailable" }, { status: 503 });
  }

  const { brief } = result;
  const row = (label: string, value: string) =>
    value
      ? `<p><strong>${label}</strong><br><span style="white-space:pre-wrap">${escapeHtml(value)}</span></p>`
      : "";
  const source = Object.entries(brief.source)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.BRIEF_FROM_EMAIL || "KummaLabs site <onboarding@resend.dev>",
      to,
      replyTo: brief.email,
      subject: `Project brief from ${brief.email}`,
      html: [
        `<div style="font-family:Arial,sans-serif;max-width:640px">`,
        `<h2>New project brief</h2>`,
        row("Reply to", brief.email),
        row("What happens today", brief.today),
        row("Result wanted", brief.result),
        row("Tools and systems", brief.systems),
        row("Timeline / budget", brief.timeline),
        row("Source", source),
        `</div>`,
      ].join(""),
    });
    if (error) {
      console.error("brief: provider rejected the email:", error.name);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("brief: send failed:", err instanceof Error ? err.name : "unknown");
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
