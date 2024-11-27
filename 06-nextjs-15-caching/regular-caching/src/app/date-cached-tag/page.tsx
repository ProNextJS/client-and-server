// Goal: Cache the date, invalidate by tag
import { unstable_cache as cache, revalidateTag } from "next/cache";

import CacheTagInvalidateButton from "./cache-invalidate-button";

const cachedDate = cache(async () => new Date(), ["cached-tag-date"], {
  tags: ["cached-tag-date"],
});

export default async function DateCachedTag() {
  async function invalidate() {
    "use server";
    await revalidateTag("cached-tag-date");
  }

  const date = cachedDate();
  return (
    <div className="flex gap-5">
      <div>Cached Date: {date.toLocaleString()}</div>
      <CacheTagInvalidateButton invalidate={invalidate} />
    </div>
  );
}
