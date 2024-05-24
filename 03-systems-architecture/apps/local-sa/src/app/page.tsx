import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import {
  Todo,
  getTodos,
  PRIORITIES,
  addTodo,
  updateTodoCompletion,
  deleteTodo,
} from "@repo/todos";

import AuthButton from "@/components/AuthButton.server";

import TodoList from "./TodoList";

export default async function Home() {
  const session = await auth();

  const priorities: string[] = PRIORITIES;

  const todos: Todo[] = session?.user?.id ? getTodos(session?.user?.id) : [];

  async function addTodoAction(
    title: string,
    priority: string,
    completed: boolean = false
  ) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not authenticated");
    addTodo(session?.user?.id, {
      id: `${session?.user?.id}-${Date.now()}`,
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
    updateTodoCompletion(session?.user?.id, todoId, completed);
    revalidatePath("/");
  }

  async function deleteTodoAction(todoId: string) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not authenticated");
    deleteTodo(session?.user?.id, todoId);
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
