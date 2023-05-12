import { NextResponse } from "next/server";
import { createImage } from "@/lib/images";
import { sendEmail, addUserToList } from "@/lib/mail";

export async function POST(request: Request) {
  const result = await createImage(await request.json());
  await sendEmail(result);
  await addUserToList(result.userEmail);
  return NextResponse.json(result);
}