import type { Context } from "hono";

// Requests look like `/v1/recipes?userID=123`
export async function handler(c: Context) {
  let userID = c.req.query("userID");

  if (!userID) {
    c.status(400);
    return c.json({ error: "Missing userID" });
  }

  let query = await c.env.DB.prepare(`select * from recipes where user_id = ?`).bind(userID).all();

  c.status(200);
  return c.json({ recipes: query.results });
}
