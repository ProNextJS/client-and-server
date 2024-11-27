"use client";
import { Button } from "@/components/ui/button";

export default function IncrementButton({
  increment,
}: {
  increment: () => Promise<void>;
}) {
  return <Button onClick={increment}>Increment</Button>;
}
