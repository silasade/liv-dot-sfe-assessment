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
    <div className="flex flex-row items-center w-full  justify-start">
      {states.map((item, index) => {
        const styles = getStepStyles(index);
        const isLast = index === states.length - 1;
        return (
          <div
            key={item.state}
            className="flex flex-1 gap-1 sm:gap-2 items-center w-full"
          >
            <div className="flex flex-col gap-2 items-center flex-1">
              <div
                className={cn(
                  "h-6 sm:h-8 sm:h-12 w-6 sm:w-8 sm:w-12 rounded-full p-1 flex items-center justify-center border-2 transition-all",
                  styles.bg,
                  styles.border,
                )}
              >
                <p className={cn("text-xs sm:text-sm font-bold", styles.text)}>
                  {index + 1}
                </p>
              </div>

              <p
                className={cn(
                  "uppercase text-xs tracking-wide font-extrabold hidden md:block",
                  styles.text,
                )}
              >
                {item.state}
              </p>
            </div>

            {!isLast && <div className={cn("flex-1 h-1", styles.line)} />}
          </div>
        );
      })}
    </div>
  );
}

export default EventLiveCycle;
