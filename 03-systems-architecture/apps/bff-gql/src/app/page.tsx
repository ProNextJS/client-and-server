import { gql } from "@apollo/client";

import { auth } from "@/auth";
import { Todo } from "@repo/todos";

import AuthButton from "@/components/AuthButton.server";

import TodoList from "./TodoList";

import { client, getContext } from "@/todo-api";

export default async function Home() {
  const session = await auth();

  const { data } = await client.query({
    query: gql`
      query {
        getPriorities
        getTodos {
          id
          title
          priority
          completed
        }
      }
    `,
    context: getContext(),
  });
  const priorities: string[] = data.getPriorities;
  const todos: Todo[] = data.getTodos;

  return (
    <main>
      <AuthButton />
      {session?.user && <TodoList todos={todos} priorities={priorities} />}
    </main>
  );
}
