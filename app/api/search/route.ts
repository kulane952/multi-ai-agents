import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body.query === "string" ? body.query.trim() : "";
    if (!query) return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    const result = await inngest.send({ name: "price-scout/search", data: { query } });
    return NextResponse.json({ success: true, message: "Search workflow started", query, eventIds: result.ids });
  } catch (error) {
    console.error("INNGEST ERROR", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to start search workflow" }, { status: 500 });
  }
}
