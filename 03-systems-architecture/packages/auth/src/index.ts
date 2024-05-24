import { decodeJwt, SignJWT } from "jose";

export const SECRET = "simple-secret";

export function getUserToken(user: string) {
  return `token:${user}`;
}

export function getUserFromUserToken(token: string) {
  return token.replace("token:", "");
}

export async function encodeJWT(token: Record<string, any>) {
  return await new SignJWT(token)
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(SECRET.toString()));
}

export async function decodeJWT<Payload>(
  token?: string
): Promise<Payload | null> {
  return token ? decodeJwt(token?.toString()) : null;
}

export function validateUser(credentials: {
  username: string;
  password: string;
}) {
  const users = [
    {
      id: "test-user-1",
      userName: "test1",
      name: "Test 1",
      password: "pass",
      email: "test1@donotreply.com",
    },
    {
      id: "test-user-2",
      userName: "test2",
      name: "Test 2",
      password: "pass",
      email: "test2@donotreply.com",
    },
  ];
  const user = users.find(
    (user) =>
      user.userName === credentials.username &&
      user.password === credentials.password
  );
  return user ? { id: user.id, name: user.name, email: user.email } : null;
}
