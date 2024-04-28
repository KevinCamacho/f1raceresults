import { useQuery } from "@tanstack/react-query";
import { IMeeting } from "../types";
import * as moment from "moment";
import { timeParseFormat } from "../constants";

const useRaceList = (year: string) => {
  return useQuery<IMeeting[]>({
    queryKey: ["useRaceList", year],
    queryFn: () => getAllMeetings(year),
    refetchOnWindowFocus: false,
  });
};

const getAllMeetings = (year: string): Promise<IMeeting[]> => {
  return fetch(`https://api.openf1.org/v1/meetings?year=${year}`)
    .then((data) => data.json())
    .then((data: IMeeting[]) =>
      data.map((meeting: IMeeting) => {
        return {
          ...meeting,
          parsed_data_start: moment.utc(meeting.date_start, timeParseFormat)
            .valueOf,
        };
      }),
    );
};

export default useRaceList;
