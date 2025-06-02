"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import { X } from "lucide-react";
import { useSubscription } from "@/providers/SubscriptionProvider";

export default function ButtonGallery() {
  const variants = [
    "default",
    "outline",
    "ghost",
    "gradient",
    "icon",
    "tab",
  ] as const;
  const { isSubscribed, loading } = useSubscription();
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      {variants.map((v) => (
        <div key={v} className="flex items-center gap-3">
          <span className="w-24 text-sm capitalize text-muted-foreground">
            {v}
          </span>

          <Button variant={v}>Button</Button>
          <Button variant={v} size="sm">
            Small
          </Button>
          <Button variant={v} size="lg">
            Large
          </Button>
          {v !== "gradient" && v !== "icon" && (
            <Button variant={v} state="active">
              Active
            </Button>
          )}
          {v === "icon" && (
            <Button variant="icon" size="icon">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
    </section>
  );
}
