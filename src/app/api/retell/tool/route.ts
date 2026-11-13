import { NextRequest, NextResponse } from "next/server";
import { getDemoStore } from "@/lib/demo-order/store-runtime.ts";
import { handleTool } from "@/lib/demo-order/tools.ts";
import { verifyRetellSignature } from "@/lib/retell/signature.ts";

// Custom-function endpoint for the Retell phone demo. Retell POSTs { name, args, call } here
// mid-call. Only requests signed with our Retell API key are accepted.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CALL_ID = /^[A-Za-z0-9_-]{1,128}$/;

export async function POST(request: NextRequest) {
  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    console.error("retell tool: RETELL_API_KEY is not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  // Verify against the raw body, before parsing anything.
  const raw = await request.text();
  if (!verifyRetellSignature(raw, request.headers.get("x-retell-signature"), apiKey, Date.now())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let payload: { name?: unknown; args?: unknown; call?: { call_id?: unknown } };
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name : "";
  const callId = typeof payload.call?.call_id === "string" ? payload.call.call_id : "";
  if (!name || !CALL_ID.test(callId)) {
    return NextResponse.json({ error: "missing_name_or_call_id" }, { status: 400 });
  }
  const args = payload.args && typeof payload.args === "object" ? (payload.args as Record<string, unknown>) : {};

  const store = getDemoStore();
  if (!store) {
    console.error("retell tool: no database configured");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    return NextResponse.json(await handleTool(store, callId, name, args));
  } catch (err) {
    // Storage is down. Tell the model plainly so it doesn't improvise a success.
    console.error("retell tool: storage error:", err instanceof Error ? err.name : "unknown");
    return NextResponse.json({
      status: "failed",
      instruction: "The ordering system is unavailable. Tell the caller nothing was saved and to try again later.",
    });
  }
}
