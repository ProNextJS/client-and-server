// Goal: Never cache the headers
import { Suspense } from "react";
import { headers } from "next/headers";

async function Headers() {
  const out = await headers();
  const keys = Object.keys((out as unknown as { headers: object }).headers);
  return <div>Headers Dynamic: {keys.join(", ")}</div>;
}

export default async function HeadersDynamic() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Headers />
    </Suspense>
  );
}
