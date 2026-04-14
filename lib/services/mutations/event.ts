import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requests } from "../api";
import { UpdateEventDTO, EventType } from "../schemas/event";

const useUpdateEvent = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateEventDTO) =>
      requests<EventType>(`events/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      queryClient.invalidateQueries({ queryKey: ["event-requirement", id] });
    },
  });
};

export { useUpdateEvent };
