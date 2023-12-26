import { Button } from "@recipes/button";
import { Heading } from "@recipes/heading";
import { Input } from "@recipes/input";
import { Label } from "@recipes/label";
import type { Metadata } from "next";

export let metadata: Metadata = {
  title: "Signup to Tails",
};

export default function SignupPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    let [email, password] = [formData.get("email"), formData.get("password")];

    await fetch("TODO");
  }
  return (
    <form className="min-w-96" action={handleSubmit}>
      <Heading is="h2">Signup:</Heading>
      <div className="p-2">
        <Label className="pb-2 inline-flex" htmlFor="email">Email:</Label>
        <Input type="email" placeholder="your@email.com" id="email" name="email" />
      </div>
      <div className="p-2">
        <Label className="pb-2 inline-flex" htmlFor="password">Password:</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <div className="p-2 flex justify-end">
        <Button type="submit">Signup</Button>
      </div>
    </form>
  );
}
