import { EventStateType } from "@/lib/services/schemas/event";
import React from "react";
const states: { state: EventStateType; label: string }[] = [
  {
    label: "Draft",
    state: "draft",
  },
  {
    state: "scheduled",
    label: "Scheduled",
  },
  {
    state: "ready",
    label: "Ready for Streaming",
  },
  {
    state: "live",
    label: "Live",
  },
  {
    state: "completed",
    label: "Completed",
  },
  {
    state: "replay",
    label: "Replay Available",
  },
];
function EventLiveCycle() {
  return (
    <div className="flex flex-row items-center">
      {states.map((item,index) => (
        <div key={item.state}>{index+1}</div>
      ))}
    </div>
  );
}

export default EventLiveCycle;
