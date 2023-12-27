import { Input } from "@recipes/input";
import { Label } from "@recipes/label";

export default function AddRecipe() {
  function handleSubmit(formData: FormData) {
    "use server";
  }

  return (
    <form action={handleSubmit}>
      <Label htmlFor="title">Title</Label>
      <Input type="text" name="title" id="title" />
      <Label htmlFor="description">Description</Label>
      <Input type="text" name="description" id="description" />
      <Label htmlFor="ingredients">Ingredients</Label>
      <Input type="text" name="ingredients" id="ingredients" />
      <Label htmlFor="steps">Steps</Label>
      <Input type="text" name="steps" id="steps" />
      <button type="submit">Submit</button>
    </form>
  );
}
