import { NextResponse } from "next/server";
import { getImages } from "@/lib/images";

export async function GET(request: Request) {
  const images = await getImages();
  return NextResponse.json(images);
}

export const fetchCache = 'force-no-store';