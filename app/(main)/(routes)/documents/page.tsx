"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

function MainPage() {
  const { user } = useUser();
  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/images/empty-white.svg"}
        width={300}
        height={300}
        alt={"empty"}
        className="dark:hidden"
      />
      <Image
        src={"/images/empty-dark.svg"}
        width={300}
        height={300}
        alt={"empty"}
        className="dark:block hidden"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button onClick={() => {}}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a Note
      </Button>
    </div>
  );
}

export default MainPage;
