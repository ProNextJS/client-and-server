import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import cookieParser from "cookie-parser";

import { getUserFromUserToken } from "@repo/auth";
import {
  PRIORITIES,
  getTodos,
  getTodoById,
  addTodo,
  updateTodoCompletion,
  deleteTodo,
} from "@repo/todos";

function postWebhook(event: string, payload: any) {
  console.log("Posting webhook", process.env.FRONTEND_SERVER, event, payload);
  if (process.env.FRONTEND_SERVER) {
    fetch(`${process.env.FRONTEND_SERVER}/api/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event,
        payload,
      }),
    });
  }
}

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(cookieParser())
    .use(urlencoded({ extended: true }))
    .use(json())
    .get("/priorities", (_, res) => {
      return res.json(PRIORITIES);
    })
    .get("/todos", async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];
      const sub = getUserFromUserToken(token);
      const todos = getTodos(sub);
      return res.json(todos);
    })
    .get("/todo/:id", async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];
      const sub = getUserFromUserToken(token);
      const { id } = req.params;
      const todos = getTodoById(sub, id);
      return res.json(todos);
    })
    .post("/todo", async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];
      const sub = getUserFromUserToken(token);
      const todo = req.body;
      todo.id = `${sub}-${Date.now()}`;
      const newTodo = addTodo(sub, todo);

      postWebhook("todo-added", newTodo);

      return res.json(newTodo);
    })
    .put("/todo/:id", async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];
      const sub = getUserFromUserToken(token);
      const { id } = req.params;
      updateTodoCompletion(sub, id, req.body.completed);

      postWebhook("todo-changed", {
        id,
        completed: req.body.completed,
      });

      return res.json(getTodoById(sub, id));
    })
    .delete("/todo/:id", async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];
      const sub = getUserFromUserToken(token);
      const { id } = req.params;
      const todo = getTodoById(sub, id);
      if (!todo) {
        return res.status(404).json({ message: "Not Found" });
      }
      deleteTodo(sub, id);

      postWebhook("todo-deleted", {
        id,
      });

      return res.json(todo);
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
