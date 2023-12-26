import { type Context, Hono } from "hono";
// import { deleteCookie, getCookie, getSignedCookie, setCookie, setSignedCookie } from "hono/cookie";
import { cors } from "hono/cors";
import { handler as v1LoginHandler } from "./routes/v1/login";

type Bindings = {
  TOKEN: string;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

async function auth(c: Context, next) {
  let token = c.req.header("auth-token");
  if (c.env.ENVIRONMENT === "development") {
    await next();
    return;
  }
  if (!token || token !== c.env.TOKEN) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  await next();
}

app.use("*", cors());

app.use("*", auth);

app.post("/v1/login", v1LoginHandler);

app.post("/v1/signup", v1LoginHandler);

// app.get("/v1/recipes", (c) => {
//   // return recipes
// });

// app.get("/v1/recipe/:id", (c) => {
//   // get specific recipe
// });

// app.post("/v1/create-recipe", (c) => {
//   // create recipe
// });

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
