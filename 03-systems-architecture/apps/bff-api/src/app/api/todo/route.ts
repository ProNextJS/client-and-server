import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { callTodoService } from "@/todo-api";

export async function POST(req: Request) {
  const body = await req.json();
  const out = await callTodoService("/todo", "POST", body);
  revalidatePath("/");
  return NextResponse.json(out);
}
