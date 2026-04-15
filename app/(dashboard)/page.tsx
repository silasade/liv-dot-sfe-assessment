"use client";

import { useEventStat } from "@/lib/hooks/useEventStat";
import { eventID } from "@/lib/services/mockData/event";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { Button } from "../_global_components/shadcn-ui/ui/button";
import EventStateToggle from "./_local_components/EventStateToggle";
import RequirementsCheckList from "./_local_components/RequirementsCheckList";
import VideoPlayer from "./_local_components/VideoPlayer";
import EventDetails from "./_local_components/EventDetails";
import EventLiveCycle from "../_global_components/EventLiveCycle";

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
    <div className="min-h-screen relative bg-[#0F1117] text-white px-6 py-10 overflow-hidden">
      {/* system grid background */}

  {/* grid */}
   <div
    className="absolute inset-0 opacity-[0.05] pointer-events-none 
    [background-image:linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]
    bg-[size:36px_36px]"
  />

  {/* brighter ambient glow (top) */}
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,#33415550,transparent_60%)]" />

  {/* subtle bottom lift */}
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,#1e293b40,transparent_70%)]" />

  {/* slight center lift (this improves readability a lot) */}
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,#ffffff05,transparent_70%)]" />
      <div className="relative grid grid-cols-1 md:grid-cols-[500px_1fr] gap-6 max-w-7xl mx-auto">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/20 backdrop-blur-md p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
            <EventLiveCycle currentState={state ?? "draft"} />
          </div>
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-md p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <EventDetails
              description={data?.description ?? "N/A"}
              id={data?.id ?? "N/A"}
              price={data?.price}
              scheduledAt={data?.scheduledAt}
              state={state ?? "draft"}
              title={data?.title ?? "N/A"}
            />
          </div>

          <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/20 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <p className="text-sm text-zinc-400">Control event lifecycle</p>
            <EventStateToggle isReady={isReady} state={state ?? "draft"} />
          </div>

          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/20 backdrop-blur-md p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
            <RequirementsCheckList
              requirements={data?.requirements ?? []}
              activeState={state ?? "draft"}
              isReady={isReady ?? false}
              allowStreaming={allowStreaming}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full flex flex-col gap-3">
          {/* VIDEO */}
          {allowStreaming ? (
            <div className="rounded-xl border border-zinc-800/60 bg-black/20 backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)]">
              <VideoPlayer
                isLive={state === "live"}
                streamUrl={data?.streamUrl ?? ""}
                viewers={data?.viewers ?? 0}
              />
            </div>
          ) : (
            <div className="flex items-center animate-pulse justify-center aspect-video rounded-xl border border-dashed border-zinc-800 text-zinc-500 text-sm bg-black/10">
              Stream preview will appear here
            </div>
          )}
          {/* <div className="rounded-xl border border-zinc-800/60 bg-black/10 backdrop-blur-md p-3 text-[11px] text-zinc-500">
            <span className={cn(data?.requirements.)}> Stream engine </span> <span className={cn(data?.requirements.)}> latency stable </span>{" "}
            <span className={cn(data?.requirements.)}> ingestion</span>
            active
          </div> */}
        </div>
      </div>
    </div>
  );
}
