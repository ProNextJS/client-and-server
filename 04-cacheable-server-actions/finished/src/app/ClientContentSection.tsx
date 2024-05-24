"use client";
import { useState, useEffect } from "react";

import { useCacheableServerAction } from "./useCacheableServerAction";

export default function ClientContentSection({
  onGetCounter,
  onGetTimer,
}: {
  onGetCounter: (start: number) => Promise<React.ReactNode>;
  onGetTimer: () => Promise<React.ReactNode>;
}) {
  const [counter, setCounter] = useState<React.ReactNode>(null);
  const [timer, setTimer] = useState<React.ReactNode>(null);

  useCacheableServerAction();

  useEffect(() => {
    (async () => {
      setCounter(await onGetCounter(10));
      setTimer(await onGetTimer());
    })();
  }, []);

  return (
    <>
      <h1>Client Content Component</h1>
      <div>{timer}</div>
      <div>{counter}</div>
    </>
  );
}
