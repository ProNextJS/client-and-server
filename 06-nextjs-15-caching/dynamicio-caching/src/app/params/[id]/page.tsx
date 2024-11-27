// Goal: Never cache the params
import { Suspense } from "react";

async function ParamDisplay({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>Params: {id}</div>;
}

export default async function Params({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ParamDisplay params={params} />
    </Suspense>
  );
}
