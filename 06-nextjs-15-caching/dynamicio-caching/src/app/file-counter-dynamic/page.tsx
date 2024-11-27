// Goal: Never cache the count
import { unstable_cacheLife as cacheLife, expirePath } from "next/cache";

import fs from "node:fs";
import IncrementButton from "./increment-button";

async function Counter() {
  "use cache";
  cacheLife({
    revalidate: 1,
  });

  const count = JSON.parse(fs.readFileSync("count.json", "utf8"));
  return <div className="text-white text-2xl">Count: {count.count}</div>;
}

export default function FileCounterDynamic() {
  async function increment() {
    "use server";

    const count = JSON.parse(fs.readFileSync("count.json", "utf8"));
    count.count += 1;
    fs.writeFileSync("count.json", JSON.stringify(count, null, 2));

    expirePath("/file-counter-dynamic");
  }

  return (
    <div className="flex gap-5">
      <Counter />
      <IncrementButton increment={increment} />
    </div>
  );
}
