"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { revalidateHome } from "../revalidate-home";

export default function SubRoute() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-3">
      <div>
        <Button
          onClick={async () => {
            await fetch("/api/revalidateHome", { method: "POST" });
            // await revalidateHome();
            router.push("/");
            router.refresh();
          }}
        >
          Go Home
        </Button>
      </div>
    </main>
  );
}
