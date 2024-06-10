"use server";
import { getStocks } from "@/lib/getStocks";

export async function getStocksAction() {
  return await getStocks();
}
