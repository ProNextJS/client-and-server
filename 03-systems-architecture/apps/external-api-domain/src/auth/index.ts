import NextAuth from "next-auth";
import { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { validateUser, encodeJWT, decodeJWT } from "@repo/auth";

export const BASE_PATH = "/api/auth";

export const authOptions: NextAuthConfig = {
  jwt: {
    async encode({ token }) {
      return token ? encodeJWT(token) : "";
    },
    async decode({ token }) {
      return decodeJWT(token);
    },
  },
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
        domain: ".mycompany.com",
      },
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        return validateUser(
          credentials as { username: string; password: string }
        );
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token?.sub && session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  trustHost: true,
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET || "simple-secret",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
