import { unstable_noStore } from "next/cache";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";
// export const revalidate = 2;

export async function GET() {
  // unstable_noStore();
  // headers();
  // cookies();

  console.log(`GET /time ${new Date().toLocaleTimeString()}`);
  return NextResponse.json({ time: new Date().toLocaleTimeString() });
}

export async function POST() {
  console.log(`POST /time ${new Date().toLocaleTimeString()}`);
  return NextResponse.json({ time: new Date().toLocaleTimeString() });
}
