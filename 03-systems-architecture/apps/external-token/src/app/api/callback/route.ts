import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
