import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUser() {
  let sessionId = cookies().get("auth_session")?.value;
  if (!sessionId) {
    redirect("/enter");
  }

  let apiEndpoint = process.env.API_ENDPOINT;
  let response = await fetch(`${apiEndpoint}/v1/auth?sessionID=${sessionId}`, {
    method: "GET",
    headers: {
      "auth-token": process.env.API_TOKEN,
    },
  });

  if (!response.ok) {
    redirect("/enter");
  }

  let body = await response.json() as {
    user: { id: number };
  };

  return body.user;
}
