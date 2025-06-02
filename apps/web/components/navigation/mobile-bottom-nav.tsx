"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, BarChart, Star } from "lucide-react";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isSessionActive = useSelector(
    (state: any) => state.sessions.isBreathSessionActive,
  );

  if (isSessionActive) return null;

  const navItems = [
    { href: "/", icon: Home },
    { href: "/session", icon: User },
    { href: "/sessions", icon: BarChart },
    { href: "/settings", icon: Star },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex w-[366px] h-[72px] items-center justify-around rounded-full bg-gradient-to-b from-white/60 via-white/30 to-white/10 dark:from-[#1C1C1E]/80 dark:to-[#1C1C1E]/40 backdrop-blur-2xl border border-white/20 shadow-inner md:hidden">
      {navItems.map(({ href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center w-[72px] h-[72px] rounded-full transition-colors active:scale-95"
          >
            <Icon
              className={`h-6 w-6 transition-colors ${
                isActive
                  ? isDark
                    ? "text-white"
                    : "text-black"
                  : isDark
                    ? "text-gray-400"
                    : "text-gray-500"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
