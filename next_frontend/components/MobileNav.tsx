import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { BarChart3, Bell } from "lucide-react";

const MobileNav = () => {
  return (
    <header className="lg:hidden sticky top-0 z-50 bg-gradient-to-r from-primary/5 via-purple-50 to-cyan-50 backdrop-blur-sm border-b border-border/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger
            className="hover:bg-primary/10"
            aria-label="Open sidebar"
          />
          <div className="p-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg">
            <BarChart3
              className="w-5 h-5 text-primary"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent select-none">
            FinanceTracker
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-primary/5"
            aria-label="Notifications">
            <Bell
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MobileNav;
