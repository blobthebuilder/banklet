"use client"; // idt this is proper
import useAuthCheck from "@/hooks/useAuthCheck";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthCheck();
  return <main>{children}</main>;
}
