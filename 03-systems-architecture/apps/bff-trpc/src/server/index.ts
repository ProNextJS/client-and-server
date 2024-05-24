import { z } from "zod";

import { publicProcedure, router } from "./trpc";

import { callTodoService } from "@/todo-api";

const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  priority: z.string(),
  completed: z.boolean(),
});

export const appRouter = router({
  getPriorities: publicProcedure.output(z.array(z.string())).query(async () => {
    return await callTodoService("/prorities");
  }),
  getTodos: publicProcedure.output(z.array(TodoSchema)).query(async () => {
    const todos = await callTodoService("/todos");
    return todos;
  }),
  addTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
        priority: z.string(),
        completed: z.boolean(),
      })
    )
    .output(TodoSchema)
    .mutation(async (opts) => {
      return await callTodoService("/todo", "POST", opts.input);
    }),
  updateCompleted: publicProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      return await callTodoService(`/todo/${opts.input.id}`, "PUT", {
        completed: opts.input.completed,
      });
    }),
  deleteTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    return await callTodoService(`/todo/${opts.input}`, "DELETE");
  }),
});

export type AppRouter = typeof appRouter;
