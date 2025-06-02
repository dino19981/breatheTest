import { MainNav } from "./navigation/main-nav";

import { MobileBottomNav } from "@/components/navigation/mobile-bottom-nav";
import { SideNav } from "./navigation/side-nav";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur-none hidden md:block">
        <div className="flex h-14 items-center justify-center w-full">
          <div className="flex w-full justify-center">{/* <MainNav /> */}</div>
        </div>
      </header>
      <MobileBottomNav />
    </>
  );
}
