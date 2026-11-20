"use client";

import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DemoPurchaseDialogProps {
  method: string | null;
  onOpenChange: (open: boolean) => void;
}

export function DemoPurchaseDialog({
  method,
  onOpenChange,
}: DemoPurchaseDialogProps) {
  return (
    <Dialog open={method !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <CheckCircle2
            aria-hidden="true"
            className="size-10 text-primary"
          />
          <DialogTitle className="font-[family-name:var(--font-fraunces)] text-2xl">
            Demo action complete
          </DialogTitle>
          <DialogDescription>
            {method} was selected in the demo. Products are fictional; no
            payment was processed and no order was placed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button
              type="button"
              className="h-10 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
