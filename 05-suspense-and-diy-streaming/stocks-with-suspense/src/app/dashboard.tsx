import { getStocks } from "@/lib/getStocks";

export default async function Dashboard() {
  const stocks = await Promise.all(await getStocks());

  return (
    <div className="grid grid-cols-3 gap-4 mt-5">
      {stocks.map(({ name, ui }) => (
        <div key={name}>
          <div className="font-bold text-3xl">{name}</div>
          <div>{ui}</div>
        </div>
      ))}
    </div>
  );
}
