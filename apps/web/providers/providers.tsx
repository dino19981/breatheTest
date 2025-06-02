"use client";

import * as React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProvider,
} from "next-themes";
import { ReduxProvider } from "@/store/provider";
import { AuthProvider } from "./AuthProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { SubscriptionProvider } from "./SubscriptionProvider";
import { BreakpointsProvider } from "./breakpoints-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client } from "@/api/client.gen";
import { API_BASE_URL } from "@/lib/constants";
declare global {
  interface Window {
    analytics?: any;
  }
}

const queryClient = new QueryClient();

client.setConfig({
  baseUrl: API_BASE_URL,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.page();
    }
  }, [pathname]);

  return (
    <ReduxProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <BreakpointsProvider>
              <AuthProvider>
                <SubscriptionProvider>{children}</SubscriptionProvider>
              </AuthProvider>
            </BreakpointsProvider>
          </NextThemesProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ReduxProvider>
  );
}
