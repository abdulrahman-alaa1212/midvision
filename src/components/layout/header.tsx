import { Logo } from "@/components/common/logo"
import { Input } from "@/components/ui/input"
import { UserMenu } from "@/components/layout/user-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <Logo />
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <form className="hidden md:flex flex-1 ml-auto max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Global search..."
                className="w-full rounded-lg bg-background pl-10"
              />
            </div>
          </form>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
