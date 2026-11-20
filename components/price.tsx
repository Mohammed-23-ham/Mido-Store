"use client";

import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/providers/currency-provider";

interface PriceProps {
  amount: number;
  compareAt?: number;
  className?: string;
}

export function Price({ amount, compareAt, className }: PriceProps) {
  const { format } = useCurrency();

  return (
    <span className={cn("inline-flex items-baseline gap-2 font-display", className)}>
      <span className="text-foreground">{format(amount)}</span>
      {compareAt !== undefined && (
        <span className="text-sm text-muted-foreground line-through">
          {format(compareAt)}
        </span>
      )}
    </span>
  );
}
