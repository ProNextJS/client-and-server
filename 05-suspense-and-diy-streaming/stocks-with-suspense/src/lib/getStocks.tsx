import type { StockInfo } from "@/types";
import StockWithCounter from "@/components/stock-with-counter";

const STOCKS = ["ARPL", "GLOG", "MDFT", "AMZO", "FBL", "TSLR"];

async function generateFakeStock(
  name: string,
  delay: number
): Promise<StockInfo> {
  // Simulate a delay of at least 1 second
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * delay + 1000)
  );

  const price = Math.random() * 1000 + 100;
  return {
    name,
    price,
    ui: <StockWithCounter name={name} price={price} />,
  };
}

export const getStocks = async () => {
  "use server";
  return STOCKS.map((id) => generateFakeStock(id, 3000));
};
