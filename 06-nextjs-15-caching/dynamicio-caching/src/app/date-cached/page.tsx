// Goal: Cache the date for 10 seconds
import { unstable_cacheLife as cacheLife } from "next/cache";

export default async function DateCached() {
  "use cache";
  cacheLife({
    revalidate: 10,
  });
  const date = new Date();
  return <div>Cached Date: {date.toLocaleString()}</div>;
}
