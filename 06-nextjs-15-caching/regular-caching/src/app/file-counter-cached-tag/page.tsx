// Goal: Cache the count, invalidate by tag
import { unstable_cache as cache, revalidateTag } from "next/cache";

import fs from "node:fs";

import IncrementButton from "./increment-button";

const getCount = cache(
  async () => {
    const count = JSON.parse(fs.readFileSync("count.json", "utf8"));
    return count.count;
  },
  ["counter"],
  {
    tags: ["counter"],
  }
);

async function Counter() {
  const count = await getCount();
  return <div className="text-white text-2xl">Count: {count}</div>;
}

export default function FileCounterCachedTag() {
  async function increment() {
    "use server";

    const count = JSON.parse(fs.readFileSync("count.json", "utf8"));
    count.count += 1;
    fs.writeFileSync("count.json", JSON.stringify(count, null, 2));

    await revalidateTag("counter");
  }

  return (
    <div className="flex gap-5">
      <Counter />
      <IncrementButton increment={increment} />
    </div>
  );
}
