import { Suspense } from "react";
import Dashboard from "./dashboard";

export default async function Home() {
  return (
    <main className="text-2xl max-w-3xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </main>
  );
}
