import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#212BC2] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#212BC2] !text-white hover:bg-[#1823ac]",
        inverse: "border border-white/95 bg-white !text-[#212BC2] hover:bg-white/90",
        outline: "border border-current bg-transparent text-current hover:bg-black/5",
        ghost: "bg-transparent text-current hover:bg-black/5",
      },
      size: {
        default: "h-12 rounded-full px-6 text-base",
        sm: "h-10 rounded-full px-5 text-sm",
        lg: "h-14 rounded-full px-7 text-base",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
