import { Button } from "@recipes/button";
import { Heading } from "@recipes/heading";
import { Input } from "@recipes/input";
import { Label } from "@recipes/label";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export let metadata: Metadata = {
  title: "Login or Signup to Tails",
};

export default function EnterPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    let [email, password] = [formData.get("email"), formData.get("password")];

    if (!email || !password) {
      throw new Error("Missing email or password");
    }

    let apiRoot = process.env.API_ENDPOINT;

    let res = await fetch(`${apiRoot}/v1/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        "auth-token": process.env.API_TOKEN,
      }),
    });

    let body = await res.json() as {
      error: string;
    } | {
      success: true;
      sessionCookie: {
        name: string;
        value: string;
        attributes: {
          path: string;
          expires: number;
          httpOnly: boolean;
        };
      };
    };

    if ("error" in body) {
      throw new Error(body.error);
    }

    if ("success" in body) {
      let { sessionCookie } = body;
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return redirect("/app");
    }
  }
  return (
    <form className="min-w-96" action={handleSubmit}>
      <Heading is="h2">Login/Signup:</Heading>
      <div className="p-2">
        <Label className="pb-2 inline-flex" htmlFor="email">Email:</Label>
        <Input type="email" placeholder="your@email.com" id="email" name="email" required />
      </div>
      <div className="p-2">
        <Label className="pb-2 inline-flex" htmlFor="password">Password:</Label>
        <Input type="password" id="password" name="password" required />
      </div>
      <div className="p-2 flex justify-end">
        <Button type="submit">Enter</Button>
      </div>
    </form>
  );
}
