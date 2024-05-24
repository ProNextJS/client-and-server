import { auth } from "@/auth";
import { Todo } from "@repo/todos";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import AuthButton from "@/components/AuthButton.server";

import TodoList from "./TodoList";

const API_SERVER = process.env.API_SERVER;

async function callTodoService(
  url: string,
  method: "GET" | "PUT" | "DELETE" | "POST" = "GET",
  body?: any
) {
  const req = await fetch(`${API_SERVER}${url}`, {
    method,
    headers: {
      Cookie: headers().get("Cookie")!,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return await req.json();
}

export default async function Home() {
  const session = await auth();

  const priorities: string[] = await callTodoService("/priorities");

  const todos: Todo[] = session?.user?.id
    ? ((await callTodoService("/todos")) as Todo[])
    : [];

  async function addTodoAction(
    title: string,
    priority: string,
    completed: boolean = false
  ) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not authenticated");

    await callTodoService("/todo", "POST", {
      title,
      priority,
      completed,
    });

    revalidatePath("/");
  }

  async function updateTodoCompletionAction(
    todoId: string,
    completed: boolean
  ) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not authenticated");

    await callTodoService(`/todo/${todoId}`, "PUT", { completed });

    revalidatePath("/");
  }

  async function deleteTodoAction(todoId: string) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not authenticated");

    await callTodoService(`/todo/${todoId}`, "DELETE");

    revalidatePath("/");
  }

  return (
    <main>
      <AuthButton />
      {session?.user && (
        <TodoList
          todos={todos}
          priorities={priorities}
          addTodoAction={addTodoAction}
          updateTodoCompletionAction={updateTodoCompletionAction}
          deleteTodoAction={deleteTodoAction}
        />
      )}
    </main>
  );
}
