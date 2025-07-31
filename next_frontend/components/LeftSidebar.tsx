"use client";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  PlusCircle,
  CreditCard,
  Target,
  Settings,
  LogOut,
  User,
  TrendingUp,
  Wallet,
  PieChart,
} from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";

const LeftSidebar = () => {
  const currentPathName = usePathname();

  const navigationItems = [
    {
      group: "Overview",
      items: [
        {
          icon: BarChart3,
          label: "Dashboard",
          page: "dashboard",
          gradient: "from-primary to-purple-600",
        },
        {
          icon: TrendingUp,
          label: "Analytics",
          page: "analytics",
          gradient: "from-emerald-500 to-teal-600",
        },
      ],
    },
    {
      group: "Accounts",
      items: [
        {
          icon: PlusCircle,
          label: "Add Bank",
          page: "add-bank",
          gradient: "from-blue-500 to-cyan-600",
        },
        {
          icon: Wallet,
          label: "My Accounts",
          page: "accounts",
          gradient: "from-purple-500 to-pink-600",
        },
        {
          icon: CreditCard,
          label: "Cards",
          page: "cards",
          gradient: "from-orange-500 to-red-600",
        },
      ],
    },
    {
      group: "Planning",
      items: [
        {
          icon: Target,
          label: "Goals",
          page: "goals",
          gradient: "from-green-500 to-emerald-600",
        },
        {
          icon: PieChart,
          label: "Budgets",
          page: "budgets",
          gradient: "from-yellow-500 to-orange-600",
        },
      ],
    },
  ];

  return (
    <>
      <Sidebar
        collapsible="offcanvas"
        className="border-r border-border/50 bg-gradient-to-b from-card to-card/50">
        <SidebarHeader className="p-4 group-data-[collapsible=icon]:px-4 group-data-[collapsible=icon]:py-3">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <div className="p-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg group-data-[collapsible=icon]:p-2">
              <BarChart3 className="w-5 h-5 text-primary group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h2 className="text-lg bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                FinanceTracker
              </h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0.5">
          {navigationItems.map((group) => (
            <SidebarGroup key={group.group}>
              <SidebarGroupLabel className="text-xs text-muted-foreground mb-2 group-data-[collapsible=icon]:sr-only">
                {group.group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.page}>
                      <Link
                        href={`/${item.page}`}
                        prefetch>
                        <SidebarMenuButton
                          isActive={currentPathName === `/${item.page}`}
                          tooltip={item.label}
                          className="w-full flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center rounded-lg transition-all duration-200 group hover:scale-105">
                          <div
                            className={`p-1.5 rounded-md bg-gradient-to-r ${item.gradient} bg-opacity-10 group-hover:scale-110 transition-transform duration-200`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm group-data-[collapsible=icon]:sr-only">
                            {item.label}
                          </span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="p-2 mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link
                    href="/profile"
                    prefetch>
                    <SidebarMenuButton
                      isActive={currentPathName === "/profile"}
                      tooltip="Profile"
                      className="w-full flex items-center gap-3 p-2 group-data-[collapsible=icon]:px-4 group-data-[collapsible=icon]:justify-center rounded-lg transition-all duration-200 group hover:scale-105">
                      <div className="p-1.5 rounded-md bg-gradient-to-r from-gray-400 to-gray-600 bg-opacity-10 group-hover:scale-110 transition-transform duration-200">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-sm group-data-[collapsible=icon]:sr-only">
                        Profile
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link
                    href="/settings"
                    prefetch>
                    <SidebarMenuButton
                      isActive={currentPathName === "/settings"}
                      tooltip="Settings"
                      className="w-full flex items-center gap-3 p-2 group-data-[collapsible=icon]:px-4 group-data-[collapsible=icon]:justify-center rounded-lg transition-all duration-200 group hover:scale-105">
                      <div className="p-1.5 rounded-md bg-gradient-to-r from-gray-400 to-gray-600 bg-opacity-10 group-hover:scale-110 transition-transform duration-200">
                        <Settings className="w-4 h-4" />
                      </div>
                      <span className="text-sm group-data-[collapsible=icon]:sr-only">
                        Settings
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Sign Out"
                    className="w-full flex items-center gap-3 p-2 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group hover:scale-105 group-data-[collapsible=icon]:px-4 group-data-[collapsible=icon]:justify-center">
                    <div className="p-1.5 rounded-md bg-gradient-to-r from-red-400 to-red-600 bg-opacity-10 group-hover:scale-110 transition-transform duration-200">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span className="text-sm group-data-[collapsible=icon]:sr-only">
                      Sign Out
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default LeftSidebar;
