"use client";

import * as React from "react";
import { User } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";

export function UserSwitch() {
  const { setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="ghost" size="icon" aria-label="User / Theme menu">
    //       <User className="h-5 w-5" />
    //     </Button>
    //   </DropdownMenuTrigger>

    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem onClick={logout}> Log out</DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>

    <Link href="/profile">
      <Button variant="ghost" size="icon" aria-label="User / Theme menu">
        <User className="h-5 w-5" />
      </Button>
    </Link>
  );
}
