"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";

function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center  bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-3">
        <LoaderCircle className="h-6 w-6 animate-spin text-zinc-400" />
      </div>
    </div>
  );
}

export default Loading;
