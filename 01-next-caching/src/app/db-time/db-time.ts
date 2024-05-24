import { unstable_cache } from "next/cache";

export async function getDBTimeReal() {
  return { time: new Date().toLocaleTimeString() };
}

export const getDBTime = unstable_cache(getDBTimeReal, ["db-time"], {
  tags: ["db-time"],
});
