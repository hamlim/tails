"use client";

import { Link } from "@recipes/link";
import { usePathname } from "next/navigation";

export function ActiveLink({ href, ...rest }: React.ComponentPropsWithoutRef<typeof Link>) {
  let pathname = usePathname();
  return <Link {...rest} href={href} className={pathname === href ? "no-underline" : ""} />;
}
