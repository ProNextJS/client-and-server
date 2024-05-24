import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { gql } from "@apollo/client";

import { client, getContext } from "@/todo-api";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { data } = await client.query({
    query: gql`
      query ($id: ID!) {
        getTodoById(id: $id) {
          id
          title
          priority
          completed
        }
      }
    `,
    variables: { id },
    context: getContext(),
  });

  return NextResponse.json(data.getTodoById);
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const body = await req.json();
  const { data } = await client.mutate({
    mutation: gql`
      mutation ($id: ID!, $completed: Boolean!) {
        updateTodoCompletion(id: $id, completed: $completed) {
          id
          title
          priority
          completed
        }
      }
    `,
    variables: { id, completed: body.completed },
    context: getContext(),
  });
  revalidatePath("/");
  return NextResponse.json(data.updateTodoCompletion);
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  await client.mutate({
    mutation: gql`
      mutation ($id: ID!) {
        removeTodoById(id: $id)
      }
    `,
    variables: { id },
    context: getContext(),
  });
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
