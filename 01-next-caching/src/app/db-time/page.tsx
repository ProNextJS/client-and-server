import { revalidatePath, revalidateTag } from "next/cache";
import { getDBTime, getDBTimeReal } from "./db-time";

import RevalidateDBTimeButton from "./RevalidateDBTimeButton";

// export const dynamic = "force-dynamic";

export default async function DBTime() {
  const { time } = await getDBTimeReal();

  console.log(`Render /db-time ${new Date().toLocaleTimeString()}`);

  async function onRevalidate() {
    "use server";
    revalidatePath("/db-time");
    // revalidateTag("db-time");
  }

  return (
    <div>
      <h1 className="text-2xl">Time From DB</h1>
      <p className="text-xl">{time}</p>
      <RevalidateDBTimeButton onRevalidate={onRevalidate} />
    </div>
  );
}
