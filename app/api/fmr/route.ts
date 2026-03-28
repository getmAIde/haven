import { NextRequest, NextResponse } from "next/server";
import { getFMRByZip } from "@/lib/hud-api";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get("zip")?.trim();
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: "Provide a valid 5-digit ZIP code" }, { status: 400 });
  }
  const result = await getFMRByZip(zip);
  return NextResponse.json(result);
}
