import React from "react";
import { Cctv } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b bg-background/80 px-6 py-10 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Cctv className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">LIV Dot</h1>
      </div>
    </header>
  );
}

export default Header;
