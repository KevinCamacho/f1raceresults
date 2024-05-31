import { useQuery } from "@tanstack/react-query";
import { IPosition } from "../types";
import { getFinishingPositions } from "../api/position";

const useRacePositions = (sessionKey: number, inView: boolean) => {
  return useQuery<IPosition[]>({
    queryKey: ["useRacePositions", sessionKey],
    queryFn: () => getFinishingPositions(sessionKey),
    enabled: !!sessionKey && inView,
  });
};

export default useRacePositions;
