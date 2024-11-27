// Goal: Cache the fetched date for minutes

async function Date() {
  const dateReq = await fetch("http://localhost:8080/", {
    cache: "force-cache",
    next: {
      revalidate: 60,
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
