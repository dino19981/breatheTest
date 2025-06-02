"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [bgImage, setBgImage] = useState("/background-light.png");

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      setBgImage("/background-dark.png");
    } else {
      setBgImage("/background-light.png");
    }
  }, [theme, systemTheme, mounted]);

  // Prevent flash during SSR/hydration
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -translate-z-[1px] z-10"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
