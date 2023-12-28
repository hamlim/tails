import { Form } from "@local/form";
import { getUser } from "@local/getUser";
import { MultiInput } from "@local/multi-input";
import { Button } from "@recipes/button";
import { Input } from "@recipes/input";
import { Label } from "@recipes/label";
import { Textarea } from "@recipes/textarea";

function RecipeForm({ userId }: { userId: number }) {
  async function handleSubmit(formData: FormData) {
    "use server";

    let [title, description, names, amounts, steps] = [
      formData.get("title"),
      formData.get("description") || "",
      formData.getAll("ingredient-name"),
      formData.getAll("ingredient-amount"),
      formData.get("steps"),
    ];

    // @ts-expect-error
    let ingredients = names.reduce((acc, name, index) => {
      if (!name || !amounts[index]) {
        return acc;
      }
      return [...acc, { name, quantity: amounts[index] as string }];
    }, []);

    console.log({ title, description, ingredients, steps, userId });

    let res = await fetch(`${process.env.API_ENDPOINT}/v1/create-recipe?userID=${userId}`, {
      method: "POST",
      body: JSON.stringify({ title, description, ingredients, steps }),
    });

    if (!res.ok) {
      throw new Error(`Failed to create recipe: ${res.status}`);
    }
  }

  return (
    <Form action={handleSubmit}>
      <div className="p-2">
        <Label className="pb-2 inline-flex" htmlFor="title">Title:</Label>
        <Input type="text" placeholder="Negroni" id="title" name="title" required />
      </div>
      <div className="p-2">
        <Label className="pb-2 inline-flex" htmlFor="description">Description:</Label>
        <Textarea placeholder="A classic Italian cocktail" id="description" name="description" required />
      </div>
      <MultiInput />
      <div className="p-2">
        <Label className="pb-2 inline-flex" htmlFor="steps">Steps:</Label>
        <Textarea
          placeholder="Mix equal parts of Gin, Campari, and Sweet Vermouth in a mixer with ice, pour over ice. Peel an orange and express it in the drink, then place in the glass and serve!"
          id="steps"
          name="steps"
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default async function AddRecipePage() {
  let user = await getUser();
  return (
    <div className="py-5">
      <RecipeForm userId={user.id} />
    </div>
  );
}
