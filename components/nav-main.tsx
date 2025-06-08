"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { LayoutDashboard, Home, Database, GitBranch } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: LayoutDashboard,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
      collapsible: false,
    },
    {
      title: "Datasources",
      url: "/datasources",
      icon: Database,
      isActive: false,
      collapsible: true,
      disabled: true,
      items: [
        {
          title: "Create Datasource",
          url: "/datasources/create",
        },
        {
          title: "Import Data",
          url: "/datasources/import",
        },
      ],
    },
    {
      title: "Pipes",
      url: "/pipes",
      icon: GitBranch,
      isActive: false,
      collapsible: true,
      disabled: true,
      items: [
        {
          title: "Create Pipe",
          url: "/pipes/create",
        },
        {
          title: "Manage Pipes",
          url: "/pipes/manage",
        },
      ],
    },
  ],
  projects: [],
};

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {data.navMain.map((item) => {
          const ItemWrapper = item.disabled ? "div" : "a";

          // For non-collapsible items or items without subitems
          if (!item.collapsible || !item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild={!item.disabled}
                  tooltip={item.title}
                  className={cn("flex w-full", item.disabled && "cursor-not-allowed opacity-50")}
                >
                  <ItemWrapper href={!item.disabled ? item.url : undefined}>
                    {item.icon && <item.icon className="mr-2 h-4 w-4 shrink-0" />}
                    <span>{item.title}</span>
                  </ItemWrapper>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // For disabled collapsible items, render without collapsible functionality
          if (item.disabled) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="flex w-full cursor-not-allowed opacity-50"
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4 shrink-0" />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // For enabled collapsible items
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="flex w-full"
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4 shrink-0" />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
