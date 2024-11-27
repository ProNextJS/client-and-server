// Goal: Cache the date, invalidate by path
import { expirePath } from "next/cache";

import CacheTagInvalidateButton from "./cache-invalidate-button";

export default async function DateCachedPath() {
  "use cache";

  async function invalidate() {
    "use server";
    await expirePath("/cached-path-date");
  }

  const date = new Date();
  return (
    <div className="flex gap-5">
      <div>Cached Date: {date.toLocaleString()}</div>
      <CacheTagInvalidateButton invalidate={invalidate} />
    </div>
  );
}
