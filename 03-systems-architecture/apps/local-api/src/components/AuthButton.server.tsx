import { SessionProvider } from "next-auth/react";

import { BASE_PATH } from "@/auth";
import { auth } from "@/auth";

import AuthButton from "./AuthButton.client";

export default async function AuthButtonServer() {
  return (
    <SessionProvider basePath={BASE_PATH} session={await auth()}>
      <AuthButton />
    </SessionProvider>
  );
}
