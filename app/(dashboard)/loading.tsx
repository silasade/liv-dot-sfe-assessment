import React from "react";
import { LoaderCircle } from "lucide-react";

function loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <LoaderCircle className="h-5 w-5 animate-spin text-zinc-400" />
    </div>
  );
}

export default loading;
