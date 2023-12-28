import { Heading } from "@recipes/heading";
import { List, ListItem } from "@recipes/list";
import { Text } from "@recipes/text";

export default async function RecipePage({ params: { id } }: { params: { id: string } }) {
  let apiEndpoint = process.env.API_ENDPOINT;
  let res = await fetch(`${apiEndpoint}/v1/recipe/${id}`, {
    headers: new Headers({
      "auth-token": process.env.API_TOKEN,
    }),
  });

  if (!res.ok) {
    return <Text>Recipe not found!</Text>;
  }

  let recipe = await res.json() as {
    title: string;
    description: string;
    steps: string;
    ingredients: Array<{ name: string; quantity: string }>;
  };

  return (
    <div className="flex flex-col gap-4 p-4">
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
      <pre className="text-wrap">{recipe.steps}</pre>
    </div>
  );
}
