import * as React from "react";
import { useBreakpoints } from "@workspace/ui/hooks/use-breakpoints";
import { createContext, useContext, ReactNode } from "react";
import { useTheme as useNextTheme } from "next-themes";

interface BreakpointsContextType {
  breakpoints: ReturnType<typeof useBreakpoints>;
}

const BreakpointsContext = createContext<BreakpointsContextType | null>(null);

export function useBreakpointsContext() {
  const context = useContext(BreakpointsContext);
  if (!context) {
    throw new Error(
      "useBreakpointsContext must be used within a BreakpointsProvider",
    );
  }
  return context;
}

export function BreakpointsProvider({ children }: { children: ReactNode }) {
  const breakpoints = useBreakpoints();

  return (
    <BreakpointsContext.Provider value={{ breakpoints }}>
      {children}
    </BreakpointsContext.Provider>
  );
}
