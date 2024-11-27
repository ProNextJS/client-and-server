// Goal: Cache the count, invalidate by tag
import { unstable_cacheTag as cacheTag, expireTag } from "next/cache";

import fs from "node:fs";

import IncrementButton from "./increment-button";

async function Counter() {
  "use cache";
  cacheTag("counter");

  const count = JSON.parse(fs.readFileSync("count.json", "utf8"));
  return <div className="text-white text-2xl">Count: {count.count}</div>;
}

export default function FileCounterCachedTag() {
  async function increment() {
    "use server";

    const count = JSON.parse(fs.readFileSync("count.json", "utf8"));
    count.count += 1;
    fs.writeFileSync("count.json", JSON.stringify(count, null, 2));

    expireTag("counter");
  }

  return (
    <div className="flex gap-5">
      <Counter />
      <IncrementButton increment={increment} />
    </div>
  );
}
