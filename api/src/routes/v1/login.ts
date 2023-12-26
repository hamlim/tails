import { Context } from "hono";
import { initializeLucia } from "../../user-management";

let encoder = new TextEncoder();
let decoder = new TextDecoder("utf-8");

async function hashPassword(rawPassword: string, salt: string): Promise<string> {
  const hashedBuffer = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    encoder.encode(`${rawPassword}-${salt}`),
  );

  let hashedArr = new Uint8Array(hashedBuffer);

  let hashedPassword = decoder.decode(hashedArr);

  return hashedPassword;
}

export async function handler(c: Context) {
  let lucia = initializeLucia(c.env.DB);

  let body = await c.req.json<{ email: string; password: string }>();

  if (!body.email || !body.password) {
    c.status(500);
    return c.json({ error: "Missing username or password" });
  }
  let { email, password } = body;

  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    c.status(500);
    return c.json({
      error: "Invalid password",
    });
  }

  // first check if the email exists, and if so attempt to check the password
  let { results } = await c.env.DB.prepare(`select * from users where email = ?`).bind(email).all();

  if (results.length > 0) {
    let { password: hashedPassword, salt } = results[0];

    let hashedInputPassword = await hashPassword(password, salt);

    if (hashedPassword === hashedInputPassword) {
      let { id: userId } = results[0];

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      c.status(200);

      return c.json({ success: true, sessionCookie });
    }
  } else {
    let saltInput = new Uint8Array(16);
    crypto.getRandomValues(saltInput);
    let salt = decoder.decode(saltInput);

    let hashedPassword = await hashPassword(password, salt);

    let insertionResult = await c.env.DB.prepare(`insert into users (email, password, salt) VALUES (?, ?, ?)`).bind(
      email,
      hashedPassword,
      salt,
    )
      .run();

    let { last_row_id: userId } = insertionResult.meta;

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    c.status(201);

    return c.json({ success: true, sessionCookie });
  }
}
