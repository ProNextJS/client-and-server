"use client";
import { use, useEffect, useState, Suspense } from "react";

import { getStocksAction } from "./get-stocks-action";
import { StockInfo } from "@/types";

function StockDisplay({ stockPromise }: { stockPromise: Promise<StockInfo> }) {
  const stock = use(stockPromise);
  return (
    <div key={stock.name}>
      <div className="font-bold text-3xl">{stock.name}</div>
      <div>{stock.ui}</div>
    </div>
  );
}

export default function Dashboard() {
  const [stocks, setStocks] = useState<Promise<StockInfo>[]>([]);

  async function callGetStocks() {
    setStocks(await getStocksAction());
  }

  useEffect(() => {
    callGetStocks();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          callGetStocks();
          setStocks([]);
        }}
        className="px-3 py-1 rounded-full bg-blue-500 text-white font-semibold"
      >
        Refetch
      </button>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {stocks.map((stock, index) => (
          <Suspense key={index} fallback="Loading...">
            <StockDisplay stockPromise={stock} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
