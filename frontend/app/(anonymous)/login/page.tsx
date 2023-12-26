import { Button } from "@recipes/button";
import { Heading } from "@recipes/heading";
import { Input } from "@recipes/input";
import { Label } from "@recipes/label";
import type { Metadata } from "next";

export let metadata: Metadata = {
  title: "Login to Tails",
};

export default function LoginPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    let [email, password] = [formData.get("email"), formData.get("password")];

    await fetch("TODO");
  }
  return (
    <form className="min-w-96" action={handleSubmit}>
      <Heading is="h2">Login:</Heading>
      <div className="p-2">
        <Label className="pb-2 inline-flex" htmlFor="email">Email:</Label>
        <Input type="email" placeholder="your@email.com" id="email" name="email" />
      </div>
      <div className="p-2">
        <Label className="pb-2 inline-flex" htmlFor="password">Password:</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <div className="p-2 flex justify-end">
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}
