import { getUser } from "@local/getUser";
import { Heading } from "@recipes/heading";
import { Link } from "@recipes/link";
import { List, ListItem } from "@recipes/list";
import { Text } from "@recipes/text";
import { Suspense } from "react";

// @TODO: Pagination
async function Recipes({ userId }: { userId: number }) {
  let apiEndpoint = process.env.API_ENDPOINT;
  let response = await fetch(`${apiEndpoint}/v1/recipes?userID=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": process.env.API_TOKEN,
    },
  });

  if (!response.ok) {
    return <Text>Something went wrong...</Text>;
  }

  let body = await response.json() as {
    recipes: { id: string; title: string; description: string; ingredients: string; steps: string }[];
  };

  if (body.recipes.length === 0) {
    return <Text>No recipes yet. Try adding one!</Text>;
  }

  return (
    <List is="ul">
      {body.recipes.map((recipe) => (
        <ListItem key={recipe.id}>
          <Heading is="h4">
            <Link href={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </Heading>
          <Text>{recipe.description}</Text>
        </ListItem>
      ))}
    </List>
  );
}

export default async function AppPage() {
  let user = await getUser();
  return (
    <div className="py-5">
      <Heading is="h2">Recipes:</Heading>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Recipes userId={user.id} />
      </Suspense>
    </div>
  );
}
