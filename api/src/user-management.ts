import { D1Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";

export function initializeLucia(D1: D1Database) {
  const adapter = new D1Adapter(D1, {
    user: "users",
    session: "session",
  });
  return new Lucia(adapter);
}

declare module "lucia" {
  interface Register {
    Auth: ReturnType<typeof initializeLucia>;
  }
}
