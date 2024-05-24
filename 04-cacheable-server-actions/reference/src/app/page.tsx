import ClientContentSection from "./ClientContentSection";
import Counter from "./Counter";
import Timer from "./Timer";

export default function Home() {
  async function getCounter(start: number) {
    "use server";
    return <Counter start={start} />;
  }

  async function getTimer() {
    "use server";
    return <Timer />;
  }

  return (
    <main>
      <ClientContentSection onGetCounter={getCounter} onGetTimer={getTimer} />
    </main>
  );
}
