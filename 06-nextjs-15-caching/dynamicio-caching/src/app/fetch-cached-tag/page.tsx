// Goal: Cache the fetched date until manually invalidated
import { unstable_cacheTag as cacheTag, expireTag } from "next/cache";

import CacheTagInvalidateButton from "./cache-invalidate-button";

async function Date() {
  "use cache";
  cacheTag("fetched-date");

  const dateReq = await fetch("http://localhost:8080/");
  const { date } = await dateReq.json();

  return <div>Date from fetch: {date}</div>;
}

export default async function FetchCachedTag() {
  async function invalidate() {
    "use server";
    await expireTag("fetched-date");
  }

  return (
    <div className="flex gap-5">
      <Date />
      <CacheTagInvalidateButton invalidate={invalidate} />
    </div>
  );
}
