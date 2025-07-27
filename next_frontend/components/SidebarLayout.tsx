"use client";

import { useEffect, useState } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
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
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
