import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

export interface GlassBlockProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GlassBlock = React.forwardRef<HTMLDivElement, GlassBlockProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-gradient-to-b from-white/60 via-white/30 to-white/10 backdrop-blur-[30px] border border-white/20 shadow-inner",
          className,
        )}
        {...props}
      />
    );
  },
);

GlassBlock.displayName = "GlassBlock";
