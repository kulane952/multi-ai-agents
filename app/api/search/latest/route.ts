import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { SearchRun } from "@/models/SearchRun";

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams.get("query")?.trim();
    if (!query) return NextResponse.json({ error: "query is required" }, { status: 400 });
    await connectMongoDB();
    const run = await SearchRun.findOne({ query }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ run });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load result" }, { status: 500 });
  }
}
