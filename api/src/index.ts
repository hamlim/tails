import { type Context, Hono } from "hono";
// import { deleteCookie, getCookie, getSignedCookie, setCookie, setSignedCookie } from "hono/cookie";
import { cors } from "hono/cors";

type Bindings = {
  // MY_BUCKET: R2Bucket
  TOKEN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

async function auth(c: Context, next) {
  let token = c.req.header("auth-token");
  console.log(c.env.TOKEN);
  if (!token || token !== c.env.TOKEN) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  await next();
}

app.use("*", cors());

app.use("*", auth);

app.get("/v1/login", (c) => {
  // login
});

app.get("/v1/signup", (c) => {
  // signup
});

app.get("/v1/recipes", (c) => {
  // return recipes
});

app.get("/v1/recipe/:id", (c) => {
  // get specific recipe
});

app.post("/v1/create-recipe", (c) => {
  // create recipe
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
