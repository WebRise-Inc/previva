"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

function SheetContent({ className, children, accessibleTitle = "Navigation", closeLabel = "Close menu", ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { accessibleTitle?: string; closeLabel?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="mobile-menu-overlay" />
      <DialogPrimitive.Content
        className={cn("mobile-menu-panel", className)}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">{accessibleTitle}</DialogPrimitive.Title>
        {children}
        <DialogPrimitive.Close className="mobile-menu-close">
          <X className="size-5" />
          <span className="sr-only">{closeLabel}</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export { Sheet, SheetClose, SheetContent, SheetTrigger };
