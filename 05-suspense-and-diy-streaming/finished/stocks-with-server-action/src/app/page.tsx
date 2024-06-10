import Dashboard from "./dashboard";

import StockWithCounter from "@/components/stock-with-counter";

const foo = StockWithCounter;

export default async function Home() {
  return (
    <main className="text-2xl max-w-3xl mx-auto">
      <Dashboard />
    </main>
  );
}
