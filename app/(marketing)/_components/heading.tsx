"use client";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-3">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Your Ideas, Documents & Workspaces In One Place. Welcome to
        <span className="underline ml-1">Notion</span>
      </h1>
      <h3>
        The connecting workspace where
        <br /> better, faster work happens
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button>
          Get Started
          <Link href="/documents">
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notion Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Heading;
