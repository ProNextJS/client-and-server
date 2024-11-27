"use client";
import { Button } from "@/components/ui/button";

export default function CacheInvalidateButton({
  invalidate,
}: {
  invalidate: () => Promise<void>;
}) {
  return <Button onClick={invalidate}>Invalidate</Button>;
}
