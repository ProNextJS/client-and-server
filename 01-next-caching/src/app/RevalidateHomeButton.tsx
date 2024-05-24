"use client";
import { Button } from "@/components/ui/button";

export default function RevalidateHomeButton({
  onRevalidateHome,
}: {
  onRevalidateHome: () => Promise<void>;
}) {
  return (
    <Button onClick={async () => await onRevalidateHome()} className="mt-4">
      Revalidate Home
    </Button>
  );
}
