import { NextResponse } from "next/server";
import { getImages } from "@/lib/images";

export async function POST(request: Request) {
  const count = await request.json();
  const images = (await getImages(count.count)).map((d) => {
    d.userEmail = "-";
    return d;
  });
  return NextResponse.json(images);
}
