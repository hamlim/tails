import { Heading } from "@recipes/heading";
import { List, ListItem } from "@recipes/list";
import { Text } from "@recipes/text";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getUser() {
  let sessionId = cookies().get("auth_session")?.value;
  if (!sessionId) {
    redirect("/enter");
  }

  let apiEndpoint = process.env.API_ENDPOINT;
  let response = await fetch(`${apiEndpoint}/v1/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": process.env.API_TOKEN,
    },
    body: JSON.stringify({ sessionId }),
  });

  if (!response.ok) {
    redirect("/enter");
  }

  let body = await response.json() as {
    user: { id: number };
  };

  return body.user;
}

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
          <Heading is="h4">{recipe.title}</Heading>
          <Text>{recipe.description}</Text>
          <Text>{recipe.ingredients}</Text>
          <Text>{recipe.steps}</Text>
        </ListItem>
      ))}
    </List>
  );
}

export default async function AppPage() {
  let user = await getUser();
  console.log({ user });
  return (
    <div className="py-5">
      <Heading is="h2">Recipes:</Heading>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Recipes userId={user.id} />
      </Suspense>
    </div>
  );
}
