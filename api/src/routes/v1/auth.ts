import type { Context } from "hono";
import { initializeLucia } from "../../user-management";

export async function handler(c: Context) {
  let lucia = initializeLucia(c.env.DB);
  let sessionID = c.req.query("sessionID");

  let result = await lucia.validateSession(sessionID);

  if (result.session && result.session.fresh) {
    const sessionCookie = lucia.createSessionCookie(result.session.id);
    c.status(200);
    return c.json({ state: "valid-refresh", sessionCookie, user: result.user });
  }
  if (!result.session) {
    c.status(203);
    return c.json({ state: "invalid" });
  }
  // result.session.fresh just means that the session cookie has been refreshed!
  // so it's fine if fresh is false
  c.status(200);
  return c.json({ state: "valid", user: result.user });
}
