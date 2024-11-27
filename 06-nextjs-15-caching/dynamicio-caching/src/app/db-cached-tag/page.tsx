// Goal: Cache the count, invalidate by tag
import { unstable_cacheTag as cacheTag, expireTag } from "next/cache";

import Database from "better-sqlite3";

import IncrementButton from "./increment-button";

const db = new Database("test.db");

async function getCount() {
  "use cache";
  cacheTag("count-db");

  const out = (await db.prepare("SELECT * FROM counts LIMIT 1").all()) as {
    count: number;
  }[];
  return out[0]?.count;
}

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

    expireTag("count-db");
  }

  return (
    <div className="flex gap-5">
      <Counter />
      <IncrementButton increment={increment} />
    </div>
  );
}
