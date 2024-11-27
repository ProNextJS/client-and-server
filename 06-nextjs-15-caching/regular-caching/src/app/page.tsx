import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link href="/date-dynamic">Date: Dynamic</Link>
      </div>
      <div>
        <Link href="/date-cached">Date: Cached</Link>
      </div>
      <div>
        <Link href="/date-cached-tag">Date: Cached With Tag</Link>
      </div>
      <div>
        <Link href="/date-cached-path">Date: Cached With Path</Link>
      </div>

      <div>
        <Link href="/file-counter-dynamic">File Counter: Dynamic</Link>
      </div>
      <div>
        <Link href="/file-counter-cached-tag">
          File Counter: Cached With Tag
        </Link>
      </div>

      <div>
        <Link href="/db-dynamic">Database: Dynamic</Link>
      </div>
      <div>
        <Link href="/db-cached-tag">Database: Cached With Tag</Link>
      </div>

      <div>
        <Link href="/fetch-dynamic">Fetch: Dynamic</Link>
      </div>
      <div>
        <Link href="/fetch-cached-seconds">Fetch: Cached Seconds</Link>
      </div>
      <div>
        <Link href="/fetch-cached-minutes">Fetch: Cached Minutes</Link>
      </div>
      <div>
        <Link href="/fetch-cached-tag">Fetch: Cached With Tag</Link>
      </div>

      <div>
        <Link href="/headers-dynamic">Headers: Dynamic</Link>
      </div>
      <div>
        <Link href="/params/1">Params: 1</Link>
      </div>
    </div>
  );
}
