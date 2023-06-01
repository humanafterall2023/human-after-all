import { NextResponse } from "next/server";
import { getEvents } from "@/lib/events";

export async function POST(request: Request) {
  const events = await getEvents();
  return NextResponse.json(events);
}
