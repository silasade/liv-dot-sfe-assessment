import { useQuery } from "@tanstack/react-query";
import { requests } from "../api";
import { EventType } from "../schemas/event";

const useGetAllEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => requests<EventType[]>("events"),
  });
};

const useGetEventById = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => requests<{event:EventType}>(`events/${id}`),
    enabled: !!id,
  });
};

const useGetEventRequirementStatus = (id: string) => {
  return useQuery({
    queryKey: ["event-requirement", id],
    queryFn: () =>
      requests<{ isAllRequirementsSatisfied: boolean }>(
        `events/${id}/requirements-satisfied`,
      ),
    enabled: !!id,
  });
};

export { useGetAllEvents, useGetEventById, useGetEventRequirementStatus };
