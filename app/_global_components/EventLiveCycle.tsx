import { EventStateType } from "@/lib/services/schemas/event";
import { cn } from "@/lib/utils";
import React from "react";

type StepType = "completedSteps" | "activeStep" | "futureSteps";
type StepClassType = {
  bg: string;
  border: string;
  text: string;
  line: string;
};
const states: { state: EventStateType }[] = [
  {
    state: "draft",
  },
  {
    state: "scheduled",
  },
  {
    state: "ready",
  },
  {
    state: "live",
  },
  {
    state: "completed",
  },
  {
    state: "replay",
  },
];

const stateStyles: Record<StepType, StepClassType> = {
  completedSteps: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-500",
    text: "text-emerald-400",
    line: "bg-emerald-500",
  },
  activeStep: {
    bg: "bg-blue-500",
    border: "border-blue-400",
    text: "text-white",
    line: "bg-blue-500/30",
  },
  futureSteps: {
    bg: "bg-zinc-800",
    border: "border-zinc-700",
    text: "text-zinc-500",
    line: "bg-zinc-700",
  },
};

type PropType = {
  currentState: EventStateType;
};
function EventLiveCycle({ currentState }: PropType) {
  const activeIndex = states.findIndex((item) => item.state === currentState);

  const getStepStyles = (index: number): StepClassType => {
    if (index < activeIndex) {
      return stateStyles["completedSteps"];
    } else if (index === activeIndex) {
      return stateStyles["activeStep"];
    } else {
      return stateStyles["futureSteps"];
    }
  };
  return (
    <div
      className="
      flex flex-row md:items-center w-full
      gap-6 md:gap-0
    "
    >
      {states.map((item, index) => {
        const styles = getStepStyles(index);
        const isLast = index === states.length - 1;

        return (
          <div
            key={item.state}
            className="
            flex md:flex-1 md:items-center
            flex-row md:flex-col
            items-center
          "
          >
            {/* Node block */}
            <div className="flex flex-row md:flex-col items-center md:flex-1">
              <div className={cn("w-2 h-2 rounded-full animate-pulse", styles.line)} />

              <div
                className={cn(
                  "h-[1px] md:h-6 md:w-[1px] w-6 mt-0 md:mt-1 ml-2 md:ml-0",
                  styles.line,
                )}
              />

              <span
                className={cn(
                  "text-[10px] uppercase tracking-widest ml-2 md:ml-0 md:mt-2 hidden md:inline-block",
                  styles.text,
                )}
              >
                {item.state}
              </span>
            </div>

            {/* Connector line (desktop only) */}
            {!isLast && (
              <div
                className={cn(
                  "hidden md:block h-[1px] flex-1",
                  index < activeIndex ? "bg-emerald-500/60" : "bg-zinc-800",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default EventLiveCycle;
