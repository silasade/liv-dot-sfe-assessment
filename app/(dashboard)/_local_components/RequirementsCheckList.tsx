import { Button } from "@/app/_global_components/shadcn-ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_global_components/shadcn-ui/ui/card";
import { Input } from "@/app/_global_components/shadcn-ui/ui/input";
import { eventID } from "@/lib/services/mockData/event";
import { useUpdateEvent } from "@/lib/services/mutations/event";
import { EventRequirementsType, EventStateType } from "@/lib/services/schemas/event";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import { TriangleAlert } from "lucide-react";

import React, { useState } from "react";
type PropType = {
  requirements: EventRequirementsType[];
  isReady: boolean;
  activeState:EventStateType
};
function RequirementsCheckList({ requirements, isReady,activeState }: PropType) {
  const { mutateAsync, isPending } = useUpdateEvent(eventID);
  const [price, setPrice] = useState<number>(0);
  const pricingReq = requirements.find((r) => r.key === "pricing");
  const handleRequirement = async (
    key: EventRequirementsType["key"],
    current: boolean,
  ) => {
    try {
      await mutateAsync({
        [key]: !current,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handlePricing = async () => {
    try {
      if (!price) return;

      await mutateAsync({
        price: Number(price),
        pricing: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      {!isReady && activeState==="scheduled" &&  (
        <div className="flex flex-col gap-3">
          <div className="w-full rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <div className="flex items-start gap-2">
              <TriangleAlert className="h-5 w-5 text-red-400 mt-0.5" />

              <div className="flex flex-col gap-1">
                <h6 className="text-sm font-semibold text-red-300">
                  Cannot mark event as ready
                </h6>

                <p className="text-xs text-red-400 leading-relaxed">
                  Complete all requirements before enabling this action. Click
                  on each requirement below to resolve any missing setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Card className="w-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-white text-lg font-semibold">
            Streaming Readiness Checklist
          </CardTitle>

          <CardDescription className="text-zinc-400 text-sm">
            Ensure all systems are ready before going live
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {requirements
            .filter((req) => req.key !== "pricing")
            .map((req) => {
              const isDone = req.isSatisfied;

              return (
                <div
                  key={req.key}
                  onClick={() => handleRequirement(req.key, req.isSatisfied)}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border border-zinc-800 transition cursor-pointer",
                    "hover:bg-zinc-800/40 hover:border-zinc-700",
                    "active:scale-[0.98]",
                    isPending && "opacity-50 pointer-events-none",
                  )}
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center border transition-all",
                      isDone
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "bg-red-500/20 border-red-500 text-red-400",
                    )}
                  >
                    {isDone ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h6
                      className={cn(
                        "text-sm font-medium",
                        isDone ? "text-white" : "text-zinc-300",
                      )}
                    >
                      {req.title}
                    </h6>

                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {req.description}
                    </p>
                  </div>
                </div>
              );
            })}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900/30">
            {/* ICON */}
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center border",
                pricingReq?.isSatisfied
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                  : "bg-red-500/20 border-red-500 text-red-400",
              )}
            >
              {pricingReq?.isSatisfied ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col gap-2">
              <h6
                className={cn(
                  "text-sm font-medium",
                  pricingReq?.isSatisfied ? "text-white" : "text-zinc-300",
                )}
              >
                {pricingReq?.title}
              </h6>

              <p className="text-xs text-zinc-500">{pricingReq?.description}</p>

              {/* INPUT + BUTTON */}
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Enter ticket price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />

                <Button
                  onClick={handlePricing}
                  disabled={!price || isPending}
                  className="bg-white text-black hover:bg-zinc-200"
                >
                  {isPending ? "Saving..." : "Set price"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RequirementsCheckList;
