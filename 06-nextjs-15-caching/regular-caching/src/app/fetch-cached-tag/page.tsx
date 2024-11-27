// Goal: Cache the fetched date until manually invalidated
import { revalidateTag } from "next/cache";

import CacheTagInvalidateButton from "./cache-invalidate-button";

async function Date() {
  const dateReq = await fetch("http://localhost:8080/", {
    cache: "force-cache",
    next: {
      tags: ["fetched-date"],
    },
  });
  const { date } = await dateReq.json();

  return <div>Date from fetch: {date}</div>;
}

export default async function FetchCachedTag() {
  async function invalidate() {
    "use server";
    await revalidateTag("fetched-date");
  }

  return (
    <div className="flex gap-5">
      <Date />
      <CacheTagInvalidateButton invalidate={invalidate} />
    </div>
  );
}
