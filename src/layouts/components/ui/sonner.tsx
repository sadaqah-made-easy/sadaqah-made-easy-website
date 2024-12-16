"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"light"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-text group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-text",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-text",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-text",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
