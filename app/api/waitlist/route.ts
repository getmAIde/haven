import { NextRequest, NextResponse } from "next/server";
import { getAllWaitlists, getWaitlistsByCounty } from "@/lib/waitlist-data";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const county = req.nextUrl.searchParams.get("county")?.trim();
  const lists = county ? getWaitlistsByCounty(county) : getAllWaitlists();
  return NextResponse.json({ waitlists: lists });
}
