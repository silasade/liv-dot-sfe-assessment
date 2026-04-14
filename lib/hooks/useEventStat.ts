import { useGetEventById } from "../services/queries/event";
import { eventID } from "../services/mockData/event";
const useEventStat = (id: string) => {
  const { data, isError, isLoading } = useGetEventById(eventID);
  const hasSchedule = data?.data.scheduledAt !== null;
  const requirementsSatisfied = data?.data.requirements.every(
    (requirement) => requirement.isSatisfied,
  );
  const isReady = hasSchedule && requirementsSatisfied;

  return {
    data,
    isError,
    isLoading,
    isReady,
  };
};

export { useEventStat };
