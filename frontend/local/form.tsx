"use client";
import { type ReactNode, useRef } from "react";

export function Form({ children, action }: { children: ReactNode; action: Function }) {
  let formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await action(formData);
        formRef.current?.reset();
      }}
    >
      {children}
    </form>
  );
}
