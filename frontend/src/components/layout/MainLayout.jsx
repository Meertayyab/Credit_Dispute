// import { Outlet } from "react-router-dom"
// import { AppSidebar } from "@/components/app-sidebar"
// import { SidebarProvider } from "@/components/ui/sidebar"

// export default function MainLayout() {
//   return (
//     <div className="flex min-h-screen bg-muted/40">
//       <SidebarProvider>
//         <aside className="sticky top-0 h-screen">
//           <AppSidebar />
//         </aside>
//       </SidebarProvider>

//       <div className="flex flex-col flex-1 overflow-hidden">
//         <main className="flex-1 overflow-y-auto px-6 py-6">
//           <div className="max-w-7xl mx-auto w-full">
//             <Outlet/> 
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }


"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"


export function MainLayout({children}) {

  return (
    <SidebarProvider>
      <AppSidebar/>
     <SidebarInset>        
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-4 bg-sidebar/50 backdrop-blur supports-[backdrop-filter]:bg-sidebar/50">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-sidebar-border" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-sidebar-foreground">Credit Dispute</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col min-h-0">
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
