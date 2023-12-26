import { cn } from "@recipes/cn";
import NextLink, { LinkProps } from "next/link";
import type { ReactNode } from "react";

interface BaseLinkProps extends React.HTMLProps<HTMLAnchorElement> {
}

let linkClass = "font-medium text-primary underline underline-offset-4";

export function BaseLink(props: BaseLinkProps) {
  return <a {...props} className={cn(linkClass, props.className)} />;
}

export function Link(props: LinkProps<string> & { className?: string; children?: ReactNode }) {
  return <NextLink {...props} className={cn(linkClass, props.className)} />;
}
