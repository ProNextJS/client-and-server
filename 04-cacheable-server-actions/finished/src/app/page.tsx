import Counter from "./Counter";
import Timer from "./Timer";

import ClientContentSection from "./ClientContentSection";

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
