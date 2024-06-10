import { Suspense, use } from "react";

import { getStocks } from "@/lib/getStocks";
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

export default async function Dashboard() {
  const stocks = await getStocks();

  return (
    <div className="grid grid-cols-3 gap-4 mt-5">
      {stocks.map((stock, index) => (
        <Suspense key={index} fallback={<div>Loading...</div>}>
          <StockDisplay stockPromise={stock} />
        </Suspense>
      ))}
    </div>
  );
}
