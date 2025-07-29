"use client";

import { useEffect, useState } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import MobileNav from "./MobileNav";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileNav />
      <SidebarProvider defaultOpen={true}>
        <LeftSidebar />
        <SidebarInset className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-cyan-50/20">
          <SidebarTrigger
            className="hover:bg-primary/10"
            aria-label="Open sidebar"
          />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
