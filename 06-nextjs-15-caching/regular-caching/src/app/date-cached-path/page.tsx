// Goal: Cache the date, invalidate by path
import { revalidatePath } from "next/cache";

import CacheTagInvalidateButton from "./cache-invalidate-button";

export default async function CachedPathDate() {
  async function invalidate() {
    "use server";
    await revalidatePath("/date-cached-path");
  }

  const date = new Date();
  return (
    <div className="flex gap-5">
      <div>Cached Date: {date.toLocaleString()}</div>
      <CacheTagInvalidateButton invalidate={invalidate} />
    </div>
  );
}
