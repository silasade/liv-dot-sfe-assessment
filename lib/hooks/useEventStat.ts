import { useMemo } from "react";
import { useGetEventById } from "@/lib/services/queries/event";

const useEventStat = (id: string) => {
  const { data, isError, isLoading, refetch } = useGetEventById(id);

  const event = data?.data?.event;

  const hasSchedule = !!event?.scheduledAt;

  const requirementsSatisfied =
    event?.requirements?.every((r) => r.isSatisfied) ?? false;

  const isReady = hasSchedule && requirementsSatisfied;

  const allowStreaming = useMemo(() => {
    if (!event) return false;

    return (
      event.state === "live" ||
      event.state === "replay" ||
      event.state === "completed"
    );
  }, [event]);

  return {
    state: event?.state,
    data: event,
    isError,
    isLoading,
    isReady,
    allowStreaming,
    refetch,
  };
};

export { useEventStat };
