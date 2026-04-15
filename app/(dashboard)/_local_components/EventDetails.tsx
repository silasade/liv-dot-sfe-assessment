import { EventStateType } from "@/lib/services/schemas/event";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_global_components/shadcn-ui/ui/card";
import { format } from "date-fns";
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
    <Card className="w-full rounded-xl border border-zinc-200 bg-white/80 backdrop-blur-md shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-zinc-900 text-lg font-semibold">
            {title}
          </CardTitle>

          {price && (
            <span className="px-2 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs text-zinc-600">
              Tickets Pricing:{" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(price)}
            </span>
          )}
        </div>

        <CardDescription className="text-zinc-500 text-sm leading-relaxed">
          {description}
        </CardDescription>

        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 pt-2">
          <span className="px-2 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-600">
            ID: {id}
          </span>

          <span className="px-2 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-600">
            State: {state ?? "draft"}
          </span>

          {scheduledAt && (
            <span className="px-2 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-600">
              Scheduled at: {format(scheduledAt, "EEEE LLL, RRR")}
            </span>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

export default EventDetails;
