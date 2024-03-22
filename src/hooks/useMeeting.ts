import { useQuery } from "@tanstack/react-query";
import { IMeeting } from "../types";

const useRaceList = () => {
  return useQuery<IMeeting[]>({
    queryKey: ["useRaceList"],
    queryFn: getAllMeetings,
    refetchOnWindowFocus: true,
    initialData: [],
  });
};

const getAllMeetings = (): Promise<IMeeting[]> => {
  return fetch("https://api.openf1.org/v1/meetings?year=2024")
    .then((data) => data.json())
    .then((data: IMeeting[]) => data);
};

export default useRaceList;
