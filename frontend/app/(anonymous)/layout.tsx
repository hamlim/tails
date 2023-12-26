import { ActiveLink } from "@local/active-link";
import { Heading } from "@recipes/heading";
import { BaseLink } from "@recipes/link";
import { ThemeToggle } from "@recipes/theme-toggle";
import type { ReactNode } from "react";

export default function AnonymousLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-10 py-4 bg-slate-200 dark:bg-slate-700 flex items-center justify-between">
        <Heading is="h1">
          <ActiveLink href="/">Tails</ActiveLink>
        </Heading>
        <div>
          <ActiveLink href="/enter">Login / Signup</ActiveLink>
        </div>
      </header>
      <article className="flex-grow flex items-center justify-center">
        {children}
      </article>
      <footer className="px-10 py-4 bg-slate-200 dark:bg-slate-700 flex items-center justify-between">
        <p>
          © <BaseLink href="https://matthamlin.me" target="_blank">Matt Hamlin</BaseLink>
        </p>
        <ThemeToggle />
      </footer>
    </div>
  );
}
