"use client";
import { useUpdateEvent } from "@/lib/services/mutations/event";
import React, { useState } from "react";
import { eventID } from "@/lib/services/mockData/event";
import { EventStateType } from "@/lib/services/schemas/event";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_global_components/shadcn-ui/ui/popover";
import { Button } from "@/app/_global_components/shadcn-ui/ui/button";

import { Calendar } from "@/app/_global_components/shadcn-ui/ui/calendar";
import { Cctv } from "lucide-react";
type PropType = {
  state: EventStateType;
  isReady: boolean | undefined;
};
const eventFlow: Record<
  EventStateType,
  {
    next: EventStateType | null;
    prev?: EventStateType;
    label: string;
    backLabel?: string;
  }
> = {
  draft: { next: "scheduled", label: "Schedule event" },
  scheduled: {
    next: "ready",
    prev: "draft",
    label: "Mark as ready",
    backLabel: "Back to draft",
  },
  ready: {
    next: "live",
    prev: "scheduled",
    label: "Go live",
    backLabel: "Back to scheduled",
  },
  live: { next: "completed", label: "Mark complete" },
  completed: { next: "replay", label: "Replay" },
  replay: { next: null, label: "Replay mode" },
};

function EventStateToggle({ state, isReady }: PropType) {
  const [date, setDate] = useState<Date>();
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const { mutateAsync, isPending } = useUpdateEvent(eventID);

  const handleDraft = async () => {
    try {
      if (!date) return;

      await mutateAsync({
        scheduledAt: date.toISOString(),
        state: "scheduled",
      });
      setOpenCalendar(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRollback = async () => {
    try {
      const prevState = eventFlow[state].prev;
      if (!prevState) return;

      await mutateAsync({ state: prevState });
    } catch (error) {
      console.error(error);
    }
  };
  const handleState = async () => {
    try {
      const nextState = eventFlow[state].next;

      if (!nextState) return;

      await mutateAsync({
        state: nextState,
      });
    } catch (error) {
      console.error(error);
    }
  };
  if (state === "draft") {
    return (
      <div>
        <Popover onOpenChange={setOpenCalendar} open={openCalendar}>
          <PopoverTrigger
            data-empty={!date}
            className="p-2 rounded-md w-fit justify-center gap-2 text-left font-normal  bg-white text-black hover:bg-zinc-200 data-[empty=true]:text-zinc-500"
          >
            Schedule event
          </PopoverTrigger>
          <PopoverContent
            align="center"
            className="w-auto p-0 border ring-0 border-zinc-800 bg-[#0B0B0F] shadow-xl rounded-xl  flex"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-3"
              classNames={{
                months: "flex flex-col sm:flex-row gap-4 ",
                month: "space-y-4",
                caption:
                  "flex justify-center pt-1 relative items-center text-zinc-200",
                caption_label: "text-sm font-medium text-zinc-200",
                nav: "space-x-1 flex flex-row justify-between absolute w-full left-0",
                nav_button:
                  "h-7 w-7 bg-transparent border border-zinc-700 hover:bg-zinc-800 rounded-md text-zinc-400",
                table: "w-full border-collapse space-y-1 ",
                head_row: "flex",
                head_cell:
                  "text-zinc-500 rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative",
                day: "h-9 w-9 p-0 font-normal text-zinc-300 hover:bg-zinc-800 rounded-md transition",
                day_selected:
                  "bg-blue-500 text-white hover:bg-blue-500 focus:bg-blue-500 rounded-md",
                day_today: "border border-blue-500 text-blue-400 rounded-md",
                day_disabled: "text-zinc-700 opacity-50",
                day_outside: "text-zinc-600 opacity-40",
              }}
            />
            <Button
              disabled={!date || isPending}
              onClick={handleDraft}
              className=" w-full bg-zinc-900/40 text-zinc-200 border-zinc-700 hover:bg-zinc-900 hover:border-zinc-600"
            >
              {isPending ? "Scheduling..." : "Confirm schedule"}
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
  return (
    <div className="flex flex-row items-center gap-2">
      {(state === "scheduled" || state === "ready") && (
        <Button
          variant="ghost"
          onClick={handleRollback}
          className={"cursor-pointer hover:opacity-50"}
        >
          {state === "scheduled" ? "Back to draft" : "Back to schedule"}
        </Button>
      )}

      <Button
        disabled={isPending || state === "replay" || !isReady}
        onClick={handleState}
        className="bg-white text-black hover:bg-zinc-200 w-fit"
      >
        {state === "ready" && <Cctv className="h-5 w-5 text-primary" />}
        {isPending ? "Updating..." : eventFlow[state].label}{" "}
      </Button>
    </div>
  );
}

export default EventStateToggle;
