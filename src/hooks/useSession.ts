import { useQuery } from "@tanstack/react-query";
import { ISession } from "../types";
import * as moment from "moment";
import { timeParseFormat } from "../constants";
import axios from "axios";

const useRaceSession = (meetingKey: number, enabled: boolean) => {
  return useQuery<ISession>({
    queryKey: ["useRaceSession", meetingKey],
    queryFn: () => getRaceSession(meetingKey),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};

const getRaceSession = (meetingKey: number): Promise<ISession> => {
  return axios
    .get(
      `https://api.openf1.org/v1/sessions?meeting_key=${meetingKey}&session_name=Race`,
    )
    .then((response) => {
      const { data }: { data: ISession[] } = response;
      const raceSession: ISession = data[0];
      return {
        ...raceSession,
        parsed_date_start: moment
          .utc(raceSession.date_start, timeParseFormat)
          .valueOf(),
      };
    });
};

export default useRaceSession;
