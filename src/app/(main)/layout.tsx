import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { 
  SidebarProvider, 
  Sidebar, // This component will now be conditionally rendered or styled for mobile only
  SidebarContent, 
  SidebarInset // This will be replaced by a simple main tag
} from "@/components/ui/sidebar";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider> {/* Keep SidebarProvider for context (used by Header's SidebarTrigger and mobile Sheet) */}
      <div className="flex min-h-screen flex-col">
        <Header />
        {/* 
          The <Sidebar> component from ui/sidebar.tsx internally handles
          rendering as a Sheet on mobile using `isMobile` and `openMobile` from context.
          We hide its desktop version using md:hidden.
        */}
        <Sidebar className="md:hidden"> {/* This ensures the desktop panel version of Sidebar is not rendered */}
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        
        {/* Main content area, no longer using SidebarInset to allow full width on desktop */}
        <main className="container mx-auto max-w-7xl flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
