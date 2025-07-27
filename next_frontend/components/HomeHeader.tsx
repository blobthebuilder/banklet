"use client";

import React from "react";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const HomeHeader = () => {
  const isSignedIn = true;
  const currentPathName = usePathname();

  return (
    <nav className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-purple-50 to-cyan-50 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <button className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-primary transition-all duration-300">
            💰 FinanceTracker
          </button>
          {isSignedIn && (
            <Button
              variant="ghost"
              className={`${
                currentPathName === "/dashboard"
                  ? "bg-primary/10 text-primary"
                  : ""
              } hover:bg-primary/5 transition-all duration-200`}>
              📊 Dashboard
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {!isSignedIn ? (
            <>
              <Button
                variant="ghost"
                className={`${
                  currentPathName === "/sign-in"
                    ? "bg-primary/10 text-primary"
                    : ""
                } hover:bg-primary/5 transition-all duration-200`}>
                Sign In
              </Button>
              <Button
                variant="default"
                className={`${
                  currentPathName === "/sign-up?" ? "bg-primary" : ""
                } bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl`}>
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200">
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HomeHeader;
