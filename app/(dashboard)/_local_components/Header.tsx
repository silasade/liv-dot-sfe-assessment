import React from "react";
import { Cctv } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-md py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 border border-zinc-200">
            <Cctv className="h-5 w-5 text-zinc-700" />
          </div>

          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            LIV Dot
          </h1>
        </div>

        {/* Optional right section (future actions/user) */}
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          {/* placeholder for notifications / user menu */}
        </div>
      </div>
    </header>
  );
}

export default Header;