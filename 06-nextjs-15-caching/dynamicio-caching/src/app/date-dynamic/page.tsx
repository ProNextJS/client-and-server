// Goal: Never cache the date
import { connection } from "next/server";
import { Suspense } from "react";

async function DateComponent() {
  await connection();
  const date = new Date();
  return <div>Dynamic Date: {date.toLocaleString()}</div>;
}

export default function DateDynamic() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DateComponent />
    </Suspense>
  );
}
