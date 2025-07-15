import * as React from "react"
import {
  HomeIcon,
  DollarSignIcon,
  MessagesSquareIcon,
  CreditCardIcon,
  AudioWaveform,
  User2Icon,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavHome } from "@/components/nav-home"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Pehnom",
    email: "Pehnom.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Pehnom",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  home:[
    {
     title :"Dashboard",
     url : "/dashboard",
     icon : HomeIcon,
    },
  ],
  navMain: [
    {
      
      title: "Get Started",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Select Subscription",
          url: "#",
        },
        {
          title: "Create A Profile",
          url: "#",
        },
        {
          title: "Get Credit Report",
          url: "#",
        },
        {
          title: "Send First Attack",
          url: "#",
        },
        {
          title: "Communication Portal",
          url: "#",
        },
        {
          title: "FAQ",
          url: "#",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#",
      icon: DollarSignIcon,
      items: [
        {
          title: "Select Subscription",
          url: "/subscription",
          icon : DollarSignIcon,
        },
        {
          title: "Purchase Additional Attacks",
          url: "#",
        },
        {
          title: "Manage Subscription",
          url: "#",
        },
      ],
    },
    {
      title: "Get Credit Report",
      url: "#",
      icon: CreditCardIcon,
      items: [
        {
          title: "My FreeSorce Now",
          url: "https://myfreescorenow.com/enroll?AID=DominateTheDecadeMentorshipGroup&PID=75483",
        },
        {
          title: "Report Score Board",
          url: "/reportletter",
        },
        {
          title: "Credit Dispute Letter",
          url: "/disputeletter",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Manage All Users",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Manage Profiles",
          url: "/profiles",
        },
        {
          title: "Add Profile",
          url : "/profiles/add"
        },
        {
          title: "Clint Onboarding Link",
          url: "#",
        },
        {
          title: "Import Clint Files",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
     {
      title: "Communication Portal",
      url: "#",
      icon: MessagesSquareIcon,
      items: [
        {
          title: "Text Meassages",
          url: "#",
        },
        {
          title: "Email Communication",
          url: "#",
        },
        {
          title: "Submitt Suport Tickets",
          url: "#",
        },
        {
          title: "PPAMS Invoice",
          url: "#",
        },
      ],
    },
     {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavHome home ={data.home} />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
