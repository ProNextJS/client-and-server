// Goal: Cache the fetched date for minutes
import { unstable_cacheLife as cacheLife } from "next/cache";

async function Date() {
  "use cache";
  cacheLife("minutes");

  const dateReq = await fetch("http://localhost:8080/");
  const { date } = await dateReq.json();

  return <div>Date from fetch: {date}</div>;
}

export default async function FetchDynamic() {
  return (
    <div className="flex gap-5">
      <Date />
    </div>
  );
}
