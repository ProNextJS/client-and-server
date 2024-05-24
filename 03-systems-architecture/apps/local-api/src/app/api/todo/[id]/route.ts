import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getTodoById, deleteTodo, updateTodoCompletion } from "@repo/todos";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) return NextResponse.error();

  return NextResponse.json(await getTodoById(session?.user?.id, id));
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) return NextResponse.error();

  const body = await req.json();
  const out = await updateTodoCompletion(session?.user?.id, id, body.completed);
  revalidatePath("/");
  return NextResponse.json(out);
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) return NextResponse.error();

  const out = await deleteTodo(session?.user?.id, id);
  revalidatePath("/");
  return NextResponse.json(out);
}
