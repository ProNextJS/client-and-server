import { auth } from "@/auth";
import { Todo, PRIORITIES, getTodos } from "@repo/todos";

import AuthButton from "@/components/AuthButton.server";

import TodoList from "./TodoList";

export default async function Home() {
  const session = await auth();

  const priorities: string[] = PRIORITIES;

  const todos: Todo[] = session?.user?.id
    ? await getTodos(session?.user?.id)
    : [];

  return (
    <main>
      <AuthButton />
      {session?.user && <TodoList todos={todos} priorities={priorities} />}
    </main>
  );
}
