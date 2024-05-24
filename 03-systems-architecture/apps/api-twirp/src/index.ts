import { createServer } from "http";
import { createTwirpServer, TwirpErrorResponse } from "twirpscript";
import { parse } from "cookie";

import { Todos, createTodos } from "@repo/twirp-protos/todos";
import { Priorities, createPriorities } from "@repo/twirp-protos/priorities";

import { decodeJWT } from "@repo/auth";
import {
  PRIORITIES,
  getTodos,
  getTodoById,
  addTodo,
  updateTodoCompletion,
  deleteTodo,
} from "@repo/todos";

export interface Context {
  something: string;
  currentUser: { username: string };
}

const priorities: Priorities<Context> = {
  GetPriorities: async () => {
    return { priorities: PRIORITIES };
  },
};

const todos: Todos<Context> = {
  GetTodos: async (_, ctx) => {
    const todos = getTodos(ctx.currentUser.username);
    return { todos };
  },
  GetTodoById: async ({ id }, ctx) => {
    const todo = getTodoById(ctx.currentUser.username, id);
    return todo;
  },
  AddTodo: async (input, ctx) => {
    const todo = {
      ...input,
      completed: false,
      id: `${ctx.currentUser.username}-${Date.now()}`,
    };
    const newTodo = addTodo(ctx.currentUser.username, todo);
    return newTodo;
  },
  UpdateTodo: async ({ id, completed }, ctx) => {
    const todo = updateTodoCompletion(ctx.currentUser.username, id, completed);
    return todo;
  },
  DeleteTodo: async ({ id }, ctx) => {
    deleteTodo(ctx.currentUser.username, id);
    return {};
  },
};

const todosHandler = createTodos(todos);
const prioritiesHandler = createPriorities(priorities);

const PORT = 5004;

const services = [todosHandler, prioritiesHandler];

const app = createTwirpServer<Context, typeof services>(services);

app.use(async (req, ctx, next) => {
  const cookies = parse(req.headers["cookie"]?.toString() || "");
  const info = await decodeJWT<{ sub: string }>(
    cookies["authjs.session-token"]
  );

  if (!info) {
    return TwirpErrorResponse({
      code: "unauthenticated",
      msg: "Access denied",
    });
  } else {
    ctx.currentUser = { username: info.sub };
    return next();
  }
});

createServer(app).listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
