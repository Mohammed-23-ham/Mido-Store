"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useCurrency } from "@/components/providers/currency-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionItem {
  id: string;
  number: string;
  title: string;
  content: string;
}

const items: AccordionItem[] = [
  {
    id: "one",
    number: "01",
    title: "How long does shipping take?",
    content:
      "Orders ship within 24h and arrive in 3–7 business days.",
  },
  {
    id: "two",
    number: "02",
    title: "Is it suitable for oily skin?",
    content:
      "Yes — squalane is non-comedogenic and balances oil production.",
  },
  {
    id: "three",
    number: "03",
    title: "What is your return policy?",
    content:
      "Try it for 30 days. Not in love? Full refund, no questions.",
  },
  {
    id: "four",
    number: "04",
    title: "Do you ship internationally?",
    content:
      "We ship worldwide, with free shipping on orders over {threshold}.",
  },
];

const AccordionMotionServices = () => {
  const { format } = useCurrency();
  const [openItems, setOpenItems] = useState<string[]>(["discovery"]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center px-4 py-8 w-full">
      <div className="w-full max-w-lg">
        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className="w-full"
        >
          {items.map((item) => {
            const isActive = openItems.includes(item.id);
            const isHovered = hoveredId === item.id;

            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="relative border-none not-last:border-none"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <AccordionTrigger className="hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden ps-8 py-5 cursor-pointer">
                  <div className="flex items-center gap-6 w-full">
                    {/* Title */}
                    <motion.span
                      className="text-base font-medium"
                      animate={{
                        x: isActive || isHovered ? 4 : 0,
                        color:
                          isActive || isHovered
                            ? "var(--color-foreground)"
                            : "var(--color-muted-foreground)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      {item.title}
                    </motion.span>

                    {/* Plus / X icon */}
                    <motion.div
                      className="ml-auto flex h-8 w-8 items-center justify-center shrink-0"
                      animate={{
                        rotate: isActive ? 45 : 0,
                        opacity: isActive || isHovered ? 1 : 0.4,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Plus className="size-4 text-foreground" />
                    </motion.div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pl-16 pr-4 pb-6 text-sm text-muted-foreground leading-relaxed">
                  {item.content.replace("{threshold}", format(75))}
                </AccordionContent>

                {/* Static border */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />

                {/* Animated active/hover line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px origin-left bg-foreground"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : isHovered ? 0.3 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default AccordionMotionServices;
