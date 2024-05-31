import { useQuery } from "@tanstack/react-query";
import { IMeeting } from "../types";
import { getAllMeetingsForYear } from "../api/meeting";

const useYearlyMeetings = (year: string) => {
  return useQuery<IMeeting[]>({
    queryKey: ["useYearlyMeetings", year],
    queryFn: () => getAllMeetingsForYear(year),
  });
};

export default useYearlyMeetings;
