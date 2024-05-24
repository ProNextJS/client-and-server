import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { callTodoService } from "@/todo-api";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  return NextResponse.json(await callTodoService(`/todo/${id}`));
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const body = await req.json();
  const out = await callTodoService(`/todo/${id}`, "PUT", body);
  revalidatePath("/");
  return NextResponse.json(out);
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const out = await callTodoService(`/todo/${id}`, "DELETE");
  revalidatePath("/");
  return NextResponse.json(out);
}
