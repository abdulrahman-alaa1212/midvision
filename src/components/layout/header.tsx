"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/common/logo"
import { Input } from "@/components/ui/input"
import { UserMenu } from "@/components/layout/user-menu"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Search } from "lucide-react"
import { ThemeToggleButton } from "./theme-toggle-button";
import { mainNavItems, additionalNavItems, SidebarNav } from "./sidebar-nav"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname();
  const { openMobile, setOpenMobile } = useSidebar();

  const allNavItems = [...mainNavItems, ...additionalNavItems];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {/* SidebarTrigger visible only on mobile */}
          <SidebarTrigger className="md:hidden" />
          <Logo />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm font-medium">
            {allNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-accent",
                  pathname === item.href ? "text-accent" : "text-foreground/70"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <form className="hidden md:flex flex-1 ml-auto max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Global search..."
                className="w-full rounded-lg bg-background pl-10"
              />
            </div>
          </form>
          <ThemeToggleButton />
          <UserMenu />
        </div>
      </div>

      {/* Mobile Sidebar Sheet integrated here */}
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent 
          side="left" 
          className="w-[280px] bg-sidebar p-0 text-sidebar-foreground md:hidden"
          data-sidebar="sidebar" // for consistency if any styles depend on it
          data-mobile="true"
        >
          <div className="flex h-full w-full flex-col pt-4">
            <div className="px-4 mb-4">
              <Logo />
            </div>
            <SidebarNav />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
