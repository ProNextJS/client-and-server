import { NextResponse } from "next/server";

import { callTodoService } from "@/todo-api";

export async function GET() {
  return NextResponse.json(await callTodoService("/todos"));
}
