// import { useEffect, useState } from "react"
// import { Moon, Sun } from "lucide-react"
// import { AppSidebar } from "@/components/app-sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import { Button } from "@/components/ui/button"

// export default function NewDashboard() {
//   const [isDark, setIsDark] = useState(false)

//   useEffect(() => {
//     const html = document.documentElement
//     const isDarkPref = html.classList.contains("dark")
//     setIsDark(isDarkPref)
//   }, [])

//   const toggleDarkMode = () => {
//     const html = document.documentElement
//     html.classList.toggle("dark")
//     setIsDark(!isDark)
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center justify-between px-4 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
//           <div className="flex items-center gap-2">
//             <SidebarTrigger className="-ml-1" />
//             <Separator
//               orientation="vertical"
//               className="mr-2 data-[orientation=vertical]:h-4"
//             />
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink href="#">Phenom</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Phenom Dashboard</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>

//           {/* 🌙 Theme toggle button on the right side */}
//           <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
//             {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//           </Button>
//         </header>

//         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//           <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//             <div className="bg-muted/50 aspect-video rounded-xl" />
//             <div className="bg-muted/50 aspect-video rounded-xl" />
//             <div className="bg-muted/50 aspect-video rounded-xl" />
//           </div>
//           <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import useThemeMode from "../hooks/useThemeMode"; 

export default function NewDashboard() {
  const { mode, toggleMode } = useThemeMode(); 

  return (
    <>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            {/* <SidebarTrigger className="-ml-1" /> */}
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Phenom</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Phenom Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>

          {/* 🌙 Theme toggle button using hook */}
          <Button variant="ghost" size="icon" onClick={toggleMode}>
            {mode === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
        </>
  );
}
