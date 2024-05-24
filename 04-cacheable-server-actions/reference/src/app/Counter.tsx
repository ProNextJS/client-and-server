"use client";
import { useState } from "react";

export default function Counter({ start = 0 }: { start: number }) {
  const [count, setCount] = useState(start);

  return (
    <div className="mt-5">
      <p className="text-2xl">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-full"
      >
        Increment
      </button>
    </div>
  );
}
