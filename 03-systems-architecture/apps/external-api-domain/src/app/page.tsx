import { headers } from "next/headers";

import { auth } from "@/auth";
import { Todo } from "@repo/todos";

import AuthButton from "@/components/AuthButton.server";

import TodoList from "./TodoList";

export default async function Home() {
  const session = await auth();

  const priorities: string[] = await fetch(
    "http://localhost:5001/priorities"
  ).then((resp) => resp.json());

  const todos: Todo[] = session?.user
    ? await fetch("http://localhost:5001/todos", {
        cache: "no-cache",
        headers: headers(),
      }).then((resp) => resp.json())
    : [];

  return (
    <main>
      <AuthButton />
      {session?.user && <TodoList todos={todos} priorities={priorities} />}
    </main>
  );
}
