import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { gql } from "@apollo/client";

import { client, getContext } from "@/todo-api";

export async function POST(req: Request) {
  const body = await req.json();
  const { data } = await client.mutate({
    mutation: gql`
      mutation ($title: String!, $priority: String!) {
        addTodo(title: $title, priority: $priority) {
          id
          title
          priority
          completed
        }
      }
    `,
    variables: { title: body.title, priority: body.priority },
    context: getContext(),
  });
  revalidatePath("/");
  return NextResponse.json(data.addTodo);
}
