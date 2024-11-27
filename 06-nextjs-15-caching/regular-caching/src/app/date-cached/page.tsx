// Goal: Cache the date for 10 seconds
export const dynamic = "force-static";
export const revalidate = 10;

export default async function CachedDate() {
  const date = new Date();
  return <div>Cached Date: {date.toLocaleString()}</div>;
}
