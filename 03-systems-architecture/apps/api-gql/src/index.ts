import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { useCookies } from "@whatwg-node/server-plugin-cookies";

import { decodeJWT } from "@repo/auth";
import {
  PRIORITIES,
  getTodos,
  getTodoById,
  addTodo,
  updateTodoCompletion,
  deleteTodo,
} from "@repo/todos";

async function getUser(request: Request) {
  const cookie = await request.cookieStore?.get("authjs.session-token");
  if (!cookie) {
    throw new Error("Unauthorized");
  }
  const info = await decodeJWT<{ sub: string }>(cookie?.value);
  if (!info) {
    throw new Error("Unauthorized");
  }
  return info.sub;
}

export const schema = createSchema({
  typeDefs: `
    type Todo {
      id: ID!
      title: String!
      priority: String!
      completed: Boolean!
    }

    type Query {
      getPriorities: [String]
      getTodos: [Todo]
      getTodoById(id: ID!): Todo
    }

    type Mutation {
      addTodo(title: String!, priority: String!): Todo
      updateTodoCompletion(id: ID!, completed: Boolean!): Todo
      removeTodoById(id: ID!): Boolean
    }
  `,
  resolvers: {
    Query: {
      getPriorities: () => PRIORITIES,
      getTodos: async (_, __, { request }) => {
        const todos = await getTodos(await getUser(request));
        return todos;
      },
      getTodoById: async (_, { id }, { request }) => {
        const todo = await getTodoById(await getUser(request), id);
        return todo;
      },
    },
    Mutation: {
      addTodo: async (_, { title, priority }, { request }) => {
        const user = await getUser(request);
        const id = `${user}-${Date.now()}`;
        const todo = await addTodo(user, {
          id,
          title,
          priority,
          completed: false,
        });
        return todo;
      },
      updateTodoCompletion: async (_, { id, completed }, { request }) => {
        const todo = await updateTodoCompletion(
          await getUser(request),
          id,
          completed
        );
        return todo;
      },
      removeTodoById: async (_, { id }, { request }) => {
        await deleteTodo(await getUser(request), id);
        return true;
      },
    },
  },
});

const yoga = createYoga({ schema, plugins: [useCookies()] });

const server = createServer(yoga);

server.listen(5003, () => {
  console.info("GQL Server is running on http://localhost:5003/graphql");
});
