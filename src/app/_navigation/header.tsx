"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath } from "@/paths";
import { AccountDropdown } from "./account-dropdown";
import { ModeToggle } from "../../components/theme/theme-switcher";
import { buttonVariants } from "../../components/ui/button";

export function Header() {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>

      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full animate-header-from-top justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur">
      <div className="flex items-center gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-2">
        <ModeToggle />
        {navItems}
      </div>
    </nav>
  );
}
