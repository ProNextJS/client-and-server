import { headers } from "next/headers";
import { Todo } from "@repo/todos";

const REST_API = process.env.REST_API!;

export async function getPriorities(): Promise<string[]> {
  const res = await fetch("http://localhost:5001/priorities");
  return res.json();
}

export async function getTodos() {
  const res = await fetch(`${REST_API}/todos`, {
    headers: headers(),
    cache: "no-cache",
  });
  return await res.json();
}

export async function getTodoById(id: string) {
  const res = await fetch(`${REST_API}/todo/${id}`, {
    headers: headers(),
    cache: "no-cache",
  });
  return await res.json();
}

export async function createTodo(body: Omit<Todo, "id">) {
  const res = await fetch(`${REST_API}/todo`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  return await res.json();
}

export async function updateTodoCompletion(id: string, completed: boolean) {
  const res = await fetch(`${REST_API}/todo/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      completed,
    }),
  });
  return await res.json();
}

export async function deleteTodoById(id: string) {
  const res = await fetch(`${REST_API}/todo/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  return await res.json();
}
