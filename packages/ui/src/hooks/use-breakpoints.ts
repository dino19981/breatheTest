import * as React from "react";

// Tailwind's default breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoints() {
  const [matches, setMatches] = React.useState<Record<Breakpoint, boolean>>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
  });

  React.useEffect(() => {
    const mediaQueries = Object.entries(breakpoints).map(([key, value]) => ({
      key: key as Breakpoint,
      query: window.matchMedia(`(min-width: ${value}px)`),
    }));

    const updateMatches = () => {
      setMatches(
        mediaQueries.reduce(
          (acc, { key, query }) => ({
            ...acc,
            [key]: query.matches,
          }),
          {} as Record<Breakpoint, boolean>,
        ),
      );
    };

    // Initial check
    updateMatches();

    // Add listeners
    mediaQueries.forEach(({ query }) => {
      query.addEventListener("change", updateMatches);
    });

    // Cleanup
    return () => {
      mediaQueries.forEach(({ query }) => {
        query.removeEventListener("change", updateMatches);
      });
    };
  }, []);

  const isAbove = (breakpoint: Breakpoint) => matches[breakpoint];
  const isBelow = (breakpoint: Breakpoint) => !matches[breakpoint];
  const isBetween = (min: Breakpoint, max: Breakpoint) =>
    matches[min] && !matches[max];

  return {
    matches,
    isAbove,
    isBelow,
    isBetween,
    breakpoints,
  };
}
