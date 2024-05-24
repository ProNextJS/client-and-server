"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { Todo } from "@repo/todos";

export default function TodoList({
  priorities,
  todos: initialTodos,
}: {
  priorities: string[];
  todos: Todo[];
}) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [priority, setPriority] = useState<string>(priorities[0]);
  const [title, setTitle] = useState<string>("");

  const { data: session } = useSession();

  const updateTodos = async () => {
    const res = await fetch("/rest/todos", {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    setTodos(await res.json());
  };

  const onSubmit = async () => {
    await fetch("/rest/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify({
        title,
        priority,
        completed: false,
      }),
    });
    updateTodos();
  };

  const onSetCompleted = async (id: string, completed: boolean) => {
    await fetch(`/rest/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify({ completed }),
    });
    updateTodos();
  };

  const onDelete = async (id: string) => {
    await fetch(`/rest/todo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    updateTodos();
  };

  return (
    <div className="mt-5">
      {todos && (
        <>
          <ul>
            {todos?.map((todo) => (
              <li key={todo.id} className="flex gap-2 items-center mb-3">
                <Checkbox
                  checked={todo.completed}
                  onClick={() => onSetCompleted(todo.id, !todo.completed)}
                />
                <div className="flex-grow">{todo.title}</div>
                <Button variant="destructive" onClick={() => onDelete(todo.id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="flex gap-2">
        <Select value={priority} onValueChange={(v) => setPriority(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((priority) => (
              <SelectItem value={priority} key={priority}>
                {priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Todo"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}
