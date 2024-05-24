"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { BASE_PATH } from "@/auth";
import { signIn, signOut } from "@/auth/helpers";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function getFirstAndLastInitials(name: string) {
  const [first, last] = name.split(" ");
  return `${first?.[0]}${last?.[0]}`;
}

export default function AuthButton() {
  const { data: session } = useSession();

  const router = useRouter();

  if (session) {
    return (
      <div className="flex gap-2 items-center">
        <Avatar>
          {session?.user?.image && (
            <AvatarImage
              src={session?.user?.image}
              alt={session?.user?.name ?? ""}
              className="w-12 h-12 rounded-full"
            />
          )}
          <AvatarFallback>
            {getFirstAndLastInitials(session?.user?.name ?? "Jane Doe")}
          </AvatarFallback>
        </Avatar>
        <Button
          onClick={async () => {
            await signOut();
            router.push(`${BASE_PATH}/signin`);
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <>
      <Button onClick={async () => await signIn()}>Sign in</Button>
    </>
  );
}
