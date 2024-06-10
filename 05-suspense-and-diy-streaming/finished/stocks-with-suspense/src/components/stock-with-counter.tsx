"use client";
import { useState } from "react";

export default function StockWithCounter({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  const [count, setCount] = useState(0);

  return (
    <button
      className="flex flex-col items-center justify-center p-4 m-4 bg-white rounded-lg shadow-lg dark:bg-zinc-800 w-full"
      onClick={() => setCount(count + 1)}
    >
      <div className="text-xl italic">{name}</div>
      <div className="text-2xl font-bold">${price.toFixed(2)}</div>
      <div>Count: {count}</div>
    </button>
  );
}
