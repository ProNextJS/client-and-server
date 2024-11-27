// Goal: Cache the count, invalidate by tag
import { unstable_cache as cache, revalidateTag } from "next/cache";

import Database from "better-sqlite3";

import IncrementButton from "./increment-button";

const db = new Database("test.db");

const getCount = cache(
  async function getCount() {
    const out = (await db.prepare("SELECT * FROM counts LIMIT 1").all()) as {
      count: number;
    }[];
    return out[0]?.count;
  },
  ["count"],
  {
    tags: ["count-db"],
  }
);

async function setCount(count: number) {
  await db.prepare("DELETE FROM counts").run();
  await db.prepare("INSERT INTO counts (count) VALUES (?)").run(count);
}

async function Counter() {
  return <div className="text-white text-2xl">Count: {await getCount()}</div>;
}

export default function DatabaseCachedTag() {
  async function increment() {
    "use server";

    await setCount((await getCount()) + 1);

    revalidateTag("count-db");
  }

  return (
    <div className="flex gap-5">
      <Counter />
      <IncrementButton increment={increment} />
    </div>
  );
}
