"use client";

import { useEventStat } from "@/lib/hooks/useEventStat";

import { eventID } from "@/lib/services/mockData/event";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { Button } from "../_global_components/shadcn-ui/ui/button";
import EventStateToggle from "./_local_components/EventStateToggle";
import RequirementsCheckList from "./_local_components/RequirementsCheckList";
import VideoPlayer from "./_local_components/VideoPlayer";
import EventDetails from "./_local_components/EventDetails";

export default function Home() {
  const { data, isLoading, state, isError, refetch, isReady, allowStreaming } =
    useEventStat(eventID);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-2 text-zinc-400">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading event...</span>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertTriangle className="h-8 w-8 text-red-400" />

          <div>
            <p className="text-red-400 font-medium">Failed to load event</p>
            <p className="text-sm text-zinc-500 mt-1">Something went wrong</p>
            <Button onClick={() => refetch()}>Click to refresh</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-[#0B0B0F] flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-5xl space-y-6">
        {/* HEADER SECTION */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-white">Event Overview</h1>
          <p className="text-sm text-zinc-500">
            Track event progress and streaming readiness
          </p>
        </div>

        {/* CARD */}
        <EventDetails
          description={data?.description ?? "N/A"}
          id={data?.id ?? "N/A"}
          price={data?.price}
          scheduledAt={data?.scheduledAt}
          state={state ?? "draft"}
          title={data?.title ?? "N/A"}
        />
        {allowStreaming && (
          <VideoPlayer
            isLive={state === "live" ? true : false}
            streamUrl={data?.streamUrl ?? ""}
            viewers={data?.viewers ?? 0}
          />
        )}

        <EventStateToggle isReady={isReady} state={state ?? "draft"} />
        <RequirementsCheckList
          requirements={data?.requirements ?? []}
          activeState={state ?? "draft"}
          isReady={isReady ?? false}
          allowStreaming={allowStreaming}
        />
      </div>
    </div>
  );
}
