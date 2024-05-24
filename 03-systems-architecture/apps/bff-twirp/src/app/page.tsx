import { auth } from "@/auth";
import { Todo } from "@repo/todos";
import { revalidatePath } from "next/cache";
import { client } from "twirpscript";
import { headers } from "next/headers";

import { GetPriorities } from "@repo/twirp-protos/priorities";
import {
  GetTodos,
  AddTodo,
  DeleteTodo,
  UpdateTodo,
} from "@repo/twirp-protos/todos";

import AuthButton from "@/components/AuthButton.server";

import TodoList from "./TodoList";

const API_SERVER = process.env.API_SERVER;

client.baseURL = API_SERVER;

function setClientHeaders() {
  client.headers = {
    Cookie: headers().get("Cookie")!,
  };
}

export default async function Home() {
  const session = await auth();

  setClientHeaders();

  const prioritiesReq = await GetPriorities({});
  const priorities: string[] = prioritiesReq.priorities;

  const todosReq = await GetTodos({});
  const todos: Todo[] = todosReq.todos;

  async function addTodoAction(
    title: string,
    priority: string,
    completed: boolean = false
  ) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not authenticated");

    setClientHeaders();
    await AddTodo({
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

    setClientHeaders();
    await UpdateTodo({
      id: todoId,
      completed,
    });

    revalidatePath("/");
  }

  async function deleteTodoAction(todoId: string) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not authenticated");

    setClientHeaders();
    await DeleteTodo({
      id: todoId,
    });

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
