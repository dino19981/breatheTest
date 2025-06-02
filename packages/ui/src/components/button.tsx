import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@workspace/ui/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        outline:
          "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        gradient:
          "bg-gradient-to-b from-[#7B63B2] to-[#42306E] text-primary-foreground shadow-md hover:opacity-90",
        icon: "border border-border bg-background hover:bg-accent",
        tab: "bg-muted text-muted-foreground rounded-full px-4 py-2 hover:bg-background",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-11 px-6",
        icon: "size-9 p-0",
        wide: "h-12 px-8 text-base",
      },
      state: {
        static: "",
        active: "ring-2 ring-ring ring-offset-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "static",
    },
  },
);

function Button({
  className,
  variant,
  size,
  state,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, state, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
