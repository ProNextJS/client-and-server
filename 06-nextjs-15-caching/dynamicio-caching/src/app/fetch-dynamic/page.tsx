// Goal: Never cache the fetched date
import { Suspense } from "react";

async function Date() {
  const dateReq = await fetch("http://localhost:8080/");
  const { date } = await dateReq.json();

  return <div>Date from fetch: {date}</div>;
}

export default async function FetchDynamic() {
  return (
    <div className="flex gap-5">
      <Suspense fallback={<div>Loading...</div>}>
        <Date />
      </Suspense>
    </div>
  );
}
