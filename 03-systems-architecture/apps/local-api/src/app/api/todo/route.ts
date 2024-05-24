import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { addTodo } from "@repo/todos";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) return NextResponse.error();

  const body = await req.json();

  const out = await addTodo(session?.user?.id, body);

  revalidatePath("/");
  return NextResponse.json(out);
}
