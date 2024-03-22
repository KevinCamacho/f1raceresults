import { useQuery } from "@tanstack/react-query";
import { IPosition } from "../types";

const useRaceResult = (sessionKey: number) => {
  return useQuery<IPosition[]>({
    queryKey: ["useRaceResult", sessionKey],
    queryFn: () => getFinishingPositions(sessionKey),
    refetchOnWindowFocus: true,
    initialData: [],
    enabled: !!sessionKey,
  });
};

const getFinishingPositions = (sessionKey: number): Promise<IPosition[]> => {
  return fetch(`https://api.openf1.org/v1/position?session_key=${sessionKey}`)
    .then((data) => data.json())
    .then((data: IPosition[]) => data);
};

export default useRaceResult;
