import { EventStateType } from "@/lib/services/schemas/event";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_global_components/shadcn-ui/ui/card";
import { format } from "date-fns";

import EventLiveCycle from "@/app/_global_components/EventLiveCycle";
type PropType = {
  title: string;
  price: number | null | undefined;
  description: string;
  id: string;
  scheduledAt: string | null | undefined;
  state: EventStateType;
};
function EventDetails({
  description,
  id,
  price,
  scheduledAt,
  state,
  title,
}: PropType) {
  return (
    <Card className="w-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl shadow-lg">
      <CardHeader className="space-y-3">
        {/* TITLE */}
        <div className="flex flex-row items-center justify-between ">
          <CardTitle className="text-white text-lg font-semibold">
            {title}
          </CardTitle>

          {price && (
            <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-zinc-400">
              Tickets Pricing:{" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(price)}
            </span>
          )}
        </div>
        {/* DESCRIPTION */}
        <CardDescription className="text-zinc-400 text-sm leading-relaxed">
          {description}
        </CardDescription>

        {/* META INFO */}
        <div className="flex items-center gap-3 text-xs text-zinc-500 pt-2">
          <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700">
            ID: {id}
          </span>

          <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700">
            State: {state ?? "draft"}
          </span>
          {scheduledAt && (
            <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700">
              Scheduled at: {format(scheduledAt, "EEEE LLL, RRR")}
            </span>
          )}
        </div>
      </CardHeader>

      {/* LIFECYCLE */}
      <div className="p-3 sm:px-6 pb-6">
        <EventLiveCycle currentState={state ?? "draft"} />
      </div>
    </Card>
  );
}

export default EventDetails;
