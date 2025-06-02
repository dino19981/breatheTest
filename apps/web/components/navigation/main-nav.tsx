"use client";

import Link from "next/link";
import { t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button } from "@workspace/ui/components/button";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";
import { ThemeSwitch } from "@/components/theme-switch";
import { useAuth } from "@/providers/AuthProvider";
import { UserSwitch } from "@/components/user-switch";

export function MainNav() {
  const { isAuthenticated } = useAuth();
  const { i18n } = useLingui();

  return (
    <div
      key={i18n.locale}
      className="flex items-center justify-between w-full px-5"
    >
      <div className="flex-none hidden md:block w-[120px]">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">Breathtake</span>
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="w-full flex  justify-center">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">{t`Home`}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/session">{t`Session`}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/social">{t`Social`}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/settings">{t`Settings`}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex-none md:w-[120px] flex justify-end items-center gap-2">
        {isAuthenticated ? (
          <UserSwitch />
        ) : (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">{t`Login`}</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">{t`Sign Up`}</Link>
            </Button>
          </>
        )}
        <ThemeSwitch />
      </div>
    </div>
  );
}
