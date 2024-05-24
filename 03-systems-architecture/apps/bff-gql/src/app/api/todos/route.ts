import { NextResponse } from "next/server";

import { gql } from "@apollo/client";

import { client, getContext } from "@/todo-api";

export async function GET() {
  const { data } = await client.query({
    query: gql`
      query {
        getTodos {
          id
          title
          priority
          completed
        }
      }
    `,
    context: getContext(),
  });

  return NextResponse.json(data.getTodos);
}
