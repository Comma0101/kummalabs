import { NextResponse } from "next/server";
import { describeCart } from "@/lib/demo-order/engine.ts";
import { formatCents } from "@/lib/demo-order/menu.ts";
import { getDemoStore } from "@/lib/demo-order/store-runtime.ts";

// Public read-only feed for the demo page: the latest orders and tool events. Contains no caller
// details: the store holds no phone numbers, and event text is server-generated.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tail = (callId: string) => callId.slice(-4);

export async function GET() {
  const store = getDemoStore();
  if (!store) return NextResponse.json({ available: false, orders: [], events: [] });
  try {
    const [orders, events] = await Promise.all([store.recentOrders(8), store.recentEvents(40)]);
    return NextResponse.json(
      {
        available: true,
        orders: orders.map((o) => ({
          reference: o.reference,
          call: tail(o.callId),
          lines: describeCart({ lines: o.lines }).lines.map((l) => l.text),
          total: formatCents(o.totalCents),
          at: o.createdAt,
        })),
        events: events.map((e) => ({ call: tail(e.callId), tool: e.tool, ok: e.ok, summary: e.summary, at: e.createdAt })),
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ available: false, orders: [], events: [] }, { status: 503 });
  }
}
