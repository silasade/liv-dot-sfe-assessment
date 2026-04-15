import { EventStateType } from "@/lib/services/schemas/event";
import { cn } from "@/lib/utils";
import React from "react";

type StepType = "completedSteps" | "activeStep" | "futureSteps";
type StepClassType = {

  text: string;
  dot: string,
      connector: string
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
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    connector: "bg-emerald-300",
  },
  activeStep: {
    dot: "bg-blue-500",
    text: "text-blue-600",
    connector: "bg-blue-300",
  },
  futureSteps: {
    dot: "bg-zinc-300",
    text: "text-zinc-400",
    connector: "bg-zinc-200",
  },
};

type PropType = {
  currentState: EventStateType;
};
function EventLiveCycle({ currentState }: PropType) {
  const activeIndex = states.findIndex((item) => item.state === currentState);

  const getStepStyles = (index: number):StepClassType => {
    if (index < activeIndex) {
      return stateStyles["completedSteps"];
    }
    if (index === activeIndex) {
      return stateStyles["completedSteps"];
    }
    return stateStyles["futureSteps"];
  };

  return (
    <div className="flex flex-row md:items-center w-full gap-6 md:gap-0">
      {states.map((item, index) => {
        const styles = getStepStyles(index);
        const isLast = index === states.length - 1;

        return (
          <div
            key={item.state}
            className="flex md:flex-1 md:items-center flex-row md:flex-col items-center"
          >
            {/* NODE */}
            <div className="flex flex-row md:flex-col items-center md:flex-1">
              {/* DOT */}
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  styles.dot,
                )}
              />

              {/* CONNECTOR */}
              <div
                className={cn(
                  "h-[1px] md:h-6 md:w-[1px] w-6 mt-0 md:mt-1 ml-2 md:ml-0 transition-all",
                  styles.connector,
                )}
              />

              {/* LABEL */}
              <span
                className={cn(
                  "text-[10px] uppercase tracking-widest ml-2 md:ml-0 md:mt-2 hidden md:inline-block transition-colors",
                  styles.text,
                )}
              >
                {item.state}
              </span>
            </div>

            {/* HORIZONTAL CONNECTOR */}
            {!isLast && (
              <div
                className={cn(
                  "hidden md:block h-[1px] flex-1 transition-colors",
                  index < activeIndex ? "bg-emerald-200" : "bg-zinc-200",
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
