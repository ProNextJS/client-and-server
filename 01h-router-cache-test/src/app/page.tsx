import Link from "next/link";
import Timer from "./Timer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <div>Time: {new Date().toLocaleTimeString()}</div>
      <div>
        <Link href="/sub-route">Sub-Route</Link>
      </div>
      <Timer />
    </main>
  );
}
