"use client";
import { Suspense, use, useState, useEffect } from "react";

import { getStocksAction } from "./get-stocks-action";
import { StockInfo } from "@/types";

function StockDisplay({ stockPromise }: { stockPromise: Promise<StockInfo> }) {
  const { name, ui } = use(stockPromise);
  return (
    <div>
      <div className="font-bold text-3xl">{name}</div>
      <div>{ui}</div>
    </div>
  );
}

export default function Dashboard() {
  const [stocks, setStocks] = useState<Promise<StockInfo>[]>([]);

  const callStocksActions = async () =>
    getStocksAction().then((stocks) => setStocks(stocks));

  useEffect(() => {
    callStocksActions();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setStocks([]);
          callStocksActions();
        }}
        className="px-3 py-1 rounded-full bg-blue-500 text-white font-semibold"
      >
        Refresh
      </button>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {stocks.map((stockPromise, index) => (
          <Suspense key={index} fallback={<div>Loading...</div>}>
            <StockDisplay stockPromise={stockPromise} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
