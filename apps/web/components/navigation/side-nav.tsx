"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import {
  Bell,
  Book,
  Calendar,
  FileText,
  Home,
  Inbox,
  Search,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { usePathname } from "next/navigation";
import { cn } from "@workspace/ui/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@workspace/ui/components/button";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Session",
    url: "/session",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  // {
  //   title: "Notifications",
  //   url: "/notifications",
  //   icon: Bell,
  // },
  // {
  //   title: "Membership",
  //   url: "/membership",
  //   icon: FileText,
  // },
  {
    title: "Social",
    url: "/social",
    icon: Inbox,
    disabled: true,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Legal",
    url: "/legal",
    icon: FileText,
  },
  {
    title: "Sessions list",
    url: "/sessions",
    icon: Calendar,
  },
  {
    title: "Learning Center",
    url: "/learning-center",
    icon: Book,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { setOpen, setOpenMobile, isMobile } = useSidebar();

  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className="border-r" collapsible="offcanvas" side="left">
      <SidebarContent className="py-4">
        <SidebarGroup>
          <div className="flex items-center justify-between mb-8">
            <SidebarGroupLabel className="font-bold text-2xl">
              Breathtake
            </SidebarGroupLabel>
            <ThemeSwitch />
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild disabled={item.disabled}>
                      <Link
                        href={item.url}
                        className="w-full"
                        onClick={handleItemClick}
                      >
                        <div
                          className={cn(
                            "flex items-center gap-4 px-2 py-3 rounded-lg transition-colors w-full",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted",
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        {!isAuthenticated && (
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/login" onClick={handleItemClick}>
                Login
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup" onClick={handleItemClick}>
                Sign Up
              </Link>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export function SideNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <SidebarProvider>
      {!isHomePage && <AppSidebar />}
      <main className="flex-1 flex flex-col">
        {!isHomePage && (
          <div className="flex justify-end">
            <SidebarTrigger className="cursor-pointer m-3" />
          </div>
        )}
        {children}
      </main>
    </SidebarProvider>
  );
}
