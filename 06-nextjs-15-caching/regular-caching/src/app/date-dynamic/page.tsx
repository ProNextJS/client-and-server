// Goal: Never cache the date
export default function DynamicDate() {
  const date = new Date();
  return <div>Dynamic Date: {date.toLocaleString()}</div>;
}
