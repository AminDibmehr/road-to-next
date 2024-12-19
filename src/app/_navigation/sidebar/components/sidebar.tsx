"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import { signInPath, signUpPath } from "@/paths";
import { getActivePath } from "@/utils/get-active-path";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  const { user, isFetched } = useAuth();
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function handleToggle(open: boolean) {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  }

  const { activeIndex } = getActivePath(
    pathname,
    navItems.map((item) => item.href),
    [signInPath(), signUpPath()],
  );

  if (!user || !isFetched) {
    return <div className="bg-secondary/28 w-[78px]"></div>;
  }

  return (
    <nav
      className={cn(
        "animate-sidebar-from-left",
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "w-[78px] md:w-60" : "w-[78px]",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={activeIndex === index}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
}
