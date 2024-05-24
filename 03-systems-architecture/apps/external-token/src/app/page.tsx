import { auth } from "@/auth";
import { Todo } from "@repo/todos";

import AuthButton from "@/components/AuthButton.server";

import TodoList from "./TodoList";
import { SessionProvider } from "next-auth/react";

const REST_API = process.env.REST_API;

export default async function Home() {
  const session = await auth();

  const priorities: string[] = await fetch(`${REST_API}/priorities`).then(
    (resp) => resp.json()
  );

  const todos: Todo[] = session?.user
    ? await fetch(`${REST_API}/todos`, {
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }).then((resp) => resp.json())
    : [];

  return (
    <main>
      <AuthButton />
      {session?.user && (
        <SessionProvider session={session}>
          <TodoList todos={todos} priorities={priorities} />
        </SessionProvider>
      )}
    </main>
  );
}
