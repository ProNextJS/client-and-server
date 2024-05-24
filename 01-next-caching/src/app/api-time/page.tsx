import { revalidateTag } from "next/cache";

import RevalidateAPITimeButton from "./RevalidateAPITimeButton";

export default async function APITime() {
  const timeReq = await fetch("http://localhost:8080/time", {
    next: {
      tags: ["api-time"],
    },
  });
  const { time } = await timeReq.json();

  async function onRevalidate() {
    "use server";
    revalidateTag("api-time");
  }

  console.log(`Render /api-time ${new Date().toLocaleTimeString()}`);

  return (
    <div>
      <h1 className="text-2xl">Time From API</h1>
      <p className="text-xl">{time}</p>
      <RevalidateAPITimeButton onRevalidate={onRevalidate} />
    </div>
  );
}
