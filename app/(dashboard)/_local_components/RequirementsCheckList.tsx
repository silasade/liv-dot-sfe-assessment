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
import {
  EventRequirementsType,
  EventStateType,
} from "@/lib/services/schemas/event";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import { TriangleAlert } from "lucide-react";

import React, { useState } from "react";
type PropType = {
  requirements: EventRequirementsType[];
  isReady: boolean;
  activeState: EventStateType;
  allowStreaming: boolean;
};
function RequirementsCheckList({
  requirements,
  isReady,
  activeState,
  allowStreaming,
}: PropType) {
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
      {!isReady && activeState !== "draft" && (
        <div className="w-full rounded-lg border border-red-300 bg-red-50 p-4">
          <div className="flex items-start gap-2">
            <TriangleAlert className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />

            <div className="flex flex-col gap-1">
              <h6 className="text-sm font-semibold text-red-600">
                Cannot mark event as ready
              </h6>

              <p className="text-xs text-red-500 leading-relaxed">
                Complete all requirements before enabling this action. Click on
                each requirement below to resolve any missing setup.
              </p>
            </div>
          </div>
        </div>
      )}
      <Card className="w-full rounded-xl border border-zinc-200 bg-white/80 backdrop-blur-md shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-zinc-900 text-lg font-semibold">
            Streaming Readiness Checklist
          </CardTitle>

          <CardDescription className="text-zinc-500 text-sm">
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
                  onClick={() =>
                    allowStreaming
                      ? {}
                      : handleRequirement(req.key, req.isSatisfied)
                  }
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border border-zinc-200 transition cursor-pointer",
                    "hover:bg-zinc-100 hover:border-zinc-300",
                    "active:scale-[0.98]",
                    isPending && "opacity-50 cursor-not-allowed",
                    allowStreaming && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <div
                    className={cn(
                      "shrink-0 h-5 sm:h-10 w-5 sm:w-10 rounded-full flex items-center justify-center border transition-all",
                      isDone
                        ? "bg-emerald-100 border-emerald-500 text-emerald-600"
                        : "bg-red-100 border-red-500 text-red-500",
                    )}
                  >
                    {isDone ? (
                      <Check className="h-2 sm:h-4 w-2 sm:w-4" />
                    ) : (
                      <X className="h-2 sm:h-4 w-2 sm:w-4" />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h6
                      className={cn(
                        "text-sm font-medium",
                        isDone ? "text-zinc-900" : "text-zinc-700",
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

          {/* PRICING */}
          <div
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border border-zinc-200 bg-zinc-50",
              isPending && "opacity-50 cursor-not-allowed",
              allowStreaming && "opacity-50 cursor-not-allowed",
            )}
          >
            {/* ICON */}
            <div
              className={cn(
                "shrink-0 h-5 sm:h-10 w-5 sm:w-10 rounded-full flex items-center justify-center border",
                pricingReq?.isSatisfied
                  ? "bg-emerald-100 border-emerald-500 text-emerald-600"
                  : "bg-red-100 border-red-500 text-red-500",
              )}
            >
              {pricingReq?.isSatisfied ? (
                <Check className="h-2 sm:h-4 w-2 sm:w-4" />
              ) : (
                <X className="h-2 sm:h-4 w-2 sm:w-4" />
              )}
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col gap-2">
              <h6
                className={cn(
                  "text-sm font-medium",
                  pricingReq?.isSatisfied ? "text-zinc-900" : "text-zinc-700",
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
                  disabled={isPending || allowStreaming}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400"
                />

                <Button
                  onClick={handlePricing}
                  disabled={!price || isPending || allowStreaming}
                  className="bg-zinc-900 text-white hover:bg-zinc-800"
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
