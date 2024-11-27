// Goal: Cache the fetched date for seconds
async function Date() {
  const dateReq = await fetch("http://localhost:8080/", {
    cache: "force-cache",
    next: {
      revalidate: 3,
    },
  });
  const { date } = await dateReq.json();

  return <div>Date from fetch: {date}</div>;
}

export default async function FetchDynamic() {
  return (
    <div className="flex gap-5">
      <Date />
    </div>
  );
}
