import { headers } from "next/headers";

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${process.env.API_SERVER}/graphql`,
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});

export function getContext() {
  return {
    headers: {
      Cookie: headers().get("Cookie")!,
    },
  };
}
