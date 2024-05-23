import { useQuery } from "@tanstack/react-query";
import { ISession } from "../types";
import * as moment from "moment";
import { timeParseFormat } from "../constants";
import axios from "axios";

const useRaceSession = (year: number, meetingKey: number) => {
  return useQuery<ISession[]>({
    queryKey: ["useRaceSession", year],
    queryFn: () => getRaceSessionsForYear(year),
    select: (data) => getRaceSessionByMeetingKey(data, meetingKey),
  });
};

const getRaceSessionByMeetingKey = (races: ISession[], meetingKey: number) =>
  races.filter((race: ISession) => race.meeting_key === meetingKey);

const getRaceSessionsForYear = (year: number): Promise<ISession[]> => {
  return axios
    .get(`https://api.openf1.org/v1/sessions?year=${year}&session_name=Race`)
    .then((response) => {
      const { data }: { data: ISession[] } = response;
      return data.map((race: ISession) => ({
        ...race,
        parsed_date_start: moment
          .utc(race.date_start, timeParseFormat)
          .valueOf(),
      }));
    });
};

export default useRaceSession;
