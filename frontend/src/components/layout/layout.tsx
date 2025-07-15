"use client"

import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"


export function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-4 bg-sidebar/50 backdrop-blur supports-[backdrop-filter]:bg-sidebar/50">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-sidebar-border" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-sidebar-foreground">Products Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col min-h-0">
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
