"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function PageNotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-main px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        <h1 className="text-6xl font-bold text-white tracking-tight">404</h1>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-white">Page not found</h2>

          <p className="text-sm text-zinc-400">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-zinc-200 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
