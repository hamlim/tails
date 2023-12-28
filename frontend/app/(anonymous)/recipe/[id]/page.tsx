import { Heading } from "@recipes/heading";
import { List, ListItem } from "@recipes/list";
import { Text } from "@recipes/text";

type Recipe = {
  title: string;
  description: string;
  steps: string;
  ingredients: Array<{ name: string; quantity: string }>;
};

async function loadRecipe({ id }: { id: string }): Promise<Recipe | Error> {
  let apiEndpoint = process.env.API_ENDPOINT;
  let res = await fetch(`${apiEndpoint}/v1/recipe/${id}`, {
    headers: new Headers({
      "auth-token": process.env.API_TOKEN,
    }),
  });

  if (!res.ok) {
    return new Error(`Failed to load recipe: ${res.status}`);
  }

  let recipe = await res.json() as Recipe;

  return recipe;
}

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  let recipe = await loadRecipe({ id });
  if (recipe instanceof Error) {
    return {
      title: "Recipe not found!",
      description: "Recipe not found!",
      openGraph: {
        images: "https://source.unsplash.com/featured/?cocktail",
      },
    };
  }
  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      images: "https://source.unsplash.com/featured/?cocktail",
    },
  };
}

export default async function RecipePage({ params: { id } }: { params: { id: string } }) {
  let recipe = await loadRecipe({ id });

  if (recipe instanceof Error) {
    return <Text>Recipe not found!</Text>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-3xl mx-auto">
      <Heading is="h2">{recipe.title}</Heading>
      <Text>{recipe.description}</Text>
      <Heading is="h4">Ingredients:</Heading>
      <List is="ul">
        {recipe.ingredients.map((ingredient) => (
          <ListItem key={ingredient.name}>
            {ingredient.name} - {ingredient.quantity}
          </ListItem>
        ))}
      </List>
      <Heading is="h4">Steps:</Heading>
      <div className="whitespace-pre-wrap">{recipe.steps}</div>
    </div>
  );
}
