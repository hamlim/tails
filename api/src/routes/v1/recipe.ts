import type { Context } from "hono";

export async function handler(c: Context) {
  let recipeID = c.req.param("id");

  if (!recipeID) {
    c.status(400);
    return c.json({ error: "Missing recipeID" });
  }

  try {
    let recipeResults = await c.env.DB.prepare("select * from recipes where id = ?").bind(recipeID).all();

    let recipeIngredientsResults = await c.env.DB.prepare("select * from recipe_ingredients where recipe_id = ?").bind(
      recipeID,
    ).all();

    let ingredientsResults = await c.env.DB.batch(
      recipeIngredientsResults.results.map(r =>
        c.env.DB.prepare("select * from ingredients where id = ?").bind(r.ingredient_id)
      ),
    );

    let simplifiedRecipe = {
      title: recipeResults.results[0].title,
      description: recipeResults.results[0].description,
      steps: recipeResults.results[0].steps,
      ingredients: recipeIngredientsResults.results.reduce((acc, recipeIngredient, idx) => {
        acc.push({
          name: ingredientsResults[idx].results[0].name,
          quantity: recipeIngredient.quantity,
        });
        return acc;
      }, []),
    };

    c.status(200);
    return c.json(simplifiedRecipe);
  } catch (e) {
    console.log(e);
    c.status(500);
    return c.json({ error: "Internal Server Error" });
  }
}
