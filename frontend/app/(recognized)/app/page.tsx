import { Heading } from "@recipes/heading";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function checkAuth() {
  if (cookies().has("auth_session")) {
    return;
  }
  return redirect("/");
}

export default function AppPage() {
  checkAuth();
  return (
    <div>
      <Heading is="h1">Welcome to Tails!</Heading>
    </div>
  );
}
