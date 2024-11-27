import React from "react";
import Navbar from "./_components/navbar";

function LayoutMarketing({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default LayoutMarketing;
