import type { Context } from "hono";

export async function handler(c: Context) {
  let userID = c.req.query("userID");

  if (!userID) {
    c.status(400);
    return c.json({ error: "Missing userID" });
  }

  let { title, description, ingredients, steps } = await c.req.json<
    { title: string; description: string; ingredients: Array<{ name: string; quantity: string }>; steps: string }
  >();

  try {
    // insert the recipe
    let recipeResult = await c.env.DB.prepare(
      "insert into recipes (user_id, title, description, steps) values (?, ?, ?, ?)",
    ).bind(
      userID,
      title,
      description,
      steps,
    ).run();
    // insert the recipe_ingredients
    let ingredientRows = await c.env.DB.batch(
      ingredients.map((ingredient) =>
        c.env.DB.prepare("insert into ingredients (name) values (?)").bind(ingredient.name)
      ),
    );
    // insert the recipe_ingredients
    await c.env.DB.batch(
      ingredientRows.map((result, idx) =>
        c.env.DB.prepare("insert into recipe_ingredients (recipe_id, ingredient_id, quantity) values (?, ?, ?)").bind(
          recipeResult.meta.last_row_id,
          result.meta.last_row_id,
          ingredients[idx].quantity,
        )
      ),
    );
    c.status(200);
    return c.json({ success: true });
  } catch (e) {
    console.log(e);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
}
