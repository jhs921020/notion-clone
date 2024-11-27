"use client";
import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import useScrollTop from "@/hooks/use-scroll-top";

function Navbar() {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full px-6 py-4",
        scrolled && "shadow-sm border-b"
      )}
    >
      <Logo />
      <div
        className="md:ml-auto md:justify-end flex justify-between
      items-center md:w-fit w-full gap-x-2"
      >
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
