"use client";

import { useEventStat } from "@/lib/hooks/useEventStat";
import { eventID } from "@/lib/services/mockData/event";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { Button } from "../_global_components/shadcn-ui/ui/button";
import EventStateToggle from "./_local_components/EventStateToggle";
import RequirementsCheckList from "./_local_components/RequirementsCheckList";
import VideoPlayer from "./_local_components/VideoPlayer";
import EventDetails from "./_local_components/EventDetails";
import EventLiveCycle from "./_local_components/EventLiveCycle";

export default function Home() {
  const { data, isLoading, state, isError, refetch, isReady, allowStreaming } =
    useEventStat(eventID);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#0A0C10] text-white">
        <div className="flex items-center gap-2 text-zinc-400">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading event...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#0A0C10] text-white">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertTriangle className="h-8 w-8 text-red-400" />
          <div>
            <p className="text-red-400 font-medium">Failed to load event</p>
            <p className="text-sm text-zinc-500 mt-1">Something went wrong</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#F8FAFC] text-zinc-900 px-2 md:px-6 py-10 overflow-hidden">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none 
      [background-image:linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]
      bg-[size:36px_36px]"
      />

      {/* soft ambient light */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,#e2e8f060,transparent_60%)]" />

      <div className="relative grid grid-cols-1 md:grid-cols-[350px_1fr] lg:grid-cols-[500px_1fr] gap-6 max-w-7xl mx-auto">
        {/* LEFT COLUMN */}
        <div className="space-y-4 order-2 md:order-1">
          {/* Lifecycle */}
            <EventLiveCycle currentState={state ?? "draft"} />

          {/* Details */}
            <EventDetails
              description={data?.description ?? "N/A"}
              id={data?.id ?? "N/A"}
              price={data?.price}
              scheduledAt={data?.scheduledAt}
              state={state ?? "draft"}
              title={data?.title ?? "N/A"}
            />

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md shadow-sm">
            <p className="text-sm text-zinc-500">Control event lifecycle</p>
            <EventStateToggle isReady={isReady} state={state ?? "draft"} />
          </div>

          {/* Requirements */}
          <RequirementsCheckList
            requirements={data?.requirements ?? []}
            activeState={state ?? "draft"}
            isReady={isReady ?? false}
            allowStreaming={allowStreaming}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full flex flex-col gap-3 order-1 md:order-2">
          {/* VIDEO */}
          {allowStreaming ? (
            <VideoPlayer
              isLive={state === "live"}
              streamUrl={data?.streamUrl ?? ""}
              viewers={data?.viewers ?? 0}
            />
          ) : (
            <div className="flex items-center justify-center aspect-video rounded-xl border border-dashed border-zinc-300 text-zinc-500 text-sm bg-zinc-100">
              Stream preview will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
