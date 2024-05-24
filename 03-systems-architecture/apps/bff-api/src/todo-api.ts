import { headers } from "next/headers";

const API_SERVER = process.env.API_SERVER;

export async function callTodoService(
  url: string,
  method: "GET" | "PUT" | "DELETE" | "POST" = "GET",
  body?: any
) {
  const req = await fetch(`${API_SERVER}${url}`, {
    method,
    headers: {
      Cookie: headers().get("Cookie")!,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return await req.json();
}
