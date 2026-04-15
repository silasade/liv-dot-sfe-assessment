"use client";

import { useEventStat } from "@/lib/hooks/useEventStat";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_global_components/shadcn-ui/ui/card";
import EventLiveCycle from "./_local_components/EventLiveCycle";
import { eventID } from "@/lib/services/mockData/event";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { Button } from "../_global_components/shadcn-ui/ui/button";
import EventStateToggle from "./_local_components/EventStateToggle";
import { format } from "date-fns";
import RequirementsCheckList from "./_local_components/RequirementsCheckList";
import VideoPlayer from "./_local_components/VideoPlayer";

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
        <Card className="w-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl shadow-lg">
          <CardHeader className="space-y-3">
            {/* TITLE */}
            <CardTitle className="text-white text-lg font-semibold">
              {data?.title}
            </CardTitle>

            {/* DESCRIPTION */}
            <CardDescription className="text-zinc-400 text-sm leading-relaxed">
              {data?.description}
            </CardDescription>

            {/* META INFO */}
            <div className="flex items-center gap-3 text-xs text-zinc-500 pt-2">
              <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700">
                ID: {data?.id}
              </span>

              <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700">
                State: {state ?? "draft"}
              </span>
              {data?.scheduledAt && (
                <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700">
                  Scheduled at: {format(data.scheduledAt, "EEEE LLL, RRR")}
                </span>
              )}
            </div>
          </CardHeader>

          {/* LIFECYCLE */}
          <div className="px-6 pb-6">
            <EventLiveCycle currentState={state ?? "draft"} />
          </div>
        </Card>
        {allowStreaming && (
          <VideoPlayer
            isLive={state === "live" ? true : false}
            streamUrl={data?.streamUrl ?? ""}
          />
        )}

        <EventStateToggle isReady={isReady} state={state ?? "draft"} />
        <RequirementsCheckList
          requirements={data?.requirements ?? []}
          activeState={state ?? "draft"}
          isReady={isReady ?? false}
        />
      </div>
    </div>
  );
}
