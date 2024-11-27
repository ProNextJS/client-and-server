// Goal: Cache the date, invalidate by tag
import { unstable_cacheTag as cacheTag, expireTag } from "next/cache";

import CacheTagInvalidateButton from "./cache-invalidate-button";

export default async function DateCachedTag() {
  "use cache";
  cacheTag("cached-tag-date");

  async function invalidate() {
    "use server";
    await expireTag("cached-tag-date");
  }

  const date = new Date();
  return (
    <div className="flex gap-5">
      <div>Cached Date: {date.toLocaleString()}</div>
      <CacheTagInvalidateButton invalidate={invalidate} />
    </div>
  );
}
