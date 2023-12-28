import { ActiveLink } from "@local/active-link";
import { MartiniIcon } from "@local/martini-icon";
import { Heading } from "@recipes/heading";
import { BaseLink } from "@recipes/link";
import { ThemeToggle } from "@recipes/theme-toggle";
import { Martini } from "lucide-react";
import type { ReactNode } from "react";

export default function AnonymousLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-10 py-4 bg-slate-200 dark:bg-slate-700 flex items-center justify-between">
        <Heading is="h1">
          <ActiveLink href="/">
            <Martini>
              <title>Tails</title>
            </Martini>
          </ActiveLink>
        </Heading>
        <div>
          <ActiveLink href="/enter">Login / Signup</ActiveLink>
        </div>
      </header>
      <article className="flex-grow flex flex-col">
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
