"use client";

import React from "react";
import { Button } from "./ui/button";
import { BarChart3, Bell, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"; // shadcn dropdown

const MobileNav = () => {
  return (
    <header className="md:hidden sticky top-0 z-50 bg-gradient-to-r from-primary/5 via-purple-50 to-cyan-50 backdrop-blur-sm border-b border-border/50 p-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {/* Dropdown menu trigger */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10">
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-40">
              <DropdownMenuItem
                onClick={() => (window.location.href = "/dashboard")}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => (window.location.href = "/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => (window.location.href = "/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => alert("Sign out")}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="p-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            FinanceTracker
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-primary/5">
            <Bell className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MobileNav;
