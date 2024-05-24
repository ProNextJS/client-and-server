// import { unstable_noStore } from "next/cache";
import { revalidatePath } from "next/cache";

import RevalidateHomeButton from "./RevalidateHomeButton";

// import { cookies, headers } from "next/headers";
// import { useSearchParams } from "next/navigation";

// export const dynamic = "force-dynamic";
// export const revalidate = 5;

export default function Home() {
  // unstable_noStore();
  // headers();
  // cookies();
  // useSearchParams();

  async function onRevalidateHome() {
    "use server";
    revalidatePath("/");
  }

  console.log(`Rendering / ${new Date().toLocaleTimeString()}`);
  return (
    <main>
      <div>{new Date().toLocaleTimeString()}</div>
      <RevalidateHomeButton onRevalidateHome={onRevalidateHome} />
    </main>
  );
}
