// Goal: Never cache the params

export default async function Params({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>Params: {id}</div>;
}
