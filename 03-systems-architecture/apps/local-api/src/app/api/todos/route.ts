import { auth } from "@/auth";

import { NextResponse } from "next/server";

import { getTodos } from "@repo/todos";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) return NextResponse.error();

  return NextResponse.json(await getTodos(session?.user?.id));
}
