import { ActiveLink } from "@local/active-link";
import { Button } from "@recipes/button";
import { Heading } from "@recipes/heading";
import { BaseLink } from "@recipes/link";
import { ThemeToggle } from "@recipes/theme-toggle";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default function RecognizedLayout({ children }: { children: ReactNode }) {
  async function logout() {
    "use server";
    cookies().set("auth_session", "", { maxAge: 0 });
    redirect("/");
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-10 py-4 bg-slate-200 dark:bg-slate-700 flex items-center justify-between">
        <Heading is="h2">
          <ActiveLink href="/app">Tails</ActiveLink>
        </Heading>
        <div>
          <ActiveLink href="/app/add">Add Recipe</ActiveLink>
        </div>
      </header>
      <article className="flex-grow px-10">
        {children}
      </article>
      <footer className="px-10 py-4 bg-slate-200 dark:bg-slate-700 flex items-center justify-between">
        <p>
          © <BaseLink href="https://matthamlin.me" target="_blank">Matt Hamlin</BaseLink>
        </p>
        <div className="flex gap-4 items-center">
          <form action={logout}>
            <Button variant="link" type="submit">Logout</Button>
          </form>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
}
