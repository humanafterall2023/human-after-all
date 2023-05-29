import { NextResponse } from "next/server";
import { createImage } from "@/lib/images";
import { sendEmail, addUserToList } from "@/lib/mail";

export async function POST(request: Request) {
  const result = await createImage(await request.json());
  if (!result)
    return NextResponse.json({
      error: "Error generating image",
    });
  await sendEmail(result);
  await addUserToList(result.userEmail);
  return NextResponse.json(result);
}

export const fetchCache = "force-no-store";
